"use client"

import PoppingLetters from "./components/poppingLetters";
import Header from "./components/header";
import { usePathname } from "next/navigation";
import linkedin_logo from "../../public/linkedinLogo.png"
import github_logo from "../../public/github_logo.png"
import Image from 'next/image';
import { useEffect, useState } from "react";

export default function Home() {
  const pathname = usePathname()
  const [timer, setTimer] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimer(true);
    }, 3000); 
    return () => clearTimeout(timerId);
  }, []);
  return (
    <div className="flex flex-col w-full h-full items-center">
      <Header />
      <div className="flex flex-col w-4/5 items-start">
        <PoppingLetters className="font-semibold text-[10.8rem] mt-12" text={"ROHAN ARYA"} />
        <PoppingLetters className="text-6xl w-3/5" text="Full Stack Developer in California" initialDelay={1000} speed={30} />
        <div className={`flex flex-row mt-20 text-6xl w-full`}>
          <PoppingLetters text="Download my&nbsp;" initialDelay={2200} speed={30} />
          <div className="relative group">
            <a
              href="/Resume_Rohan_Arya.pdf"
              download="Resume"
            >
              <PoppingLetters className="" text="Resume" initialDelay={2600} speed={30} />
            </a>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
          </div>
        </div>
        <div className={`flex flex-row gap-2 ${!timer && `opacity-0`} animate-fadeInDelayed`}>
          <a target="_blank" href="https://www.linkedin.com/in/rohan-arya/">         
           <Image src={linkedin_logo} className="w-[3rem]" alt="linkedin"/>
          </a>
          <a target="_blank" href="https://github.com/Zax-boop">         
          <Image src={github_logo} className="w-[3rem] bg-white" alt="github"/>
          </a>
        </div>
      </div>
    </div>
  );
}
