"use client"

import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import fetchAlbums from "../../../utils/fetchAlbums";
import PoppingLetters from '../components/poppingLetters';
import AlbumForm from '../components/albumModal';

export default function Albums() {
    const [albums, setAlbums] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getAlbums = async () => {
            const data = await fetchAlbums();
            if (data) {
                setAlbums(data);
            }
            setLoading(false);
        };

        getAlbums();
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
                            src={"/sweet_trip_mp4.mp4"}
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
                            src={"/nirvana_mp4.mp4"}
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

                    <video
                        src={"/marias_mp4.mp4"}
                        autoPlay
                        loop
                        muted
                        className={`w-1/3 h-full object-cover duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                            }`}
                        onLoadedData={() => setIsLoading(false)}
                    />
                    <video
                        src={"/gorillaz_mp4.mp4"}
                        autoPlay
                        loop
                        muted
                        className={`w-1/3 h-full object-cover duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                            }`}
                        onLoadedData={() => setIsLoading(false)}
                    />
                </div>
                <PoppingLetters text="Albums" className="absolute text-white text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="flex flex-col w-4/5 mt-8">
                <AlbumForm/>
                <p>*Disclaimer: This is just my opinion and what I enjoyed listening to the most regardless of critical bias.</p>
                <hr className="border-t border-gray-300" />
                {albums.map((album: any, index: number) => (
                    <div key={album.id || `${album.name}-${album.artist}-${index}`} className="flex flex-col space-y-4 mt-8">
                        <div className="flex flex-row">
                            <h2 className="text-xl font-semibold mr-4">{album.Rank}.</h2>
                            <img
                                src={album.image}
                                alt={`${album.name} album cover`}
                                className={`w-[30rem] h-[30rem] min-w-[30rem] min-h-[30rem] object-cover mb-4 transform transition-transform hover:scale-105 duration-300 ${isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                            }`}
                                onLoadedData={e => setIsLoading(false)}
                            />
                            <div className='ml-4'>
                                <p className="text-6xl text-white">{album.name}</p>
                                <p className="text-3xl text-gray-400">{album.artist}</p>
                                <p className="text-lg mt-2">{album.comment}</p>
                            </div>
                        </div>
                        {index < albums.length - 1 && <hr className="border-t border-gray-300 my-4" />}
                    </div>
                ))}
            </div>

        </div>
    );
}
