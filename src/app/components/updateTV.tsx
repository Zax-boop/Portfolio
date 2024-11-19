"use client"

import { useState, useEffect } from 'react';
import updateTV from '../../../utils/updateTV';
import show_placeholder from "../../../public/show_placeholder.svg";
import Image from 'next/image';
import supabase from "../../../utils/supabaseclient";
import { User } from '@supabase/supabase-js';
import { Pencil } from 'lucide-react';

export default function UpdateTVModal({ tv }: { tv: any }) {
    const [name, setName] = useState(tv?.name || '');
    const [director, setDirector] = useState(tv?.director || '');
    const [comments, setComments] = useState(tv?.comments || '');
    const [imageFile, setImageFile] = useState(null);
    const [rank, setRank] = useState(tv?.rank || '');
    const [coverImage, setCoverImage] = useState<any>(tv?.image || show_placeholder);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user || null);
        };

        getSession();
    }, []);

    useEffect(() => {
        if (tv) {
            setName(tv.name || '');
            setDirector(tv.director || '');
            setComments(tv.comments || '');
            setRank(tv.rank || '');
            setCoverImage(tv.image || show_placeholder);
        }
    }, [tv]);

    const handleFileChange = (e: any) => {
        setImageFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        setCoverImage(url);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedFields = {
                name,
                director,
                comments: comments,
                imageFile,
                rank: Number(rank),
            };
            await updateTV(tv.id, updatedFields);
        } catch (error) {
            console.error("Error updating tv:", error);
        } finally {
            setLoading(false);
            setModalOpen(false)
            window.location.reload(); 
        }
    };

    return (
        <div className={`flex flex-col w-full items-center justify-center`}>
            <div onClick={e => setModalOpen(true)} className='hover:bg-blue-400 cursor-pointer transition duration-300 ease-in-out p-1 rounded-lg self-start'>
                <Pencil/>
            </div>
            {modalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-black w-full max-w-[50rem] p-4 rounded-lg shadow-lg relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={e => setModalOpen(false)}
                    >
                        ✕
                    </button>
                    <h2 className="text-xl font-bold mb-4">Edit TV</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 flex w-full flex-col">
                        <div className='flex flex-row w-full'>
                            <div className='w-1/2 self-start flex flex-col items-center gap-3'>
                                <Image
                                    src={coverImage}
                                    width={300}
                                    height={300}
                                    alt='tv cover'
                                    className='transform transition-transform hover:scale-105 duration-300'
                                />
                                <label className="flex flex-row justify-center items-center gap-2 px-3 mr-4 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                                    {coverImage === show_placeholder ? "Choose Cover" : "Change Cover"}
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
                                    className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                    placeholder="TV Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                    placeholder="Director"
                                    value={director}
                                    onChange={(e) => setDirector(e.target.value)}
                                />
                                <textarea
                                    className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                    placeholder="Comments"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    rows={3}
                                />
                                <input
                                    type="number"
                                    className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                    placeholder="Rank"
                                    value={rank}
                                    onChange={(e) => setRank(e.target.value)}
                                />
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
                                "Update TV"
                            )}
                        </button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    );
}
