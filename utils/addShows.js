import supabase from "./supabaseclient";

export default async function addShow(name, director, comments, imageFile, rank) {
  let imageUrl = "";

  if (imageFile) {
    const fileName = `${Date.now()}_${imageFile.name}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('tv_images') 
      .upload(fileName, imageFile);

    if (storageError) {
      console.error('Error uploading image:', storageError);
      return null;
    }
    
    imageUrl = supabase.storage.from('tv_images').getPublicUrl(fileName).data.publicUrl;
  }
  const { data, error } = await supabase
    .from('tv_rankings')
    .insert([{ name, director, comments, image: imageUrl, rank}]);
  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }
  return data;
}
