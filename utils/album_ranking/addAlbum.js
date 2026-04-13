import supabase from "../general/supabaseclient";

export default async function addAlbum(name, artist, comment, imageFile, Rank, date, genres, recommender) {
  // imageFile is either File (user upload) OR undefined (Spotify)
  let imageUrl = "";

  if (imageFile instanceof File) {
    const fileName = `${Date.now()}_${imageFile.name}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('album-images')
      .upload(fileName, imageFile);

    if (storageError) {
      console.error("Error uploading image:", storageError);
      return null;
    }

    imageUrl = supabase.storage
      .from("album-images")
      .getPublicUrl(fileName).data.publicUrl;
  } else if (typeof imageFile === "string") {
    imageUrl = imageFile;
  }

  const { data: albumsToUpdate, error: fetchError } = await supabase
    .from('album_rankings')
    .select('*')
    .gte('Rank', Rank);

  if (fetchError) {
    console.error('Error fetching albums to update:', fetchError);
    return null;
  }
  albumsToUpdate.sort((a, b) => b.Rank - a.Rank)
  for (const album of albumsToUpdate) {
    const { error: updateError } = await supabase
      .from('album_rankings')
      .update({ Rank: album.Rank + 1 })
      .eq('id', album.id);

    if (updateError) {
      console.error(`Error updating rank for album ID ${album.id}:`, updateError);
      return null;
    }
  }
  const { data, error } = await supabase
    .from('album_rankings')
    .insert([{ name, artist, comment, image: imageUrl, Rank, date, genres, recommender }]);

  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }
  return data;
}
