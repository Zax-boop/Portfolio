import supabase from "../general/supabaseclient";

export default async function deleteMovie(movieId) {
  try {
    const { data: deletedMovie, error: deleteError } = await supabase
      .from('movies_list')
      .delete()
      .eq('id', movieId);

    if (deleteError) {
      console.error('Error deleting movie:', deleteError);
      return null;
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}
