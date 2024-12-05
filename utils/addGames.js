import supabase from "./supabaseclient";

export default async function addGame(name, studio, comments, imageFile, rank) {
  let imageUrl = "";
  if (rank == "") {
    const { data: list, error: fetchError } = await supabase
      .from('video_game_rankings')
      .select('*');
    if (fetchError) {
      console.error('Error fetching tv to update:', fetchError);
      return null;
    }
    rank = list.length + 1;
  }
  if (imageFile) {
    const fileName = `${Date.now()}_${imageFile.name}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('video_games') 
      .upload(fileName, imageFile);

    if (storageError) {
      console.error('Error uploading image:', storageError);
      return null;
    }
    
    imageUrl = supabase.storage.from('video_games').getPublicUrl(fileName).data.publicUrl;
  }
  const { data: gamesToUpdate, error: fetchError } = await supabase
    .from('video_game_rankings')
    .select('*')
    .gte('rank', rank); 

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
  const { data, error } = await supabase
    .from('video_game_rankings')
    .insert([{ name, studio, comments, image: imageUrl, rank}]);
  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }
  return data;
}
