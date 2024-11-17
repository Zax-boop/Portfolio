import React from 'react'

export default function ProjectSection() {
    return (
        <div className='mt-10'>
            <p className='w-full flex flex-row justify-center text-5xl'>Projects</p>
            <p className='text-3xl'>Portfolio Website</p>
            <p>Website developed with Next.js and Tailwind CSS. Data stored in Supabase, a BaaS PostgreSQL database. Implemented authentication using Supabase, complete with RLS (Row Level Security). Data can be selected, inserted, deleted, and updated all by using the website.</p>
            <div className='flex flex-row w-full mt-2 justify-between'>
                <div className='flex w-[47%] flex-col gap-1 items-center'>
                    <video
                        src={"/addAlbum.mov"}
                        className="w-full object-cover rounded-xl"
                        muted
                        autoPlay
                        loop
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
                    />
                    <p>Example of removing data</p>
                </div>
            </div>
        </div>
    )
}

