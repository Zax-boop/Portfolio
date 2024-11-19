"use client"

import React from 'react'
import { useRef, useEffect, useState } from 'react';
import FadeInSection from './fadeIn';

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
            <FadeInSection className='w-full flex flex-row justify-center text-5xl'>Projects</FadeInSection>
            <div
                ref={lineRef}
                className={`h-[0.1rem] bg-white transition-all duration-700 mt-2 ${isVisible ? "w-full" : "w-0"
                    }`}
            />
            <div className='flex flex-col'>
                <FadeInSection className='text-3xl mt-[1rem]'>Portfolio Website</FadeInSection>
                <FadeInSection className=''>This is the website you are currently on! The website is developed with Next.js and Tailwind CSS. The data is stored in Supabase, a BaaS PostgreSQL database. Authentication was implemented using Supabase, complete with RLS (Row Level Security). Various data structures can be selected, inserted, deleted, and updated all by using the website.</FadeInSection>
                <FadeInSection className='flex flex-row flex-wrap mt-2 gap-2'>
                    <p className='py-1.5 px-3 rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Next.js</p>
                    <p className='py-1.5 px-3 rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Tailwind CSS</p>
                    <p className='py-1.5 px-3 rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Typescript</p>
                    <p className='py-1.5 px-3 rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Supabase</p>
                    <p className='py-1.5 px-3 rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>PostgreSQL</p>
                    <p className='py-1.5 px-3 rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>RLS</p>
                    <p className='py-1.5 px-3 rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Authentication</p>
                </FadeInSection>
                <FadeInSection className='flex flex-row flex-wrap w-full mt-4 gap-3 justify-between'>
                    <div className='flex w-[47%] flex-col gap-1 items-center'>
                        <video
                            src={"/addAlbum.mov"}
                            className="w-full object-cover rounded-xl"
                            muted
                            autoPlay
                            loop
                            ref={videoRef}
                        />
                        <p>Example of inserting data</p>
                    </div>
                    <div className='flex w-[47%] flex-col gap-1 items-center'>
                        <video
                            src={"/removeAlbum.mov"}
                            className="w-full object-cover rounded-xl"
                            muted
                            autoPlay
                            loop
                            ref={videoRef}
                        />
                        <p>Example of removing data</p>
                    </div>
                    <div className='flex w-[47%] flex-col gap-1 items-center'>
                        <video
                            src={"/authEx.mov"}
                            className="w-full object-cover rounded-xl"
                            muted
                            autoPlay
                            loop
                        />
                        <p>Example of authentication</p>
                    </div>
                    <div className='flex w-[47%] flex-col gap-1 items-center'>
                        <video
                            src={"/updateEx.mov"}
                            className="w-full object-cover rounded-xl"
                            muted
                            autoPlay
                            loop
                            ref={videoRef}
                        />
                        <p>Example of updating data</p>
                    </div>
                </FadeInSection>
            </div>
            <div className='flex flex-row justify-between mt-4'>
                <div className='flex flex-col'>
                    <FadeInSection className='text-3xl'>Soul Boy</FadeInSection>
                    <FadeInSection className=''>Developed a 2.5 dimensional platform using Unreal Engine 5 and Blueprints.</FadeInSection>
                    <FadeInSection className='relative group self-start font-semibold'>
                        <a target='_blank' href='https://github.com/Zax-boop/SoulBoy'>
                            README
                        </a>
                        <span className="absolute -bottom-[0.1rem] left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
                    </FadeInSection>
                    <FadeInSection className='flex flex-row flex-wrap gap-2 mt-2'>
                        <p className='py-1.5 px-3 rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>UE5</p>
                        <p className='py-1.5 px-3 rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Blueprints</p>
                    </FadeInSection>
                </div>
                <FadeInSection className='w-1/2'>
                <video
                    src={"/soul_boy_ex.mp4"}
                    className="w-full object-cover rounded-xl"
                    muted
                    autoPlay
                    loop
                />
                </FadeInSection>
            </div>
        </div>
    )
}

