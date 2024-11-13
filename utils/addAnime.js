import supabase from "./supabaseclient";

export default async function addAnime(name, studio, comments, imageFile, rank) {
  let imageUrl = "";

  if (imageFile) {
    const fileName = `${Date.now()}_${imageFile.name}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('anime') 
      .upload(fileName, imageFile);

    if (storageError) {
      console.error('Error uploading image:', storageError);
      return null;
    }
    
    imageUrl = supabase.storage.from('anime').getPublicUrl(fileName).data.publicUrl;
  }
  const { data, error } = await supabase
    .from('anime_rankings')
    .insert([{ name, studio, comments, image: imageUrl, rank}]);
  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }
  return data;
}
