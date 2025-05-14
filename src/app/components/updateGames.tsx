"use client"

import { useState, useEffect } from 'react';
import updateGames from '../../../utils/updateGames';
import game_placeholder from "../../../public/game_placeholder.jpg";
import Image, { StaticImageData } from 'next/image';
import supabase from "../../../utils/supabaseclient";
import { User } from '@supabase/supabase-js';
import { Pencil } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

export default function UpdateGamesModal({ game }: {
    game: {
        name: string;
        studio: string;
        image: string;
        comments: string;
        rank: number;
        genres: string[];
        id: string;
    }
}) {
    const isTablet = useMediaQuery({ query: '(max-width: 1025px)' })
    const [name, setName] = useState(game?.name || '');
    const [studio, setStudio] = useState(game?.studio || '');
    const [comments, setComments] = useState(game?.comments || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [rank, setRank] = useState(game?.rank || '');
    const [genres, setGenres] = useState<string[]>(game?.genres || []);
    const [coverImage, setCoverImage] = useState<string | StaticImageData>(game?.image || game_placeholder);
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
        if (game) {
            setName(game.name || '');
            setStudio(game.studio || '');
            setComments(game.comments || '');
            setRank(game.rank || '');
            setCoverImage(game.image || game_placeholder);
            setGenres(game.genres || []);
        }
    }, [game]);

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
                genres,
            };
            await updateGames(game.id, updatedFields);
        } catch (error) {
            console.error("Error updating game:", error);
        } finally {
            setLoading(false);
            setModalOpen(false)
            window.location.reload();
        }
    };

    const genreColors: { [key: string]: string } = {
        action: "bg-red-700",
        adventure: "bg-orange-500",
        arcade: "bg-pink-600",
        beatemup: "bg-yellow-700",
        boomershooter: "bg-red-900",
        card: "bg-amber-500",
        citybuilder: "bg-green-600",
        coop: "bg-blue-600",
        crafting: "bg-lime-500",
        detective: "bg-gray-700",
        dungeoncrawler: "bg-purple-900",
        educational: "bg-indigo-400",
        farming: "bg-green-500",
        fighting: "bg-red-600",
        fps: "bg-gray-800",
        horror: "bg-black",
        jrpg: "bg-pink-700",
        metroidvania: "bg-purple-700",
        mmorpg: "bg-blue-900",
        music: "bg-yellow-500",
        openworld: "bg-green-700",
        party: "bg-teal-500",
        platformer: "bg-orange-600",
        pointandclick: "bg-teal-400",
        postapocalyptic: "bg-gray-900",
        puzzle: "bg-blue-400",
        racing: "bg-orange-400",
        rhythm: "bg-pink-500",
        roguelike: "bg-gray-600",
        rpg: "bg-purple-500",
        sandbox: "bg-yellow-600",
        scifi: "bg-blue-600",
        simulation: "bg-green-400",
        soulsborne: "bg-gray-500",
        soulslike: "bg-gray-700",
        sports: "bg-emerald-600",
        stealth: "bg-zinc-800",
        strategy: "bg-indigo-700",
        survival: "bg-amber-700",
        tacshooter: "bg-cyan-700",
        thirdpersonshooter: "bg-slate-800",
        towerdefense: "bg-cyan-500",
        turnbased: "bg-sky-600",
        visualnovel: "bg-rose-500",
    };

    const genre_list = [
        "Action", "Adventure", "Arcade", "Beat 'Em Up", "Boomer Shooter", "Card", "City Builder", "Co-Op",
        "Crafting", "Detective", "Dungeon Crawler", "Educational", "Farming", "Fighting", "FPS", "Horror",
        "JRPG", "Metroidvania", "MMORPG", "Music", "Open World", "Party", "Platformer", "Point and Click",
        "Post-Apocalyptic", "Puzzle", "Racing", "Rhythm", "Roguelike", "RPG", "Sandbox", "Sci-Fi", "Simulation", "Soulsborne",
        "Soulslike", "Sports", "Stealth", "Strategy", "Survival", "Tac Shooter", "Third Person Shooter",
        "Tower Defense", "Turn-Based", "Visual Novel"
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
                    <h2 className="tsm:text-xs xl:text-xl font-bold sm:mb-2 xl:mb-4">Edit Game</h2>
                    <form onSubmit={handleSubmit} className="sm:space-y-1 xl:space-y-4 flex w-full flex-col">
                        <div className='flex flex-row w-full'>
                            <div className='w-1/2 self-start flex flex-col items-center sm:gap-2 xl:gap-3'>
                                <Image
                                    src={coverImage}
                                    width={isTablet ? 130 : 300}
                                    height={isTablet ? 130 : 300}
                                    alt='game cover'
                                    className='transform transition-transform hover:scale-105 duration-300 sm:w-[8.125rem] sm:h-[8.125rem] xl:w-[18.75rem] xl:h-[18.75rem] object-cover'
                                />
                                <label className="flex flex-row justify-center items-center gap-2 sm:px-2 xl:px-3 sm:py-1 xl:py-2 bg-black border border-white text-white sm:text-xs xl:text-base rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                                    {coverImage === game_placeholder ? "Choose Cover" : "Change Cover"}
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
                                    placeholder="Game Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="w-full bg-transparent sm:text-sm xl:text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                    placeholder="Studio"
                                    value={studio}
                                    onChange={(e) => setStudio(e.target.value)}
                                />
                                <textarea
                                    className="w-full bg-transparent sm:text-sm xl:text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                    placeholder="Comments"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    rows={3}
                                />
                                <input
                                    type="number"
                                    className="w-full bg-transparent sm:text-sm xl:text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                    placeholder="Rank"
                                    value={rank}
                                    onChange={(e) => setRank(e.target.value)}
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
                                    "Update Game"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    );
}
