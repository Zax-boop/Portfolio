"use client"

import { useState, useEffect } from 'react';
import addAlbum from '../../../utils/addAlbum';
import { PlusIcon } from 'lucide-react';
import album_placeholder from "../../../public/album_placeholder.png"
import Image from 'next/image';
import supabase from "../../../utils/supabaseclient"
import { User } from '@supabase/supabase-js';

export default function AlbumForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [comments, setComments] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [rank, setRank] = useState("")
    const [coverImage, setCoverImage] = useState<any>(album_placeholder);
    const [nameFocus, setNameFocus] = useState(false);
    const [artistFocus, setArtistFocus] = useState(false);
    const [commentFocus, setCommentFocus] = useState(false);
    const [rankFocus, setRankFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
      const getSession = async () => {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      };
  
      getSession();
    }, []);

    const handleFileChange = (e: any) => {
        setImageFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0])
        setCoverImage(url)
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await addAlbum(name, artist, comments, imageFile, Number(rank));
        } catch (error) {
            console.error("Error adding album:", error);
        } finally {
            setLoading(false);
            setIsModalOpen(false);
            window.location.reload();
        }
    };
    return (
        <div className={`flex flex-col w-full items-center justify-center xs:hidden sm:block`}>
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
                                    <Image src={coverImage} width={400} height={400} alt='placeholder' className='transform transition-transform hover:scale-105 duration-300' />
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
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Album Name"
                                            value={name}
                                            onFocus={e => setNameFocus(true)}
                                            onBlur={() => setNameFocus(false)}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${nameFocus || name ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Artist"
                                            value={artist}
                                            onFocus={e => setArtistFocus(true)}
                                            onBlur={() => setArtistFocus(false)}
                                            onChange={(e) => setArtist(e.target.value)}
                                        />
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${artistFocus || artist ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <textarea
                                            className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Comments"
                                            value={comments}
                                            onFocus={e => setCommentFocus(true)}
                                            onBlur={() => setCommentFocus(false)}
                                            onChange={(e) => setComments(e.target.value)}
                                            rows={3}
                                        />
                                        <span
                                            className={`absolute bottom-1.5 left-0 h-[2px] bg-white transition-all duration-300 ${commentFocus || comments ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="number"
                                            className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Rank"
                                            value={rank}
                                            onFocus={e => setRankFocus(true)}
                                            onBlur={() => setRankFocus(false)}
                                            onChange={(e) => setRank(e.target.value)}
                                        />
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${rankFocus || rank ? "w-full" : "w-0"}`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full items-center'>
                            {!user && <p className=' text-red-600'>You are not authenticated.</p>}
                            <button
                                type="submit"
                                className={`w-full py-2 flex flex-row justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${(loading || !user) && `opacity-70`}`}
                                disabled={loading || !user}
                            >
                                {loading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
