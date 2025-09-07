"use client"

import { useState, useEffect } from 'react';
import updateAnime from '../../../../utils/anime/updateAnime';
import show_placeholder from "../../../../public/show_placeholder.svg";
import Image, { StaticImageData } from 'next/image';
import supabase from "../../../../utils/general/supabaseclient";
import { User } from '@supabase/supabase-js';
import { Pencil } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

export default function UpdateAnimeModal({ anime }: {
    anime: {
        name: string;
        studio: string;
        comments: string;
        image: string;
        rank: number;
        genres: string[];
        id: string;
    }
}) {
    const isTablet = useMediaQuery({ query: '(max-width: 1025px)' })
    const [name, setName] = useState(anime?.name || '');
    const [studio, setStudio] = useState(anime?.studio || '');
    const [comments, setComments] = useState(anime?.comments || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [rank, setRank] = useState(anime?.rank || '');
    const [genres, setGenres] = useState(anime?.genres || []);
    const [coverImage, setCoverImage] = useState<string | StaticImageData>(anime?.image || show_placeholder);
    const [nameFocus, setNameFocus] = useState(false);
    const [studioFocus, setStudioFocus] = useState(false);
    const [commentFocus, setCommentFocus] = useState(false);
    const [rankFocus, setRankFocus] = useState(false);
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
        if (anime) {
            setName(anime.name || '');
            setStudio(anime.studio || '');
            setComments(anime.comments || '');
            setRank(anime.rank || '');
            setGenres(anime.genres || []);
            setCoverImage(anime.image || show_placeholder);
        }
    }, [anime]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setCoverImage(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedFields = {
                name,
                studio,
                comments: comments,
                imageFile,
                rank: Number(rank),
                genres
            };
            await updateAnime(anime.id, updatedFields);
        } catch (error) {
            console.error("Error updating anime:", error);
        } finally {
            setLoading(false);
            setModalOpen(false)
            window.location.reload();
        }
    };

    const genreColors: { [key: string]: string } = {
        action: "bg-red-600",
        adventure: "bg-orange-500",
        bl: "bg-blue-300",
        comedy: "bg-yellow-400",
        crime: "bg-gray-700",
        cyberpunk: "bg-blue-900",
        cute: "bg-pink-300",
        dark: "bg-gray-900",
        drama: "bg-rose-700",
        fantasy: "bg-purple-500",
        ghibli: "bg-green-500",
        historical: "bg-yellow-700",
        horror: "bg-gray-800",
        isekai: "bg-blue-500",
        josei: "bg-pink-500",
        magic: "bg-indigo-500",
        mecha: "bg-gray-600",
        military: "bg-green-700",
        music: "bg-teal-400",
        mystery: "bg-blue-700",
        noir: "bg-gray-500",
        philosophical: "bg-indigo-800",
        psychological: "bg-indigo-700",
        racing: "bg-red-800",
        romance: "bg-red-400",
        samurai: "bg-yellow-600",
        school: "bg-yellow-500",
        scifi: "bg-blue-400",
        seinen: "bg-gray-500",
        shoujo: "bg-pink-400",
        shounen: "bg-red-500",
        sliceoflife: "bg-green-400",
        space: "bg-black",
        sports: "bg-orange-600",
        supernatural: "bg-purple-600",
        thriller: "bg-red-800",
        vampire: "bg-indigo-900",
        western: "bg-amber-600",
    };

    const genre_list = [
        "Action", "Adventure", "BL", "Comedy", "Crime", "Cyberpunk", "Cute", "Dark", "Drama", "Fantasy", "Ghibli", "Historical", 
        "Horror", "Isekai", "Josei", "Magic", "Mecha", "Military", "Music", "Mystery", "Noir", "Philosophical", 
        "Psychological", "Racing", "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shounen", 
        "Slice of Life", "Space", "Sports", "Supernatural", "Thriller", "Vampire", "Western"
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
            <div onClick={() => setModalOpen(true)} className='hover:bg-blue-400 cursor-pointer transition duration-300 ease-in-out p-1 rounded-lg self-start'>
                <Pencil />
            </div>
            {modalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-black w-full sm:max-w-[40rem] xl:max-w-[50rem] sm:p-2 xl:p-4 rounded-lg shadow-lg relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setModalOpen(false)}
                    >
                        ✕
                    </button>
                    <h2 className="sm:text-xs xl:text-xl font-bold sm:mb-2 xl:mb-4">Edit Anime</h2>
                    <form onSubmit={handleSubmit} className="sm:space-y-1 xl:space-y-4 flex w-full flex-col">
                        <div className='flex flex-row w-full'>
                            <div className='w-1/2 self-start flex flex-col items-center sm:gap-2 xl:gap-3'>
                                <Image
                                    src={coverImage}
                                    width={isTablet ? 130 : 300}
                                    height={isTablet ? 130 : 300}
                                    alt='anime cover'
                                    className='transform transition-transform hover:scale-105 duration-300 sm:w-[8.125rem] sm:h-[8.125rem] xl:w-[18.75rem] xl:h-[18.75rem] object-cover'
                                />
                                <label className="flex flex-row justify-center items-center gap-2 sm:px-2 xl:px-3 sm:py-1 xl:py-2 bg-black border border-white text-white sm:text-xs xl:text-base rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                                    {coverImage === show_placeholder ? "Choose Cover" : "Change Cover"}
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
                                        className="w-full bg-transparent text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                        placeholder="Anime Name"
                                        value={name}
                                        onFocus={() => setNameFocus(true)}
                                        onBlur={() => setNameFocus(false)}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <span
                                        className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${nameFocus ? "w-full" : "w-0"
                                            }`}
                                    />
                                </div>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        className="w-full bg-transparent text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                        placeholder="Studio"
                                        value={studio}
                                        onFocus={() => setStudioFocus(true)}
                                        onBlur={() => setStudioFocus(false)}
                                        onChange={(e) => setStudio(e.target.value)}
                                    />
                                    <span
                                        className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${studioFocus ? "w-full" : "w-0"
                                            }`}
                                    />
                                </div>
                                <div className="relative group">
                                    <textarea
                                        className="w-full bg-transparent text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                        placeholder="Comments"
                                        value={comments}
                                        onFocus={() => setCommentFocus(true)}
                                        onBlur={() => setCommentFocus(false)}
                                        onChange={(e) => setComments(e.target.value)}
                                        rows={2}
                                    />
                                    <span
                                        className={`absolute bottom-1.5 left-0 h-[2px] bg-white transition-all duration-300 ${commentFocus ? "w-full" : "w-0"
                                            }`}
                                    />
                                </div>
                                <div className="relative group">
                                    <input
                                        type="number"
                                        className="w-full bg-transparent text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                        placeholder="Rank"
                                        value={rank}
                                        onFocus={() => setRankFocus(true)}
                                        onBlur={() => setRankFocus(false)}
                                        onChange={(e) => setRank(e.target.value)}
                                    />
                                    <span
                                        className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${rankFocus ? "w-full" : "w-0"}`}
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
                            {!user && <p className=' text-red-600 sm:text-[0.5rem] xl:text-base'>You are not authenticated.</p>}
                            <button
                                type="submit"
                                className={`w-full sm:py-1 xl:py-2 sm:text-xs xl:text-base flex flex-row justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${(loading || !user) && `opacity-70`}`}
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
                                    "Update Anime"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    );
}
