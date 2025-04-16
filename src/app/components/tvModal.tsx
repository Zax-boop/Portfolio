"use client"

import { useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';
import show_placeholder from "../../../public/show_placeholder.svg"
import Image, { StaticImageData } from 'next/image';
import addTV from "../../../utils/addTV"
import { User } from '@supabase/supabase-js';
import supabase from '../../../utils/supabaseclient';

export default function TVForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [director, setDirector] = useState('');
    const [comments, setComments] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [rank, setRank] = useState("")
    const [genres, setGenres] = useState<string[]>([]);
    const [coverImage, setCoverImage] = useState<string | StaticImageData>(show_placeholder);
    const [nameFocus, setNameFocus] = useState(false);
    const [directorFocus, setDirectorFocus] = useState(false);
    const [commentFocus, setCommentFocus] = useState(false);
    const [rankFocus, setRankFocus] = useState(false);
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user || null);
        };
        getSession();
    }, []);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0])
            setCoverImage(url)
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        await addTV(name, director, comments, imageFile, Number(rank), genres);
        setLoading(false)
        setIsModalOpen(false);
        window.location.reload()
    };

    const genreColors: { [key: string]: string } = {
        action: "bg-orange-700",
        adventure: "bg-orange-500",
        animated: "bg-blue-400",
        comedy: "bg-yellow-400",
        crime: "bg-gray-800",
        cyberpunk: "bg-blue-900",
        dark: "bg-gray-900",
        documentary: "bg-blue-300",
        drama: "bg-red-300",
        fantasy: "bg-purple-500",
        historical: "bg-yellow-700",
        horror: "bg-gray-800",
        mystery: "bg-blue-700",
        political: "bg-red-800",
        psychological: "bg-indigo-600",
        romance: "bg-red-400",
        scifi: "bg-blue-600",
        sitcom: "bg-yellow-500",
        sliceoflife: "bg-green-400",
        thriller: "bg-red-900",
        western: "bg-amber-600"
    };

    const genre_list = [
        "Action",
        "Adventure",
        "Animated",
        "Comedy",
        "Crime",
        "Cyberpunk",
        "Dark",
        "Documentary",
        "Drama",
        "Fantasy",
        "Historical",
        "Horror",
        "Mystery",
        "Political",
        "Psychological",
        "Romance",
        "Sci-fi",
        "Sitcom",
        "Slice of Life",
        "Thriller",
        "Western"
    ];

    const returnColor = (genre: string) => {
        const formattedGenre = genre.toLowerCase()
            .replace(/\s+/g, '')
            .replace(/&/g, 'and')
            .replace(/-/g, '');
        const bgColor = genreColors[formattedGenre] || "bg-gray-300";
        return bgColor;
    }

    const handleGenreSwitch = (genre: string) => {
        if (genres.includes(genre)) {
            setGenres(genres.filter((g) => g !== genre));
        } else {
            setGenres([...genres, genre]);
        }
    };

    return (
        <div className={`flex flex-col w-full items-center justify-center xs:hidden sm:block`}>
            <div className={`flex flex-row w-full justify-end`}>
                <label onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 self-start pl-3 mr-4 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                    Add TV Show
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
                        <h2 className="text-2xl font-bold mb-4">Add a New TV Show</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 flex w-full flex-col">
                            <div className='flex flex-row w-full'>
                                <div className='w-1/2 self-start flex flex-col items-center gap-3'>
                                    <Image src={coverImage} width={400} height={400} alt='placeholder' className='transform transition-transform hover:scale-105 duration-300 object-cover w-[25rem] h-[25rem]'/>
                                    <label className="flex flex-row justify-center items-center gap-2  pl-3 mr-4 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                                        {coverImage === show_placeholder ? "Choose Cover" : "Change Cover"}
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
                                            placeholder="TV Show Name"
                                            value={name}
                                            onFocus={() => setNameFocus(true)}
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
                                            placeholder="Director"
                                            value={director}
                                            onFocus={() => setDirectorFocus(true)}
                                            onBlur={() => setDirectorFocus(false)}
                                            onChange={(e) => setDirector(e.target.value)}
                                        />
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${directorFocus || director ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <textarea
                                            className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Comments"
                                            value={comments}
                                            onFocus={() => setCommentFocus(true)}
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
                                            onFocus={() => setRankFocus(true)}
                                            onBlur={() => setRankFocus(false)}
                                            onChange={(e) => setRank(e.target.value)}
                                        />
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${rankFocus || rank ? "w-full" : "w-0"}`}
                                        />
                                    </div>
                                    <div className='flex flex-row flex-wrap gap-2 max-h-32 overflow-scroll'>
                                        {genre_list.slice().sort().map((genre, index) => (
                                            <div onClick={() => handleGenreSwitch(genre)} key={index} className={genres.includes(genre) ? `px-2 py-1 rounded-lg text-white font-bold ${returnColor(genre)} cursor-pointer opacity-100 transition-all duration-300 ease-in-out hover:opacity-30` :
                                                `cursor-pointer px-2 py-1 rounded-lg bg-black text-white transition-all duration-300 ease-in-out ${returnColor(genre)} hover:opacity-100 opacity-30`}>
                                                {genre}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full items-center'>
                                {!user && <p className=' text-red-600'>You are not authenticated.</p>}
                                <button
                                    type="submit"
                                    className={`w-full py-2 flex flex-row justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${(loading || !user || name == "" || director == "") && `opacity-70`} `}
                                    disabled={loading || !user || name == "" || director == ""}
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
