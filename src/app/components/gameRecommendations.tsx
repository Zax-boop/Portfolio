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

type Game = {
    name: string;
    studio: string;
    image: string;
    comments: string;
    rank: number;
    genres: string[];
    id: string;
};
export default function GameRecommendations({ games }: { games?: Game[] }) {
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
                    <div className="bg-orange-900 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                        <Image src={u4} alt="Uncharted 4: A Thief's End" className="w-full aspect-[16/9] object-cover" />
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-3 text-gray-100">Uncharted 4: A Thief's End</h2>
                            <p className="text-lg">
                                For a casual experience, I recommend <span className="font-bold">Uncharted 4: A Thief's End</span>. A cinematic action-adventure that’s easy to pick up and incredibly engaging. Explore stunning environments, solve light puzzles, and enjoy thrilling set pieces without steep difficulty.
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-950 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                        <Image src={gow} alt="God of War" className="w-full aspect-[16/9] object-cover" />
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-3 text-gray-100">God of War (2018)</h2>
                            <p className="text-lg">
                                For an action-oriented experience, I recommend <span className="font-bold">God of War (2018)</span>. A thrilling action-adventure leaning heavily into intense, satisfying combat with epic visuals and Norse-inspired worlds.
                            </p>
                        </div>
                    </div>

                    <div className="bg-red-950 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                        <Image src={rdr2} alt="Red Dead Redemption 2" className="w-full aspect-[16/9] object-cover" />
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-3 text-gray-100">Red Dead Redemption 2</h2>
                            <p className="text-lg">
                                For an immersive experience, I recommend <span className="font-bold">Red Dead Redemption 2</span>. A sprawling open-world adventure with rich storytelling, shootouts, and atmospheric exploration.
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className='text-2xl font-bold'>Soulsborne/Soulslikes:</h2>
                <p className='text-lg'>Known for their challenging combat and intricate world design, these games offer a rewarding experience for those who enjoy overcoming tough obstacles. If you're looking for a game that tests your skills and patience while providing a deep sense of accomplishment, this is the genre for you.</p>
                <div className="flex flex-col space-y-8 my-6">
                    <div className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                        <Image
                            src={crab}
                            alt="Another Crab's Treasure"
                            className="w-full md:w-1/2 aspect-[3/2] object-cover rounded-xl"
                        />
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold mb-3 text-gray-100">Another Crab's Treasure</h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                For a casual experience, I recommend <span className="font-bold">Another Crab's Treasure</span>.
                                A charming soulslike with an adorable crab protagonist and a vibrant underwater world, it balances
                                accessibility with challenge. Its lighthearted tone makes it a perfect entry point into the genre.
                            </p>
                        </div>
                    </div>
                    <div className="bg-green-950 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row-reverse items-center md:items-start gap-6">
                        <Image
                            src={er}
                            alt="Elden Ring"
                            className="w-full md:w-1/2 aspect-[3/2] object-cover rounded-xl"
                        />
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold mb-3 text-gray-100">Elden Ring</h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                For an intro into FromSoftware's games, <span className="font-bold">Elden Ring</span> is ideal.
                                It merges open-world exploration with the studio’s signature challenge, while weaving in rich lore
                                and stunning landscapes. A must-play for both curious newcomers and seasoned fans.
                            </p>
                        </div>
                    </div>
                    <div className="bg-pink-950 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                        <Image
                            src={sekiroRec}
                            alt="Sekiro: Shadows Die Twice"
                            className="w-full md:w-1/2 aspect-[3/2] object-cover rounded-xl"
                        />
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold mb-3 text-gray-100">Sekiro: Shadows Die Twice</h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                For a challenging experience, <span className="font-bold">Sekiro: Shadows Die Twice</span>
                                offers unmatched precision combat. Its rewarding systems encourage mastery,
                                while its breathtaking world and layered storytelling make it unforgettable.
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className='text-2xl font-bold'>Metroidvania:</h2>
                <p className='text-lg'>A subgenre of action-adventure games that emphasizes exploration and platforming, often featuring interconnected worlds and power-ups. If you're looking for a game that combines exploration with action and puzzle-solving, this is the genre for you.</p>
                <div className="flex flex-col space-y-6 my-6">
                    <div className="flex flex-col md:flex-row bg-white/5 rounded-2xl shadow-lg overflow-hidden">
                        <Image
                            src={pseudo}
                            alt="Pseudoregalia"
                            className="w-full md:w-1/3 object-cover aspect-[3/2]"
                        />
                        <div className="p-4 flex flex-col justify-center md:w-2/3">
                            <h2 className="text-xl font-bold mb-2 text-gray-100">Pseudoregalia</h2>
                            <p className="text-gray-300 text-base leading-relaxed">
                                For a casual experience, I recommend <span className="font-bold">Pseudoregalia</span>.
                                A charming metroidvania with an adorable protagonist and vibrant world,
                                its accessible gameplay makes it a great entry point into the genre.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row bg-indigo-950 rounded-2xl shadow-lg overflow-hidden">
                        <Image
                            src={hk}
                            alt="Hollow Knight"
                            className="w-full md:w-1/3 object-cover aspect-[3/2]"
                        />
                        <div className="p-4 flex flex-col justify-center md:w-2/3">
                            <h2 className="text-xl font-bold mb-2 text-gray-100">Hollow Knight</h2>
                            <p className="text-gray-300 text-base leading-relaxed">
                                For an intro into Metroidvania games, <span className="font-bold">Hollow Knight</span>
                                blends hand-drawn art with challenging gameplay. Its rich lore, stunning visuals,
                                and intricate level design make it essential for newcomers and veterans alike.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row bg-red-900 rounded-2xl shadow-lg overflow-hidden">
                        <Image
                            src={sols}
                            alt="Nine Sols"
                            className="w-full md:w-1/3 object-cover aspect-[3/2]"
                        />
                        <div className="p-4 flex flex-col justify-center md:w-2/3">
                            <h2 className="text-xl font-bold mb-2 text-gray-100">Nine Sols</h2>
                            <p className="text-gray-300 text-base leading-relaxed">
                                For a challenging experience, <span className="font-bold">Nine Sols</span>
                                combines action and platforming with precise controls and intricate design.
                                Its beautiful visuals and engaging gameplay make it a standout title.
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className='text-2xl font-bold'>Roguelike:</h2>
                <p className='text-lg'>A subgenre of role-playing video games characterized by randomly generated levels, turn-based gameplay, and permanent death of the player character. If you're looking for a game that offers high replayability and challenging gameplay, this is the genre for you.</p>
                <div className="grid md:grid-cols-3 gap-6 my-6">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                        <Image
                            src={balatro}
                            alt="Balatro"
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
                        <div className="absolute bottom-0 p-4 text-white">
                            <h2 className="text-lg font-bold">Balatro</h2>
                            <p className="text-sm mt-1 leading-relaxed">
                                For a casual experience, <span className="font-bold">Balatro</span> offers
                                a charming roguelike twist with accessible gameplay and a lighthearted tone.
                            </p>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                        <Image
                            src={hades}
                            alt="Hades"
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
                        <div className="absolute bottom-0 p-4 text-white">
                            <h2 className="text-lg font-bold">Hades</h2>
                            <p className="text-sm mt-1 leading-relaxed">
                                <span className="font-bold">Hades</span> blends fast-paced action with a rich narrative,
                                stunning visuals, and deep lore — a must-play for roguelike fans.
                            </p>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                        <Image
                            src={ror2}
                            alt="Risk of Rain 2"
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
                        <div className="absolute bottom-0 p-4 text-white">
                            <h2 className="text-lg font-bold">Risk of Rain 2</h2>
                            <p className="text-sm mt-1 leading-relaxed">
                                For a challenge, <span className="font-bold">Risk of Rain 2</span> delivers
                                precise combat, intricate design, and stunning visuals.
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className='text-2xl font-bold'>RPG:</h2>
                <div className="grid md:grid-cols-3 gap-6 my-4">
                    <div className="bg-gray-300 rounded-2xl shadow-md overflow-hidden flex flex-col">
                        <Image src={exp33} alt="Clair Obscur: Expedition 33" className="h-48 w-full object-cover" />
                        <div className="p-4 flex flex-col justify-between flex-grow">
                            <h3 className="text-xl font-bold mb-2 text-black/80">Clair Obscur: Expedition 33</h3>
                            <p className="text-sm text-gray-700">
                                A story-driven RPG with painterly visuals and an atmospheric soundtrack. Blends exploration,
                                light combat, and narrative choices—perfect for players seeking a relaxed, immersive journey.
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-200 rounded-2xl shadow-md overflow-hidden flex flex-col">
                        <Image src={crosscode} alt="Crosscode" className="h-48 w-full object-cover" />
                        <div className="p-4 flex flex-col justify-between flex-grow">
                            <h3 className="text-xl font-bold mb-2 text-black/80">Crosscode</h3>
                            <p className="text-sm text-gray-700">
                                A modern pixel-art RPG that mixes action combat with puzzle-filled exploration.
                                Its world is vibrant, charming, and approachable, making it an easy pick for newcomers.
                            </p>
                        </div>
                    </div>
                    <div className="bg-green-200 rounded-2xl shadow-md overflow-hidden flex flex-col">
                        <Image src={ff7} alt="Final Fantasy VII" className="h-48 w-full object-cover" />
                        <div className="p-4 flex flex-col justify-between flex-grow">
                            <h3 className="text-xl font-bold mb-2 text-black/80">Final Fantasy VII</h3>
                            <p className="text-sm text-gray-700">
                                A legendary RPG with iconic characters and cinematic storytelling. Its blend of
                                adventure, light strategy, and memorable moments makes it an enduring classic for all players.
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className='text-2xl font-bold'>Turn-Based:</h2>
                <div className="space-y-6 my-4">
                    <div className="bg-red-200 rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row h-72">
                        <div className="relative md:w-1/3 h-48 md:h-full">
                            <Image
                                src={paper}
                                alt="Paper Mario: The Thousand Year Door"
                                className="object-cover w-full h-full"
                                fill
                            />
                        </div>
                        <div className="p-6 flex flex-col justify-center md:w-2/3">
                            <h3 className="text-2xl font-bold mb-3 text-black/80">Paper Mario: The Thousand Year Door</h3>
                            <p className="text-base text-gray-700">
                                A charming RPG that combines traditional turn-based combat with unique paper-themed mechanics.
                                Its humor, engaging story, and creative visuals make it a standout title for all ages.
                            </p>
                        </div>
                    </div>
                    <div className="bg-orange-200 rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
                        <Image src={slay} alt="Slay the Spire" className="h-48 md:h-auto md:w-1/3 object-cover" />
                        <div className="p-6 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-3 text-black/80">Slay the Spire</h3>
                            <p className="text-base text-gray-700">
                                A modern roguelike deck-building game that combines strategic card play with dungeon crawling.
                                Its challenging gameplay and unique mechanics make it a favorite among strategy enthusiasts.
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-200 rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
                        <Image src={worldless} alt="Worldless" className="h-48 md:h-auto md:w-1/3 object-cover" />
                        <div className="p-6 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-3 text-black/80">Worldless</h3>
                            <p className="text-base text-gray-700">
                                A unique RPG that emphasizes exploration and environmental storytelling. Its hand-drawn art
                                style and atmospheric world create a captivating experience for players.
                            </p>
                        </div>
                    </div>
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

