import supabase from "../general/supabaseclient";  

export default async function fetchAnime() {
  const { data, error } = await supabase
    .from('anime_rankings')
    .select('name, studio, comments, image, rank, genres, id') 
    .order('rank', { ascending: true }); 

  if (error) {
    console.error('Error fetching anime:', error);
    return null;
  }

  return data;
}
