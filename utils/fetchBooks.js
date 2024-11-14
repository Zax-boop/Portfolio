import supabase from "./supabaseclient";  

export default async function fetchBooks() {
  const { data, error } = await supabase
    .from('books_list')
    .select('name, author, comments, image');

  if (error) {
    console.error('Error fetching books:', error);
    return null;
  }

  return data;
}
