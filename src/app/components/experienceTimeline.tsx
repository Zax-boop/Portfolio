"use client"

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BriefcaseIcon, GraduationCap, SquareArrowUpRight } from 'lucide-react';
import FadeInSection from './fadeIn';
import { useRef, useState, useEffect } from 'react';
import React from 'react'
import VideoWithPlaceholder from './placeholderVideo';

export default function ExperienceTimeline() {
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
        <div className='mt-10'>
            <FadeInSection className="w-full flex flex-row justify-center items-center xs:text-2xl sm:text-4xl xl:text-5xl">Work Experience</FadeInSection>
            <div
                ref={lineRef}
                className={`h-[0.1rem] bg-white transition-all duration-700 mt-2 ${isVisible ? "w-full" : "w-0"
                    }`}
            />
            <VerticalTimeline className='!mt-4'>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(0, 39, 76)', color: '#fff', padding: '12px' }}
                    contentArrowStyle={{ borderRight: '7px solid rgb(0, 39, 76)' }}
                    date="February 2025 - Present"
                    iconStyle={{ background: 'rgb(0, 39, 76)', color: '#fff' }}
                    icon={<BriefcaseIcon />}
                >
                    <div className='flex flex-col'>
                        <h1 className='vertical-timeline-element-title md:text-3xl xs:text-lg !mt-2 !font-bold'>IBM</h1>
                        <p className='!xs:text-xs !xl:text-xl !mt-0 !font-semibold'>CO-OP Software Engineer Intern</p>
                        <p className='!mt-0'>Developed a GenAI chat feature for a product using LangChain and Retrieval-Augmented Generation (RAG), enabling leadership to summarize release data and make decisions a week faster. Built a data analytics dashboard with Python, PostgreSQL, and React to visualize key metrics such as daily signups, active users, and user activity. Implemented SSO authentication and created REST APIs to support dynamic data access. Automated test release upgrade testing by writing robust Bash scripts, saving developers over 3 days of manual effort and increasing testing productivity by 200%. Additionally, developed and deployed a mock airline application using Python, Java, MongoDB, Docker, and Locust to demonstrate core features of a dependency management tool. Integrated React Tracking to surface usage analytics, enhancing product insights.</p>
                        <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>GenAI</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>LangChain</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>RAG</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Python</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>React</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>PostgreSQL</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Java</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>MongoDB</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Docker</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Locust</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Bash</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>SSO</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>REST APIs</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Data Visualization</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Analytics</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>React Tracking</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Automation</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Productivity Tools</p>
                        </div>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(254, 76, 0)', color: '#fff', padding: '12px' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(254, 76, 0)' }}
                    date="December 2024 - February 2025"
                    iconStyle={{ background: 'rgb(254, 76, 0)', color: '#fff' }}
                    icon={<BriefcaseIcon />}
                >
                    <div className='flex flex-col'>
                        <a target='_blank' href='https://colomboai.com/' className="rounded-lg overflow-hidden cursor-pointer">
                            <VideoWithPlaceholder className='w-full cursor-pointer' src='/prismera_demo.mp4' />
                        </a>
                        <h1 className='vertical-timeline-element-title md:text-3xl xs:text-lg !mt-2 !font-bold'>Prismera</h1>
                        <p className='!xs:text-xs !xl:text-xl !mt-0 !font-semibold'>Full Stack Developer Consultant</p>
                        <p className='!mt-0'>Worked across the stack on real estate lease parser. Used Next.js, Typescript, and Tailwind CSS for the frontend. Wrote REST APIs in python. Utilized Java to create and consume RESTful services for seamless communication across the stack. Used Supabase for authentication and RLS policies.</p>
                        <div className="relative group self-start cursor-pointer my-2">
                            <a target='_blank' href="https://prismera.ai/" className='flex flex-row items-center gap-2'>
                                <strong className='!font-bold'>Visit Website</strong>
                                <SquareArrowUpRight />
                            </a>
                            <span className="absolute xs:-bottom-[0.075rem] sm:-bottom-[0.3rem] left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
                        </div>
                        <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Next.js</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Typescript</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Tailwind CSS</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Supabase</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>RLS</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Java</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Python</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>REST APIs</p>

                        </div>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', padding: '12px' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="August 2024 - December 2024"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<BriefcaseIcon />}
                >
                    <div className='flex flex-col'>
                        <a target='_blank' href='https://colomboai.com/' className="rounded-lg overflow-hidden cursor-pointer">
                            <VideoWithPlaceholder className='w-full cursor-pointer' src='/colombo_demo.mp4' />
                        </a>
                        <h1 className='vertical-timeline-element-title md:text-3xl xs:text-lg !mt-2 !font-bold'>ColomboAI</h1>
                        <p className='!xs:text-xs !xl:text-xl !mt-0 !font-semibold'>Full Stack Developer</p>
                        <p className='!mt-0'>Developed social media application with Flutter and Dart for mobile development and Next.js and Tailwind CSS for desktop. Implemented secure authentication using Firebase Authentication. Designed SQL queries for managing large-scale data models and utilized Java to create and consume RESTful services for seamless communication across the stack.</p>
                        <div className="relative group self-start cursor-pointer my-2">
                            <a target='_blank' href="https://colomboai.com/" className='flex flex-row items-center gap-2'>
                                <strong className='!font-bold'>Visit Website</strong>
                                <SquareArrowUpRight />
                            </a>
                            <span className="absolute xs:-bottom-[0.075rem] sm:-bottom-[0.3rem] left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
                        </div>
                        <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Flutter</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Dart</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Next.js</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Typescript</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Tailwind CSS</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Firebase</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>SQL</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Java</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>REST</p>

                        </div>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'white', color: 'black', padding: '12px' }}
                    contentArrowStyle={{ borderRight: '7px solid white' }}
                    date="May 2024 - September 2024"
                    dateClassName='sm:text-white xs:text-black'
                    iconStyle={{ background: 'black', color: '#fff' }}
                    icon={<BriefcaseIcon />}
                >
                    <div className='flex xs:flex-col sm:flex-row'>
                        <div className='flex flex-col'>
                            <h1 className='vertical-timeline-element-title md:text-3xl xs:text-lg !mt-2 !font-bold'>Stealth Startup</h1>
                            <p className='!text-xl !mt-0 !font-semibold'>Full Stack Developer</p>
                            <p className='!mt-0 !text-md'>Developed mobile application using Flutter and Dart. Implemented payment infrastructure using Stripe API and authentication using Firebase. Integrated and managed Firestore database.</p>
                            <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                                <p className='!mt-0 py-1.5 px-3 rounded-xl bg-black text-white hover:opacity-70 transition duration-300 ease-in-out'>Flutter</p>
                                <p className='!mt-0 py-1.5 px-3 rounded-xl bg-black text-white hover:opacity-70 transition duration-300 ease-in-out'>Dart</p>
                                <p className='!mt-0 py-1.5 px-3 rounded-xl bg-black text-white hover:opacity-70 transition duration-300 ease-in-out'>Stripe</p>
                                <p className='!mt-0 py-1.5 px-3 rounded-xl bg-black text-white hover:opacity-70 transition duration-300 ease-in-out'>Firebase</p>
                            </div>
                        </div>
                        <div className="min-w-[12rem] rounded-[2.1rem] xs:mt-4 sm:mt-0 overflow-hidden">
                            <VideoWithPlaceholder aspect='aspect-[9/19.5]' className='w-full object-fill rounded-b-[2.1rem]' src='/slip_demo.mp4' />
                        </div>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#F1bb1b', color: '#fff', padding: '12px' }}
                    contentArrowStyle={{ borderRight: '7px solid  #f1bb1b' }}
                    date="February 2023 - August 2024"
                    iconStyle={{ background: '#f1bb1b', color: '#fff' }}
                    icon={<BriefcaseIcon />}
                >
                    <div className='flex flex-col'>
                        <a target='_blank' href='https://dev.hatchrecruiting.com/' className="rounded-lg overflow-hidden cursor-pointer">
                            <VideoWithPlaceholder src='/hatch_demo.mp4' className='w-full cursor-pointer' />
                        </a>
                        <h1 className='vertical-timeline-element-title md:text-3xl xs:text-lg !mt-2 !font-bold'>Hatch Recruiting</h1>
                        <p className='!text-xl !mt-0 !font-semibold'>Full Stack Developer</p>
                        <p className='!mt-0'>Implemented resume parsing algorithm in Python to extract and structure key information such
                            as skills, education, and work experience from diverse resume formats. Developed frontend with Next.js, React.js, Typescript, Tailwind, and CSS. Designed and built DB endpoints in Python and Next.js, with an ORM to ensure stateful user data storage. Deployed backend server within docker container in AWS EC2 instance to facilitate traffic between frontend and PostgreSQL. Wrote SQL queries for handling large scale data models. Utilized Java to create and consume RESTful services to communicate across the stack.</p>
                        <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Python</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>React.js</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Next.js</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Typescript</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Tailwind CSS</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>AWS</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>PostgreSQL</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Java</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>REST</p>
                        </div>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#0000FF', color: '#fff', padding: '12px' }}
                    contentArrowStyle={{ borderRight: '7px solid  #0000FF' }}
                    date="January 2023 - October 2023"
                    iconStyle={{ background: '#0000FF', color: '#fff' }}
                    icon={<BriefcaseIcon />}
                >
                    <div className='flex flex-col'>
                        <h1 className='vertical-timeline-element-title md:text-3xl xs:text-lg !mt-2 !font-bold'>Activity and Recreation Center</h1>
                        <p className='!text-xl !mt-0 !font-semibold'>Climbing Instructor</p>
                        <p className='!mt-0'>Taught students how to belay as well as rock climbing basics. Belayed climbers during shifts. Handled cash register.</p>
                        <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Leadership</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Team Player</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Mentorship</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Responsibility</p>
                        </div>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#009900', color: '#fff', padding: '12px' }}
                    contentArrowStyle={{ borderRight: '7px solid  #009900' }}
                    date="July 2022 - December 2022"
                    iconStyle={{ background: '#009900', color: '#fff' }}
                    icon={<BriefcaseIcon />}
                >
                    <div className='flex flex-col'>
                        <h1 className='vertical-timeline-element-title md:text-3xl xs:text-lg !mt-2 !font-bold'>DisplayRide</h1>
                        <p className='!text-xl !mt-0 !font-semibold'>Software Engineer Intern</p>
                        <p className='!mt-0'>Redesigned driver support page to have better UI/UX for user-friendliness using React.js and
                            Typescript. Designed driver support time lapse sections for customer devices on Firebase servers.</p>
                        <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>React.js</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Typescript</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>CSS</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Firebase</p>
                        </div>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#FF5F05', color: '#fff', padding: '12px' }}
                    contentArrowStyle={{ borderRight: '7px solid  #FF5F05' }}
                    date="August 2021 - Present"
                    iconStyle={{ background: '#FF5F05', color: '#fff' }}
                    icon={<GraduationCap />}
                >
                    <div className='flex flex-col'>
                        <h1 className='vertical-timeline-element-title md:text-3xl xs:text-lg !mt-2 !font-bold'>University of Illinois Urbana-Champaign</h1>
                        <p className='!text-xl !mt-0 !font-semibold'>B.S Computer Science and Statistics</p>
                        <p className='!mt-0'>Relevant Classes: Machine Learning Optimization, Algorithms, Computer Science II (Object
                            Oriented Programming and Design), Data Structures, Discrete Structures, Computer Science
                            I, Advanced Data Analysis</p>
                        <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Python</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>Java</p>
                            <p className='!mt-0 xs:py-1.5 md:py-1.5 xs:px-1.5 md:px-3 xs:self-start md:items-stretch xs:rounded-lg md:rounded-xl bg-white text-black hover:opacity-70 transition duration-300 ease-in-out'>C++</p>
                        </div>
                    </div>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </div >
    )
}