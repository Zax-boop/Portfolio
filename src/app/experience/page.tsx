"use client"
import React from 'react'
import Header from '../components/header';
import PoppingLetters from '../components/poppingLetters';
import Image from 'next/image';
import linkedin_logo from "../../../public/linkedinLogo.png"
import github_logo from "../../../public/github_logo.png"
import { useState, useEffect } from 'react';
import FadeInSection from '../components/fadeIn';


export default function experience() {
  const [timer, setTimer] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimer(true);
    }, 1100);
    return () => clearTimeout(timerId);
  }, []);
  return (
    <div className="flex flex-col w-full h-full items-center">
      <Header />
      <div className='flex flex-col w-4/5'>
        <div className={`flex flex-row mt-10 text-3xl w-full`}>
          <PoppingLetters text="Download my&nbsp;" speed={30} />
          <div className="relative group">
            <a
              href="/Resume_Rohan_Arya.pdf"
              download="Resume"
            >
              <PoppingLetters className="" text="Resume" initialDelay={600} speed={30} />
            </a>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
          </div>
        </div>
        <div className={`flex flex-row gap-2 ${!timer && `opacity-0`} animate-fadeInDelayedShort`}>
          <a target="_blank" href="https://www.linkedin.com/in/rohan-arya/"
            className="transform transition-transform duration-200 hover:scale-105"
          >
            <Image src={linkedin_logo} className="w-[3rem]" alt="linkedin" />
          </a>
          <a target="_blank" href="https://github.com/Zax-boop"
            className="transform transition-transform duration-200 hover:scale-105"
          >
            <Image src={github_logo} className="w-[3rem] bg-white rounded-md" alt="github" />
          </a>
        </div>
        <FadeInSection>
          <div className='flex flex-row mt-10 items-center gap-2'>
            <div className='flex flex-col'>
              <p className='text-4xl font-medium'>ColomboAI - Full Stack Developer</p>
              <p className='text-2xl font-medium'>August 2024 - Present</p>
              <div className="list-disc pl-6 mt-2 text-lg">
                <li>Worked as part of a global team spanning the U.S and India</li>
                <li>Developed social media application using Flutter and Dart for mobile and Next.js and
                  Tailwind for desktop</li>
                <li>Implemented authentication and user management features using Firebase Authentication
                  boosting app security</li>
                <li>Wrote unit tests and integration tests, fixing bugs and documenting processes to augment
                  productivity by 30%</li>
                <li>Wrote SQL queries for handling large scale data models</li>
                <li>Utilized Java to create and consume RESTful services to communicate across the stack</li>
              </div>
            </div>
            <div className='flex flex-col items-center gap-2 w-[32rem]'>
              <a target='_blank' href='https://colomboai.com/' className="w-[32rem] rounded-lg overflow-hidden transform transition-transform duration-200 hover:scale-105">
                <video
                  src="/colombo_demo.mov"
                  className="w-full cursor-pointer"
                  autoPlay
                  loop
                  muted
                />
              </a>
              <a target='_blank' href='https://colomboai.com/' style={{ cursor: 'pointer' }} className="cursor-pointer text-[#5454d0] underline">https://colomboai.com/</a>
            </div>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className='flex flex-row mt-10 items-center gap-2'>
            <div className='flex flex-col'>
              <p className='text-4xl font-medium'>Hatch Recruiting - Full Stack Developer</p>
              <p className='text-2xl font-medium'>February 2023 - August 2024</p>
              <div className="list-disc pl-6 mt-2 text-lg">
                <li>Implemented resume parsing algorithm in Python to extract and structure key information such
                  as skills, education, and work experience from diverse resume formats reducing time to find a
                  perfect candidate by 95%</li>
                <li>Implemented 4 figmas weekly with Next.js, React.js, Typescript, Tailwind, and CSS</li>
                <li>Designed and built DB endpoints in Python and Next.js, with an ORM to ensure stateful user
                  data storage</li>
                <li>Deployed backend server within docker container in AWS EC2 instance to facilitate traffic
                  between frontend and PostgreSQL improving efficiency by 12%</li>
                <li>Wrote SQL queries for handling large scale data models</li>
                <li>Utilized Java to create and consume RESTful services to communicate across the stack</li>
              </div>
            </div>
            <div className='flex flex-col gap-2 items-center w-[32rem]'>
            <a target='_blank' href='https://dev.hatchrecruiting.com/' className="w-[32rem] rounded-lg overflow-hidden transform transition-transform duration-200 hover:scale-105">
              <video
                src="/hatch_demo.mov"
                className="w-full"
                autoPlay
                loop
                muted
              />
            </a>
            <a target='_blank' href='https://dev.hatchrecruiting.com/' style={{ cursor: 'pointer' }} className="cursor-pointer text-[#5454d0] underline">https://dev.hatchrecruiting.com/</a>
            </div>
           
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className='flex flex-row mt-10 items-center gap-2'>
            <div className='flex flex-col'>
              <p className='text-4xl font-medium'>Stealth Startup - Full Stack Developer</p>
              <p className='text-2xl font-medium'>May 2024 - September 2024</p>
              <div className="pl-6 mt-2 text-lg">
                <li>Designed and implemented payment infrastructure using the Stripe API, optimizing transaction
                  processes by 50%</li>
                <li>Implemented authentication and user management features using Firebase Authentication
                  boosting app security</li>
                <li>Integrated and managed Firestore database, increasing efficiency of seamless data storage
                  and retrieval by 18%</li>
                <li>Deployed backend server within docker container in AWS EC2 instance to facilitate traffic
                  between frontend and PostgreSQL improving efficiency by 12%</li>
                <li>Wrote unit tests and integration tests, fixing bugs and documenting processes to augment
                  productivity by 20%</li>
                <li>Developed a mobile application using Flutter and Dart, focusing on user-friendly UI/UX design</li>
              </div>
            </div>
            <div className="w-[18rem] rounded-[2.1rem] overflow-hidden transform transition-transform duration-200 hover:scale-105">
              <video
                src="/slip_demo.mov"
                className="w-full h-full object-cover transform scale-105 object-center"
                autoPlay
                loop
                muted
              />
            </div>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className='flex flex-col mt-10'>
            <p className='text-4xl font-medium'>DisplayRide - Software Engineer Intern</p>
            <p className='text-2xl font-medium'>July 2022 - December 2022</p>
            <div className="pl-6 mt-2 text-lg">
              <li>Redesigned driver support page to have better UI/UX for user-friendliness using React.js and
                Typescript, reducing customer complaints by 75%</li>
              <li>Designed driver support time lapse sections for customer devices on Firebase servers in
                React.js and Typescript to increase driver transparency by 40%</li>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}

