export default function BookGenre({ genre }: { genre: string }) {
    const genreColors: { [key: string]: string } = {
        absurdist: "bg-purple-700",
        action: "bg-orange-700",
        adventure: "bg-orange-500",
        afghanistan: "bg-red-600",
        autobiography: "bg-teal-600",
        biography: "bg-blue-500",
        classic: "bg-gray-600",
        comic: "bg-orange-400",
        crime: "bg-gray-800",
        cyberpunk: "bg-blue-900",
        dark: "bg-gray-900",
        drama: "bg-red-300",
        dystopian: "bg-red-700",
        existentialist: "bg-indigo-700",
        fantasy: "bg-purple-500",
        firstperson: "bg-yellow-500",
        fiction: "bg-green-600",
        french: "bg-blue-300",
        gothic: "bg-black",
        historical: "bg-yellow-700",
        horror: "bg-gray-800",
        japanese: "bg-red-500",
        manga: "bg-fuchsia-600",
        memoir: "bg-teal-400",
        mystery: "bg-blue-700",
        mythology: "bg-yellow-600",
        nonfiction: "bg-blue-400",
        philosophical: "bg-indigo-800",
        poetry: "bg-fuchsia-500",
        political: "bg-red-800",
        postmodern: "bg-gray-700",
        psychological: "bg-indigo-600",
        realist: "bg-green-600",
        roman: "bg-amber-700",
        romance: "bg-red-400",
        sciencefiction: "bg-blue-600",
        selfhelp: "bg-green-500",
        shortstories: "bg-purple-600",
        sliceoflife: "bg-green-400",
        stoicism: "bg-gray-400",
        surrealist: "bg-pink-700",
        teenliterature: "bg-orange-600",
        thirdperson: "bg-gray-500",
        thriller: "bg-red-900",
        war: "bg-red-800",
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