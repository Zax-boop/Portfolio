import supabase from "./supabaseclient";

export default async function addBook(name, author, comments, imageFile) {
  let imageUrl = "";

  if (imageFile) {
    const fileName = `${Date.now()}_${imageFile.name}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('books') 
      .upload(fileName, imageFile);

    if (storageError) {
      console.error('Error uploading image:', storageError);
      return null;
    }
    
    imageUrl = supabase.storage.from('books').getPublicUrl(fileName).data.publicUrl;
  }
  const { data, error } = await supabase
    .from('books_list')
    .insert([{ name, author, comments, image: imageUrl}]);
  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }
  return data;
}
