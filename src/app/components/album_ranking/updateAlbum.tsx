"use client"

import { useState, useEffect } from 'react';
import updateAlbum from '../../../../utils/album_ranking/updateAlbum';
import album_placeholder from "../../../../public/album_placeholder.png";
import Image, { StaticImageData } from 'next/image';
import supabase from "../../../../utils/general/supabaseclient";
import { User } from '@supabase/supabase-js';
import { Pencil } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

interface Genre {
    id: string;
    title: string;
    alias: string;
    color: string;
}

export default function UpdateAlbumModal({ album }: {
    album: {
        name: string;
        artist: string;
        comment: string;
        image: string;
        Rank: number;
        genres: string[];
        recommender: string;
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
    const [allGenres, setAllGenres] = useState<Genre[]>([]);
    const [coverImage, setCoverImage] = useState<string | StaticImageData>(album?.image || album_placeholder);
    const [nameFocus, setNameFocus] = useState(false);
    const [artistFocus, setArtistFocus] = useState(false);
    const [commentFocus, setCommentFocus] = useState(false);
    const [rankFocus, setRankFocus] = useState(false);
    const [recommender, setRecommender] = useState(album?.recommender || '');
    const [recommenderFocus, setRecommenderFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    const [showAddGenre, setShowAddGenre] = useState(false);
    const [newGenreTitle, setNewGenreTitle] = useState("");
    const [newGenreColor, setNewGenreColor] = useState("#3b82f6");
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

    useEffect(() => {
        if (album) {
            setName(album.name || '');
            setArtist(album.artist || '');
            setComments(album.comment || '');
            setRank(album.Rank || '');
            setCoverImage(album.image || album_placeholder);
            setRecommender(album.recommender || '');
        }
    }, [album]);

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
            const updatedFields = {
                name,
                artist,
                comment: comments,
                imageFile,
                Rank: Number(rank),
                genres,
                recommender
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

    const handleGenreSwitch = (alias: string) => {
        if (genres.includes(alias)) {
            setGenres(genres.filter((g) => g !== alias));
        } else {
            setGenres([...genres, alias]);
        }
    };

    const createGenre = async () => {
        if (!newGenreTitle.trim()) return;

        const alias = newGenreTitle
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[^a-z]/g, "");

        const { error } = await supabase
            .from("genres")
            .insert([
                {
                    title: newGenreTitle.trim(),
                    alias,
                    color: newGenreColor,
                },
            ]);

        if (error) {
            console.error("Error creating genre:", error);
            return;
        }

        // Add locally so user sees it immediately
        setAllGenres((prev) => ({
            ...prev,
            [alias]: {
                title: newGenreTitle.trim(),
                alias,
                color: newGenreColor,
            },
        }));

        setNewGenreTitle("");
        setNewGenreColor("#3b82f6");
        setShowAddGenre(false);
    };

    const deleteGenre = async (id: string) => {
        const confirmed = window.confirm(
            "Delete this genre?"
        );

        if (!confirmed) return;

        const { error } = await supabase
            .from("genres")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
            return;
        }

        setAllGenres((prev) =>
            prev.filter((g) => g.id !== id)
        );
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
                                        type="text"
                                        className="w-full bg-transparent xs:text-md xl:text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                        placeholder="Recommender"
                                        value={recommender}
                                        onFocus={() => setRecommenderFocus(true)}
                                        onBlur={() => setRecommenderFocus(false)}
                                        onChange={(e) => setRecommender(e.target.value)}
                                    />
                                    <span
                                        className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${recommenderFocus ? "w-full" : "w-0"
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
                                <div className="flex flex-row flex-wrap gap-2 max-h-32 overflow-scroll">
                                    {Object.values(allGenres)
                                        .sort((a, b) => a.title.localeCompare(b.title))
                                        .map((genre) => {
                                            const selected = genres.includes(genre.title);

                                            return (
                                                <div
                                                    key={genre.alias}
                                                    className="relative group"
                                                >
                                                    <div
                                                        onClick={() => handleGenreSwitch(genre.title)}
                                                        style={{ backgroundColor: genre.color }}
                                                        className={`px-2 py-1 rounded-lg text-white cursor-pointer transition-all duration-300 ease-in-out ${selected
                                                            ? "font-bold opacity-100 hover:opacity-30"
                                                            : "opacity-30 hover:opacity-100"
                                                            }`}
                                                    >
                                                        {genre.title}
                                                    </div>

                                                    {user && <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteGenre(genre.id);
                                                        }}
                                                        className="absolute -top-2 -right-2 hidden group-hover:flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white text-sm font-bold"
                                                    >
                                                        ×
                                                    </button>}
                                                </div>
                                            );
                                        })}

                                    {/* Add Genre Button */}
                                    {user && <div
                                        onClick={() => setShowAddGenre(true)}
                                        className="px-2 py-1 rounded-lg border border-white text-white cursor-pointer hover:bg-white hover:text-black transition-all"
                                    >
                                        + Add Genre
                                    </div>}
                                </div>
                                {showAddGenre && (
                                    <>
                                        <div
                                            className="absolute inset-0 bg-black/60 z-[9998]"
                                            onClick={() => setShowAddGenre(false)}
                                        />
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] bg-black border border-gray-700 rounded-lg p-4 w-80 flex flex-col gap-3">
                                            <input
                                                type="text"
                                                placeholder="Genre Name"
                                                value={newGenreTitle}
                                                onChange={(e) => setNewGenreTitle(e.target.value)}
                                                className="bg-black border border-gray-700 rounded p-2 text-white"
                                            />

                                            <div className="flex items-center gap-3">
                                                <span>Color:</span>

                                                <input
                                                    type="color"
                                                    value={newGenreColor}
                                                    onChange={(e) => setNewGenreColor(e.target.value)}
                                                    className="w-12 h-12 cursor-pointer"
                                                />

                                                <div
                                                    className="px-3 py-1 rounded-lg text-white"
                                                    style={{ backgroundColor: newGenreColor }}
                                                >
                                                    Preview
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={createGenre}
                                                    className="px-3 py-2 bg-green-600 rounded text-white"
                                                >
                                                    Save Genre
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setShowAddGenre(false)}
                                                    className="px-3 py-2 bg-gray-700 rounded text-white"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
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
