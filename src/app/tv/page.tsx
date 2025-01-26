"use client"

import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/header';
import PoppingLetters from '../components/poppingLetters';
import fetchTV from "../../../utils/fetchTV"
import TVForm from '../components/tvModal';
import FadeInSection from '../components/fadeIn';
import ImageTrack from '../components/ImageTrack';
import SignInForm from '../components/signIn';
import DeleteTV from '../components/deleteTV';
import UpdateTVModal from '../components/updateTV';

export default function TVRanking() {
    const [tv, setTV] = useState<{
        name: string;
        director: string;
        comments: string;
        image: string;
        rank: number;
        id: string;
    }[]>([]);
    const [filteredMedia, setFilteredMedia] = useState(tv);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const mediaPerPage = 10;
    const indexOfLastMedia = currentPage * mediaPerPage;
    const indexOfFirstMedia = indexOfLastMedia - mediaPerPage;
    const currentMedia = filteredMedia.slice(indexOfFirstMedia, indexOfLastMedia);

    const showRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

    const searchSectionRef = useRef<HTMLDivElement>(null);
    const switchPage = (pageIndex: number) => {
        if (searchSectionRef.current != null) {
            searchSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
        setCurrentPage(pageIndex + 1);
    };

    useEffect(() => {
        const getTV = async () => {
            const data = await fetchTV();
            if (data) {
                setTV(data);
                setFilteredMedia(data);
                showRefs.current = data.map(() => React.createRef());
            }
            setLoading(false);
        };
        getTV();
    }, []);

    useEffect(() => {
        const search = searchQuery.toLowerCase();
        setFilteredMedia(
            tv.filter(
                (show) =>
                    show.name.toLowerCase().includes(search) ||
                    show.director.toLowerCase().includes(search) ||
                    show.comments.toLowerCase().includes(search)
            )
        );
        setCurrentPage(1);
    }, [searchQuery, tv]);

    const scrollToShows = (index: number) => {
        if (showRefs.current[index]) {
            if (showRefs.current[index].current) {
                showRefs.current[index].current.scrollIntoView({
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

    return (
        <div className='flex flex-col w-full h-full items-center'>
            <Header />
            <SignInForm />
            <div className="relative flex items-center justify-center w-full xs:h-[15rem] sm:h-[30rem] xl:h-[80vh] xs:mt-4 sm:mt-10  overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    <div className='w-1/2 h-full'>
                        <video
                            src={"/breaking_bad_mp4.mp4"}
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
                            src={"/bojack_mp4.mp4"}
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
                    <div className='w-1/2 h-full'>
                        <video
                            src={"/sopranos_mp4.mp4"}
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
                            src={"/hill_house_mp4.mp4"}
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
                <PoppingLetters text="TV Shows" className="absolute text-white xs:text-2xl sm:text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className='mt-4'>
                <ImageTrack data={currentMedia} onImageClick={scrollToShows} width={`${currentMedia.length == 5 ? `xs:w-[8rem]` : `xs:w-[6.67rem]`} ${currentMedia.length == 6 ? `sm:w-[8rem]` : `sm:w-[10rem]`} ${currentMedia.length == 5 ? `xl:w-[15rem]` : `xl:w-[20rem]`}`} />
            </div>
            <div className="flex flex-col xs:w-[95%] sm:w-4/5 xs:mt-2 sm:mt-8">
                <TVForm />
                <p className='xs:text-xs sm:text-base sm:mt-2 xl:mt-0 xs:mb-1 sm:mb-0'>*Disclaimer: This is just my opinion and what I enjoyed watching the most regardless of critical bias. </p>
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
                        placeholder="Search books..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 text-black"
                    />
                </div>
                <hr className="border-t border-gray-300" />
                {currentMedia.map((show: {
                    name: string;
                    director: string;
                    comments: string;
                    image: string;
                    rank: number;
                    id: string;
                }, index: number) => (
                    <FadeInSection
                        key={show.id || `${show.name}-${show.director}-${index}`}
                        ref={showRefs.current[index]}
                        className="flex flex-col xl:space-y-4 xs:mt-4 xl:mt-8">
                        <div className="flex flex-row">
                            <h2 className="xs:text-base sm:text-lg xl:text-xl font-semibold xs:mr-1 sm:mr-2 xl:mr-4">{show.rank}.</h2>
                            <img
                                src={show.image}
                                alt={`${show.name} album cover`}
                                className={`xs:w-[10rem] xs:h-[10rem] sm:w-[15rem] sm:h-[15rem] xl:w-[30rem] xl:h-[30rem] xs:min-w-[10rem] xs:min-h-[10rem] sm:min-w-[15rem] sm:min-h-[15rem] xl:min-w-[30rem] xl:min-h-[30rem] object-cover mb-4 transform transition-transform hover:scale-105 duration-300 ${isLoading
                                    ? "scale-110 blur-2xl grayscale"
                                    : "scale-100 blur-0 grayscale-0"
                                    }`}
                                onLoad={() => setIsLoading(false)}
                            />
                            <div className='xs:ml-2 sm:ml-4 w-full'>
                                <div className='flex flex-row w-full justify-between'>
                                    <p className="xs:text-xl sm:text-4xl xl:text-6xl text-white">{show.name}</p>
                                    <div className='flex flex-row items-center gap-2'>
                                        <DeleteTV id={show.id} rank={show.rank} />
                                        <UpdateTVModal tv={show} />
                                    </div>
                                </div>
                                <p className="xs:text-base sm:text-lg xl:text-3xl text-gray-400">{show.director}</p>
                                <p className="xs:text-[0.5rem] sm:text-sm xl:text-lg xs:mt-0.5 sm:mt-1 xl:mt-2">{show.comments}</p>
                            </div>
                        </div>
                        {index < currentMedia.length - 1 && <hr className="border-t border-gray-300 xs:my-1 sm:my-2 xl:my-4" />}
                    </FadeInSection>
                ))}
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
        </div>
    );
}
