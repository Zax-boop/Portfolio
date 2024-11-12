"use client"

import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import addAlbum from "../../../utils/addAlbum.js";
import fetchAlbums from "../../../utils/fetchAlbums";
import PoppingLetters from '../components/poppingLetters';
import AlbumForm from '../components/albumModal';

export default function Albums() {
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [comments, setComments] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [albums, setAlbums] = useState<any>([]);
    const [rank, setRank] = useState("")
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true)

    const handleFileChange = (e: any) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await addAlbum(name, artist, comments, imageFile, Number(rank));
    };

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
            <div className="flex flex-col w-4/5 space-y-8 mt-8">
                <AlbumForm/>
                <hr className="border-t border-gray-300 my-4" />
                {albums.map((album: any, index: number) => (
                    <div key={album.id || `${album.name}-${album.artist}-${index}`} className="flex flex-col space-y-4">
                        <div className="flex flex-row">
                            <h2 className="text-xl font-semibold mr-4">{album.Rank}.</h2>
                            <img
                                src={album.image}
                                alt={`${album.name} album cover`}
                                className="w-[30rem] h-[30rem] object-cover mb-4"
                            />
                            <div className='ml-4'>
                                <p className="text-6xl text-white">{album.name}</p>
                                <p className="text-3xl text-gray-500">{album.artist}</p>
                                <p className="mt-2">{album.comment}</p>
                            </div>
                        </div>
                        {/* Only render <hr /> if it’s not the last album */}
                        {index < albums.length - 1 && <hr className="border-t border-gray-300 my-4" />}
                    </div>
                ))}
            </div>

        </div>
    );
}
