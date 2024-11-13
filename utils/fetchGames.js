import supabase from "./supabaseclient";  

export default async function fetchGames() {
  const { data, error } = await supabase
    .from('video_game_rankings')
    .select('name, studio, image, comments, rank') 
    .order('rank', { ascending: true }); 

  if (error) {
    console.error('Error fetching albums:', error);
    return null;
  }

  return data;
}
