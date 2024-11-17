"use client"

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BriefcaseIcon, GraduationCap } from 'lucide-react';

import React from 'react'

export default function ExperienceTimeline() {
    return (
        <div className='mt-10'>
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', padding: '12px' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="August 2024 - Present"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<BriefcaseIcon />}
                >
                    <div className='flex flex-col'>
                        <a target='_blank' href='https://colomboai.com/' className="rounded-lg overflow-hidden cursor-pointer">
                            <video
                                src="/colombo_demo.mov"
                                className="w-full cursor-pointer"
                                autoPlay
                                loop
                                muted
                            />
                        </a>
                        <h1 className='vertical-timeline-element-title !text-3xl !mt-2'>ColomboAI</h1>
                        <p className='!text-xl !mt-0 font-medium'>Full Stack Developer</p>
                        <p className='!mt-0'>Developed social media application with Flutter and Dart for mobile development and Next.js and Tailwind CSS for desktop. Implemented secure authentication using Firebase Authentication. Designed SQL queries for managing large-scale data models and utilized Java to create and consume RESTful services for seamless communication across the stack.</p>
                        <div className="relative group self-start cursor-pointer">
                            <a target='_blank' href="https://colomboai.com/">
                                <p className='!mt-0 !font-semibold'>Visit Website</p>
                            </a>
                            <span className="absolute -bottom-[0.1rem] left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
                        </div>
                        <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Flutter</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Dart</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Next.js</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Typescript</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Tailwind CSS</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Firebase</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>SQL</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Java</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>REST</p>

                        </div>
                    </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'white', color: 'black', padding: '12px' }}
                    contentArrowStyle={{ borderRight: '7px solid white' }}
                    date="May 2024 - September 2024"
                    dateClassName='text-white'
                    iconStyle={{ background: 'black', color: '#fff' }}
                    icon={<BriefcaseIcon />}
                >
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <h1 className='vertical-timeline-element-title !text-3xl !mt-2'>Stealth Startup</h1>
                            <p className='!text-xl !mt-0 font-medium'>Full Stack Developer</p>
                            <p className='!mt-0 !text-md'>Developed mobile application using Flutter and Dart. Implemented payment infrastructure using Stripe API and authentication using Firebase. Integrated and managed Firestore database.</p>
                            <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                                <p className='!mt-0 py-1.5 px-3 rounded-xl bg-black text-white'>Flutter</p>
                                <p className='!mt-0 py-1.5 px-3 rounded-xl bg-black text-white'>Dart</p>
                                <p className='!mt-0 py-1.5 px-3 rounded-xl bg-black text-white'>Stripe</p>
                                <p className='!mt-0 py-1.5 px-3 rounded-xl bg-black text-white'>Firebase</p>
                            </div>
                        </div>
                        <div className="min-w-[12rem] rounded-[2.1rem] overflow-hidden">
                            <video
                                src="/slip_demo.mov"
                                className="w-full object-fill rounded-b-[2.1rem]"
                                autoPlay
                                loop
                                muted
                            />
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
                            <video
                                src="/hatch_demo.mov"
                                className="w-full cursor-pointer"
                                autoPlay
                                loop
                                muted
                            />
                        </a>
                        <h1 className='vertical-timeline-element-title !text-3xl !mt-2'>Hatch Recruiting</h1>
                        <p className='!text-xl !mt-0 font-medium'>Full Stack Developer</p>
                        <p className='!mt-0'>Implemented resume parsing algorithm in Python to extract and structure key information such
                            as skills, education, and work experience from diverse resume formats. Developed frontend with Next.js, React.js, Typescript, Tailwind, and CSS. Designed and built DB endpoints in Python and Next.js, with an ORM to ensure stateful user data storage. Deployed backend server within docker container in AWS EC2 instance to facilitate traffic between frontend and PostgreSQL. Wrote SQL queries for handling large scale data models. Utilized Java to create and consume RESTful services to communicate across the stack.</p>
                        <div className="relative group self-start cursor-pointer">
                            <a target='_blank' href="https://dev.hatchrecruiting.com/">
                                <p className='!mt-0 !font-semibold'>Visit Website</p>
                            </a>
                            <span className="absolute -bottom-[0.1rem] left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
                        </div>
                        <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Python</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>React.js</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Next.js</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Typescript</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Tailwind CSS</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>AWS</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>PostgreSQL</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Java</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>REST</p>
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
                        <h1 className='vertical-timeline-element-title !text-3xl !mt-2'>DisplayRide</h1>
                        <p className='!text-xl !mt-0 font-medium'>Software Engineer Intern</p>
                        <p className='!mt-0'>Redesigned driver support page to have better UI/UX for user-friendliness using React.js and
                            Typescript. Designed driver support time lapse sections for customer devices on Firebase servers.</p>
                        <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>React.js</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Typescript</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>CSS</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Firebase</p>
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
                        <h1 className='vertical-timeline-element-title !text-3xl !mt-2'>University of Illinois Urbana-Champaign</h1>
                        <p className='!text-xl !mt-0 font-medium'>B.S Computer Science and Statistics</p>
                        <p className='!mt-0'>Relevant Classes: Machine Learning Optimization, Algorithms, Computer Science II (Object
                            Oriented Programming and Design), Data Structures, Discrete Structures, Computer Science
                            I, Advanced Data Analysis</p>
                        <div className='flex flex-row flex-wrap !mt-2 gap-2'>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Python</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>Java</p>
                            <p className='!mt-0 py-1.5 px-3 rounded-xl bg-white text-black'>C++</p>
                        </div>
                    </div>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </div>
    )
}