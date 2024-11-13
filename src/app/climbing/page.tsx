"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/header";
import fetchClimbingMedia from "../../../utils/fetchClimbingMedia";
import Image from "next/image";
import PoppingLetters from "../components/poppingLetters";
import { PlusIcon } from "lucide-react";
import addClimbingMedia from "../../../utils/addClimbingMedia";

export default function Climbing() {
    const [mediaFiles, setMediaFiles] = useState<any[]>([]);
    // const [loadingStates, setLoadingStates] = useState<boolean[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedia = async () => {
            const media = await fetchClimbingMedia();
            setMediaFiles(media);
            // setLoadingStates(new Array(media.length).fill(true));
        };

        fetchMedia();
    }, []);

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const mediaURL = await addClimbingMedia(file);
            console.log('Uploaded media URL:', mediaURL);
        }
    };

    // const handleLoadedData = (index: number) => {
    //     setLoadingStates(prevStates => {
    //         const updatedStates = [...prevStates];
    //         updatedStates[index] = false;
    //         return updatedStates;
    //     });
    // };

    const backgroundVideos = mediaFiles.filter((file) => file.name.endsWith(".mp4")).slice(4, 7);

    return (
        <div className="flex flex-col w-full h-full items-center">
            <Header />
            <div className="relative flex items-center justify-center w-full h-[80vh] mt-10 overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    {backgroundVideos.map((file, index) => (
                        <video
                            key={index}
                            src={file.url?.data?.publicUrl}
                            autoPlay
                            loop
                            muted
                            className={`w-1/3 h-full object-cover duration-700 ease-in-out group-hover:opacity-75 ${loading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadedData={() => setLoading(false)}
                        />
                    ))}
                </div>
                <PoppingLetters text="Climbing" className="absolute text-white text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="flex flex-col w-full mt-10">
                <div className="flex flex-row w-full justify-end">
                    <label className="flex items-center gap-2 self-start pl-3 mr-4 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                        Add New
                        <PlusIcon className="w-5 h-5 mr-2" />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div className="p-4 columns-4 gap-4 space-y-4">
                    {mediaFiles.map((file, index) => {
                        const fileExt = file.name.split(".").pop()?.toLowerCase();
                        return (
                            <div
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
                                        className={`rounded-lg transform transition-transform hover:scale-105  duration-700 ease-in-out group-hover:opacity-75 ${loading
                                            ? "scale-110 blur-2xl grayscale"
                                            : "scale-100 blur-0 grayscale-0"
                                            }`}
                                        onLoadingComplete={() => setLoading(false)}
                                    />
                                ) : ["mp4"].includes(fileExt || "") ? (
                                    <video
                                        src={file.url?.data?.publicUrl}
                                        className={`rounded-lg w-full h-full transform transition-transform hover:scale-105  object-cover duration-700 ease-in-out group-hover:opacity-75 ${loading
                                            ? "scale-110 blur-2xl grayscale"
                                            : "scale-100 blur-0 grayscale-0"
                                            }`}
                                        autoPlay
                                        loop
                                        muted
                                        onLoadedData={() => setLoading(false)}
                                    />
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
