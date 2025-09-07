import supabase from "../general/supabaseclient";

export default async function deleteBook(bookId) {
  try {
    const { data: deletedBook, error: deleteError } = await supabase
      .from('books_list')
      .delete()
      .eq('id', bookId);

    if (deleteError) {
      console.error('Error deleting book:', deleteError);
      return null;
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}
