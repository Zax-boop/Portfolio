"use client";

import { useEffect, useState } from "react";
import PoppingLetters from "./components/poppingLetters";
import Header from "./components/header";
import { usePathname } from "next/navigation";
import linkedin_logo from "../../public/linkedinLogo.png";
import github_logo from "../../public/github_logo.png";
import Image from "next/image";
import VideoSlider from "./components/videoSlider";

const videos = ["/hatch_demo.mov", "/addAlbum.mov", "/colombo_demo.mov"];

export default function Home() {
  const pathname = usePathname();
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimer(true);
    }, 2800);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const svg = document.querySelector("svg.squiggle");
    const path = svg?.querySelector("path");

    if (!svg || !path) return;

    const threshold = 40 * 16; // Convert 40rem to pixels (1rem = 16px by default)

    const scroll = () => {
      const distance = window.scrollY;

      if (distance < threshold) {
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = `${pathLength}`;
        path.style.strokeDashoffset = `${pathLength}`;
        return;
      }

      const totalDistance = svg.clientHeight - window.innerHeight;
      const adjustedDistance = distance - threshold; 
      const percentage = Math.min(Math.max(adjustedDistance / totalDistance, 0), 1); 

      const pathLength = path.getTotalLength();

      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
    };

    scroll(); 

    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);


  return (
    <div className="flex flex-col w-full h-full items-center no-scrollbar-track" style={{"overflow": "overlay"}}>
      <svg
        width="100%"
        height="2000"
        viewBox="0 0 1000 2000"
        fill="none"
        className="absolute top-[40rem] left-0 w-full h-auto z-0 squiggle"
      >
        <path
          d="M-24.5 101C285 315 5.86278 448.291 144.223 631.238C239.404 757.091 559.515 782.846 608.808 617.456C658.101 452.067 497.627 367.073 406.298 426.797C314.968 486.521 263.347 612.858 322.909 865.537C384.086 1125.06 79.3992 1007.94 100 1261.99C144.222 1807.35 819 1325 513 1142.5C152.717 927.625 -45 1916.5 1191.5 1852"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeOpacity={0.3}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <Header />
      <div className="relative flex flex-col w-full mt-1 h-[90vh] items-center overflow-hidden">
        <video
          src="/cb.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col w-4/5 items-start z-10">
          <PoppingLetters
            className="font-semibold text-[10.5rem] mt-12"
            text={"ROHAN ARYA"}
          />
          <div className="flex flex-row justify-between w-full mt-20">
            <div className="flex flex-col w-4/5">
              <PoppingLetters
                className="text-6xl"
                text="Full Stack Developer Based in California"
                initialDelay={1000}
                speed={30}
              />
              <div className="flex flex-row mt-4 text-3xl w-full">
                <div className="relative group">
                  <a href="/Resume_Rohan_Arya.pdf" download="Resume">
                    <PoppingLetters text="Resume" initialDelay={2200} speed={30} />
                  </a>
                  <span className="absolute -bottom-[0.1rem] left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
                </div>
              </div>
              <div
                className={`flex flex-row mt-2 gap-2 ${!timer && "opacity-0"
                  } animate-fadeInDelayed`}
              >
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/rohan-arya/"
                  className="transform transition-transform duration-200 hover:scale-105"
                >
                  <Image src={linkedin_logo} className="w-[3rem]" alt="linkedin" />
                </a>

                <a
                  target="_blank"
                  href="https://github.com/Zax-boop"
                  className="transform transition-transform duration-200 hover:scale-105"
                >
                  <Image
                    src={github_logo}
                    className="w-[3rem] bg-white rounded-sm"
                    alt="github"
                  />
                </a>
              </div>
            </div>
            <div
              className={`flex transform transition-transform duration-200 hover:scale-105 flex-col justify-end items-end w-2/5 ${!timer && "opacity-0"
                } animate-fadeInDelayed`}
            >
              <VideoSlider videos={videos} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 flex flex-col mt-[1rem] z-10">
        <p className="w-full flex flex-row justify-center items-center text-5xl">Work Experience</p>
        <div className='flex flex-col mt-10 items-center gap-2'>
          <div className='flex flex-col gap-2 items-center w-full'>
            <a target='_blank' href='https://dev.hatchrecruiting.com/' className="w-full rounded-lg overflow-hidden">
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
        </div>
        <div className='flex flex-col mt-[1rem] gap-2'>
          <div className='flex flex-col items-center gap-2 w-full'>
            <a target='_blank' href='https://colomboai.com/' className="w-full rounded-lg overflow-hidden cursor-pointer">
              <video
                src="/colombo_demo.mov"
                className="w-full cursor-pointer"
                autoPlay
                loop
                muted
              />
            </a>
            {/* <a target='_blank' href='https://colomboai.com/' style={{ cursor: 'pointer' }} className="cursor-pointer text-[#5454d0] underline">https://colomboai.com/</a> */}
          </div>
          <div className='flex flex-col w-2/5 '>
            <p className='text-4xl font-medium'>ColomboAI</p>
            <p className='text-3xl font-medium text-gray-400'>Full Stack Developer</p>
            <p className='text-2xl font-medium'>August 2024 - Present</p>
            <p>Collaborated with a global team across the U.S. and India to develop a social media application. Leveraged Flutter and Dart for mobile development and Next.js with Tailwind CSS for desktop interfaces. Implemented secure authentication and user management using Firebase Authentication, enhancing app security. Increased productivity by 30% by writing unit and integration tests, debugging, and documenting workflows. Designed SQL queries for managing large-scale data models and utilized Java to create and consume RESTful services for seamless communication across the stack.</p>
          </div>
        </div>
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
      </div>
    </div>
  );
}
