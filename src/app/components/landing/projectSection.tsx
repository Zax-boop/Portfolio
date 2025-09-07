"use client"

import React from 'react'
import { useRef, useEffect, useState } from 'react';
import FadeInSection from '../general/fadeIn';
import VideoWithPlaceholder from '../general/placeholderVideo';

export default function ProjectSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.5;
        }
    }, []);
    const lineRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the line is visible
        );

        if (lineRef.current) {
            observer.observe(lineRef.current);
        }

        return () => {
            if (lineRef.current) {
                observer.unobserve(lineRef.current);
            }
        };
    }, []);

    return (
        <div className='mt-10'>
            <FadeInSection className='w-full flex flex-row justify-center xs:text-2xl sm:text-4xl xl:text-5xl'>Projects</FadeInSection>
            <div
                ref={lineRef}
                className={`h-[0.1rem] bg-white transition-all duration-700 mt-2 ${isVisible ? "w-full" : "w-0"
                    }`}
            />
            <div className='flex flex-col'>
                <FadeInSection className='xs:text-lg sm:text-2xl xl:text-3xl mt-[1rem]'>Portfolio Website</FadeInSection>
                <FadeInSection className='xs:text-xs sm:text-base'>This is the website you are currently on! The website is developed with Next.js and Tailwind CSS. The data is stored in Supabase, a BaaS PostgreSQL database. Authentication was implemented using Supabase, complete with RLS (Row Level Security). Various data structures can be selected, inserted, deleted, and updated all by using the website. Project deployed on Vercel.</FadeInSection>
                <FadeInSection className='flex flex-row flex-wrap mt-2 gap-2'>
                    <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Next.js</p>
                    <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Tailwind CSS</p>
                    <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Typescript</p>
                    <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Supabase</p>
                    <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>PostgreSQL</p>
                    <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>RLS</p>
                    <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Authentication</p>
                    <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Vercel</p>
                </FadeInSection>
                <FadeInSection className='flex xs:flex-col sm:flex-row flex-wrap w-full mt-4 xs:gap-[2rem] sm:gap-3 justify-between'>
                    <div className='flex xs:w-full sm:w-[47%] flex-col gap-1 items-center'>
                        <VideoWithPlaceholder ref={videoRef} className='w-full object-cover rounded-xl' src='/addAlbum.mp4' />
                        <p className='xs:text-xs sm:text-base'>Example of inserting data</p>
                    </div>
                    <div className='flex xs:w-full sm:w-[47%] flex-col gap-1 items-center'>
                        <VideoWithPlaceholder ref={videoRef} className='w-full object-cover rounded-xl' src='/removeAlbum.mp4' />
                        <p className='xs:text-xs sm:text-base'>Example of removing data</p>
                    </div>
                    <div className='flex xs:w-full sm:w-[47%] flex-col gap-1 items-center'>
                        <VideoWithPlaceholder className='w-full object-cover rounded-xl' src='/authEx.mp4' />
                        <p className='xs:text-xs sm:text-base'>Example of authentication</p>
                    </div>
                    <div className='flex xs:w-full sm:w-[47%] flex-col gap-1 items-center'>
                        <VideoWithPlaceholder ref={videoRef} className='w-full object-cover rounded-xl' src='/updateEx.mp4' />
                        <p className='xs:text-xs sm:text-base'>Example of updating data</p>
                    </div>
                </FadeInSection>
            </div>
            <div className='flex xs:flex-col sm:flex-row xs:gap-4 sm:gap-0 justify-between w-full mt-4'>
                <div className='flex flex-col xs:w-full sm:w-[47%] gap-2'>
                    <div className='flex flex-col'>
                        <FadeInSection className='sm:text-2xl xl:text-3xl'>Soul Boy</FadeInSection>
                        <FadeInSection className='xs:text-xs sm:text-base'>Lead a team in developing a 2.5 dimensional platform using Unreal Engine 5 and Blueprints.</FadeInSection>
                        <FadeInSection className='relative group self-start font-semibold'>
                            <a target='_blank' href='https://github.com/Zax-boop/SoulBoy'>
                                README
                            </a>
                            <span className="absolute xs:-bottom-[0.075rem] sm:-bottom-[0.1rem] left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
                        </FadeInSection>
                        <FadeInSection className='flex flex-row flex-wrap gap-2 mt-2'>
                            <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>UE5</p>
                            <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Blueprints</p>
                            <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Creativity</p>
                            <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Design</p>
                            <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Leadership</p>
                        </FadeInSection>
                    </div>
                    <FadeInSection className='w-full'>
                        <VideoWithPlaceholder className='w-full object-cover rounded-xl' src='/soul_boy_ex.mp4' />
                    </FadeInSection>
                </div>
                <div className='flex flex-col xs:w-full sm:w-[47%] gap-2'>
                    <div className='flex flex-col'>
                        <FadeInSection className='sm:text-2xl xl:text-3xl'>Idle Animation</FadeInSection>
                        <FadeInSection className='xs:text-xs sm:text-base'>Developed an idle animation for a character using Aseprite.</FadeInSection>
                        <FadeInSection className='flex flex-row flex-wrap gap-2 mt-2'>
                            <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Aseprite</p>
                            <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Creativity</p>
                            <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Design</p>
                            <p className='xs:py-1.5 xs:px-1.5 sm:py-1.5 sm:px-3 xs:text-xs xs:rounded-lg sm:rounded-xl sm:text-base flex flex-row items-center self-start bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Animation</p>
                        </FadeInSection>
                    </div>
                    <FadeInSection className='w-full'>
                        <VideoWithPlaceholder className='w-full object-cover rounded-xl' src='/IdleAnimation.mp4' />
                    </FadeInSection>
                </div>
            </div>
        </div>
    )
}