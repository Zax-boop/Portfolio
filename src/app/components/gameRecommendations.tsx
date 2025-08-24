import React from 'react'
import GenrePieChart from './genrePieChart'
import exp33 from "../../../public/exp33.jpg"
import u4 from "../../../public/u4.webp"
import gow from "../../../public/gow.jpg"
import rdr2 from "../../../public/rdr2.jpg"
import crab from "../../../public/crab.webp"
import er from "../../../public/er.webp"
import sekiroRec from "../../../public/sekiroRec.webp"
import pseudo from "../../../public/pseudo.jpg"
import hk from "../../../public/hk.jpg"
import sols from "../../../public/sols.webp"
import balatro from "../../../public/balatro.png"
import hades from "../../../public/hades.png"
import ror2 from "../../../public/ror2.webp"
import crosscode from "../../../public/crosscode.jpg"
import ff7 from "../../../public/ff7.jpg"
import paper from "../../../public/paper.webp"
import slay from "../../../public/slay.jpg"
import worldless from "../../../public/worldless.jpg"
import neon_white from "../../../public/neon_white.jpg"
import mullet from "../../../public/mullet.jpg"
import doom from "../../../public/doom.jpg"
import mimic from "../../../public/mimic.webp"
import last from "../../../public/last.webp"
import bloodborne from "../../../public/bloodborne.webp"
import cuphead from "../../../public/cuphead.jpeg"
import celeste from "../../../public/celeste.webp"
import ghost from "../../../public/ghost.jpg"
import mc from "../../../public/mc.jpg"
import val from "../../../public/val.jpg"
import overcooked from "../../../public/overcooked.jpg"
import Image from 'next/image';
import GameGenre from './gameGenre'

type Game = {
    name: string;
    studio: string;
    image: string;
    comments: string;
    rank: number;
    genres: string[];
    id: string;
};
export default function GameRecommendations({ games, recSelect }: { games?: Game[], recSelect: (name: string) => void }) {
    const actionAdventure = [
        {
            name: "Uncharted 4: A Thief's End",
            color: "bg-orange-900",
            image: u4,
            description: `For a casual experience, I recommend the third-person shooter 
    <span class="font-bold">Uncharted 4: A Thief's End</span>. 
    A cinematic action-adventure that’s easy to pick up and incredibly engaging. 
    Explore stunning environments, solve light puzzles, and enjoy thrilling set pieces without steep difficulty.`,
            recs: ["The Last of Us", "The Last of Us 2", "Jak II", "Jak III"]
        },
        {
            name: "God of War",
            color: "bg-blue-950",
            image: gow,
            description: `For an action-oriented experience, I recommend 
    <span class="font-bold">God of War (2018)</span>. 
    A thrilling action-adventure leaning heavily into intense, satisfying combat with epic visuals and Norse-inspired worlds. 
    You follow Kratos and his son Atreus on a deeply emotional journey filled with challenging battles and rich storytelling.`,
            recs: ["God of War Ragnarök", "Dark Souls 3",]
        },
        {
            name: "Red Dead Redemption II",
            color: "bg-red-950",
            image: rdr2,
            description: `For an immersive experience, I recommend 
    <span class="font-bold">Red Dead Redemption 2</span>. 
    A sprawling open-world adventure with rich storytelling, shootouts, and atmospheric exploration. 
    Regarded as one of the best games ever made, it offers a deep narrative and a living world to get lost in. 
    You play as Arthur Morgan, an outlaw navigating the decline of the Wild West, struggling with loyalty, survival, and morality.`,
            recs: ["Horizon Zero Dawn", "Ghost of Tsushima"]
        }
    ];
    const soulsLikes = [
        {
            name: "Another Crab's Treasure",
            color: "bg-gray-900",
            image: crab,
            reverse: false,
            description: (
                <>
                    For a casual experience, I recommend{" "}
                    <span className="font-bold">Another Crab's Treasure</span>. A charming
                    soulslike with an adorable crab protagonist and a vibrant underwater
                    world, it balances accessibility with challenge. Its lighthearted tone
                    makes it a perfect entry point into the genre. The music is also
                    fantastic with a jazzy, bossa nova style that fits the underwater theme
                    perfectly. <span className="italic">"The Lower Crust"</span> is a
                    personal favorite.
                </>
            ),
            recs: ["Bloodborne", "Hollow Knight"]
        },
        {
            name: "Elden Ring",
            color: "bg-green-950",
            image: er,
            reverse: true,
            description: (
                <>
                    For an intro into FromSoftware's games,{" "}
                    <span className="font-bold">Elden Ring</span> is ideal. It merges
                    open-world exploration with the studio’s signature challenge, while
                    weaving in rich lore and stunning landscapes. A must-play for both
                    curious newcomers and seasoned fans. The main wall stopping people from
                    playing souls games I noticed is the difficulty spike. People often have
                    described these games as "banging your head against a wall". Elden Ring
                    is great because it gives you the freedom to explore and level up
                    elsewhere if you get stuck on a boss, giving a shift in the mentality of
                    "I have to beat this boss" to "I can come back later when I'm stronger".
                </>
            ),
            recs: ["Dark Souls 1 Remastered", "Dark Souls 3", "Elden Ring Nightreign"]
        },
        {
            name: "Sekiro: Shadows Die Twice",
            color: "bg-pink-950",
            image: sekiroRec,
            reverse: false,
            description: (
                <>
                    For a challenging experience,{" "}
                    <span className="font-bold">Sekiro: Shadows Die Twice</span> offers
                    unmatched precision combat. If Elden Ring's mentality is "explore and
                    conquer", Sekiro is "master the combat and conquer". The combat is very
                    precise and unforgiving, but once you get the hang of it, it's
                    incredibly satisfying. Also, the only way to level up your character's
                    attack and health is by defeating bosses, so you really have to master
                    the combat to progress. This ideology is what makes Sekiro my favorite
                    game.
                </>
            ),
            recs: ["Nine Sols", "Lies of P", "Kannagi Usagi"]
        },
    ];
    const metroidvanias = [
        {
            name: "Pseudoregalia",
            color: "bg-white/5",
            image: pseudo,
            description: (
                <>
                    For a casual experience, I recommend{" "}
                    <span className="font-bold">Pseudoregalia</span>. A charming metroidvania
                    with an adorable protagonist and vibrant world, its accessible gameplay
                    makes it a great entry point into the genre. The music is also fantastic
                    with a chill electric style. Metroidvania's are normally 2D games, but
                    Pseudoregalia is a 3D metroidvania which is pretty unique. There are also
                    not many enemies in the game, making it more about exploration and
                    platforming.
                </>
            ),
            recs: ["Gris", "Celeste", "Katana Zero", "Ghostrunner", "Worldless"],
        },
        {
            name: "Hollow Knight",
            color: "bg-indigo-950",
            image: hk,
            description: (
                <>
                    For an intro into Metroidvania games,{" "}
                    <span className="font-bold">Hollow Knight</span> blends hand-drawn art
                    with challenging gameplay. Its rich lore, stunning visuals, and
                    intricate level design make it essential for newcomers and veterans
                    alike.
                </>
            ),
            recs: ["Blasphemous", "Blasphemous 2", "9 Years of Shadows", "Voidwrought", "Another Crab's Treasure"],
        },
        {
            name: "Nine Sols",
            color: "bg-red-900",
            image: sols,
            description: (
                <>
                    For a challenging experience,{" "}
                    <span className="font-bold">Nine Sols</span> combines action and
                    platforming with precise controls and intricate design. Its beautiful
                    visuals and engaging gameplay make it a standout title. It also follows
                    Sekiro's parry-focused combat system, so if you like that, you'll love
                    Nine Sols. The bosses are incredible as well, many of which I replay
                    often.
                </>
            ),
            recs: ["Sekiro: Shadows Die Twice"],
        },
    ];

    const roguelikes = [
        {
            name: "Balatro",
            image: balatro,
            description: (
                <>
                    For a casual experience, <span className="font-bold">Balatro</span>{" "}
                    offers a charming roguelike twist with accessible gameplay and a
                    lighthearted tone. Its a poker-themed roguelike where you play as a
                    jester navigating a whimsical world, making it a perfect entry point into
                    the genre. The art style is also fantastic, with a hand-drawn aesthetic
                    that adds to the game's charm. Also, the soundtrack is incredible, with a
                    jazzy, carnival-inspired style that fits the game's theme perfectly.
                </>
            ),
            recs: ["Slay the Spire"],
        },
        {
            name: "Hades",
            image: hades,
            description: (
                <>
                    <span className="font-bold">Hades</span> blends fast-paced action with a
                    rich narrative, stunning visuals, and deep lore — a must-play for
                    roguelike fans. Hades is my number one recommendation for video games in
                    general. The combat is fast-paced and satisfying, the story is engaging
                    and well-written, and the characters are memorable and lovable. The game
                    also has a fantastic soundtrack that perfectly complements the action. If
                    you haven't played Hades yet, I highly recommend it. The chamber system
                    is the best form of roguelike build crafting in my opinion. If you like
                    this game you must play the sequel Hades 2 after.
                </>
            ),
            recs: ["Hades II", "Astral Ascent", "Wizard of Legend", "BlazBlue Entropy Effect", "Kill Knight", "Sworn", "Ravenswatch", "Oblivion Override", "Dead Cells"],
        },
        {
            name: "Risk of Rain 2",
            image: ror2,
            description: (
                <>
                    <span className="font-bold">Risk of Rain 2</span> is another personal
                    favorite of mine. It combines third-person shooting with roguelike
                    elements, creating a unique and thrilling experience. The game features a
                    variety of characters, each with their own unique abilities and
                    playstyles, and the procedurally generated levels ensure that no two runs
                    are the same. The game also has my favorite soundtrack of any game, with
                    a mix of electronic and rock music that perfectly complements the action.
                    The artist Chris Christodoulou is a genius and I highly recommend
                    checking out his other works. Risk of Rain 2 also offers co-op
                    multiplayer, allowing you to team up with friends for even more fun.
                </>
            ),
            recs: ["Risk of Rain Returns", "Enter the Gungeon"],
        },
    ];
    const rpgs = [
        {
            name: "Clair Obscur: Expedition 33",
            color: "bg-gray-300",
            image: exp33,
            alt: "Clair Obscur: Expedition 33",
            description:
                "A story-driven RPG with painterly visuals and an atmospheric soundtrack. Taking place in a French-inspired world, the game follows a group of explorers as they uncover the mysteries of their world outside the island that they inhabit. Clair Obscur was created by a small studio comprised of a few people who used to work at Ubisoft. They were unsatisfied with the games they were creating and wanted to make something truly special. The game is truly a modern classic with its incredible story, production, and parry-focused, turn-based gameplay.",
            recs: ["Paper Mario: The Thousand-Year Door", "Pokémon XD: Gale of Darkness", "Worldless"],
        },
        {
            name: "Crosscode",
            color: "bg-blue-200",
            image: crosscode,
            alt: "Crosscode",
            description:
                "A modern pixel-art RPG that mixes action combat with puzzle-filled exploration. Its world is vibrant, charming, and approachable, making it an easy pick for newcomers. You play as Lea, a mute girl who becomes embroiled in a mysterious adventure. The game features a unique combat system that combines real-time action with RPG elements, allowing for a dynamic and engaging experience. One of the most emotional games I've ever played.",
            recs: ["Terraria", "Hades", "Hades II"],
        },
        {
            name: "Final Fantasy VII",
            color: "bg-green-200",
            image: ff7,
            alt: "Final Fantasy VII",
            description:
                "Considered one of the greatest games of all time, Final Fantasy VII set the standard for RPGs with its deep narrative, complex characters, and innovative gameplay mechanics. The game's world is vast and immersive, filled with memorable locations and a rich lore that has captivated players for decades. The gameplay is pretty traditional turned-based combat, but the story, message, and characters are what make this game a must-play.",
            recs: ["Final Fantasy X"],
        },
    ];
    const turns = [
        {
            name: "Paper Mario: The Thousand-Year Door",
            color: "bg-red-200",
            image: paper,
            alt: "Paper Mario: The Thousand-Year Door",
            description:
                "A charming RPG that combines traditional turn-based combat with unique paper-themed mechanics. Its witty writing and memorable characters make it a beloved classic in the genre. One of the first games I ever played and still one of my favorites.",
            recs: ["Clair Obscur: Expedition 33"],
        },
        {
            name: "Slay the Spire",
            color: "bg-orange-200",
            image: slay,
            alt: "Slay the Spire",
            description:
                "A modern roguelike deck-building game that combines strategic card play with dungeon crawling. Its challenging gameplay and unique mechanics make it a favorite among the roguelike and strategy communities. I am horrible at it though but still love it.",
            recs: ["Balatro"],
        },
        {
            name: "Worldless",
            color: "bg-blue-200",
            image: worldless,
            alt: "Worldless",
            description:
                "A unique RPG that emphasizes exploration and environmental storytelling. Its hand-drawn art style and atmospheric world create a captivating experience for players. Honestly, I spent most of my time getting lost in the world's beauty even though the gameplay was amazing. The battle system is very unique in a sense that you have to string together combos to do more damage in your turn and parry enemy attacks during their turn.",
            recs: ["Clair Obscur: Expedition 33", "Gris"],
        },
    ];

    return (
        <div className='flex flex-col xs:w-[95%] sm:w-4/5 xs:mt-2 sm:mt-2'>
            <div className='flex flex-col'>
                <h1 className='text-3xl font-bold'>New to Games?</h1>
                <p className='text-lg'>Choosing a genre is an important first step. Here are some I've played:</p>
                <GenrePieChart games={games} excludedGenres={["Top Down", "Sci-Fi", "Pixel Art", "Co-Op", "Boss Rush", "Rhythm", "Card", "Stealth", "Point and Click", "Tac Shooter", "Simulation", "Beat Em Up", "Dungeon Crawler", "Indie", "Sports"]} genreMap={{
                    "Action": "Action-Adventure",
                    "Adventure": "Action-Adventure",
                    "Soulsborne": "Soulsborne/Soulslike",
                    "Soulslike": "Soulsborne/Soulslike",
                    "Platform Fighter": "Fighting",
                    "FPS": "Shooter",
                    "Tac Shooter": "Shooter",
                    "Third Person Shooter": "Shooter",
                    "Boomer Shooter": "Shooter",
                    "Co-Op": "Multiplayer",
                    "Party": "Multiplayer",
                    "JRPG": "RPG",
                    "Strategy": "Turn-Based"
                }} />
                <h2 className='text-2xl font-bold'>Action-Adventure:</h2>
                <p className='text-lg'>A blend of action and adventure elements, often featuring exploration and puzzle-solving. Definitely the most common genre. If you're looking for a game that offers both excitement and narrative depth, this is the genre for you.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                    {actionAdventure.map((game) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={game.name}
                                className={`${game.color} rounded-2xl shadow-lg overflow-hidden flex flex-col`}
                            >
                                <Image
                                    src={game.image}
                                    alt={game.name}
                                    className="w-full aspect-[16/9] object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-2xl font-bold mb-3 text-gray-100">{game.name}</h2>
                                    <p
                                        className="text-lg"
                                        dangerouslySetInnerHTML={{ __html: game.description }}
                                    />
                                    <div className="flex flex-row flex-wrap gap-2 my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <p className="text-xl text-white mt-2 font-medium">If you like this game:</p>
                                    <div className="flex flex-row gap-2 mt-2">
                                        {game.recs.map((recGame) => (
                                            <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 className='text-2xl font-bold'>Soulsborne/Soulslikes:</h2>
                <p className='text-lg'>Known for their challenging combat and intricate world design, these games offer a rewarding experience for those who enjoy overcoming tough obstacles. If you're looking for a game that tests your skills and patience while providing a deep sense of accomplishment, this is the genre for you.</p>
                <div className="flex flex-col space-y-8 my-6">
                    {soulsLikes.map((game) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={game.name}
                                className={`${game.color} rounded-2xl shadow-lg p-6 flex flex-col ${game.reverse ? "md:flex-row-reverse" : "md:flex-row"
                                    } items-center md:items-start gap-6`}
                            >
                                <Image
                                    src={game.image}
                                    alt={game.name}
                                    className="w-full md:w-1/2 aspect-[3/2] object-cover rounded-xl"
                                />
                                <div className="md:w-1/2">
                                    <h2 className="text-2xl font-bold mb-3 text-gray-100">{game.name}</h2>
                                    <p className="text-lg text-gray-300 leading-relaxed">
                                        {game.description}
                                    </p>
                                    <div className="flex flex-row flex-wrap gap-2 my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <p className="text-xl text-white mt-2 font-medium">If you like this game:</p>
                                    <div className="flex flex-row gap-2 mt-2">
                                        {game.recs.map((recGame) => (
                                            <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <h2 className='text-2xl font-bold'>Metroidvania:</h2>
                <p className='text-lg'>A subgenre of action-adventure games that emphasizes exploration and platforming, often featuring interconnected worlds and power-ups. If you're looking for a game that combines exploration with action and puzzle-solving, this is the genre for you.</p>
                <div className="flex flex-col space-y-6 my-6">
                    {metroidvanias.map((game) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={game.name}
                                className={`flex flex-col md:flex-row ${game.color} rounded-2xl shadow-lg overflow-hidden`}
                            >
                                <Image
                                    src={game.image}
                                    alt={game.name}
                                    className="w-full md:w-1/3 object-cover aspect-[3/2]"
                                />
                                <div className="p-4 flex flex-col justify-center md:w-2/3">
                                    <h2 className="text-xl font-bold mb-2 text-gray-100">{game.name}</h2>
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        {game.description}
                                    </p>
                                    <div className="flex flex-row flex-wrap gap-2 my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <p className="text-xl text-white mt-2 font-medium">If you like this game:</p>
                                    <div className="flex flex-row gap-2 mt-2">
                                        {game.recs.map((recGame) => (
                                            <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 className='text-2xl font-bold'>Roguelike:</h2>
                <p className='text-lg'>A subgenre of role-playing video games characterized by randomly generated levels, turn-based gameplay, and permanent death of the player character. If you're looking for a game that offers high replayability and challenging gameplay, this is the genre for you.</p>
                <div className="grid md:grid-cols-1 gap-6 my-6">
                    {roguelikes.map((game) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={game.name}
                                className="relative rounded-2xl overflow-hidden shadow-lg group"
                            >
                                <Image
                                    src={game.image}
                                    alt={game.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
                                <div className="absolute bottom-0 p-4 text-white">
                                    <h2 className="text-lg font-bold">{game.name}</h2>
                                    <p className="text-sm mt-1 leading-relaxed">{game.description}</p>
                                    <div className="flex flex-row flex-wrap gap-2 my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <p className="text-xl text-white mt-2 font-medium">If you like this game:</p>
                                    <div className="flex flex-row gap-2 mt-2">
                                        {game.recs.map((recGame) => (
                                            <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <h2 className='text-2xl font-bold'>RPG:</h2>
                <p className='text-lg'>Role-Playing Games (RPGs) are a genre where players assume the roles of characters in a fictional setting. They often involve character development, narrative choices,  build-crafting, and exploration. If you're looking for a game that offers deep storytelling and character progression, this is the genre for you.</p>
                <div className="grid md:grid-cols-3 gap-6 my-4">
                    {rpgs.map((game, idx) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={game.name}
                                className={`${game.color} rounded-2xl shadow-md overflow-hidden flex flex-col`}
                            >
                                <Image
                                    src={game.image}
                                    alt={game.alt}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-2 text-black/80">
                                        {game.name}
                                    </h3>
                                    <p className="text-sm text-gray-700">{game.description}</p>
                                    <div className="flex flex-row flex-wrap gap-2 my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <p className="text-xl text-black font-medium">If you like this game:</p>
                                    <div className="flex flex-row gap-2 mt-2">
                                        {game.recs.map((recGame) => (
                                            <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 className='text-2xl font-bold'>Turn-Based:</h2>
                <p className='text-lg'>A genre where players take turns making strategic decisions in combat. If you're looking for a game that emphasizes strategy and tactical thinking, this is the genre for you.</p>
                <div className="space-y-6 my-4">
                    {turns.map((game, idx) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={idx}
                                className={`${game.color} rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row`}
                            >
                                <div className="relative w-1/3 aspect-[3/2]">
                                <Image
                                    src={game.image}
                                    alt={game.alt}
                                    className="object-cover w-full h-full"
                                    fill
                                />
                            </div>
                            <div className="p-6 flex flex-col justify-center md:w-2/3">
                                <h3 className="text-2xl font-bold mb-3 text-black/80">{game.name}</h3>
                                <p className="text-base text-gray-700">{game.description}</p>
                                <div className="flex flex-row flex-wrap gap-2 my-2">
                                    {matchedGame?.genres.map((genre, i) => (
                                        <GameGenre key={i} genre={genre} small />
                                    ))}
                                </div>
                                <p className="text-xl text-black font-medium">If you like this game:</p>
                                <div className="flex flex-row gap-2 mt-2">
                                    {game.recs.map((recGame) => (
                                        <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                            <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>

                <h2 className='text-2xl font-bold'>Shooter:</h2>
                <div className="space-y-6 my-4">
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden relative h-72 flex">
                        <div className="absolute inset-0">
                            <Image
                                src={neon_white}
                                alt="Neon White"
                                className="object-cover w-full h-full"
                                fill
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                        </div>
                        <div className="relative z-10 flex flex-col justify-center p-8 text-white max-w-md">
                            <h3 className="text-3xl font-bold mb-3">Neon White</h3>
                            <p className="text-base">
                                A fast-paced first-person shooter that combines parkour mechanics with card-based abilities.
                                Its unique gameplay loop and stylish visuals make it a standout title in the genre.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden relative h-72 flex">
                        <div className="absolute inset-0">
                            <Image
                                src={mullet}
                                alt="Mullet Madjack"
                                className="object-cover w-full h-full"
                                fill
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                        </div>
                        <div className="relative z-10 flex flex-col justify-center p-8 text-white max-w-md">
                            <h3 className="text-3xl font-bold mb-3">Mullet Madjack</h3>
                            <p className="text-base">
                                A modern roguelike deck-building game that combines strategic card play with dungeon crawling.
                                Its challenging gameplay and unique mechanics make it a favorite among strategy enthusiasts.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden relative h-72 flex">
                        <div className="absolute inset-0">
                            <Image
                                src={doom}
                                alt="Doom Eternal"
                                className="object-cover w-full h-full"
                                fill
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                        </div>
                        <div className="relative z-10 flex flex-col justify-center p-8 text-white max-w-md">
                            <h3 className="text-3xl font-bold mb-3">Doom Eternal</h3>
                            <p className="text-base">
                                A fast-paced first-person shooter that emphasizes movement and combat.
                                Its brutal gameplay and stunning visuals make it a must-play for fans of the genre.
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className='text-2xl font-bold'>Horror:</h2>
                <div className="flex flex-col gap-8 my-8">
                    {/* The Mimic */}
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="relative h-96 w-full">
                            <Image
                                src={mimic}
                                alt="The Mimic"
                                className="object-cover w-full h-full"
                                fill
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-black/50 p-6 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-2 text-white">The Mimic</h3>
                            <p className="text-base text-gray-100">
                                A fast-paced first-person shooter that combines parkour mechanics with card-based abilities. Its unique gameplay loop and stylish visuals make it a standout title in the genre.
                            </p>
                        </div>
                    </div>

                    {/* The Last of Us */}
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="relative h-96 w-full">
                            <Image
                                src={last}
                                alt="The Last of Us"
                                className="object-cover w-full h-full"
                                fill
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-black/50 p-6 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-2 text-white">The Last of Us</h3>
                            <p className="text-base text-gray-100">
                                A modern roguelike deck-building game that combines strategic card play with dungeon crawling. Its challenging gameplay and unique mechanics make it a favorite among strategy enthusiasts.
                            </p>
                        </div>
                    </div>

                    {/* Bloodborne */}
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="relative h-96 w-full">
                            <Image
                                src={bloodborne}
                                alt="Bloodborne"
                                className="object-cover w-full h-full"
                                fill
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-black/50 p-6 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-2 text-white">Bloodborne</h3>
                            <p className="text-base text-gray-100">
                                A fast-paced action RPG that emphasizes movement and combat. Its brutal gameplay and stunning visuals make it a must-play for fans of the genre.
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className='text-2xl font-bold'>Platformer:</h2>
                <div className="flex flex-col space-y-8 my-6">
                    <div className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                        <Image
                            src={cuphead}
                            alt="Cuphead"
                            className="w-full md:w-1/2 aspect-[3/2] object-cover rounded-xl"
                        />
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold mb-3 text-yellow-300">Cuphead</h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                For a casual experience, I recommend <span className="font-bold">Cuphead</span>.
                                A charming soulslike with an adorable cup protagonist and a vibrant cartoon world, it balances
                                accessibility with challenge. Its lighthearted tone makes it a perfect entry point into the genre.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row-reverse items-center md:items-start gap-6">
                        <Image
                            src={celeste}
                            alt="Celeste"
                            className="w-full md:w-1/2 aspect-[3/2] object-cover rounded-xl"
                        />
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold mb-3 text-orange-400">Celeste</h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                For an intro into FromSoftware's games, <span className="font-bold">Elden Ring</span> is ideal.
                                It merges open-world exploration with the studio’s signature challenge, while weaving in rich lore
                                and stunning landscapes. A must-play for both curious newcomers and seasoned fans.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                        <Image
                            src={ghost}
                            alt="Ghostrunner"
                            className="w-full md:w-1/2 aspect-[3/2] object-cover rounded-xl"
                        />
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold mb-3 text-red-400">Ghostrunner</h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                For a challenging experience, <span className="font-bold">Ghostrunner </span>
                                offers unmatched precision combat. Its rewarding systems encourage mastery,
                                while its breathtaking world and layered storytelling make it unforgettable.
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className='text-2xl font-bold'>Multiplayer:</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
                    <div className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                        <div className="relative h-56 w-full">
                            <Image
                                src={mc}
                                alt="Minecraft"
                                className="object-cover w-full h-full"
                                fill
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h2 className="text-2xl font-bold mb-3 text-green-400">Minecraft</h2>
                            <p className="text-base text-gray-300 flex-1 leading-relaxed">
                                For a casual experience, <span className="font-bold">Minecraft</span> offers
                                a charming sandbox with endless creativity. Its balance of freedom and challenge
                                makes it a perfect entry point into the genre.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                        <div className="relative h-56 w-full">
                            <Image
                                src={val}
                                alt="Valorant"
                                className="object-cover w-full h-full"
                                fill
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h2 className="text-2xl font-bold mb-3 text-pink-400">Valorant</h2>
                            <p className="text-base text-gray-300 flex-1 leading-relaxed">
                                <span className="font-bold">Valorant</span> combines precise gunplay with unique agent abilities.
                                A tactical shooter that emphasizes teamwork, strategy, and clutch moments.
                            </p>
                        </div>
                    </div>

                    {/* Overcooked 2 */}
                    <div className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                        <div className="relative h-56 w-full">
                            <Image
                                src={overcooked}
                                alt="Overcooked 2"
                                className="object-cover w-full h-full"
                                fill
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h2 className="text-2xl font-bold mb-3 text-yellow-400">Overcooked 2</h2>
                            <p className="text-base text-gray-300 flex-1 leading-relaxed">
                                <span className="font-bold">Overcooked 2</span> delivers chaotic and hilarious co-op action.
                                Its kitchens demand coordination and quick thinking, rewarding true teamwork.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
