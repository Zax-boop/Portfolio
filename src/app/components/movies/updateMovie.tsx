"use client"

import { useState, useEffect } from 'react';
import updateMovie from '../../../../utils/movies/updateMovie';
import show_placeholder from "../../../../public/show_placeholder.svg";
import Image, { StaticImageData } from 'next/image';
import supabase from "../../../../utils/general/supabaseclient";
import { User } from '@supabase/supabase-js';
import { Pencil } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

export default function UpdateMovieModal({ movie }: {
    movie: {
        name: string;
        director: string;
        comments: string;
        image: string;
        genres: string[];
        id: string;
    }
}) {
    const isTablet = useMediaQuery({ query: '(max-width: 1025px)' })
    const [name, setName] = useState(movie?.name || '');
    const [director, setDirector] = useState(movie?.director || '');
    const [comments, setComments] = useState(movie?.comments || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [genres, setGenres] = useState(movie?.genres || []);
    const [coverImage, setCoverImage] = useState<string | StaticImageData>(movie?.image || show_placeholder);
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
        if (movie) {
            setName(movie.name || '');
            setDirector(movie.director || '');
            setComments(movie.comments || '');
            setGenres(movie.genres || []);
            setCoverImage(movie.image || show_placeholder);
        }
    }, [movie]);

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
                director,
                comments: comments,
                genres,
                imageFile,
            };
            await updateMovie(movie.id, updatedFields);
        } catch (error) {
            console.error("Error updating movie:", error);
        } finally {
            setLoading(false);
            setModalOpen(false)
            window.location.reload();
        }
    };

    const genreColors: { [key: string]: string } = {
        action: "bg-orange-700",
        adventure: "bg-orange-500",
        animated: "bg-blue-400",
        biographical: "bg-yellow-600",
        blackcomedy: "bg-purple-700",
        comedy: "bg-yellow-400",
        crime: "bg-gray-800",
        cyberpunk: "bg-blue-900",
        dark: "bg-gray-900",
        documentary: "bg-blue-300",
        drama: "bg-red-300",
        fantasy: "bg-purple-500",
        french: "bg-blue-800",
        historical: "bg-yellow-700",
        hongkongcinema: "bg-red-700",
        horror: "bg-gray-800",
        indian: "bg-orange-800",
        martialarts: "bg-red-600",
        mystery: "bg-blue-700",
        neonoir: "bg-gray-700",
        noir: "bg-gray-900",
        political: "bg-red-800",
        psychological: "bg-indigo-600",
        reality: "bg-green-700",
        romance: "bg-red-400",
        scifi: "bg-blue-600",
        sitcom: "bg-yellow-500",
        sliceoflife: "bg-green-400",
        sports: "bg-green-600",
        thriller: "bg-red-900",
        western: "bg-amber-600"
    };

    const genre_list = [
        "Action",
        "Adventure",
        "Animated",
        "Biographical",
        "Black Comedy",
        "Comedy",
        "Crime",
        "Cyberpunk",
        "Dark",
        "Documentary",
        "Drama",
        "Fantasy",
        "French",
        "Indian",
        "Historical",
        "Hong Kong Cinema",
        "Horror",
        "Martial Arts",
        "Mystery",
        "Neo-noir",
        "Noir",
        "Political",
        "Psychological",
        "Reality",
        "Romance",
        "Sci-fi",
        "Sitcom",
        "Slice of Life",
        "Sports",
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
            <div onClick={() => setModalOpen(true)} className='hover:bg-blue-400 cursor-pointer transition duration-300 ease-in-out p-1 rounded-lg self-start'>
                <Pencil />
            </div>
            {modalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-black w-full sm:max-w-[40rem] xl:max-w-[50rem] sm:p-2 xl:p-4  rounded-lg shadow-lg relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setModalOpen(false)}
                    >
                        ✕
                    </button>
                    <h2 className="sm:text-xs xl:text-xl font-bold sm:mb-2 xl:mb-4">Edit Movie</h2>
                    <form onSubmit={handleSubmit} className="sm:space-y-1 xl:space-y-4 flex w-full flex-col">
                        <div className='flex flex-row w-full'>
                            <div className='w-1/2 self-start flex flex-col items-center sm:gap-2 xl:gap-3'>
                                <Image
                                    src={coverImage}
                                    width={isTablet ? 130 : 300}
                                    height={isTablet ? 130 : 300}
                                    alt='movie cover'
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
                                <input
                                    type="text"
                                    className="w-full bg-transparent sm:text-sm xl:text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                    placeholder="Movie Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="w-full bg-transparent sm:text-sm xl:text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                    placeholder="Director"
                                    value={director}
                                    onChange={(e) => setDirector(e.target.value)}
                                />
                                <textarea
                                    className="w-full bg-transparent sm:text-sm xl:text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                    placeholder="Comments"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    rows={3}
                                />
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
                                    "Update Movie"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    );
}
