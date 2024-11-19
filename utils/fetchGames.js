import supabase from "./supabaseclient";  

export default async function fetchGames() {
  const { data, error } = await supabase
    .from('video_game_rankings')
    .select('name, studio, image, comments, rank, id') 
    .order('rank', { ascending: true }); 

  if (error) {
    console.error('Error fetching games:', error);
    return null;
  }

  return data;
}
