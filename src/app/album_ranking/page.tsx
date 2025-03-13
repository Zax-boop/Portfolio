"use client"

import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/header';
import fetchAlbums from "../../../utils/fetchAlbums";
import PoppingLetters from '../components/poppingLetters';
import AlbumForm from '../components/albumModal';
import FadeInSection from '../components/fadeIn';
import ImageTrack from '../components/ImageTrack';
import DeleteAlbum from '../components/deleteAlbum';
import SignInForm from '../components/signIn';
import UpdateAlbumModal from '../components/updateAlbum';
import MusicGenre from '../components/musicGenre';

export default function Albums() {
    const [albums, setAlbums] = useState<{
        name: string;
        artist: string;
        comment: string;
        image: string;
        Rank: number;
        genres: string[];
        id: string;
    }[]>([]);
    const [filteredMedia, setFilteredMedia] = useState(albums);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const mediaPerPage = 10;
    const indexOfLastMedia = currentPage * mediaPerPage;
    const indexOfFirstMedia = indexOfLastMedia - mediaPerPage;
    const currentMedia = filteredMedia.slice(indexOfFirstMedia, indexOfLastMedia);
    const albumRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
    const searchSectionRef = useRef<HTMLDivElement>(null);
    const switchPage = (pageIndex: number) => {
        if (searchSectionRef.current != null) {
            searchSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
        setCurrentPage(pageIndex + 1);
    };

    useEffect(() => {
        const getAlbums = async () => {
            const data = await fetchAlbums();
            if (data) {
                setAlbums(data);
                setFilteredMedia(data);
                albumRefs.current = data.map(() => React.createRef());
            }
            setLoading(false);
        };
        getAlbums();
    }, []);

    useEffect(() => {
        const search = searchQuery.toLowerCase();
        setFilteredMedia(
            albums.filter(
                (album) =>
                    album.name.toLowerCase().includes(search) ||
                    album.artist.toLowerCase().includes(search) ||
                    album.comment.toLowerCase().includes(search) || 
                    album.genres?.some((genre) => genre.toLowerCase().includes(search))
            )
        );
        setCurrentPage(1);
    }, [searchQuery, albums]);

    const scrollToAlbum = (index: number) => {
        if (albumRefs.current[index]) {
            if (albumRefs.current[index].current) {
                albumRefs.current[index].current.scrollIntoView({
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
            <SignInForm />
            <Header />
            <div className="relative flex items-center justify-center w-full xs:h-[15rem] sm:h-[30rem] xl:h-[80vh] xs:mt-4 sm:mt-10 overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    <div className='w-1/3 h-full'>
                        <video
                            src={"/sweet_trip_mp4.mp4"}
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
                            src={"/nirvana_mp4.mp4"}
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

                    <video
                        src={"/marias_mp4.mp4"}
                        autoPlay
                        loop
                        muted
                        controls={false}
                        playsInline
                        className={`w-1/3 h-full object-cover duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                            }`}
                        onLoadedData={() => setIsLoading(false)}
                    />
                    <video
                        src={"/gorillaz_mp4.mp4"}
                        autoPlay
                        loop
                        muted
                        controls={false}
                        playsInline
                        className={`w-1/3 h-full object-cover duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                            }`}
                        onLoadedData={() => setIsLoading(false)}
                    />
                </div>
                <PoppingLetters text="Albums" className="absolute text-white xs:text-2xl sm:text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className='mt-4'>
                <ImageTrack data={currentMedia} onImageClick={scrollToAlbum} width={`${currentMedia.length == 5 ? `xs:w-[8rem]` : `xs:w-[6.67rem]`} ${currentMedia.length == 6 ? `sm:w-[8rem] 2xl:w-[15rem]` : `sm:w-[10rem] 2xl:w-[20rem]`} ${currentMedia.length == 5 ? `xl:w-[15rem]` : `xl:w-[20rem]`}`} />
            </div>
            <div className="flex flex-col xs:w-[95%] sm:w-4/5 xs:mt-2 sm:mt-8">
                <AlbumForm />
                <p className='xs:text-xs sm:text-base sm:mt-2 xl:mt-0 xs:mb-1 sm:mb-0'>*Disclaimer: This is just my opinion and what I enjoyed listening to the most regardless of critical bias.</p>
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
                <div className="my-4" ref={searchSectionRef}
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search albums..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 text-black"
                    />
                </div>
                <hr className="border-t border-gray-300" />
                {currentMedia.map((album: {
                    name: string;
                    artist: string;
                    comment: string;
                    image: string;
                    Rank: number;
                    genres: string[];
                    id: string;
                }, index: number) => (
                    <FadeInSection
                        key={album.id || `${album.name}-${album.artist}-${index}`}
                        ref={albumRefs.current[index]}
                        className="flex flex-col xl:space-y-4 xs:mt-4 xl:mt-8"
                    >
                        <div className="flex flex-row">
                            <h2 className="xs:text-base sm:text-lg xl:text-xl font-semibold xs:mr-1 sm:mr-2 xl:mr-4">{album.Rank}.</h2>
                            <img
                                src={album.image}
                                alt={`${album.name} album cover`}
                                className={`xs:w-[10rem] xs:h-[10rem] sm:w-[15rem] sm:h-[15rem] xl:w-[30rem] xl:h-[30rem] xs:min-w-[10rem] xs:min-h-[10rem] sm:min-w-[15rem] sm:min-h-[15rem] xl:min-w-[30rem] xl:min-h-[30rem] object-cover mb-4 transform transition-transform hover:scale-105 duration-300 ${isLoading
                                    ? "scale-110 blur-2xl grayscale"
                                    : "scale-100 blur-0 grayscale-0"
                                    }`}
                                onLoad={() => setIsLoading(false)}
                            />
                            <div className='xs:ml-2 sm:ml-4 w-full'>
                                <div className='w-full flex flex-row justify-between'>
                                    <p className="xs:text-xl sm:text-4xl xl:text-6xl text-white">{album.name}</p>
                                    <div className='flex flex-row items-center gap-2'>
                                        <DeleteAlbum id={album.id} Rank={album.Rank} />
                                        <UpdateAlbumModal album={album} />
                                    </div>
                                </div>
                                <p className="xs:text-base sm:text-lg xl:text-3xl text-gray-400">{album.artist}</p>
                                <p className="xs:text-[0.5rem] sm:text-sm xl:text-lg xs:mt-0.5 sm:mt-1 xl:mt-2">{album.comment}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {album.genres?.slice().sort().map((genre, index) => (
                                        <MusicGenre genre={genre} key={index} />
                                    ))}
                                </div>
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