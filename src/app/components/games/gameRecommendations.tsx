import React from 'react'
import GenrePieChart from '../general/genrePieChart';
import Image from 'next/image';
import GameGenre from './gameGenre'
import { actionAdventure, soulsLikes, metroidvanias, roguelikes, rpgs, turns, shooters, horrors, platformers, multiplayer } from '../../../../data/gameData';
import { gameGenreColors } from '../../../../data/genreColors';

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
    return (
        <div className='flex flex-col xs:w-[95%] sm:w-4/5 xs:mt-2 sm:mt-2'>
            <div className='flex flex-col'>
                <h1 className='xs:text-xl md:text-3xl font-bold xs:mt-2 sm:mt-0'>New to Games?</h1>
                <p className='xs:text-md md:text-lg'>Choosing a genre is an important first step. Here are some I&apos;ve played:</p>
                <div className='flex flex-row w-full justify-center'>
                    <GenrePieChart genresList={games?.map((game) => game.genres)} excludedGenres={["Top Down", "Sci-Fi", "Pixel Art", "Co-Op", "Boss Rush", "Rhythm", "Card", "Stealth", "Point and Click", "Tac Shooter", "Simulation", "Beat Em Up", "Dungeon Crawler", "Indie", "Sports", "Hack n Slash", "Sandbox", "Fighting", "Racing", "Open World", "Visual Novel", "Puzzle", "Platform Fighter"]} genreMap={{
                        "Action": "Action-Adventure",
                        "Adventure": "Action-Adventure",
                        "Soulsborne": "Soulsborne/Soulslikes",
                        "Soulslike": "Soulsborne/Soulslikes",
                        "FPS": "Shooter",
                        "Tac Shooter": "Shooter",
                        "Third Person Shooter": "Shooter",
                        "Boomer Shooter": "Shooter",
                        "Co-Op": "Multiplayer",
                        "Party": "Multiplayer",
                        "JRPG": "RPG",
                        "Strategy": "Turn-Based"
                    }} genreColors={gameGenreColors}/>
                </div>
                <h2 id="Action-Adventure" className='xs:text-lg md:text-2xl font-bold'>Action-Adventure:</h2>
                <p className='xs:text-md md:text-lg'>A blend of action and adventure elements, often featuring exploration and puzzle-solving. Definitely the most common genre. If you&apos;re looking for a game that offers both excitement and narrative depth, this is the genre for you.</p>
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
                                    className="w-full aspect-[16/9] object-cover transform transition-transform duration-300 hover:scale-105"
                                />
                                <div className="p-4">
                                    <h2 className="xs:text-xl md:text-2xl font-bold xs:mb-1 md:mb-3 text-gray-100">{game.name}</h2>
                                    <p
                                        className="xs:text-md md:text-lg"
                                        dangerouslySetInnerHTML={{ __html: game.description }}
                                    />
                                    <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 xs:mt-2 xs:mb-1 md:my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <div className='flex xs:flex-row md:flex-col gap-1 xs:items-center md:items-start'>
                                        <p className="xs:text-md md:text-xl text-white md:mt-2 font-medium">If you like this game:</p>
                                        <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 md:mt-2">
                                            {game.recs.map((recGame) => (
                                                <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                    <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-md sm:rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 id='Roguelike' className='xs:text-lg md:text-2xl font-bold'>Roguelike:</h2>
                <p className='xs:text-md md:text-lg'>Video games characterized by randomly generated levels and permanent death of the player character. If you&apos;re looking for a game that offers high replayability and challenging gameplay, this is the genre for you.</p>
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
                                    <h2 className="xs:text-sm md:text-lg font-bold">{game.name}</h2>
                                    <p className="xs:text-[0.5rem] md:text-sm mt-1 leading-relaxed">{game.description}</p>
                                    <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <div className='flex xs:flex-row md:flex-col gap-1 xs:items-center md:items-start'>
                                        <p className="xs:text-xs md:text-xl text-white md:mt-2 font-medium">If you like this game:</p>
                                        <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 md:mt-2">
                                            {game.recs.map((recGame) => (
                                                <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                    <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-4 xs:h-4 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 id='RPG' className='xs:text-lg md:text-2xl font-bold'>RPG:</h2>
                <p className='xs:text-md md:text-lg'>Role-Playing Games (RPGs) are a genre where players assume the roles of characters in a fictional setting. They often involve character development, narrative choices,  build-crafting, and exploration. If you&apos;re looking for a game that offers deep storytelling and character progression, this is the genre for you.</p>
                <div className="grid md:grid-cols-3 gap-6 my-4">
                    {rpgs.map((game, idx) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={idx}
                                className={`${game.color} rounded-2xl shadow-md overflow-hidden flex flex-col`}
                            >
                                <Image
                                    src={game.image}
                                    alt={game.alt}
                                    className="h-48 w-full object-cover transform transition-transform duration-300 hover:scale-105"
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="xs:text-xl md:text-2xl font-bold xs:mb-1 md:mb-3 text-black/80">
                                        {game.name}
                                    </h3>
                                    <p className="text-sm font-medium text-gray-700">{game.description}</p>
                                    <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 xs:mt-2 xs:mb-1 md:my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <div className='flex xs:flex-row md:flex-col gap-1 xs:items-center md:items-start'>
                                        <p className="xs:text-md md:text-xl text-black md:mt-2 font-medium">If you like this game:</p>
                                        <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 md:mt-2">
                                            {game.recs.map((recGame) => (
                                                <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                    <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-md sm:rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 id='Soulsborne/Soulslikes' className='xs:text-lg md:text-2xl font-bold'>Soulsborne/Soulslikes:</h2>
                <p className='xs:text-md md:text-lg'>Known for their challenging combat and intricate world design, these games offer a rewarding experience for those who enjoy overcoming tough obstacles. If you&apos;re looking for a game that tests your skills and patience while providing a deep sense of accomplishment, this is the genre for you.</p>
                <div className="flex flex-col space-y-8 my-6">
                    {soulsLikes.map((game) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={game.name}
                                className={`${game.color} rounded-2xl shadow-lg xs:p-3 md:p-6 flex flex-col ${game.reverse ? "md:flex-row-reverse" : "md:flex-row"
                                    } items-center md:items-start xs:gap-4 md:gap-6`}
                            >
                                <Image
                                    src={game.image}
                                    alt={game.name}
                                    className="w-full md:w-1/2 aspect-[3/2] object-cover rounded-xl transform transition-transform duration-300 hover:scale-105"
                                />
                                <div className="md:w-1/2">
                                    <h2 className="xs:text-xl md:text-2xl font-bold xs:mb-1 md:mb-3 text-gray-100">{game.name}</h2>
                                    <p className="xs:text-md md:text-lg text-gray-300 leading-relaxed">
                                        {game.description}
                                    </p>
                                    <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 xs:mt-2 xs:mb-1 md:my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <div className='flex xs:flex-row md:flex-col gap-1 xs:items-center md:items-start'>
                                        <p className="xs:text-md md:text-xl text-white md:mt-2 font-medium">If you like this game:</p>
                                        <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 md:mt-2">
                                            {game.recs.map((recGame) => (
                                                <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                    <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-md sm:rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 id='Metroidvania' className='xs:text-lg md:text-2xl font-bold'>Metroidvania:</h2>
                <p className='xs:text-md md:text-lg'>A subgenre of action-adventure games that emphasizes exploration and platforming, often featuring interconnected worlds and power-ups. If you&apos;re looking for a game that combines exploration with action and puzzle-solving, this is the genre for you.</p>
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
                                    className="w-full md:w-1/3 object-cover aspect-[3/2] transform transition-transform duration-300 hover:scale-105"
                                />
                                <div className="p-4 flex flex-col justify-center md:w-2/3">
                                    <h2 className="text-xl font-bold mb-2 text-gray-100">{game.name}</h2>
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        {game.description}
                                    </p>
                                    <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <div className='flex xs:flex-row md:flex-col gap-1 xs:items-center md:items-start'>
                                        <p className="xs:text-xs md:text-xl text-white md:mt-2 font-medium">If you like this game:</p>
                                        <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 md:mt-2">
                                            {game.recs.map((recGame) => (
                                                <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                    <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-4 xs:h-4 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 id='Multiplayer' className='xs:text-lg md:text-2xl font-bold'>Multiplayer:</h2>
                <p className='xs:text-md md:text-lg'>A genre that emphasizes social interaction and cooperative or competitive gameplay. If you&apos;re looking for a game that offers fun and engaging experiences with friends or other players, this is the genre for you.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
                    {multiplayer.map((game) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={game.name}
                                className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col"
                            >
                                <div className="relative h-56 w-full">
                                    <Image
                                        src={game.image}
                                        alt={game.alt}
                                        className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
                                        fill
                                    />
                                </div>
                                <div className="px-6 pt-4 pb-6 flex flex-col flex-1">
                                    <h2 className={`xs:text-xl md:text-2xl font-bold xs:mb-1 md:mb-2 ${game.color}`}>{game.name}</h2>
                                    <p className="text-sm text-gray-300">
                                        {game.description}
                                    </p>
                                    <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 xs:mt-2 xs:mb-1 md:my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <div className='flex xs:flex-row xs:flex-wrap md:flex-col gap-1 xs:items-center md:items-start'>
                                        <p className="xs:text-md md:text-xl text-white md:mt-2 font-medium">If you like this game:</p>
                                        <div className="flex flex-row md:flex-wrap xs:gap-0.5 md:gap-2 md:mt-2">
                                            {game.recs.map((recGame) => (
                                                <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                    <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-md sm:rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 id='Shooter' className='xs:text-lg md:text-2xl font-bold'>Shooter:</h2>
                <p className='xs:text-md md:text-lg'>A genre focused on ranged combat, often featuring fast-paced action and strategic gameplay. If you&apos;re looking for a game that offers adrenaline-pumping action and precise aiming, this is the genre for you.</p>
                <div className="space-y-6 my-4">
                    {shooters.map((game, idx) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl shadow-md overflow-hidden relative aspect-[4/2] flex"
                            >
                                <div className="absolute inset-0 transform transition-transform duration-300 hover:scale-105">
                                    <Image
                                        src={game.image}
                                        alt={game.alt}
                                        className="object-cover w-full h-full"
                                        fill
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                                </div>
                                <div className="relative z-10 flex flex-col justify-center xs:p-2 md:p-8 text-white max-w-md">
                                    <h3 className="xs:text-lg md:text-3xl font-bold xs:mb-1 md:mb-3">{game.name}</h3>
                                    <p className="xs:text-sm md:text-base">{game.description}</p>
                                    <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <div className='flex xs:flex-row md:flex-col gap-1 xs:items-center md:items-start'>
                                        <p className="xs:text-xs md:text-xl text-white md:mt-2 font-medium">If you like this game:</p>
                                        <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 md:mt-2">
                                            {game.recs.map((recGame) => (
                                                <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                    <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-4 xs:h-4 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 id='Turn-Based' className='xs:text-lg md:text-2xl font-bold'>Turn-Based:</h2>
                <p className='xs:text-md md:text-lg'>A genre where players take turns making strategic decisions in combat. If you&apos;re looking for a game that emphasizes strategy and tactical thinking, this is the genre for you.</p>
                <div className="space-y-6 my-4">
                    {turns.map((game, idx) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={idx}
                                className={`${game.color} rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row`}
                            >
                                <div className="relative xs:w-full md:w-1/3 aspect-[3/2]">
                                    <Image
                                        src={game.image}
                                        alt={game.alt}
                                        className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
                                        fill
                                    />
                                </div>
                                <div className="xs:p-4 md:p-6 flex flex-col justify-center md:w-2/3">
                                    <h3 className="xs:text-xl md:text-2xl font-bold xs:mb-1 md:mb-3 text-black/80">{game.name}</h3>
                                    <p className="text-base text-gray-700">{game.description}</p>
                                    <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 xs:mt-2 xs:mb-1 md:my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <div className='flex xs:flex-row xs:flex-wrap md:flex-col gap-1 xs:items-center md:items-start'>
                                        <p className="xs:text-md md:text-xl text-black md:mt-2 font-medium">If you like this game:</p>
                                        <div className="flex flex-row md:flex-wrap xs:gap-0.5 md:gap-2 md:mt-2">
                                            {game.recs.map((recGame) => (
                                                <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                    <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-md sm:rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 id='Horror' className='xs:text-lg md:text-2xl font-bold'>Horror:</h2>
                <p className='xs:text-md md:text-lg'>A genre designed to evoke fear and suspense, often featuring dark atmospheres and psychological elements. If you&apos;re looking for a game that offers thrilling and immersive experiences, this is the genre for you.</p>
                <div className="flex flex-col gap-8 my-8">
                    {horrors.map((game, idx) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={idx}
                                className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
                            >
                                <div className="relative aspect-[3/2] w-full">
                                    <Image
                                        src={game.image}
                                        alt={game.alt}
                                        className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
                                        fill
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full bg-black/50 xs:p-1 md:p-6 backdrop-blur-sm">
                                    <h3 className="xs:text-sm md:text-2xl font-bold xs:mb-0 md:mb-2 text-white">{game.name}</h3>
                                    <p className="xs:text-[0.5rem] md:text-base text-gray-100">{game.description}</p>
                                    <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <div className='flex xs:flex-row md:flex-col gap-1 xs:items-center md:items-start'>
                                        <p className="xs:text-[0.5rem] md:text-xl text-white md:mt-2 font-medium">If you like this game:</p>
                                        <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 md:mt-2">
                                            {game.recs.map((recGame) => (
                                                <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                    <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-4 xs:h-4 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h2 id='Platformer' className='xs:text-lg md:text-2xl font-bold'>Platformer:</h2>
                <p className='xs:text-md md:text-lg'>A genre focused on jumping and climbing between platforms, often featuring precise controls and challenging levels. If you&apos;re looking for a game that offers fun and engaging gameplay with a focus on movement, this is the genre for you.</p>
                <div className="flex flex-col space-y-8 my-6">
                    {platformers.map((game, idx) => {
                        const matchedGame = games?.find((g) => g.name === game.name);
                        return (
                            <div
                                key={idx}
                                className={`bg-gray-900 rounded-2xl shadow-lg xs:p-4 md:p-6 flex flex-col md:flex-row ${game.layout === "reverse" ? "md:flex-row-reverse" : ""
                                    } items-center md:items-start xs:gap-4 md:gap-6`}
                            >
                                <Image
                                    src={game.image}
                                    alt={game.alt}
                                    className="w-full md:w-1/2 aspect-[3/2] object-cover rounded-xl transform transition-transform duration-300 hover:scale-105"
                                />
                                <div className="md:w-1/2">
                                    <h2 className={`xs:text-xl md:text-2xl font-bold xs:mb-1 md:mb-3 ${game.color}`}>
                                        {game.name}
                                    </h2>
                                    <p className="xs:text-md md:text-lg text-gray-300 leading-relaxed">
                                        {game.description}
                                    </p>
                                    <div className="flex flex-row flex-wrap xs:gap-0.5 md:gap-2 xs:mt-2 xs:mb-1 md:my-2">
                                        {matchedGame?.genres.map((genre, i) => (
                                            <GameGenre key={i} genre={genre} small />
                                        ))}
                                    </div>
                                    <div className='flex xs:flex-row xs:flex-wrap md:flex-col gap-1 xs:items-center md:items-start'>
                                        <p className="xs:text-md md:text-xl text-white md:mt-2 font-medium">If you like this game:</p>
                                        <div className="flex flex-row md:flex-wrap xs:gap-0.5 md:gap-2 md:mt-2">
                                            {game.recs.map((recGame) => (
                                                <div key={recGame} onClick={() => recSelect(recGame)} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                    <img src={games?.find((g) => g.name === recGame)?.image} alt={recGame} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-md sm:rounded-lg" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
