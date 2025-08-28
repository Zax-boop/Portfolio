import React from 'react'
import GenrePieChart from './genrePieChart';
import { songs } from '../../../data/songData';
import Image from 'next/image';

type Album = {
    name: string;
    artist: string;
    comment: string;
    image: string;
    Rank: number;
    genres: string[];
    id: string;
};
export default function AlbumRecommendations({ albums, recSelect }: { albums?: Album[], recSelect: (name: string) => void }) {
    return (
        <div className='flex flex-col xs:w-[95%] sm:w-4/5 xs:mt-2 sm:mt-2'>
            <div className='flex flex-col'>
                <h1 className='xs:text-xl md:text-3xl font-bold xs:mt-2 sm:mt-0'>Trying to expand your music taste?</h1>
                <p className='xs:text-md md:text-lg'>Here&apos;s some genres I&apos;ve listened to across my album ranking:</p>
                <div className='flex flex-row w-full justify-center'>
                    <GenrePieChart genresList={albums?.map((albums) => albums.genres)} />
                </div>
                <p className='xs:text-md md:text-2xl font-bold xs:mt-2 sm:mt-2'>Here's some songs from different genres. From these, depending on what you like I can recommend albums based on them:</p>
                <p className='xs:text-xs md:text-sm xs:mt-2'>*As a disclaimer, if you're the kind of person who only listens to rap/hip-hop or hype 2000s hits then this probably won't help you...</p>
                <div className="flex flex-col gap-4 mt-8">
                    {songs.map((song, idx) => {
                        return (
                            <div
                                key={idx}
                                className={`bg-gradient-to-br ${song.bg} rounded-2xl p-6 md:p-8 flex flex-col md:flex-row ${idx % 2 === 1 ? "md:flex-row-reverse" : ""} items-start md:gap-6 text-white transition-transform duration-300 hover:scale-[1.01]`}
                            >
                                <div className="flex-shrink-0 md:w-[40%] w-full transform transition-transform duration-300 hover:scale-105">
                                    <Image
                                        src={song.image}
                                        alt={song.name}
                                        className={`rounded-xl shadow-lg ${song.hover} transition-shadow duration-300 w-full object-cover`}
                                    />
                                </div>

                                <div className="flex flex-col flex-1">
                                    <h2
                                        className={`xs:text-lg md:text-3xl font-bold bg-gradient-to-r ${song.text_color} bg-clip-text text-transparent drop-shadow-lg xs:mt-2 md:mt-0`}
                                    >
                                        {song.name} <span className="opacity-100">– {song.artist}</span>
                                    </h2>

                                    <div className="flex flex-wrap gap-2 xs:mt-2 md:mt-4">
                                        {song.genres?.map((genre, index) => {
                                            const [name, bg] = Object.entries(genre)[0];
                                            return (
                                                <span
                                                    key={index}
                                                    className={`px-3 py-1 rounded-lg text-white font-medium text-sm md:text-base ${bg} shadow-md shadow-black/30 transform transition-all duration-300 hover:scale-110 hover:rotate-1 hover:shadow-lg hover:shadow-white/20 cursor-pointer`}
                                                >
                                                    {name}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    <p className={`mt-4 text-sm md:text-lg ${song.desc_text ? song.desc_text : `text-gray-300`} leading-relaxed`}>
                                        {song.description}
                                    </p>

                                    <div className="xs:mt-4 md:mt-6">
                                        <p
                                            className={`xs:text-md md:text-xl font-semibold ${song.mini_text_color} drop-shadow-sm mb-3`}
                                        >
                                            If you like this song:
                                        </p>
                                        <div className="flex flex-row flex-wrap xs:gap-1 md:gap-2">
                                            {song.recs.map((recAlbum) => (
                                                <div
                                                    key={recAlbum}
                                                    onClick={() => recSelect(recAlbum)}
                                                    className="transform transition-transform duration-300 hover:scale-110 hover:rotate-2 cursor-pointer"
                                                >
                                                    <img
                                                        src={albums?.find((g) => g.name === recAlbum)?.image}
                                                        alt={recAlbum}
                                                        className={`xs:w-10 xs:h-10 sm:w-16 sm:h-16 2xl:w-20 2xl:h-20 object-cover rounded-lg shadow-md hover:shadow-lg ${song.hover} transition-shadow duration-300`}
                                                    />
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