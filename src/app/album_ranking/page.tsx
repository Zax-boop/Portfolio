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
import ReadMore from '../components/readMore';
import Spotify from '../../../public/spotify.png';
import Link from 'next/link';
import GenrePieChart from '../components/genrePieChart';
import AlbumRecommendations from '../components/albumRecommendations';

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
    const badAlbumStatements = ["Seek Help", "Consider Therapy", "You need to talk to someone", "This is a cry for help", "Please, seek help", "This is not okay", "You need to talk to someone about this", "This album is a tough listen...", "Not your best pick.",
        "Maybe give this one a second thought.", "Are you sure about this one?"];
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
    const [showRecommendations, setShowRecommendations] = useState(false);

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
        const raw = searchQuery.toLowerCase();
        const isNameOnly = raw.startsWith("%");
        const search = isNameOnly ? raw.slice(1) : raw;

        if (isNameOnly) {
            setFilteredMedia(
                albums.filter((album) => album.name.toLowerCase() === search)
            );
        } else {
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
        }
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
    const topRankedAlbums = albums.slice(0, Math.ceil(albums.length * 0.45));

    const getRecommendedAlbums = (currentAlbum: { genres: string[]; Rank: number; id: string }) => {
        return topRankedAlbums
            .filter(album => album.id !== currentAlbum.id)
            .map(album => ({
                ...album,
                genreMatchCount: album.genres.filter(genre => currentAlbum.genres.includes(genre)).length,
            }))
            .filter(album => {
                const requiredMatches = Math.min(3, currentAlbum.genres.length);
                return album.genreMatchCount >= requiredMatches;
            })
            .sort((a, b) => b.genreMatchCount - a.genreMatchCount);
    };


    const recSelect = (name: string) => {
        setShowRecommendations(false);
        setSearchQuery(`%${name}`);
    };

    return (
        <div className='flex flex-col w-full h-full items-center'>
            <SignInForm />
            <Header />
            <div className="relative flex items-center justify-center w-full xs:h-[15rem] sm:h-[30rem] xl:h-[80vh] xs:mt-4 sm:mt-10 overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    <video
                        src="/album_ranking_splash_fixed.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                <PoppingLetters
                    text="Albums"
                    className="absolute text-white xs:text-2xl sm:text-6xl font-bold z-20 text-center"
                />
            </div>
            <div className='mt-4'>
                <ImageTrack data={currentMedia} onImageClick={scrollToAlbum} width={`${currentMedia.length == 5 ? `xs:w-[8rem]` : `xs:w-[6.67rem]`} ${currentMedia.length == 6 ? `sm:w-[8rem] 2xl:w-[15rem]` : `sm:w-[10rem] 2xl:w-[20rem]`} ${currentMedia.length == 5 ? `xl:w-[15rem]` : `xl:w-[20rem]`}`} />
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
            {showRecommendations ? <AlbumRecommendations albums={albums} recSelect={recSelect} /> :
                <div className="flex flex-col xs:w-[95%] sm:w-4/5 xs:mt-2 sm:mt-8">
                    <div className='flex flex-row items-center xs:justify-end sm:justify-start'>
                        <AlbumForm />
                        <Link href="https://open.spotify.com/playlist/1BjbHX9ACQUNCBt5zWZjtV?si=3d5ac7a5e3ae4f06" target="_blank" className=''>
                            <img src={Spotify.src} alt="Spotify" className='xs:w-6 sm:w-10 xl:w-10 transform transition-transform duration-200 hover:scale-110' />
                        </Link>
                    </div>
                    <p className='xs:text-xs sm:text-base sm:mt-2 xl:mt-0 xs:mb-1 sm:mb-0'>*Disclaimer: This is just my opinion and what I enjoyed listening to the most regardless of critical bias.</p>
                    <div className='flex flex-row w-full justify-center'>
                        <GenrePieChart genresList={albums?.map((album) => album.genres)} />
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
                    }, index: number) => {
                        const recommendedAlbums = getRecommendedAlbums(album);
                        return (
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
                                            <p className={`xs:text-xl sm:text-4xl ${album.name == "D>E>A>T>H>M>E>T>A>L" ? `xl:text-4xl` : `xl:text-6xl`} text-white text-wrap`}>{album.name}</p>
                                            <div className='flex flex-row items-center gap-2'>
                                                <DeleteAlbum id={album.id} Rank={album.Rank} />
                                                <UpdateAlbumModal album={album} />
                                            </div>
                                        </div>
                                        <p className="xs:text-base sm:text-lg xl:text-3xl text-gray-400">{album.artist}</p>
                                        <ReadMore text={album.comment} className="xs:text-[0.5rem] sm:text-sm xl:text-lg xs:mt-0.5 sm:mt-1 xl:mt-2" />
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {album.genres?.slice().sort().map((genre, index) => (
                                                <div onClick={() => setSearchQuery(genre)} key={index}>
                                                    <MusicGenre genre={genre} bad={album.Rank > (albums.length * 0.90)} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex flex-col gap-2 mt-2'>
                                            <p className="xs:text-sm sm:text-lg xl:text-xl text-gray-400">If you like this album:</p>
                                            {album.Rank > (albums.length * 0.90) ?
                                                <p className='xs:text-sm sm:text-lg xl:text-xl text-red-500'>{badAlbumStatements[Math.floor(Math.random() * badAlbumStatements.length)]}.</p>
                                                :
                                                <div className="flex flex-row flex-wrap gap-2">
                                                    {recommendedAlbums.map(recAlbum => (
                                                        <div onClick={() => setSearchQuery(recAlbum.name)} key={recAlbum.id} className="transform transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                            <img src={recAlbum.image} alt={recAlbum.name} className="xs:w-6 xs:h-6 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 object-cover xs:rounded-sm sm:rounded-lg" />
                                                        </div>
                                                    ))}
                                                </div>}
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