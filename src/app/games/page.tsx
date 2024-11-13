"use client"

import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import addAlbum from "../../../utils/addAlbum.js";
import PoppingLetters from '../components/poppingLetters';
import AlbumForm from '../components/albumModal';
import fetchGames from "../../../utils/fetchGames"
import GameForm from '../components/gameModal';

export default function GamesRanking() {
    const [name, setName] = useState('');
    const [studio, setStudio] = useState('');
    const [comments, setComments] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [games, setGames] = useState<any>([]);
    const [rank, setRank] = useState("")
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true)

    const handleFileChange = (e: any) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await addAlbum(name, studio, comments, imageFile, Number(rank));
    };

    useEffect(() => {
        const getGames = async () => {
            const data = await fetchGames();
            if (data) {
                setGames(data);
            }
            setLoading(false);
        };

        getGames();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col w-full h-full items-center'>
            <Header />
            <div className="relative flex items-center justify-center w-full h-[80vh] mt-10 overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    <div className='w-1/3 h-full'>
                        <video
                            src={"/sekiro_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                        <video
                            src={"/cloud_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                    </div>
                    <div className='w-1/3 h-full'>
                        <video
                            src={"/hades2_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                        <video
                            src={"/ror2_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                    </div>
                    <div className='w-1/3 h-full'>
                        <video
                            src={"/mario_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                        <video
                            src={"/cuphead_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                    </div>
                </div>
                <PoppingLetters text="Video Games" className="absolute text-white text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="flex flex-col w-4/5 mt-8">
                <GameForm/>
                <p>*Disclaimer: This is just my opinion and what I enjoyed playing the most regardless of critical bias. </p>
                <hr className="border-t border-gray-300" />
                {games.map((game: any, index: number) => (
                    <div key={game.id || `${game.name}-${game.studio}-${index}`} className="flex flex-col space-y-4 mt-8">
                        <div className="flex flex-row">
                            <h2 className="text-xl font-semibold mr-4">{game.rank}.</h2>
                            <img
                                src={game.image}
                                alt={`${game.name} album cover`}
                                className={`w-[30rem] h-[30rem] min-w-[30rem] min-h-[30rem] object-cover mb-4 transform transition-transform hover:scale-105 duration-300 ${isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                            }`}
                                onLoadedData={e => setIsLoading(false)}
                            />
                            <div className='ml-4'>
                                <p className="text-6xl text-white">{game.name}</p>
                                <p className="text-3xl text-gray-400">{game.studio}</p>
                                <p className="text-lg mt-2">{game.comments}</p>
                            </div>
                        </div>
                        {/* Only render <hr /> if it’s not the last album */}
                        {index < games.length - 1 && <hr className="border-t border-gray-300 my-4" />}
                    </div>
                ))}
            </div>

        </div>
    );
}
