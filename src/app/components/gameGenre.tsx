export default function GameGenre({ genre }: { genre: string }) {
    const genreColors: { [key: string]: string } = {
        action: "bg-red-700",
        adventure: "bg-orange-500",
        arcade: "bg-pink-600",
        battle: "bg-red-800",
        beatemup: "bg-yellow-700",
        boomershooter: "bg-red-900",
        card: "bg-amber-500",
        citybuilder: "bg-green-600",
        coop: "bg-blue-600",
        crafting: "bg-lime-500",
        detective: "bg-gray-700",
        dungeoncrawler: "bg-purple-900",
        educational: "bg-indigo-400",
        farming: "bg-green-500",
        fighting: "bg-red-600",
        fps: "bg-gray-800",
        horror: "bg-black",
        jrpg: "bg-pink-700",
        metroidvania: "bg-purple-700",
        mmorpg: "bg-blue-900",
        music: "bg-yellow-500",
        openworld: "bg-green-700",
        party: "bg-teal-500",
        platformer: "bg-orange-600",
        pointandclick: "bg-teal-400",
        postapocalyptic: "bg-gray-900",
        puzzle: "bg-blue-400",
        racing: "bg-orange-400",
        rhythm: "bg-pink-500",
        roguelike: "bg-gray-600",
        rpg: "bg-purple-500",
        sandbox: "bg-yellow-600",
        scifi: "bg-blue-600",
        simulation: "bg-green-400",
        soulsborne: "bg-gray-500",
        soulslike: "bg-gray-700",
        sports: "bg-emerald-600",
        stealth: "bg-zinc-800",
        strategy: "bg-indigo-700",
        survival: "bg-amber-700",
        tacshooter: "bg-cyan-700",
        thirdpersonshooter: "bg-slate-800",
        towerdefense: "bg-cyan-500",
        turnbased: "bg-sky-600",
        visualnovel: "bg-rose-500",
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
