export default function MusicGenre({ genre, bad }: { genre: string, bad?: boolean }) {
    const genreColors: { [key: string]: string } = {
        ambient: "bg-blue-300",
        alternative: "bg-teal-600",
        bossanova: "bg-emerald-500",
        brazilianpop: "bg-emerald-400",
        breakcore: "bg-rose-600",
        bubblegum: "bg-pink-300",
        classical: "bg-purple-700",
        citypop: "bg-purple-400",
        club: "bg-fuchsia-600",
        country: "bg-yellow-600",
        cpop: "bg-red-600",
        dance: "bg-rose-500",
        dreampop: "bg-pink-500",
        electronic: "bg-purple-500",
        experimental: "bg-amber-600",
        flamenco: "bg-red-500",
        folk: "bg-green-700",
        french: "bg-blue-600",
        funk: "bg-yellow-700",
        grunge: "bg-gray-600",
        hiphop: "bg-indigo-500",
        house: "bg-pink-600",
        indierock: "bg-red-500",
        indiepop: "bg-red-400",
        italian: "bg-green-500",
        japanese: "bg-blue-400",
        jazz: "bg-blue-700",
        jpop: "bg-blue-400",
        jrock: "bg-gray-700",
        korean: "bg-green-400",
        kpop: "bg-rose-500",
        latin: "bg-yellow-400",
        lofi: "bg-sky-400",
        metal: "bg-black",
        polish: "bg-yellow-500",
        pop: "bg-blue-500",
        psychedelic: "bg-green-600",
        punk: "bg-red-700",
        rap: "bg-gray-800",
        randb: "bg-orange-500",
        rock: "bg-gray-500",
        sailorwave: "bg-pink-200",
        shoegaze: "bg-indigo-400",
        soul: "bg-orange-700",
        spanish: "bg-red-400",
        synth: "bg-pink-800",
        triphop: "bg-indigo-600",
        videogame: "bg-purple-600",
    };

    const formattedGenre = genre.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/&/g, 'and')
        .replace(/-/g, '');
    const bgColor = genreColors[formattedGenre] || "bg-gray-300";
    return (
        <div className={`xs:px-1 sm:px-4 xs:py-1 sm:py-2 xs:rounded-md sm:rounded-lg text-white xs:font-medium sm:font-bold xs:text-[0.5rem] sm:text-base ${bgColor} transform transition-transform duration-200 hover:scale-105 cursor-pointer`}>
            {bad ? `bad` : genre}
        </div>
    );
}  