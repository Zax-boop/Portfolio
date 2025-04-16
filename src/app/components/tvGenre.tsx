export default function TVGenre({ genre }: { genre: string }) {
    const genreColors: { [key: string]: string } = {
        action: "bg-orange-700",
        adventure: "bg-orange-500",
        animated: "bg-blue-400",
        comedy: "bg-yellow-400",
        crime: "bg-gray-800",
        cyberpunk: "bg-blue-900",
        dark: "bg-gray-900",
        documentary: "bg-blue-300",
        drama: "bg-red-300",
        fantasy: "bg-purple-500",
        historical: "bg-yellow-700",
        horror: "bg-gray-800",
        mystery: "bg-blue-700",
        political: "bg-red-800",
        psychological: "bg-indigo-600",
        romance: "bg-red-400",
        scifi: "bg-blue-600",
        sitcom: "bg-yellow-500",
        sliceoflife: "bg-green-400",
        thriller: "bg-red-900",
        western: "bg-amber-600"
    };

    const formattedGenre = genre.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/&/g, 'and')
        .replace(/-/g, '');
    const bgColor = genreColors[formattedGenre] || "bg-gray-300";

    return (
        <div className={`xs:px-1 sm:px-4 xs:py-1 sm:py-2 xs:rounded-md sm:rounded-lg text-white xs:font-medium sm:font-bold xs:text-[0.5rem] sm:text-base ${bgColor} transform transition-transform duration-200 hover:scale-105 cursor-pointer`}>
            {genre}
        </div>
    );
}