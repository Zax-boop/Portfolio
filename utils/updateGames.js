import supabase from "./supabaseclient";

export default async function updateGames(id, updatedFields) {
    const { name, studio, comments, imageFile, rank } = updatedFields;
    let imageUrl;
    if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data: storageData, error: storageError } = await supabase.storage
            .from('video_games')
            .upload(fileName, imageFile);

        if (storageError) {
            console.error('Error uploading new image:', storageError);
            return null;
        }

        imageUrl = supabase.storage.from('video_games').getPublicUrl(fileName).data.publicUrl;
    }
    if (rank !== undefined) {
        const { data: currentGame, error: fetchError } = await supabase
            .from('video_game_rankings')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError) {
            console.error('Error fetching current game:', fetchError);
            return null;
        }

        const currentRank = currentGame.rank;

        if (currentRank !== rank) {
            if (rank < currentRank) {
                const { data: gamesToUpdate, error: fetchError } = await supabase
                    .from('video_game_rankings')
                    .select('*')
                    .gte('rank', rank)
                    .lte('rank', currentRank);

                if (fetchError) {
                    console.error('Error fetching games to update:', fetchError);
                    return null;
                }
                gamesToUpdate.sort((a, b) => b.rank - a.rank)
                for (const game of gamesToUpdate) {
                    const { error: updateError } = await supabase
                        .from('video_game_rankings')
                        .update({ rank: game.rank + 1 })
                        .eq('id', game.id);

                    if (updateError) {
                        console.error(`Error updating rank for game ID ${game.id}:`, updateError);
                        return null;
                    }
                }
            }
            if (rank > currentRank) {
                const { data: gamesToUpdate, error: fetchError } = await supabase
                    .from('video_game_rankings')
                    .select('*')
                    .gt('rank', currentRank)
                    .lte('rank', rank);

                if (fetchError) {
                    console.error('Error fetching game to update:', fetchError);
                    return null;
                }
                gamesToUpdate.sort((a, b) => a.rank - b.rank)
                for (const game of gamesToUpdate) {
                    const { error: updateError } = await supabase
                        .from('video_game_rankings')
                        .update({ rank: game.rank - 1 })
                        .eq('id', game.id);

                    if (updateError) {
                        console.error(`Error updating rank for game ID ${game.id}:`, updateError);
                        return null;
                    }
                }
            }
        }
    }

    const fieldsToUpdate = {
        ...(name !== undefined && { name }),
        ...(studio !== undefined && { studio }),
        ...(comments !== undefined && { comments }),
        ...(imageUrl && { image: imageUrl }),
        ...(rank !== undefined && { rank }),
    };

    const { error } = await supabase
        .from('video_game_rankings')
        .update(fieldsToUpdate)
        .eq('id', id);

    if (error) {
        console.error('Error updating game:', error);
        return null;
    }

    return { success: true, updatedFields };
}
