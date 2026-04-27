"use client"

import { useState, useEffect } from 'react';
import addAlbum from '../../../../utils/album_ranking/addAlbum';
import { PlusIcon } from 'lucide-react';
import album_placeholder from "../../../../public/album_placeholder.png"
import Image, { StaticImageData } from 'next/image';
import supabase from "../../../../utils/general/supabaseclient"
import { User } from '@supabase/supabase-js';
import AlbumSearchInput from './albumSearchInput';
import { getAlbumGenres } from '../../../../utils/album_ranking/getAlbumGenres';

interface Genre {
    id: string;
    title: string;
    alias: string;
    color: string;
}

export default function AlbumForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [comments, setComments] = useState('');
    const [imageFile, setImageFile] = useState<File | string | null>(null);
    const [rank, setRank] = useState("");
    const [date, setDate] = useState("");
    const [genres, setGenres] = useState<string[]>([]);
    const [allGenres, setAllGenres] = useState<Genre[]>([]);
    const [coverImage, setCoverImage] = useState<string | StaticImageData>(album_placeholder);
    const [artistFocus, setArtistFocus] = useState(false);
    const [commentFocus, setCommentFocus] = useState(false);
    const [rankFocus, setRankFocus] = useState(false);
    const [recommender, setRecommender] = useState("");
    const [recommenderFocus, setRecommenderFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user || null);
        };

        getSession();
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            const { data, error } = await supabase
                .from("genres")
                .select("*")
                .order("title");

            if (!error && data) setAllGenres(data);
        };

        fetchGenres();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0]);
            setCoverImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addAlbum(name, artist, comments, imageFile, Number(rank), date, genres, recommender);
        } catch (error) {
            console.error("Error adding album:", error);
        } finally {
            setLoading(false);
            setIsModalOpen(false);
            window.location.reload();
        }
    };

    const normalizeGenre = (g: string): string =>
        g.toLowerCase().replace(/&/g, "and").replace(/[^a-z]/g, "");

    // 🔹 Toggle genre (alias-based)
    const handleGenreSwitch = (alias: string) => {
        if (genres.includes(alias)) {
            setGenres(genres.filter((g) => g !== alias));
        } else {
            setGenres([...genres, alias]);
        }
    };

    return (
        <div className={`flex flex-col w-full items-center justify-center xs:hidden sm:block`}>
            <div className={`flex flex-row w-full justify-end`}>
                <label onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 self-start pl-3 mr-2 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
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
                                    <Image src={coverImage} width={400} height={400} alt='placeholder' className='transform transition-transform hover:scale-105 duration-300 sm:w-[8.125rem] sm:h-[8.125rem] xl:w-[18.75rem] xl:h-[18.75rem] object-cover' />
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
                                        <AlbumSearchInput
                                            name={name}
                                            setName={setName}
                                            onSelect={async (album) => {
                                                setCoverImage(album.image);
                                                setImageFile(album.image);
                                                setName(album.name);
                                                setArtist(album.artists);

                                                const rawGenres = await getAlbumGenres(album.artists, album.name);
                                                const formatted = rawGenres.map(normalizeGenre);
                                                const validGenres = Object.values(allGenres)
                                                    .filter((g) => formatted.includes(g.alias))
                                                    .map((g) => g.title);

                                                setGenres(validGenres);
                                            }}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            className="w-full bg-transparent text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Artist"
                                            value={artist}
                                            onFocus={() => setArtistFocus(true)}
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
                                            className="w-full bg-transparent text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
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
                                            type="text"
                                            className="w-full bg-transparent text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Recommender"
                                            value={recommender}
                                            onFocus={() => setRecommenderFocus(true)}
                                            onBlur={() => setRecommenderFocus(false)}
                                            onChange={(e) => setRecommender(e.target.value)}
                                        />
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${recommenderFocus || recommender ? "w-full" : "w-0"
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
                                            className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${rankFocus || rank ? "w-full" : "w-0"}`}
                                        />
                                    </div>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="p-2 border border-gray-700 rounded bg-gray-800 text-white"
                                    />
                                    <div className='flex flex-row flex-wrap gap-2 max-h-32 overflow-scroll'>
                                        {Object.values(allGenres)
                                            .sort((a, b) => a.title.localeCompare(b.title))
                                            .map((genre) => (
                                                <div
                                                    key={genre.alias}
                                                    onClick={() => handleGenreSwitch(genre.title)}
                                                    className={
                                                        genres.includes(genre.title)
                                                            ? `px-2 py-1 rounded-lg text-white font-bold ${genre.color} cursor-pointer opacity-100 transition-all duration-300 ease-in-out hover:opacity-30`
                                                            : `cursor-pointer px-2 py-1 rounded-lg text-white transition-all duration-300 ease-in-out ${genre.color} hover:opacity-100 opacity-30`
                                                    }
                                                >
                                                    {genre.title}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full items-center'>
                                {!user && <p className=' text-red-600'>You are not authenticated.</p>}
                                <button
                                    type="submit"
                                    className={`w-full py-2 flex flex-row justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${(loading || !user || name == "" || artist == "") && `opacity-70`}`}
                                    disabled={loading || !user || name == "" || artist == ""}
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