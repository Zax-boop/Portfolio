"use client"

import React from 'react'
import FadeInSection from './fadeIn'
import Link from 'next/link'
import Image from 'next/image'
import climbing_app from "../../../public/climbing_app.jpg"
import cinema from "../../../public/cinema.jpg"
import hades from "../../../public/hades_ex.webp"
import sopranos from "../../../public/sopranos_ex.jpg"
import cb from "../../../public/cb.jpg"
import camus from "../../../public/camus.webp"
import { useRef, useState, useEffect } from 'react'

export default function AboutSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
    <div className='flex flex-col mt-10'>
      <p className='w-full flex flex-row justify-center xs:text-2xl sm:text-4xl xl:text-5xl'>About Me</p>
      <div
        ref={lineRef}
        className={`h-[0.1rem] bg-white transition-all duration-700 mt-2 ${isVisible ? "w-full" : "w-0"
          }`}
      />
      <FadeInSection className='mt-[1rem]'>
        <div className='flex xs:flex-col sm:flex-row xs:gap-4 sm:gap-8'>
          <img src={"/prof_photo.jpg"} className='xs:w-full self-start sm:w-[20rem] xl:w-[25rem] xs:rounded-md xl:rounded-[40px] xl:transform xl:transition-transform xl:duration-200 xl:hover:scale-105' />
          <p className='xs:text-sm sm:text-xl'>
            From a young age, I found myself frustrated with technology, often questioning why things did not work as expected. Over time, I realized that software development held the key to solving these issues. During my junior year of high school, I took an online Python course that introduced me to the power of coding, and I was captivated. In 2021, I began my studies at the University of Illinois Urbana-Champaign, where I am pursuing a degree in Computer Science and Statistics, with plans to graduate in May 2025.
          </p>
        </div>
      </FadeInSection>
      <FadeInSection className=''>
        <div className='flex xs:flex-col sm:flex-row xs:gap-4 sm:gap-8 xs:mt-[0.5rem] sm:mt-4'>
          <div className='flex flex-col gap-2 sm:text-xl xs:text-sm'>
            <p>Aside from software, I have many passions and interests I pursue. One of my favorites is rock climbing which I have been doing since my sophomore year of college. To the right (or below if you are on mobile) is an image of me climbing a 70ft cliff. Aside from climbing, others sports I have had interest in include Ping Pong, American Football, Hiking, and Archery.</p>
            <p>
              One of my greatest obsessions is consuming media in all its forms, from art and books to video games, albums, and TV shows. I am fascinated by the idea that someone's work can be immortalized in history, whether it's a small album by a lesser-known artist or an iconic piece like the Mona Lisa. Inspired by this, I began creating rankings and lists to document and celebrate these contributions. This started in my freshman year of college with my album rankings, which now include over 300 entries. Over time, I expanded these lists to include TV shows, video games, books, and more, all of which can be found below.</p>
          </div>
          <img src={"/climbing_ex.jpg"} className='rounded-lg self-start xs:w-full sm:w-[20rem] xl:transform xl:transition-transform xl:duration-200 xl:hover:scale-105' />
        </div>
      </FadeInSection>
      <div className='flex flex-row flex-wrap self-start gap-5 mt-5'>
        <FadeInSection className='self-start'>
          <Link href='/album_ranking' className='self-start flex flex-col items-center xs:gap-0.5 sm:gap-1'>
            <Image src={cinema} alt='climbing_ex' className='xs:w-[5rem] xs:h-[5rem] sm:h-[15rem] sm:w-[15rem] xl:w-[17rem] xl:h-[17rem]  self-start object-cover xs:rounded-lg sm:rounded-[40px] xl:transform xl:transition-transform xl:duration-200 xl:hover:scale-105' />
            <p className='xs:text-sm sm:text-3xl cursor-pointer'>Albums</p>
          </Link>
        </FadeInSection>
        <FadeInSection className='self-start'>
          <Link href='/anime' className='self-start flex flex-col items-center xs:gap-0.5 sm:gap-1'>
            <Image src={cb} alt='climbing_ex' className='xs:w-[5rem] xs:h-[5rem] sm:h-[15rem] sm:w-[15rem] xl:w-[17rem] xl:h-[17rem]  self-start object-cover xs:rounded-lg sm:rounded-[40px] xl:transform xl:transition-transform xl:duration-200 xl:hover:scale-105' />
            <p className='xs:text-sm sm:text-3xl cursor-pointer'>Anime</p>
          </Link>
        </FadeInSection>
        <FadeInSection className='self-start'>
          <Link href='/books' className='self-start flex flex-col items-center xs:gap-0.5 sm:gap-1'>
            <Image src={camus} alt='climbing_ex' className='xs:w-[5rem] xs:h-[5rem] sm:h-[15rem] sm:w-[15rem] xl:w-[17rem] xl:h-[17rem] self-start object-cover xs:rounded-lg sm:rounded-[40px] xl:transform xl:transition-transform xl:duration-200 xl:hover:scale-105' />
            <p className='xs:text-sm sm:text-3xl cursor-pointer'>Books</p>
          </Link>
        </FadeInSection>
        <FadeInSection className='self-start'>
          <Link href='/climbing' className='self-start flex flex-col items-center xs:gap-0.5 sm:gap-1'>
            <Image src={climbing_app} alt='climbing_ex' className='xs:w-[5rem] xs:h-[5rem] sm:h-[15rem] sm:w-[15rem] xl:w-[17rem] xl:h-[17rem]  self-start object-cover xs:rounded-lg sm:rounded-[40px] xl:transform xl:transition-transform xl:duration-200 xl:hover:scale-105' />
            <p className='xs:text-sm sm:text-3xl cursor-pointer'>Climbing</p>
          </Link>
        </FadeInSection>
        <FadeInSection className='self-start'>
          <Link href='/tv' className='self-start flex flex-col items-center xs:gap-0.5 sm:gap-1'>
            <Image src={sopranos} alt='sopranos_ex' className='xs:w-[5rem] xs:h-[5rem] sm:h-[15rem] sm:w-[15rem] xl:w-[17rem] xl:h-[17rem]  self-start object-cover xs:rounded-lg sm:rounded-[40px] xl:transform xl:transition-transform xl:duration-200 xl:hover:scale-105' />
            <p className='xs:text-sm sm:text-3xl cursor-pointer'>TV Shows</p>
          </Link>
        </FadeInSection>
        <FadeInSection className='self-start'>
          <Link href='/games' className='self-start flex flex-col items-center xs:gap-0.5 sm:gap-1'>
            <Image src={hades} alt='hades_ex' className='xs:w-[5rem] xs:h-[5rem] sm:h-[15rem] sm:w-[15rem] xl:w-[17rem] xl:h-[17rem]  self-start object-cover xs:rounded-lg sm:rounded-[40px] xl:transform xl:transition-transform xl:duration-200 xl:hover:scale-105' />
            <p className='xs:text-sm sm:text-3xl cursor-pointer'>Video Games</p>
          </Link>
        </FadeInSection>
      </div>
    </div>
  )
}
