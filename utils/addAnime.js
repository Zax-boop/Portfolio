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
  const { data: animeToUpdate, error: fetchError } = await supabase
    .from('anime_rankings')
    .select('*')
    .gte('rank', rank); 

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
  const { data, error } = await supabase
    .from('anime_rankings')
    .insert([{ name, studio, comments, image: imageUrl, rank}]);
  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }
  return data;
}
