import supabase from "../general/supabaseclient";

export default async function updateMovie(id, updatedFields) {
    const { name, director, comments, genres, imageFile } = updatedFields;
    let imageUrl;
    if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data: storageData, error: storageError } = await supabase.storage
            .from('movie_images')
            .upload(fileName, imageFile);

        if (storageError) {
            console.error('Error uploading new image:', storageError);
            return null;
        }

        imageUrl = supabase.storage.from('movie_images').getPublicUrl(fileName).data.publicUrl;
    }
    const fieldsToUpdate = {
        ...(name !== undefined && { name }),
        ...(director !== undefined && { director }),
        ...(comments !== undefined && { comments }),
        ...(genres !== undefined && { genres }),
        ...(imageUrl && { image: imageUrl }),
    };

    const { error } = await supabase
        .from('movies_list')
        .update(fieldsToUpdate)
        .eq('id', id);

    if (error) {
        console.error('Error updating movie:', error);
        return null;
    }

    return { success: true, updatedFields };
}
