"use client"

import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/header';
import PoppingLetters from '../components/poppingLetters';
import fetchGames from "../../../utils/fetchGames"
import GameForm from '../components/gameModal';
import FadeInSection from '../components/fadeIn';
import ImageTrack from '../components/ImageTrack';
import SignInForm from '../components/signIn';
import DeleteGames from '../components/deleteGames';
import UpdateGamesModal from '../components/updateGames';

export default function GamesRanking() {
    const [games, setGames] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true)
    const gameRefs = useRef<any>([]);

    useEffect(() => {
        const getGames = async () => {
            const data = await fetchGames();
            if (data) {
                setGames(data);
                gameRefs.current = data.map(() => React.createRef());
            }
            setLoading(false);
        };

        getGames();
    }, []);

    const scrollToGames = (index: any) => {
        if (gameRefs.current[index]) {
            gameRefs.current[index].current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col w-full h-full items-center'>
            <Header />
            <SignInForm/>
            <div className="relative flex items-center justify-center w-full h-[80vh] mt-10 overflow-hidden">
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
                <PoppingLetters text="Video Games" className="absolute text-white text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className='mt-4'>
                <ImageTrack data={games} onImageClick={scrollToGames} />
            </div>
            <div className="flex flex-col w-4/5 mt-8">
                <GameForm/>
                <p>*Disclaimer: This is just my opinion and what I enjoyed playing the most regardless of critical bias. </p>
                <hr className="border-t border-gray-300" />
                {games.map((game: any, index: number) => (
                    <FadeInSection 
                    key={game.id || `${game.name}-${game.studio}-${index}`} 
                    ref={gameRefs.current[index]}
                    className="flex flex-col space-y-4 mt-8">
                        <div className="flex flex-row">
                            <h2 className="text-xl font-semibold mr-4">{game.rank}.</h2>
                            <img
                                src={game.image}
                                alt={`${game.name} album cover`}
                                className={`w-[30rem] h-[30rem] min-w-[30rem] min-h-[30rem] object-cover mb-4 transform transition-transform hover:scale-105 duration-300 ${isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                            }`}
                                onLoadedData={e => setIsLoading(false)}
                            />
                            <div className='ml-4 w-full'>
                            <div className='flex flex-row w-full justify-between'>
                                    <p className="text-6xl text-white">{game.name}</p>
                                    <div className='flex flex-row items-center gap-2'>
                                        <DeleteGames id={game.id} rank={game.rank} />
                                        <UpdateGamesModal game={game}/>
                                    </div>
                                </div>                                <p className="text-3xl text-gray-400">{game.studio}</p>
                                <p className="text-lg mt-2">{game.comments}</p>
                            </div>
                        </div>
                        {index < games.length - 1 && <hr className="border-t border-gray-300 my-4" />}
                    </FadeInSection>
                ))}
            </div>

        </div>
    );
}
