"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/general/header";
import fetchSportsMedia from "../../../utils/climbing/fetchSportsMedia";
import Image from "next/image";
import PoppingLetters from "../components/general/poppingLetters";
import { PlusIcon } from "lucide-react";
import SignInForm from "../components/general/signIn";
import { User } from "@supabase/supabase-js";
import supabase from "../../../utils/general/supabaseclient";
import { useMediaQuery } from "react-responsive";
import VideoWithPlaceholder from "../components/general/placeholderVideo";
import Loading from "../components/general/loading";
import AddMediaModal from "../components/climbing/addMediaModal";

export default function Climbing() {
    const isMobile = useMediaQuery({ query: '(max-width: 650px)' })
    const [mediaFiles, setMediaFiles] = useState<{
        name: string;
        url: string;
        sport: string;
        favorite: boolean;
    }[]>([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [showWarning, setShowWarning] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [firstOpen, setFirstOpen] = useState(true);
    const [selectedSport, setSelectedSport] = useState<string | null>(null);
    const [showAddMediaModal, setShowAddMediaModal] = useState(false);
    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user || null);
        };

        getSession();
    }, []);
    useEffect(() => {
        const fetchMedia = async () => {
            const media = await fetchSportsMedia();
            setMediaFiles(media);
            if (media.length !== 0) {
                setPageLoading(false);
            }
        };

        fetchMedia();
    }, []);

    const handleUploadSuccess = () => {
        window.location.reload();
    };

    const backgroundVideos = mediaFiles
        .filter((file) => file.name.endsWith(".mp4"))
        .filter((_, index) => (index >= 4 && index < 6) || index === 1);

    const shuffledMediaFiles = useMemo(
        () => [...mediaFiles]
            .sort(() => Math.random() - 0.5),
        [mediaFiles]
    );

    const shuffledLength = useMemo(() => shuffledMediaFiles.length, [shuffledMediaFiles]);

    const displayedMedia = useMemo(
        () => shuffledMediaFiles.filter(file => {
            if (selectedSport) return file.sport === selectedSport;
            return file.favorite;
        }),
        [shuffledMediaFiles, selectedSport]
    );

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (activeIndex === null) return;
            if (e.key === "ArrowLeft" && activeIndex > 0) setActiveIndex(activeIndex - 1);
            if (e.key === "ArrowRight" && activeIndex < shuffledLength - 1) setActiveIndex(activeIndex + 1);
            if (e.key === "Escape") setActiveIndex(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [activeIndex, shuffledLength]);

    if (pageLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col w-full h-full items-center">
            <Header />
            <SignInForm />
            <div className="relative flex items-center justify-center w-full xs:h-[15rem] sm:h-[30rem] xl:h-[80vh] xs:mt-4 sm:mt-10  overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    {backgroundVideos.map((file, index) => (
                        <video
                            key={index}
                            src={file.url ?? ""}
                            autoPlay
                            loop
                            muted
                            controls={false}
                            playsInline
                            className={`w-1/3 h-full object-cover duration-700 ease-in-out group-hover:opacity-75 ${loading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setLoading(false)}
                        />
                    ))}
                </div>
                <PoppingLetters text="Sports" className="absolute text-white xs:text-2xl sm:text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="flex flex-col w-full xs:mt-2 sm:mt-4 xl:mt-10 self-start">
                <div className="flex flex-row w-full pl-4">
                    <div className="flex flex-row gap-2">
                        {["climbing", "racquetball", "hiking", "skating", "table tennis"].map((sport) => (
                            <button
                                key={sport}
                                onClick={() => setSelectedSport(selectedSport === sport ? null : sport)}
                                className={`self-start xs:text-xs xs:px-2 xs:py-1 sm:text-base sm:px-3 sm:py-2 rounded-full border transition duration-300 ${selectedSport === sport
                                    ? "bg-white text-black border-white"
                                    : "bg-black text-white border-white hover:bg-white hover:text-black"}`}
                            >
                                {sport.charAt(0).toUpperCase() + sport.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col">
                        {!isMobile && (
                            <div
                                onClick={() => !user && setShowWarning(true)}
                                className="flex flex-row w-full justify-end mb-4"
                            >
                                <div className="flex justify-end w-full">
                                    <button
                                        onClick={() => setShowAddMediaModal(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
                                    >
                                        Add Media
                                        <PlusIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <AddMediaModal
                                    isOpen={showAddMediaModal}
                                    onClose={() => setShowAddMediaModal(false)}
                                    onUploadSuccess={handleUploadSuccess}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {showWarning && <p className="text-red-600 w-full text-right xs:pr-2 sm:pr-4 mt-1 xs:text-xs sm:text-base">You are not authenticated.</p>}
                <div className="xs:p-2 xs:gap-2 xs:space-y-2 sm:p-4 xs:columns-2 sm:columns-4 sm:gap-4 sm:space-y-4">
                    {displayedMedia.map((file, index) => (
                        <div
                            key={file.name}
                            className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-500 ease-out transform hover:scale-105"
                            style={{
                                opacity: 0,
                                animation: `fadeIn 0.5s forwards`,
                                animationDelay: `${index * 150}ms`,
                            }}
                        >
                            {["jpg", "jpeg", "png"].includes(file.name.split(".").pop()?.toLowerCase() || "") ? (
                                <Image
                                    src={file.url ?? ""}
                                    alt={`Sports media ${index}`}
                                    width={500}
                                    height={500}
                                    layout="responsive"
                                    objectFit="cover"
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setFirstOpen(true);
                                    }}
                                    className="rounded-lg cursor-pointer"
                                />
                            ) : (
                                <button
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setFirstOpen(true);
                                    }}
                                    className="w-full h-full p-0 border-0 bg-transparent"
                                >
                                    <VideoWithPlaceholder
                                        aspect="aspect-[9/19.5]"
                                        src={file.url ?? ""}
                                        className="rounded-lg w-full h-full object-cover pointer-events-none cursor-pointer"
                                    />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                {activeIndex !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-90 p-4">
                        <button
                            onClick={() => setActiveIndex(null)}
                            className="absolute top-4 right-4 text-black text-3xl md:text-4xl z-50 cursor-pointer transition-transform duration-200 ease-out hover:scale-110 hover:text-red-600"
                        >
                            ✕
                        </button>

                        {activeIndex > 0 && (
                            <button
                                onClick={() => setActiveIndex(activeIndex - 1)}
                                className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl md:text-4xl z-50 px-2 py-1 rounded-full text-black transition-transform duration-200 ease-out hover:scale-110"
                            >
                                ‹
                            </button>
                        )}

                        {activeIndex < displayedMedia.length - 1 && (
                            <button
                                onClick={() => setActiveIndex(activeIndex + 1)}
                                className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl md:text-4xl z-50 px-2 py-1 rounded-full text-black transition-transform duration-200 ease-out hover:scale-110"
                            >
                                ›
                            </button>
                        )}

                        {displayedMedia[activeIndex].name.endsWith(".mp4") ? (
                            <video
                                src={displayedMedia[activeIndex].url ?? ""}
                                controls={false}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={`max-h-[40rem] md:max-h-[48rem] md:min-h-[48rem] md:max-w-[70rem] object-contain rounded-lg shadow-lg transition-transform duration-200 ease-out ${firstOpen ? "opacity-0 animate-fadeIn" : ""
                                    }`}
                                onAnimationEnd={() => setFirstOpen(false)}
                            />
                        ) : (
                            <img
                                src={displayedMedia[activeIndex].url ?? ""}
                                alt="Full screen media"
                                className={`max-h-[30rem] md:max-h-[48rem] md:min-h-[48rem] md:max-w-[70rem] object-contain rounded-lg shadow-lg transition-transform duration-200 ease-out ${firstOpen ? "opacity-0 animate-fadeIn" : ""
                                    }`}
                                onAnimationEnd={() => setFirstOpen(false)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
