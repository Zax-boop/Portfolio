"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Header from "../components/general/header";
import fetchClimbingMedia from "../../../utils/climbing/fetchClimbingMedia";
import Image from "next/image";
import PoppingLetters from "../components/general/poppingLetters";
import { PlusIcon } from "lucide-react";
import addClimbingMedia from "../../../utils/climbing/addClimbingMedia";
import FadeInSection from "../components/general/fadeIn";
import SignInForm from "../components/general/signIn";
import { User } from "@supabase/supabase-js";
import supabase from "../../../utils/general/supabaseclient";
import { useMediaQuery } from "react-responsive";
import VideoWithPlaceholder from "../components/general/placeholderVideo";
import Loading from "../components/general/loading";

export default function Climbing() {
    const isMobile = useMediaQuery({ query: '(max-width: 650px)' })
    const [mediaFiles, setMediaFiles] = useState<{
        name: string;
        url: {
            data: {
                publicUrl: string;
            };
        };
    }[]>([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [showWarning, setShowWarning] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<"left" | "right" | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [firstOpen, setFirstOpen] = useState(true);
    const touchStartX = useRef<number | null>(null);
    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user || null);
        };

        getSession();
    }, []);
    useEffect(() => {
        const fetchMedia = async () => {
            const media = await fetchClimbingMedia();
            setMediaFiles(media);
            if (media.length != 0) {
                setPageLoading(false);
            }
        };
        fetchMedia();
    }, []);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            if (file) {
                await addClimbingMedia(file);
                window.location.reload()
            }
        }
    };

    const backgroundVideos = mediaFiles
        .filter((file) => file.name.endsWith(".mp4"))
        .filter((_, index) => (index >= 4 && index < 6) || index === 1);

    const shuffledMediaFiles = useMemo(
        () => [...mediaFiles].sort(() => Math.random() - 0.5),
        [mediaFiles]
    );
    const shuffledLength = useMemo(() => shuffledMediaFiles.length, [shuffledMediaFiles]);

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

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || activeIndex === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50 && activeIndex < shuffledLength - 1) setActiveIndex(activeIndex + 1);
        else if (diff < -50 && activeIndex > 0) setActiveIndex(activeIndex - 1);
        touchStartX.current = null;
    };

    const handleChange = (newIndex: number) => {
        if (newIndex === activeIndex) return;
        setDirection(newIndex > activeIndex! ? "right" : "left");
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex(newIndex);
            setIsAnimating(false);
        }, 200);
    };

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
                            src={file.url?.data?.publicUrl}
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
                {!isMobile && <div onClick={() => (!user && setShowWarning(true))} className=" flex flex-row w-full justify-end">
                    <label className="flex items-center gap-2 self-start xs:text-xs xs:pl-2 xs:mr-2 xs:py-1 sm:text-base sm:pl-3 sm:mr-4 sm:py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                        Add Media
                        <PlusIcon className="w-5 h-5 mr-2" />
                        {user && <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />}
                    </label>
                </div>}
                {showWarning && <p className="text-red-600 w-full text-right xs:pr-2 sm:pr-4 mt-1 xs:text-xs sm:text-base">You are not authenticated.</p>}
                <div className="xs:p-2 xs:gap-2 xs:space-y-2 sm:p-4 xs:columns-2 sm:columns-4 sm:gap-4 sm:space-y-4">
                    {shuffledMediaFiles.map((file, index) => {
                        const fileExt = file.name.split(".").pop()?.toLowerCase();
                        return (
                            <FadeInSection
                                key={index}
                                className="relative overflow-hidden rounded-lg shadow-lg"
                            >
                                {["jpg", "jpeg", "png"].includes(fileExt || "") ? (
                                    <Image
                                        src={file.url?.data?.publicUrl}
                                        alt={`Sports media ${index}`}
                                        width={500}
                                        height={500}
                                        layout="responsive"
                                        objectFit="cover"
                                        onClick={() => {
                                            setActiveIndex(index);
                                            setFirstOpen(true);
                                        }}
                                        className="rounded-lg transform transition-transform hover:scale-105 duration-700 ease-in-out group-hover:opacity-75 cursor-pointer"
                                    />
                                ) : ["mp4"].includes(fileExt || "") ? (
                                    <button
                                        onClick={() => {
                                            setActiveIndex(index);
                                            setFirstOpen(true);
                                        }}
                                        className="w-full h-full p-0 border-0 bg-transparent"
                                    >
                                        <VideoWithPlaceholder
                                            aspect="aspect-[9/19.5]"
                                            src={file.url?.data?.publicUrl}
                                            className="rounded-lg w-full h-full transform transition-transform hover:scale-105 object-cover duration-700 ease-in-out group-hover:opacity-75 pointer-events-none cursor-pointer"
                                        />
                                    </button>
                                ) : null}
                            </FadeInSection>
                        );
                    })}
                </div>
                {activeIndex !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-90 p-4" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                        <button
                            onClick={() => (setActiveIndex(null), setFirstOpen(true))}
                            className="absolute top-4 right-4 text-black text-3xl md:text-4xl z-50 cursor-pointer transition-transform duration-200 ease-out hover:scale-110 hover:text-red-600"
                        >
                            ✕
                        </button>
                        {activeIndex > 0 && (
                            <button
                                onClick={() => handleChange(activeIndex - 1)}
                                className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl md:text-4xl z-50 px-2 py-1 rounded-full text-black transition-transform duration-200 ease-out hover:scale-110"
                            >
                                ‹
                            </button>
                        )}
                        {activeIndex < shuffledLength - 1 && (
                            <button
                                onClick={() => handleChange(activeIndex + 1)}
                                className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl md:text-4xl z-50 px-2 py-1 rounded-full text-black transition-transform duration-200 ease-out hover:scale-110"
                            >
                                ›
                            </button>
                        )}
                        {shuffledMediaFiles[activeIndex].name.endsWith(".mp4") ? (
                            <video
                                src={shuffledMediaFiles[activeIndex].url.data.publicUrl}
                                controls={false}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={`max-h-[40rem] md:max-h-[48rem] md:max-w-[70rem] object-contain rounded-lg shadow-lg transition-transform duration-200 ease-out ${firstOpen ? "opacity-0 animate-fadeIn" : ""} 
                                ${isAnimating ? (direction === "left" ? "-translate-x-20 opacity-0" : "translate-x-20 opacity-0") : "translate-x-0 opacity-100"}`}
                                onAnimationEnd={() => setFirstOpen(false)}
                            />
                        ) : (
                            <img
                                src={shuffledMediaFiles[activeIndex].url.data.publicUrl}
                                alt="Full screen art"
                                className={`max-h-[30rem] md:max-h-[48rem] md:max-w-[70rem] object-contain rounded-lg shadow-lg transition-transform duration-200 ease-out ${firstOpen ? "opacity-0 animate-fadeIn" : ""} 
                                ${isAnimating ? (direction === "left" ? "-translate-x-20 opacity-0" : "translate-x-20 opacity-0") : "translate-x-0 opacity-100"}`}
                                onAnimationEnd={() => setFirstOpen(false)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
