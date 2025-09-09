"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../components/general/header";
import PoppingLetters from "../components/general/poppingLetters";
import MovieForm from "../components/movies/movieModal";
import FadeInSection from "../components/general/fadeIn";
import ImageTrack from "../components/general/ImageTrack";
import SignInForm from "../components/general/signIn";
import DeleteMovie from "../components/movies/deleteMovie";
import UpdateMovieModal from "../components/movies/updateMovie";
import ReadMore from "../components/general/readMore";
import MovieGenre from "../components/movies/movieGenre";
import GenrePieChart from "../components/general/genrePieChart";
import Loading from "../components/general/loading";
import fetchMovie from "../../../utils/movies/fetchMovie";

export default function Movies() {
    const [movies, setMovies] = useState<{
        name: string;
        director: string;
        comments: string;
        image: string;
        genres: string[];
        id: string;
    }[]>([]);
    const [filteredMedia, setFilteredMedia] = useState(movies);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const mediaPerPage = 10;
    const indexOfLastMedia = currentPage * mediaPerPage;
    const indexOfFirstMedia = indexOfLastMedia - mediaPerPage;
    const currentMedia = filteredMedia.slice(indexOfFirstMedia, indexOfLastMedia);

    const movieRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

    const searchSectionRef = useRef<HTMLDivElement>(null);
    const switchPage = (pageIndex: number) => {
        if (searchSectionRef.current != null) {
            searchSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
        setCurrentPage(pageIndex + 1);
    };

    useEffect(() => {
        const getMovies = async () => {
            const data = await fetchMovie();
            if (data) {
                setMovies(data);
                setFilteredMedia(data);
                movieRefs.current = data.map(() => React.createRef());
            }
            setLoading(false);
        };
        getMovies();
    }, []);

    useEffect(() => {
        const search = searchQuery.toLowerCase();
        setFilteredMedia(
            movies.filter(
                (movie) =>
                    movie.name.toLowerCase().includes(search) ||
                    movie.director.toLowerCase().includes(search) ||
                    movie.comments.toLowerCase().includes(search) ||
                    movie.genres?.some((genre) => genre.toLowerCase().includes(search))
            )
        );
        setCurrentPage(1);
    }, [searchQuery, movies]);

    const scrollToMovie = (index: number) => {
        if (movieRefs.current[index]) {
            if (movieRefs.current[index].current) {
                movieRefs.current[index].current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    const totalPages = Math.ceil(filteredMedia.length / mediaPerPage);

    return (
        <div className="flex flex-col w-full h-full items-center">
            <Header />
            <SignInForm />
            <div className="relative flex items-center justify-center w-full xs:h-[15rem] sm:h-[30rem] xl:h-[80vh] xs:mt-4 sm:mt-10 overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    <video
                        src="/output_movie_grid.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture
                        className="w-full h-full object-cover"
                    />
                </div>
                <PoppingLetters text="Movies" className="absolute text-white xs:text-2xl sm:text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className='mt-4'>
                <ImageTrack data={currentMedia} onImageClick={scrollToMovie} width={`${currentMedia.length == 5 ? `xs:w-[8rem]` : `xs:w-[6.67rem]`} ${currentMedia.length == 6 ? `sm:w-[8rem] 2xl:w-[15rem]` : `sm:w-[10rem] 2xl:w-[20rem]`} ${currentMedia.length == 5 ? `xl:w-[15rem]` : `xl:w-[20rem]`}`} />
            </div>
            <div className="flex flex-col xs:w-[95%] sm:w-4/5 xs:mt-2 sm:mt-8">
                <MovieForm />
                <p className="xs:text-xs sm:text-base sm:mt-2 xl:mt-2 xs:mb-1 sm:mb-0">
                    *Disclaimer: This is just my opinion and what I enjoyed watching
                    the most regardless of critical bias. Moreover, I chose not to
                    rank the movies I watch just because each movie feels too unique to
                    compare to one another. However, the first page is my top 10. These are also not all the movies I have watched, just the ones I remember and have an opinion on.
                </p>
                <div className='flex flex-row w-full justify-center'>
                    <GenrePieChart genresList={movies?.map((movie) => movie.genres)} />
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
                        placeholder="Search movies..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 text-black"
                    />
                </div>
                <hr className="border-t border-gray-300" />
                {currentMedia.map((movie, index) => (
                    <FadeInSection
                        key={movie.id || `${movie.name}-${movie.director}-${index}`}
                        ref={movieRefs.current[index]}
                        className="flex flex-col xl:space-y-4 xs:mt-4 xl:mt-8"
                    >
                        <div className="flex flex-row">
                            <img
                                src={movie.image}
                                alt={`${movie.name} cover`}
                                className={`xs:w-[10rem] xs:h-[10rem] sm:w-[15rem] sm:h-[15rem] xl:w-[30rem] xl:h-[30rem] xs:min-w-[10rem] xs:min-h-[10rem] sm:min-w-[15rem] sm:min-h-[15rem] xl:min-w-[30rem] xl:min-h-[30rem] object-cover mb-4 transform transition-transform hover:scale-105 duration-300 ${isLoading
                                    ? "scale-110 blur-2xl grayscale"
                                    : "scale-100 blur-0 grayscale-0"
                                    }`}
                                onLoad={() => setIsLoading(false)}
                            />
                            <div className="xs:ml-2 sm:ml-4 w-full">
                                <div className="flex flex-row w-full justify-between">
                                    <p className="xs:text-xl sm:text-4xl xl:text-6xl text-white">
                                        {movie.name}
                                    </p>
                                    <div className="flex flex-row items-center gap-2">
                                        <DeleteMovie id={movie.id} />
                                        <UpdateMovieModal movie={movie} />
                                    </div>
                                </div>
                                <p className="xs:text-base sm:text-lg xl:text-3xl text-gray-400">
                                    {movie.director}
                                </p>
                                <ReadMore text={movie.comments} className="xs:text-[0.5rem] sm:text-sm xl:text-lg xs:mt-0.5 sm:mt-1 xl:mt-2" />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {movie.genres?.slice().sort().map((genre, index) => (
                                        <div onClick={() => setSearchQuery(genre)} key={index}>
                                            <MovieGenre genre={genre} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {index < currentMedia.length - 1 && (
                            <hr className="border-t border-gray-300 xs:my-1 sm:my-2 xl:my-4" />
                        )}
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
