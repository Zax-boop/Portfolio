import React from 'react'
import Header from '../components/header'
import Link from 'next/link'

export default function About() {
  return (
    <div className='flex flex-col w-full h-full items-center'>
      <Header />
      <div className='flex flex-col w-4/5 mt-10'>
        <div className='flex flex-row gap-8'>
          <img src={"/prof_photo.jpg"} className='w-[25rem] rounded-[40px]' />
          <p className='text-xl'>
            From a young age, I found myself frustrated with technology, often questioning why things did not work as expected. Over time, I realized that software development held the key to solving these issues. During my junior year of high school, I took an online Python course that introduced me to the power of coding, and I was captivated. In 2021, I began my studies at the University of Illinois Urbana-Champaign, where I am pursuing a degree in Computer Science and Statistics, with plans to graduate in May 2025.
          </p>
        </div>
        <div className='flex flex-row gap-8 mt-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-xl'>Aside from software, I have many passions and interests I pursue. One of my favorites is rock climbing which I have been doing since my sophomore year of college. To the right is an image of me climbing a 70ft cliff. Aside from climbing, others sports I have had interest in include Ping Pong, American Football, Hiking, and Archery.</p>
            <p className='text-xl'>
              One of my greatest obsessions is consuming media in all its forms, from art and books to video games, albums, and TV shows. I am fascinated by the idea that someone's work can be immortalized in history, whether it's a small album by a lesser-known artist or an iconic piece like the Mona Lisa. Inspired by this, I began creating rankings and lists to document and celebrate these contributions. This started in my freshman year of college with my album rankings, which now include over 300 entries. Over time, I expanded these lists to include TV shows, video games, books, and more, all of which can be found below.</p>
          </div>
          <img src={"/climbing_ex.jpg"} className='rounded-lg w-[20rem]' />
        </div>
        <Link href='/climbing' className='flex flex-row self-start justify-between items-center border-[0.5px] border-[#333] hover:border-white/[0.3] transition-all duration-500 ease-in px-4 py-2 mt-4 rounded-lg'>
          <p className='text-8xl'>CLIMBING</p>
        </Link>
      </div>
    </div>
  )
}