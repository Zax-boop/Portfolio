import supabase from "./supabaseclient";  

export default async function fetchAlbums() {
  const { data, error } = await supabase
    .from('album_rankings')
    .select('name, artist, comment, image') 
    .order('id', { ascending: true }); 

  if (error) {
    console.error('Error fetching albums:', error);
    return null;
  }

  return data;
}
