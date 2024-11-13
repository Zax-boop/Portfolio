"use client"

import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import PoppingLetters from '../components/poppingLetters';
import fetchTV from "../../../utils/fetchTV"
import TVForm from '../components/tvModal';

export default function TVRanking() {
    const [tv, setTV] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getGames = async () => {
            const data = await fetchTV();
            if (data) {
                setTV(data);
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
                    <div className='w-1/2 h-full'>
                        <video
                            src={"/breaking_bad_mp4.mp4"}
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
                            src={"/bojack_mp4.mp4"}
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
                    <div className='w-1/2 h-full'>
                        <video
                            src={"/sopranos_mp4.mp4"}
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
                            src={"/hill_house_mp4.mp4"}
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
                <PoppingLetters text="TV Shows" className="absolute text-white text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="flex flex-col w-4/5 mt-8">
                <TVForm/>
                <p>*Disclaimer: This is just my opinion and what I enjoyed playing the most regardless of critical bias. </p>
                <hr className="border-t border-gray-300" />
                {tv.map((show: any, index: number) => (
                    <div key={show.id || `${show.name}-${show.director}-${index}`} className="flex flex-col space-y-4 mt-8">
                        <div className="flex flex-row">
                            <h2 className="text-xl font-semibold mr-4">{show.rank}.</h2>
                            <img
                                src={show.image}
                                alt={`${show.name} album cover`}
                                className={`w-[30rem] h-[30rem] min-w-[30rem] min-h-[30rem] object-cover mb-4 transform transition-transform hover:scale-105 duration-300 ${isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                            }`}
                                onLoadedData={e => setIsLoading(false)}
                            />
                            <div className='ml-4'>
                                <p className="text-6xl text-white">{show.name}</p>
                                <p className="text-3xl text-gray-400">{show.director}</p>
                                <p className="text-lg mt-2">{show.comments}</p>
                            </div>
                        </div>
                        {index < show.length - 1 && <hr className="border-t border-gray-300 my-4" />}
                    </div>
                ))}
            </div>

        </div>
    );
}
