import supabase from "./supabaseclient";

export default async function updateBook(id, updatedFields) {
    const { name, author, comments, imageFile } = updatedFields;
    console.log(comments)
    let imageUrl;
    if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data: storageData, error: storageError } = await supabase.storage
            .from('books')
            .upload(fileName, imageFile);

        if (storageError) {
            console.error('Error uploading new image:', storageError);
            return null;
        }

        imageUrl = supabase.storage.from('books').getPublicUrl(fileName).data.publicUrl;
    }
    const fieldsToUpdate = {
        ...(name !== undefined && { name }),
        ...(author !== undefined && { author }),
        ...(comments !== undefined && { comments }),
        ...(imageUrl && { image: imageUrl }),
    };

    const { error } = await supabase
        .from('books_list')
        .update(fieldsToUpdate)
        .eq('id', id);

    if (error) {
        console.error('Error updating book:', error);
        return null;
    }

    return { success: true, updatedFields };
}
