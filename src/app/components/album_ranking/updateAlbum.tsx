"use client"

import { useState, useEffect } from 'react';
import updateAlbum from '../../../../utils/album_ranking/updateAlbum';
import album_placeholder from "../../../../public/album_placeholder.png";
import Image, { StaticImageData } from 'next/image';
import supabase from "../../../../utils/general/supabaseclient";
import { User } from '@supabase/supabase-js';
import { Pencil } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

export default function UpdateAlbumModal({ album }: {
    album: {
        name: string;
        artist: string;
        comment: string;
        image: string;
        Rank: number;
        genres: string[];
        id: string;
    }
}) {
    const isTablet = useMediaQuery({ query: '(max-width: 1025px)' })
    const [name, setName] = useState(album?.name || '');
    const [artist, setArtist] = useState(album?.artist || '');
    const [comments, setComments] = useState(album?.comment || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [rank, setRank] = useState(album?.Rank || '');
    const [genres, setGenres] = useState(album?.genres || []);
    const [coverImage, setCoverImage] = useState<string | StaticImageData>(album?.image || album_placeholder);
    const [nameFocus, setNameFocus] = useState(false);
    const [artistFocus, setArtistFocus] = useState(false);
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
        if (album) {
            setName(album.name || '');
            setArtist(album.artist || '');
            setComments(album.comment || '');
            setRank(album.Rank || '');
            setCoverImage(album.image || album_placeholder);
        }
    }, [album]);

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
                artist,
                comment: comments,
                imageFile,
                Rank: Number(rank),
                genres
            };
            await updateAlbum(album.id, updatedFields);
        } catch (error) {
            console.error("Error updating album:", error);
        } finally {
            setLoading(false);
            setModalOpen(false)
            window.location.reload();
        }
    };
    const genreColors: { [key: string]: string } = {
        ambient: "bg-blue-300",
        alternative: "bg-teal-600",
        bossanova: "bg-emerald-500",
        brazilianpop: "bg-emerald-400",
        breakcore: "bg-rose-600",
        bubblegum: "bg-pink-300",
        classical: "bg-purple-700",
        citypop: "bg-purple-400",
        club: "bg-fuchsia-600",
        country: "bg-yellow-600",
        cpop: "bg-red-600",
        dance: "bg-rose-500",
        dreampop: "bg-pink-500",
        electronic: "bg-purple-500",
        experimental: "bg-amber-500",
        flamenco: "bg-red-500",
        folk: "bg-green-700",
        french: "bg-blue-600",
        funk: "bg-yellow-700",
        grunge: "bg-gray-600",
        hiphop: "bg-indigo-500",
        house: "bg-pink-600",
        indierock: "bg-red-500",
        indiepop: "bg-red-400",
        italian: "bg-green-500",
        japanese: "bg-blue-400",
        jazz: "bg-blue-700",
        jpop: "bg-blue-400",
        jrock: "bg-gray-700",
        korean: "bg-green-400",
        kpop: "bg-rose-500",
        latin: "bg-yellow-400",
        lofi: "bg-sky-400",
        metal: "bg-black",
        polish: "bg-yellow-500",
        pop: "bg-blue-500",
        psychedelic: "bg-green-600",
        punk: "bg-red-700",
        rap: "bg-gray-800",
        randb: "bg-orange-500",
        rock: "bg-gray-500",
        sailorwave: "bg-pink-200",
        shoegaze: "bg-indigo-400",
        soul: "bg-orange-700",
        spanish: "bg-red-400",
        synth: "bg-pink-800",
        triphop: "bg-indigo-600",
        turkish: "bg-red-300",
        videogame: "bg-purple-600",
    };

    const genre_list = [
        "Ambient", "Alternative", "Bossa Nova", "Brazilian Pop", "Breakcore", "Bubblegum", "Classical", "City Pop", "Club", "Country", "C-Pop", "Dance", "Dream Pop", "Electronic", "Experimental", "Flamenco", "Folk", "French", "Funk", "Grunge", "Hip-Hop",
        "House", "Indie Pop", "Indie Rock", "Italian", "Japanese", "Jazz", "J-Pop", "J-Rock", "Korean",
        "K-Pop", "Latin", "Lo-Fi", "Metal", "Polish", "Pop", "Psychedelic", "Punk", "Rap",
        "R&B", "Rock", "Sailorwave", "Shoegaze", "Soul", "Spanish", "Synth", "Video Game", "Trip-Hop", "Turkish"
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
                    <h2 className="sm:text-xs xl:text-xl font-bold sm:mb-2 xl:mb-4">Edit Album</h2>
                    <form onSubmit={handleSubmit} className="sm:space-y-1 xl:space-y-4 flex w-full flex-col">
                        <div className='flex flex-row w-full'>
                            <div className='w-1/2 self-start flex flex-col items-center sm:gap-2 xl:gap-3'>
                                <Image
                                    src={coverImage}
                                    width={isTablet ? 130 : 300}
                                    height={isTablet ? 130 : 300}
                                    alt='album cover'
                                    className='transform transition-transform hover:scale-105 duration-300 sm:w-[8.125rem] sm:h-[8.125rem] xl:w-[18.75rem] xl:h-[18.75rem] object-cover'
                                />
                                <label className="flex flex-row justify-center items-center gap-2 sm:px-2 xl:px-3 sm:py-1 xl:py-2 bg-black border border-white text-white sm:text-xs xl:text-base rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                                    {coverImage === album_placeholder ? "Choose Cover" : "Change Cover"}
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                            <div className='flex flex-col w-1/2 ml-2 xs:gap-2 xl:gap-4'>
                                <div className="relative group">
                                        <input
                                            type="text"
                                            className="w-full bg-transparent xs:text-md xl:text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Album Name"
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
                                            className="w-full bg-transparent xs:text-md xl:text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Artist"
                                            value={artist}
                                            onFocus={() => setArtistFocus(true)}
                                            onBlur={() => setArtistFocus(false)}
                                            onChange={(e) => setArtist(e.target.value)}
                                        />
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${artistFocus ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <textarea
                                            className="w-full bg-transparent xs:text-md xl:text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Comments"
                                            value={comments}
                                            onFocus={() => setCommentFocus(true)}
                                            onBlur={() => setCommentFocus(false)}
                                            onChange={(e) => setComments(e.target.value)}
                                            rows={3}
                                        />
                                        <span
                                            className={`absolute bottom-1.5 left-0 h-[2px] bg-white transition-all duration-300 ${commentFocus ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="number"
                                            className="w-full bg-transparent xs:text-md xl:text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
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
                                <div className='flex flex-row flex-wrap gap-2 xs:max-h-16 xl:max-h-32 overflow-scroll'>
                                    {genre_list.slice().sort().map((genre, index) => (
                                        <div onClick={() => handleGenreSwitch(genre)} key={index} className={genres.includes(genre) ? `px-2 py-1 rounded-lg text-white xs:text-xs xl:text-base font-bold ${returnColor(genre)} cursor-pointer opacity-100 transition-all duration-300 ease-in-out hover:opacity-30` :
                                            `cursor-pointer px-2 py-1 rounded-lg bg-black text-white xs:text-xs xl:text-base transition-all duration-300 ease-in-out ${returnColor(genre)} hover:opacity-100 opacity-30`}>
                                            {genre}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-full items-center'>
                            {!user && <p className='text-red-600 sm:text-[0.5rem] xl:text-base'>You are not authenticated.</p>}
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
                                    "Update Album"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    );
}
