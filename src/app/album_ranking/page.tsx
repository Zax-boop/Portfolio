"use client"

import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import addAlbum from "../../../utils/addAlbum.js";
import fetchAlbums from "../../../utils/fetchAlbums";

export default function Albums() {
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [comments, setComments] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [albums, setAlbums] = useState<any>([]); 
    const [loading, setLoading] = useState(true);

    const handleFileChange = (e: any) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await addAlbum(name, artist, comments, imageFile);
        // if (result) {
        //     console.log('Album added successfully:', result);
        // }
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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='text-black'
                    placeholder="Album Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    className='text-black'
                    placeholder="Artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                />
                <textarea
                    placeholder="Comments"
                    className='text-black'
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/jpeg"
                    onChange={handleFileChange}
                />
                <button type="submit">Add Album</button>
            </form>
            <div className="flex flex-col w-full space-y-4 mt-8">
                {albums.map((album: any, index: number) => (
                    <div key={album.id || `${album.name}-${album.artist}-${index}`} className="p-4 border rounded-lg shadow-lg">
                        <img
                            src={album.image}
                            alt={`${album.name} album cover`}
                            className="w-full h-64 object-cover mb-4"
                        />
                        <h2 className="text-xl font-semibold">{album.name}</h2>
                        <p className="text-md text-gray-600">{album.artist}</p>
                        <p className="mt-2">{album.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
