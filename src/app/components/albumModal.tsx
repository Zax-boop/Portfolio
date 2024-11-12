"use client"

import { useState } from 'react';
import addAlbum from '../../../utils/addAlbum';
import fetchAlbums from '../../../utils/fetchAlbums';
import { PlusIcon } from 'lucide-react';
import album_placeholder from "../../../public/album_placeholder.png"
import Image from 'next/image';

export default function AlbumForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [comments, setComments] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [albums, setAlbums] = useState<any>([]);
    const [rank, setRank] = useState("")
    const [coverImage, setCoverImage] = useState(album_placeholder);

    const handleFileChange = (e: any) => {
        // console.log(e.target.files[0])
        setImageFile(e.target.files[0]);
        // setCoverImage(e.target.files[0]);        
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await addAlbum(name, artist, comments, imageFile, Number(rank));
        setIsModalOpen(false);
    };


    return (
        <div className={`flex flex-col w-full items-center justify-center`}>
            <div className={`flex flex-row w-full justify-end`}>
                <label onClick={e => setIsModalOpen(true)} className="flex items-center gap-2 self-start pl-3 mr-4 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                    Add Album
                    <PlusIcon className="w-5 h-5 mr-2" />
                </label>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-black w-full max-w-[60rem] p-6 rounded-lg shadow-lg relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Add a New Album</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 flex w-full flex-col">
                            <div className='flex flex-row w-full'>
                                <div className='w-1/2 self-start flex flex-col items-center gap-3'>
                                    <Image src={coverImage} alt='placeholder' />
                                    <label className="flex flex-row justify-center items-center gap-2  pl-3 mr-4 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                                        {coverImage === album_placeholder ? "Choose Cover" : "Change Cover"}
                                        <PlusIcon className="w-5 h-5 mr-2" />
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                                <div className='flex flex-col w-1/2 ml-2 gap-4'>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent outline-none text-white border-b-[1px] border-white"
                                        placeholder="Album Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="w-full bg-transparent outline-none text-white border-b-[1px] border-white"
                                        placeholder="Artist"
                                        value={artist}
                                        onChange={(e) => setArtist(e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Comments"
                                        className="w-full bg-transparent outline-none text-white border-b-[1px] border-white"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Rank"
                                        className="w-full bg-transparent outline-none text-white border-b-[1px] border-white"
                                        value={rank}
                                        onChange={(e) => setRank(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
