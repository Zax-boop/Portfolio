"use client"

import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/header';
import fetchAnime from "../../../utils/fetchAnime";
import PoppingLetters from '../components/poppingLetters';
import AnimeForm from '../components/animeModal';
import FadeInSection from '../components/fadeIn';
import ImageTrack from '../components/ImageTrack';
import DeleteAnime from '../components/deleteAnime';

export default function Anime() {
    const [animeList, setAnimeList] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true)
    const animeRefs = useRef<any>([]);

    useEffect(() => {
        const getAnime = async () => {
            const data = await fetchAnime();
            if (data) {
                setAnimeList(data);
                animeRefs.current = data.map(() => React.createRef());
            }
            setLoading(false);
        };

        getAnime();
    }, []);

    const scrollToAnime = (index: any) => {
        if (animeRefs.current[index]) {
            animeRefs.current[index].current.scrollIntoView({
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
            <div className="relative flex items-center justify-center w-full h-[80vh] mt-10 overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    <video
                        src={"/cb.mp4"}
                        autoPlay
                        loop
                        muted
                        className={`w-full h-full object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                            }`}
                        onLoadedData={() => setIsLoading(false)}
                    />
                </div>
                <PoppingLetters text="Anime" className="absolute text-white text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className='mt-4'>
                <ImageTrack data={animeList} onImageClick={scrollToAnime} />
            </div>
            <div className="flex flex-col w-4/5 mt-8">
                <AnimeForm />
                <p>*Disclaimer: This is just my opinion and what I enjoyed watching the most regardless of critical bias.</p>
                <hr className="border-t border-gray-300" />
                {animeList.map((anime: any, index: number) => (
                    <FadeInSection key={anime.id || `${anime.name}-${anime.artist}-${index}`}
                        ref={animeRefs.current[index]}
                        className="flex flex-col space-y-4 mt-8">
                        <div className="flex flex-row">
                            <h2 className="text-xl font-semibold mr-4">{anime.rank}.</h2>
                            <img
                                src={anime.image}
                                alt={`${anime.name} cover`}
                                className={`w-[30rem] h-[30rem] min-w-[30rem] min-h-[30rem] object-cover mb-4 transform transition-transform hover:scale-105 duration-300 ${isLoading
                                    ? "scale-110 blur-2xl grayscale"
                                    : "scale-100 blur-0 grayscale-0"
                                    }`}
                                onLoadedData={e => setIsLoading(false)}
                            />
                            <div className='ml-4 w-full'>
                                <div className='flex flex-row w-full justify-between'>
                                    <p className="text-6xl text-white">{anime.name}</p>
                                    <DeleteAnime id={anime.id} rank={anime.rank} />
                                </div>
                                <p className="text-3xl text-gray-400">{anime.studio}</p>
                                <p className="text-lg mt-2">{anime.comments}</p>
                            </div>
                        </div>
                        {index < animeList.length - 1 && <hr className="border-t border-gray-300 my-4" />}
                    </FadeInSection>
                ))}
            </div>

        </div>
    );
}
