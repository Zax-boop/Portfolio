import supabase from "../general/supabaseclient";  

export default async function fetchBooks() {
  const { data, error } = await supabase
    .from('books_list')
    .select('name, author, comments, image, genres, id')

  if (error) {
    console.error('Error fetching books:', error);
    return null;
  }

  return data.sort((a, b) => b.comments.length - a.comments.length);
}
