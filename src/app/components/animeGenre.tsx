export default function AnimeGenre({ genre }: { genre: string }) {
    const genreColors: { [key: string]: string } = {
        action: "bg-red-600",
        adventure: "bg-orange-500",
        comedy: "bg-yellow-400",
        crime: "bg-gray-700",
        cyberpunk: "bg-blue-900",
        cute: "bg-pink-300",
        dark: "bg-gray-900",
        drama: "bg-rose-700",
        fantasy: "bg-purple-500",
        ghibli: "bg-green-500",
        historical: "bg-yellow-700",
        horror: "bg-gray-800",
        isekai: "bg-blue-500",
        josei: "bg-pink-500",
        magic: "bg-indigo-500",
        mecha: "bg-gray-600",
        military: "bg-green-700",
        music: "bg-teal-400",
        mystery: "bg-blue-700",
        noir: "bg-gray-500",
        philosophical: "bg-indigo-800",
        psychological: "bg-indigo-700",
        racing: "bg-red-800",
        romance: "bg-red-400",
        samurai: "bg-yellow-600",
        school: "bg-yellow-500",
        scifi: "bg-blue-400",
        seinen: "bg-gray-500",
        shoujo: "bg-pink-400",
        shounen: "bg-red-500",
        sliceoflife: "bg-green-400",
        space: "bg-black",
        sports: "bg-orange-600",
        supernatural: "bg-purple-600",
        thriller: "bg-red-800",
        vampire: "bg-indigo-900",
        western: "bg-brown-600",
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
