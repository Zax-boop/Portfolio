import supabase from "./supabaseclient";

export default async function deleteAlbum(albumId, rank) {
  try {
    const { data: deletedAlbum, error: deleteError } = await supabase
      .from('album_rankings')
      .delete()
      .eq('id', albumId);

    if (deleteError) {
      console.error('Error deleting album:', deleteError);
      return null;
    }
    const { data: albumsToUpdate, error: fetchError } = await supabase
      .from('album_rankings')
      .select('*')
      .gt('Rank', rank);

    if (fetchError) {
      console.error('Error fetching albums to update:', fetchError);
      return null;
    }
    albumsToUpdate.sort((a, b) => a.Rank - b.Rank);
    for (const album of albumsToUpdate) {
      const { error: updateError } = await supabase
        .from('album_rankings')
        .update({ Rank: album.Rank - 1 })
        .eq('id', album.id);

      if (updateError) {
        console.error(`Error updating rank for album ID ${album.id}:`, updateError);
        return null;
      }
    }

    return { deletedAlbum, updatedAlbums: albumsToUpdate };
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}
