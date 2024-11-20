"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/header";
import fetchClimbingMedia from "../../../utils/fetchClimbingMedia";
import Image from "next/image";
import PoppingLetters from "../components/poppingLetters";
import { PlusIcon } from "lucide-react";
import addClimbingMedia from "../../../utils/addClimbingMedia";
import FadeInSection from "../components/fadeIn";
import SignInForm from "../components/signIn";
import { User } from "@supabase/supabase-js";
import supabase from "../../../utils/supabaseclient";
import { useMediaQuery } from "react-responsive";
import VideoWithPlaceholder from "../components/placeholderVideo";

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
    const [loading, setLoading] = useState(true);
    const [showWarning, setShowWarning] = useState(false)
    const [user, setUser] = useState<User | null>(null);
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

    const backgroundVideos = mediaFiles.filter((file) => file.name.endsWith(".mp4")).slice(4, 7);

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
                <PoppingLetters text="Climbing" className="absolute text-white xs:text-2xl sm:text-6xl font-bold z-10 text-center" />
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
                    {mediaFiles.map((file, index) => {
                        const fileExt = file.name.split(".").pop()?.toLowerCase();
                        return (
                            <FadeInSection
                                key={index}
                                className="relative overflow-hidden rounded-lg shadow-lg"
                            >
                                {["jpg", "jpeg", "png"].includes(fileExt || "") ? (
                                    <Image
                                        src={file.url?.data?.publicUrl}
                                        alt={`Climbing media ${index}`}
                                        width={500}
                                        height={500}
                                        layout="responsive"
                                        objectFit="cover"
                                        className={`rounded-lg transform transition-transform hover:scale-105 duration-700 ease-in-out group-hover:opacity-75`}
                                    // ${loadingStates[index] ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0"
                                    // }
                                    // onLoadingComplete={() => handleLoadedData(index)}
                                    />
                                ) : ["mp4"].includes(fileExt || "") ? (
                                    // <video
                                    //     src={file.url?.data?.publicUrl}
                                    //     className={`rounded-lg w-full h-full transform transition-transform hover:scale-105 object-cover duration-700 ease-in-out group-hover:opacity-75 `}
                                    //     // ${loadingStates[index] ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0"
                                    //     // }
                                    //     autoPlay
                                    //     loop
                                    //     muted
                                    //     controls={false}
                                    //     playsInline
                                    // // onLoadedData={() => handleLoadedData(index)}
                                    // />
                                    <VideoWithPlaceholder aspect="aspect-[9/19.5]" src={file.url?.data?.publicUrl} className="rounded-lg w-full h-full transform transition-transform hover:scale-105 object-cover duration-700 ease-in-out group-hover:opacity-75"/>
                                    
                                ) : null}
                            </FadeInSection>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
