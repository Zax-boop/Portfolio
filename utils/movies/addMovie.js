import supabase from "../general/supabaseclient";

export default async function addMovie(name, director, comments, genres, imageFile) {
  let imageUrl = "";

  if (imageFile) {
    const fileName = `${Date.now()}_${imageFile.name}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('movie_images') 
      .upload(fileName, imageFile);

    if (storageError) {
      console.error('Error uploading image:', storageError);
      return null;
    }
    
    imageUrl = supabase.storage.from('movie_images').getPublicUrl(fileName).data.publicUrl;
  }
  const { data, error } = await supabase
    .from('movies_list')
    .insert([{ name, director, comments, genres, image: imageUrl}]);
  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }
  return data;
}
