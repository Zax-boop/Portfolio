import supabase from "../general/supabaseclient";  

export default async function fetchTV() {
  const { data, error } = await supabase
    .from('tv_rankings')
    .select('name, director, comments, image, rank, genres, id') 
    .order('rank', { ascending: true }); 

  if (error) {
    console.error('Error fetching tv shows:', error);
    return null;
  }

  return data;
}
