"use client"

import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/general/header';
import PoppingLetters from '../components/general/poppingLetters';
import fetchGames from "../../../utils/games/fetchGames"
import GameForm from '../components/games/gameModal';
import FadeInSection from '../components/general/fadeIn';
import ImageTrack from '../components/general/ImageTrack';
import SignInForm from '../components/general/signIn';
import DeleteGames from '../components/games/deleteGames';
import UpdateGamesModal from '../components/games/updateGames';
import ReadMore from '../components/general/readMore';
import GameGenre from '../components/games/gameGenre';
import GameRecommendations from '../components/games/gameRecommendations';
import GenrePieChart from '../components/general/genrePieChart';

export default function GamesRanking() {
    const [games, setGames] = useState<{
        name: string;
        studio: string;
        image: string;
        comments: string;
        rank: number;
        genres: string[];
        id: string;
    }[]>([]);
    const [filteredMedia, setFilteredMedia] = useState(games);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const mediaPerPage = 10;
    const indexOfLastMedia = currentPage * mediaPerPage;
    const indexOfFirstMedia = indexOfLastMedia - mediaPerPage;
    const currentMedia = filteredMedia.slice(indexOfFirstMedia, indexOfLastMedia);
    const gameRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
    const [showRecommendations, setShowRecommendations] = useState(false);

    const searchSectionRef = useRef<HTMLDivElement>(null);
    const switchPage = (pageIndex: number) => {
        if (searchSectionRef.current != null) {
            searchSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
        setCurrentPage(pageIndex + 1);
    };

    useEffect(() => {
        const getGames = async () => {
            const data = await fetchGames();
            if (data) {
                setGames(data);
                setFilteredMedia(data);
                gameRefs.current = data.map(() => React.createRef());
            }
            setLoading(false);
        };

        getGames();
    }, []);

    useEffect(() => {
        const raw = searchQuery.toLowerCase();
        const isNameOnly = raw.startsWith("%");
        const search = isNameOnly ? raw.slice(1) : raw;

        if (isNameOnly) {
            setFilteredMedia(
                games.filter((game) => game.name.toLowerCase() === search)
            );
        } else {
            setFilteredMedia(
                games.filter(
                    (game) =>
                        game.name.toLowerCase().includes(search) ||
                        game.studio.toLowerCase().includes(search) ||
                        game.comments.toLowerCase().includes(search) ||
                        game.genres?.some((genre) => genre.toLowerCase().includes(search))
                )
            );
        }

        setCurrentPage(1);
    }, [searchQuery, games]);

    const scrollToGames = (index: number) => {
        if (gameRefs.current[index]) {
            if (gameRefs.current[index].current) {
                gameRefs.current[index].current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const totalPages = Math.ceil(filteredMedia.length / mediaPerPage);
    const topRankedGames = games.slice(0, Math.ceil(games.length * 0.75));

    const getRecommendedGames = (currentGame: { genres: string[]; rank: number; id: string }) => {
        const genreEquivalents: Record<string, string[]> = {
            Soulsborne: ['Soulslike'],
            Soulslike: ['Soulsborne'],
        };

        const expandGenres = (genres: string[]) => {
            const expanded = new Set<string>(genres);
            for (const genre of genres) {
                if (genreEquivalents[genre]) {
                    genreEquivalents[genre].forEach(eq => expanded.add(eq));
                }
            }
            return Array.from(expanded);
        };

        const currentGenresExpanded = expandGenres(currentGame.genres);

        return topRankedGames
            .filter(game => game.id !== currentGame.id)
            .map(game => {
                const gameGenresExpanded = expandGenres(game.genres);
                const genreMatchCount = gameGenresExpanded.filter(genre =>
                    currentGenresExpanded.includes(genre)
                ).length;
                return {
                    ...game,
                    genreMatchCount,
                };
            })
            .filter(game => {
                const requiredMatches = Math.min(4, currentGame.genres.length);
                return game.genreMatchCount >= requiredMatches;
            })
            .sort((a, b) => b.genreMatchCount - a.genreMatchCount);
    };

    const recSelect = (name: string) => {
        setShowRecommendations(false);
        setSearchQuery(`%${name}`);
    };

    return (
        <div className='flex flex-col w-full h-full items-center'>
            <Header />
            <SignInForm />
            <div className="relative flex items-center justify-center w-full xs:h-[15rem] sm:h-[30rem] xl:h-[80vh] xs:mt-4 sm:mt-10 overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    <div className='w-1/3 h-full'>
                        <video
                            src={"/sekiro_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            controls={false}
                            playsInline
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                        <video
                            src={"/cloud_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            controls={false}
                            playsInline
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                    </div>
                    <div className='w-1/3 h-full'>
                        <video
                            src={"/hades2_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            controls={false}
                            playsInline
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                        <video
                            src={"/ror2_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            controls={false}
                            playsInline
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                    </div>
                    <div className='w-1/3 h-full'>
                        <video
                            src={"/mario_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            controls={false}
                            playsInline
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                        <video
                            src={"/cuphead_mp4.mp4"}
                            autoPlay
                            loop
                            muted
                            controls={false}
                            playsInline
                            className={`w-full h-1/2 object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setIsLoading(false)}
                        />
                    </div>
                </div>
                <PoppingLetters text="Video Games" className="absolute text-white xs:text-2xl sm:text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className='mt-4'>
                <ImageTrack data={currentMedia} onImageClick={scrollToGames} width={`${currentMedia.length == 5 ? `xs:w-[8rem]` : `xs:w-[6.67rem]`} ${currentMedia.length == 6 ? `sm:w-[8rem] 2xl:w-[15rem]` : `sm:w-[10rem] 2xl:w-[20rem]`} ${currentMedia.length == 5 ? `xl:w-[15rem]` : `xl:w-[20rem]`}`} />
            </div>
            <div className="relative flex xs:w-40 md:w-80 border border-white xs:text-xs md:text-base rounded-full overflow-hidden xs:mt-2 sm:mt-8">
                <div
                    className={`absolute top-0 bottom-0 w-1/2 bg-white rounded-full transition-transform duration-300`}
                    style={{
                        transform: showRecommendations ? "translateX(100%)" : "translateX(0%)",
                    }}
                />
                <button
                    onClick={() => setShowRecommendations(false)}
                    className={`relative flex-1 xs:py-1 md:py-2 text-center font-medium transition-colors duration-300
      ${!showRecommendations ? "text-black" : "text-white hover:text-gray-300 hover:scale-105"}
    `}
                >
                    Rankings
                </button>
                <button
                    onClick={() => (setShowRecommendations(true), setSearchQuery(""))}
                    className={`relative flex-1 xs:py-1 md:py-2 text-center font-medium transition-colors duration-300
      ${showRecommendations ? "text-black" : "text-white hover:text-gray-300 hover:scale-105"}
    `}
                >
                    Recs
                </button>
            </div>
            {showRecommendations ? <GameRecommendations games={games} recSelect={recSelect} /> :
                <div className="flex flex-col xs:w-[95%] sm:w-4/5 xs:mt-2 sm:mt-2">
                    <GameForm />
                    <p className='xs:text-xs sm:text-base sm:mt-2 xl:mt-0 xs:mb-1 sm:mb-0'>*Disclaimer: This is just my opinion and what I enjoyed playing the most regardless of critical bias. </p>
                    <div className='flex flex-row w-full justify-center'>
                        <GenrePieChart genresList={games?.map((game) => game.genres)} />
                    </div>
                    <div className="flex flex-row flex-wrap justify-start mt-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`px-3 py-1 mx-1 my-1 ${currentPage === i + 1
                                    ? "bg-white text-black border-[1px] border-white"
                                    : "bg-black border-[1px] border-white text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                                    }`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <div className="my-4" ref={searchSectionRef}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search games..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 text-black"
                        />
                    </div>
                    <hr className="border-t border-gray-300" />
                    {currentMedia.map((game: {
                        name: string;
                        studio: string;
                        image: string;
                        comments: string;
                        rank: number;
                        genres: string[];
                        id: string;
                    }, index: number) => {
                        const recommendedGames = getRecommendedGames(game);
                        return (
                            <FadeInSection
                                key={game.id || `${game.name}-${game.studio}-${index}`}
                                ref={gameRefs.current[index]}
                                className="flex flex-col xl:space-y-4 xs:mt-4 xl:mt-8">
                                <div className="relative flex flex-row rounded-2xl p-2">
                                    {game.rank <= 3 && (
                                        <div
                                            className={`
                                                        absolute inset-0 rounded-2xl blur-xl opacity-5 animate-softGlow
                                                        ${game.rank === 1 ? "bg-yellow-400" : ""}
                                                        ${game.rank === 2 ? "bg-gray-300" : ""}
                                                        ${game.rank === 3 ? "bg-amber-600" : ""}
                                                    `}
                                            style={{ zIndex: -1 }}
                                        />
                                    )}
                                    <h2 className="xs:text-base sm:text-lg xl:text-xl font-semibold xs:mr-1 sm:mr-2 xl:mr-4">{game.rank}.</h2>
                                    <img
                                        src={game.image}
                                        alt={`${game.name} album cover`}
                                        className={`xs:w-[10rem] xs:h-[10rem] sm:w-[15rem] sm:h-[15rem] xl:w-[30rem] xl:h-[30rem] xs:min-w-[10rem] xs:min-h-[10rem] sm:min-w-[15rem] sm:min-h-[15rem] xl:min-w-[30rem] xl:min-h-[30rem] object-cover mb-4 transform transition-transform hover:scale-105 duration-300 ${isLoading
                                            ? "scale-110 blur-2xl grayscale"
                                            : "scale-100 blur-0 grayscale-0"
                                            }`}
                                        onLoadedData={() => setIsLoading(false)}
                                    />
                                    <div className='xs:ml-2 sm:ml-4 w-full'>
                                        <div className='flex flex-row w-full justify-between'>
                                            <p className="xs:text-xl sm:text-4xl xl:text-6xl text-white">{game.name}</p>
                                            <div className='flex flex-row items-center gap-2'>
                                                <DeleteGames id={game.id} rank={game.rank} />
                                                <UpdateGamesModal game={game} />
                                            </div>
                                        </div>
                                        <p className="xs:text-base sm:text-lg xl:text-3xl text-gray-400">{game.studio}</p>
                                        <ReadMore text={game.comments} className="xs:text-[0.5rem] sm:text-sm xl:text-lg xs:mt-0.5 sm:mt-1 xl:mt-2" />
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {game.genres?.slice().sort().map((genre, index) => (
                                                <div onClick={() => setSearchQuery(genre)} key={index}>
                                                    <GameGenre genre={genre} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex flex-col gap-2 mt-2'>
                                            <p className="xs:text-sm sm:text-lg xl:text-xl text-gray-400">If you like this game:</p>
                                            <div className="flex flex-row flex-wrap gap-2">
                                                {recommendedGames.map(recGame => (
                                                    <div onClick={() => setSearchQuery(recGame.name)} key={recGame.id} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                        <img src={recGame.image} alt={recGame.name} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {index < currentMedia.length - 1 && <hr className="border-t border-gray-300 xs:my-1 sm:my-2 xl:my-4" />}
                            </FadeInSection>
                        )
                    })}
                    <div className="flex flex-row flex-wrap justify-start mt-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`px-3 py-1 xs:mx-1 sm:mx-1.5 xs:my-1 sm:my-1.5 ${currentPage === i + 1
                                    ? "bg-white text-black border-[1px] border-white"
                                    : "bg-black border-[1px] border-white text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                                    }`}
                                onClick={() => switchPage(i)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}
