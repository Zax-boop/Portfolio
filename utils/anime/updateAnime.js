import supabase from "../general/supabaseclient";

export default async function updateAnime(id, updatedFields) {
    const { name, studio, comments, imageFile, rank, genres } = updatedFields;
    let imageUrl;
    if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data: storageData, error: storageError } = await supabase.storage
            .from('anime')
            .upload(fileName, imageFile);

        if (storageError) {
            console.error('Error uploading new image:', storageError);
            return null;
        }

        imageUrl = supabase.storage.from('anime').getPublicUrl(fileName).data.publicUrl;
    }
    if (rank !== undefined) {
        const { data: currentAnime, error: fetchError } = await supabase
            .from('anime_rankings')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError) {
            console.error('Error fetching current anime:', fetchError);
            return null;
        }

        const currentRank = currentAnime.rank;

        if (currentRank !== rank) {
            if (rank < currentRank) {
                const { data: animeToUpdate, error: fetchError } = await supabase
                    .from('anime_rankings')
                    .select('*')
                    .gte('rank', rank)
                    .lte('rank', currentRank);

                if (fetchError) {
                    console.error('Error fetching anime to update:', fetchError);
                    return null;
                }
                animeToUpdate.sort((a, b) => b.rank - a.rank)
                for (const anime of animeToUpdate) {
                    const { error: updateError } = await supabase
                        .from('anime_rankings')
                        .update({ rank: anime.rank + 1 })
                        .eq('id', anime.id);

                    if (updateError) {
                        console.error(`Error updating rank for anime ID ${anime.id}:`, updateError);
                        return null;
                    }
                }
            }
            if (rank > currentRank) {
                const { data: animeToUpdate, error: fetchError } = await supabase
                    .from('anime_rankings')
                    .select('*')
                    .gt('rank', currentRank)
                    .lte('rank', rank);

                if (fetchError) {
                    console.error('Error fetching anime to update:', fetchError);
                    return null;
                }
                animeToUpdate.sort((a, b) => a.rank - b.rank)
                for (const anime of animeToUpdate) {
                    const { error: updateError } = await supabase
                        .from('anime_rankings')
                        .update({ rank: anime.rank - 1 })
                        .eq('id', anime.id);

                    if (updateError) {
                        console.error(`Error updating rank for anime ID ${anime.id}:`, updateError);
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
        ...(genres !== undefined && { genres })
    };

    const { error } = await supabase
        .from('anime_rankings')
        .update(fieldsToUpdate)
        .eq('id', id);

    if (error) {
        console.error('Error updating anime:', error);
        return null;
    }

    return { success: true, updatedFields };
}
