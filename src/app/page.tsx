"use client"

import PoppingLetters from "./components/poppingLetters";
import Header from "./components/header";
import { usePathname } from "next/navigation";
import linkedin_logo from "../../public/linkedinLogo.png"
import github_logo from "../../public/github_logo.png"
import Image from 'next/image';
import { useEffect, useState } from "react";
import ImageSlider from "./components/slideshow";
import slide2 from "../../public/home_slideshow/slide2.jpg"
import slide4 from "../../public/home_slideshow/slide4.jpg";
import slide5 from "../../public/home_slideshow/slide5.jpg";
import slide6 from "../../public/home_slideshow/slide6.jpg";
import slide7 from "../../public/home_slideshow/slide7.jpg";
import slide9 from "../../public/home_slideshow/slide9.jpg";
import slide11 from "../../public/home_slideshow/slide11.jpg";
import slide15 from "../../public/home_slideshow/slide15.jpg";
import slide19 from "../../public/home_slideshow/slide19.jpg";
import slide22 from "../../public/home_slideshow/slide22.jpg";
import slide23 from "../../public/home_slideshow/slide23.jpg";
import slide25 from "../../public/home_slideshow/slide25.jpg";
import slide26 from "../../public/home_slideshow/slide26.jpg";

const images = [
  slide2, slide26, slide5, slide6, slide7, slide9, slide11, slide15, slide19, slide22, slide23, slide25, slide4,
];
export default function Home() {
  const pathname = usePathname()
  const [timer, setTimer] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimer(true);
    }, 2800);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="flex flex-col w-full h-full items-center">
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
          <PoppingLetters className="font-semibold text-[10.8rem] mt-12" text={"ROHAN ARYA"} />
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
              <div className={`flex flex-row mt-2 gap-2 ${!timer && "opacity-0"} animate-fadeInDelayed`}>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/rohan-arya/"
                  className="transform transition-transform duration-200 hover:scale-105"
                >
                  <Image src={linkedin_logo} className="w-[3rem]" alt="linkedin" />
                </a>

                <a target="_blank" href="https://github.com/Zax-boop"                   
                className="transform transition-transform duration-200 hover:scale-105"
                >
                  <Image src={github_logo} className="w-[3rem] bg-white rounded-sm" alt="github" />
                </a>
              </div>
            </div>
            <div className={`flex transform transition-transform duration-200 hover:scale-105 flex-col justify-end items-end w-2/5 ${!timer && "opacity-0"} animate-fadeInDelayed`}>
              <ImageSlider images={images} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
