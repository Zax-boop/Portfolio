"use client";

import { useEffect, useState, useRef } from "react";
import PoppingLetters from "./components/poppingLetters";
import linkedin_logo from "../../public/linkedinLogo.png";
import github_logo from "../../public/github_logo.png";
import Image from "next/image";
import VideoSlider from "./components/videoSlider";
import ExperienceTimeline from "./components/experienceTimeline";
import AboutSection from "./components/aboutSection";
import ProjectSection from "./components/projectSection";
import ContactSection from "./components/contactSection";
import SignInForm from "../app/components/signIn"
import LazyLoader from "./components/lazyLoader";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const videos = ["/hatch_demo.mp4", "/addAlbum.mp4", "/colombo_demo.mp4"];

export default function Home() {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })
  const [timer, setTimer] = useState(false);
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
  // const scrollToSection = (id: string) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
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

    const threshold = 40 * 16;

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
    <div className={`flex flex-col w-full h-full items-center`}>
      <SignInForm />
      <svg
        width={isMobile ? "200" :  "100%"}
        height={isMobile ? "1000" : "2000"}
        viewBox={isMobile ? "0 0 500 1000" : "0 0 1000 2000"} 
        fill="none"
        className="absolute xs:top-[10rem] sm:top-[45rem] xl:top-[40rem] left-0 w-full h-auto z-0 squiggle"
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
      <header className={`w-4/5 flex flex-col items-start mt-4 xs:py-1 xl:py-3`}>
        <Link href={"/"} className="font-semibold text-xl cursor-pointer p-1 rounded-md hover:bg-white hover:text-black transition-all ease-in-out duration-300">RA</Link>
        <div
          ref={lineRef}
          className={`h-[0.1rem] bg-white transition-all duration-700 mt-2 ${isVisible ? "w-full" : "w-0"
            }`}
        />
        {/* <div className="flex flex-row gap-[2rem]">
          <button onClick={() => scrollToSection("experience")} className="relative group">
            <p className="font-semibold">Work Experience</p>
            <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
          </button>
          <button onClick={() => scrollToSection("projects")} className="relative group">
            <p className="font-semibold">Projects</p>
            <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
          </button>
          <button onClick={() => scrollToSection("about")} className="relative group">
            <p className="font-semibold">About Me</p>
            <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
          </button>
          <button onClick={() => scrollToSection("contact")} className="relative group">
            <p className="font-semibold">Contact Me</p>
            <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
          </button>
        </div> */}
      </header>
      <div className="relative flex flex-col w-full mt-1 xl:h-[90vh] items-center overflow-hidden">
        {/* <video
          ref={videoRef}
          src="/cb.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        /> */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col w-4/5 items-start z-10">
          <PoppingLetters
            className="font-semibold xs:text-[2.5rem] sm:text-[5rem] lg:text-[7rem] xl:text-[10rem] xs:mt-2 sm:mt-0 xl:mt-12"
            text={"ROHAN ARYA"}
          />
          <div className="flex xs:flex-col xl:flex-row justify-between w-full xs:mt-4 xl:mt-20">
            <div className="flex flex-col w-4/5">
              <PoppingLetters
                className="xs:text-[1.5rem] sm:text-[3rem] xl:text-6xl"
                text="Full Stack Developer Based in California"
                initialDelay={1000}
                speed={30}
              />
              <div className="flex flex-row xl:mt-4 xs:text-[1.2rem] sm:text-[2rem] xl:text-3xl w-full">
                <div className="relative group">
                  <a href="/Resume_Rohan_Arya.pdf" target="_blank">
                    <PoppingLetters text="Resume" initialDelay={2200} speed={30}/>
                  </a>
                  <span className="absolute xs:-bottom-[0.075rem] sm:-bottom-[0.1rem] left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
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
                  <Image src={linkedin_logo} className="xs:w-[3rem] sm:w-[3rem]" alt="linkedin" />
                </a>

                <a
                  target="_blank"
                  href="https://github.com/Zax-boop"
                  className="transform transition-transform duration-200 hover:scale-105"
                >
                  <Image
                    src={github_logo}
                    className="xs:w-[3rem] sm:w-[3rem] bg-white rounded-sm"
                    alt="github"
                  />
                </a>
              </div>
            </div>
            {<div
              className={`flex transform transition-transform duration-200 hover:scale-105 flex-col justify-end items-end w-2/5 ${!timer && "opacity-0"
                } animate-fadeInDelayed xs:mb-[20rem] sm:mb-0`}
            >
              <VideoSlider videos={videos} />
            </div>}
          </div>
        </div>
      </div>
      <div className="w-4/5 flex flex-col mt-2 xl:mt-[1rem] z-10">
        <LazyLoader id="experience">
          <ExperienceTimeline />
        </LazyLoader>
        <LazyLoader id="projects">
          <ProjectSection />
        </LazyLoader>
        <LazyLoader id="about">
          <AboutSection />
        </LazyLoader>
        <LazyLoader id="contact">
          <ContactSection />
        </LazyLoader>
      </div>
    </div>
  );
}
