"use client";

import { useCallback, useState, useEffect } from "react";
import TypingSequence, { type TypingLine } from "./components/general/typingSequence";
import linkedin_logo from "../../public/linkedinLogo.png";
import github_logo from "../../public/github_logo.png";
import Image from "next/image";
import VideoSlider from "./components/general/videoSlider";
import ExperienceTimeline from "./components/landing/experienceTimeline";
import AboutSection from "./components/landing/aboutSection";
import ProjectSection from "./components/landing/projectSection";
import ContactSection from "./components/landing/contactSection";
import SignInForm from "./components/general/signIn"
import LazyLoader from "./components/general/lazyLoader";
import HomeHeader from "./components/landing/homeHeader";
import { ScrollText } from "lucide-react";

const videos = ["/hatch_demo.mp4", "prismera_demo.mp4", "/addAlbum.mp4", "/colombo_demo.mp4"];
const introLines: TypingLine[] = [
  {
    text: "ROHAN ARYA",
    className:
      "font-semibold leading-[0.88] tracking-[-0.075em] text-[clamp(2.75rem,12vw,10rem)]",
    speed: 35,
  },
  {
    text: "Full Stack Developer",
    className:
      "text-[clamp(1.7rem,4vw,3.8rem)] font-medium leading-[1.08] tracking-[-0.045em] text-white/90",
    speed: 24,
  },
  {
    text: "Based in California",
    className: "mt-2 text-sm tracking-[0.08em] text-white/55 sm:text-base",
    speed: 24,
  },
];

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [visibleActionCount, setVisibleActionCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  useEffect(() => {
    if (!introComplete) return;

    const timeouts = [
      setTimeout(() => setVisibleActionCount(1), 0),
      setTimeout(() => setVisibleActionCount(2), 150),
      setTimeout(() => setVisibleActionCount(3), 300),
      setTimeout(() => setShowPreview(true), 650),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [introComplete]);

  return (
    <div className={`flex flex-col w-full h-full items-center`}>
      <SignInForm />
      <HomeHeader />
      <section className="home-hero relative flex min-h-screen w-full mt-1 items-start overflow-hidden border-y border-white/10">
        <div className="relative z-10 mx-auto flex w-11/12 max-w-7xl flex-col pt-8 pb-12 sm:pt-10 sm:pb-16 xl:pt-12 xl:pb-20">
          <div className="mb-5 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.3rem] text-white/55 sm:text-xs">
            <span className="h-px w-8 bg-white/50" />
            Software engineer · California
          </div>
          <TypingSequence
            lines={introLines}
            initialDelay={1000}
            initialCursorBlink
            onComplete={handleIntroComplete}
          >
            {(renderLine) => (
              <>
                {renderLine(0)}
                <div className="mt-10 flex w-full flex-col gap-10 sm:mt-14 xl:flex-row xl:items-end xl:justify-between">
                  <div className="flex w-full flex-col xl:max-w-[52%]">
                    {renderLine(1)}
                    {renderLine(2)}
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <a
                        href="/Resume_Rohan_Arya.pdf"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Resume"
                        tabIndex={visibleActionCount > 0 ? 0 : -1}
                        className={`rounded-full border border-white/15 bg-white/[0.04] p-2 transition-[opacity,transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 ${
                          visibleActionCount > 0
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-2 opacity-0"
                        }`}
                      >
                        <ScrollText className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.linkedin.com/in/rohan-arya/"
                        aria-label="LinkedIn"
                        tabIndex={visibleActionCount > 1 ? 0 : -1}
                        className={`rounded-full border border-white/15 bg-white/[0.04] p-2 transition-[opacity,transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 ${
                          visibleActionCount > 1
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-2 opacity-0"
                        }`}
                      >
                        <Image src={linkedin_logo} className="h-5 w-5 sm:h-6 sm:w-6" alt="" />
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/Zax-boop"
                        aria-label="GitHub"
                        tabIndex={visibleActionCount > 2 ? 0 : -1}
                        className={`rounded-full border border-white/15 bg-white/[0.04] p-2 transition-[opacity,transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 ${
                          visibleActionCount > 2
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-2 opacity-0"
                        }`}
                      >
                        <Image src={github_logo} className="h-5 w-5 rounded-sm bg-white sm:h-6 sm:w-6" alt="" />
                      </a>
                    </div>
                  </div>
                  <div
                    className={`flex w-full flex-col transition-[opacity,transform] duration-700 ease-out xl:w-[44%] ${
                      showPreview
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-3 opacity-0"
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-white/45">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                      Selected work
                    </div>
                    <VideoSlider videos={videos} isActive={showPreview} />
                  </div>
                </div>
              </>
            )}
          </TypingSequence>
        </div>
      </section>
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
