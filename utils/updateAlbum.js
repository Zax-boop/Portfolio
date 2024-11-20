import supabase from "./supabaseclient";

export default async function updateAlbum(id, updatedFields) {
    const { name, artist, comment, imageFile, Rank } = updatedFields;
    let imageUrl;
    if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data: storageData, error: storageError } = await supabase.storage
            .from('album-images')
            .upload(fileName, imageFile);

        if (storageError) {
            console.error('Error uploading new image:', storageError);
            return null;
        }

        imageUrl = supabase.storage.from('album-images').getPublicUrl(fileName).data.publicUrl;
    }
    if (Rank !== undefined) {
        const { data: currentAlbum, error: fetchError } = await supabase
            .from('album_rankings')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError) {
            console.error('Error fetching current album:', fetchError);
            return null;
        }

        const currentRank = currentAlbum.Rank;

        if (currentRank !== Rank) {
            if (Rank < currentRank) {
                const { data: albumsToUpdate, error: fetchError } = await supabase
                    .from('album_rankings')
                    .select('*')
                    .gte('Rank', Rank)
                    .lte('Rank', currentRank);

                if (fetchError) {
                    console.error('Error fetching albums to update:', fetchError);
                    return null;
                }
                albumsToUpdate.sort((a, b) => b.Rank - a.Rank)
                for (const album of albumsToUpdate) {
                    const { error: updateError } = await supabase
                        .from('album_rankings')
                        .update({ Rank: album.Rank + 1 })
                        .eq('id', album.id);

                    if (updateError) {
                        console.error(`Error updating rank for album ID ${album.id}:`, updateError);
                        return null;
                    }
                }
            }
            if (Rank > currentRank) {
                const { data: albumsToUpdate, error: fetchError } = await supabase
                    .from('album_rankings')
                    .select('*')
                    .gt('Rank', currentRank)
                    .lte('Rank', Rank);

                if (fetchError) {
                    console.error('Error fetching albums to update:', fetchError);
                    return null;
                }
                albumsToUpdate.sort((a, b) => a.Rank - b.Rank)
                for (const album of albumsToUpdate) {
                    const { error: updateError } = await supabase
                        .from('album_rankings')
                        .update({ Rank: album.Rank - 1 })
                        .eq('id', album.id);

                    if (updateError) {
                        console.error(`Error updating rank for album ID ${album.id}:`, updateError);
                        return null;
                    }
                }
            }
        }
    }

    const fieldsToUpdate = {
        ...(name !== undefined && { name }),
        ...(artist !== undefined && { artist }),
        ...(comment !== undefined && { comment }),
        ...(imageUrl && { image: imageUrl }),
        ...(Rank !== undefined && { Rank }),
    };

    const { error } = await supabase
        .from('album_rankings')
        .update(fieldsToUpdate)
        .eq('id', id);

    if (error) {
        console.error('Error updating album:', error);
        return null;
    }

    return { success: true, updatedFields };
}
