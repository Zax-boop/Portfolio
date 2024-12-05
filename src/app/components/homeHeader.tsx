"use client";

import { useEffect, useState, useRef } from "react";
import linkedin_logo from "../../../public/linkedinLogo.png";
import github_logo from "../../../public/github_logo.png";
import Image from "next/image";
import Link from "next/link";
import { ListOrdered, ScrollText } from "lucide-react";
export default function HomeHeader() {
    const lineRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
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
        <header className={`w-4/5 flex flex-col items-start mt-4 xs:py-1 xl:py-3`}>
            <div className="flex flex-row items-center w-full justify-between">
                <Link href={"/"} className="font-semibold text-xl cursor-pointer p-1 rounded-md hover:bg-white hover:text-black transition-all ease-in-out duration-300">
                    RA
                </Link>
                <div className={`flex flex-row mt-2 gap-2`}>
                    <div className="relative z-[100]" onMouseLeave={() => setDropdownOpen(false)}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="transform transition-transform duration-200 hover:scale-105"
                        >
                            <ListOrdered className="xs:w-[1.8rem] sm:w-[1.5rem] sm:h-[1.5rem] self-start p-0.5 rounded-md hover:bg-white hover:text-black transition-all ease-in-out duration-300" />
                        </button>
                        <ul
                            className={`absolute left-0 mt-0 bg-white border border-gray-200 rounded-md shadow-md xs:w-[8rem] sm:w-48 transition-all duration-300 ease-in-out ${dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                }`}
                        >
                            <li>
                                <Link
                                    href="/album_ranking"
                                    className="block xs:px-2 sm:px-4 xs:py-1 sm:py-2 text-black hover:bg-gray-100"
                                >
                                    Albums
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/anime"
                                    className="block xs:px-2 sm:px-4 xs:py-1 sm:py-2 text-black hover:bg-gray-100"
                                >
                                    Anime
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/books"
                                    className="block xs:px-2 sm:px-4 xs:py-1 sm:py-2 text-black hover:bg-gray-100"
                                >
                                    Books
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/climbing"
                                    className="block xs:px-2 sm:px-4 xs:py-1 sm:py-2 text-black hover:bg-gray-100"
                                >
                                    Climbing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tv"
                                    className="block xs:px-2 sm:px-4 xs:py-1 sm:py-2 text-black hover:bg-gray-100"
                                >
                                    TV Shows
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/games"
                                    className="block xs:px-2 sm:px-4 xs:py-1 sm:py-2 text-black hover:bg-gray-100"
                                >
                                    Video Games
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <a
                        href="/Resume_Rohan_Arya.pdf"
                        target="_blank"
                        className="transform transition-transform duration-200 hover:scale-105"
                    >
                        <ScrollText className="xs:w-[1.5rem] sm:w-[1.5rem]" />
                    </a>
                    <a
                        target="_blank"
                        href="https://www.linkedin.com/in/rohan-arya/"
                        className="transform transition-transform duration-200 hover:scale-105"
                    >
                        <Image src={linkedin_logo} className="xs:w-[1.5rem] sm:w-[1.5rem] sm:mx-0.5" alt="linkedin" />
                    </a>
                    <a
                        target="_blank"
                        href="https://github.com/Zax-boop"
                        className="transform transition-transform duration-200 hover:scale-105"
                    >
                        <Image
                            src={github_logo}
                            className="xs:w-[1.5rem] sm:w-[1.5rem] bg-white rounded-sm"
                            alt="github"
                        />
                    </a>
                </div>
            </div>

            <div
                ref={lineRef}
                className={`h-[0.1rem] bg-white transition-all duration-700 mt-2 ${isVisible ? "w-full" : "w-0"}`}
            />
        </header>
    )
}
