type MovieType = {
  name: string;
  director: string;
  comments: string;
  image: string;
  genres: string[];
  id: string;
};

import supabase from "../general/supabaseclient";

export default async function fetchMovies(): Promise<MovieType[]> {
  const top10Ids = [
    5, 6, 7, 8, 9,
    10, 25, 12, 13, 22
  ];
  const { data, error } = await supabase
    .from('movies_list')
    .select('name, director, comments, image, genres, id');

  if (error || !data) {
    console.error('Error fetching movies:', error);
    return [];
  }

  const movieMap = new Map(data.map(movie => [movie.id, movie]));

  function isMovie(obj: any): obj is MovieType {
    return obj !== undefined;
  }

  const first10 = top10Ids.map(id => movieMap.get(id)).filter(isMovie);

  const remaining = data
    .filter(movie => !top10Ids.includes(movie.id))
    .sort((a, b) => b.comments.length - a.comments.length);

  return [...first10];
}
