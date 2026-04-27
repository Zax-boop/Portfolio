interface GenreRow {
  title: string;
  alias: string;
  color: string;
}

export default function MusicGenre({
  genre,
  genreMap,
}: {
  genre: string;
  genreMap: Record<string, GenreRow>;
}) {
  const normalize = (g: string) =>
    g
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z]/g, "");

  const alias = normalize(genre);
  const matched = genreMap[alias];

  const bgColor = matched?.color || "bg-gray-300";
  const display = matched?.title || genre;

  return (
    <div
      className={`xs:px-1 sm:px-4 xs:py-1 sm:py-2 xs:rounded-md sm:rounded-lg text-white xs:font-medium sm:font-bold xs:text-[0.5rem] sm:text-base ${bgColor} transform transition-transform duration-200 hover:scale-105 cursor-pointer`}
    >
      {display}
    </div>
  );
}