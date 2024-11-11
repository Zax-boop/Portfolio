"use client"

import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import fetchClimbingMedia from '../../../utils/fetchClimbingMedia';  // Import the utility function
import Image from 'next/image';

export default function Climbing() {
    const [mediaFiles, setMediaFiles] = useState<any[]>([]);  // Store media files from Supabase
    // const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedia = async () => {
            const media = await fetchClimbingMedia();  // Call the utility function to fetch media
            setMediaFiles(media);
            // setLoading(false);  // Set loading to false once data is fetched
        };

        fetchMedia();  // Fetch the media files when the component mounts
    }, []);
    return (
        <div className='flex flex-col w-full h-full items-center'>
            <Header />
            <div className='flex flex-col w-4/5 mt-10'>
                <p className='w-full flex flex-row justify-center text-6xl'>Climbing</p>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mediaFiles.map((file, index) => {
                        const fileExt = file.name.split('.').pop()?.toLowerCase();
                        // console.log(file);  // Log entire file
                        // console.log(file.url);  // Log just the url property
                        // console.log(file.url?.data);  // Log the data inside url if it exists
                        console.log(file.url?.data?.publicUrl);          
                        return (
                            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
                                {['jpg', 'jpeg', 'png'].includes(fileExt || '') ? (
                                    <Image
                                        src={file.url?.data?.publicUrl}
                                        alt={`Climbing media ${index}`}
                                        width={500}
                                        height={500}
                                        layout="responsive"
                                        objectFit="cover"
                                        className={`rounded-lg`}
                                    />
                                ) : ['mp4'].includes(fileExt || '') ? (
                                    <video
                                        src={file.url?.data?.publicUrl}
                                        className="rounded-lg w-full h-full object-cover"
                                        autoPlay
                                        loop
                                        muted
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
