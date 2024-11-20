"use client"

import React from 'react'
import FadeInSection from './fadeIn'
import Image from 'next/image'
import linkedin_logo from "../../../public/linkedinLogo.png"
import github_logo from "../../../public/github_logo.png"
import { useRef, useState, useEffect } from 'react'


export default function ContactSection() {
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
        <div className="flex flex-col">
            <FadeInSection className="">
                <p className="xs:text-2xl sm:text-4xl xl:text-5xl mt-10">Contact Me</p>
                <div
                    ref={lineRef}
                    className={`h-[0.1rem] bg-white transition-all duration-700 mt-2 ${isVisible ? "w-full" : "w-0"
                        }`}
                />
            </FadeInSection>
            <FadeInSection className="self-start relative group mt-2">
                <a
                    href="mailto:rohan.arya01@gmail.com"
                    target="_blank"
                    className="xs:text-[1rem] sm:text-4xl"
                >
                    rohan.arya01@gmail.com
                </a>
                <span className="absolute -bottom-[0.1rem] left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>

            </FadeInSection>
            <FadeInSection className="self-start relative group xl:mt-2">
                <a href="/Resume_Rohan_Arya.pdf" target='_blank'>
                    <p className="xs:text-[1rem] sm:text-[2rem] xl:text-4xl">Resume</p>
                </a>
                <span className="absolute -bottom-[0.1rem] left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
            </FadeInSection>
            <FadeInSection
                className={`flex flex-row mt-2 gap-2`}>
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/rohan-arya/"
                    className="transform transition-transform duration-200 hover:scale-105"
                >
                    <Image src={linkedin_logo} className="xs:w-[2rem] sm:w-[3rem]" alt="linkedin" />
                </a>

                <a
                    target="_blank"
                    href="https://github.com/Zax-boop"
                    className="transform transition-transform duration-200 hover:scale-105"
                >
                    <Image
                        src={github_logo}
                        className="xs:w-[2rem] sm:w-[3rem] bg-white rounded-sm"
                        alt="github"
                    />
                </a>
            </FadeInSection>
        </div>
    )
}
