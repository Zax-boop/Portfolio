import React, { useState, useEffect } from "react";
import Image from "next/image";
import anime from "animejs";
import cinema from "../../../public/cinema.jpg";

const SplashScreen = ({ finishLoading }) => {
    const [isMounted, setIsMounted] = useState(false);

    const animate = () => {
        const loader = anime.timeline({
            complete: () => finishLoading(),
        });
        loader.add({
            targets: ["#logo", "#bottom-line"],
            opacity: [0, 1],  // Fade in both the image and the line
            clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], // Image appears from left to right
            width: ["0%", "100%"],  // Line expands from 0% to 100%
            duration: 1000,  // 1 second for both the image and the line to appear
            easing: "linear",  // Linear easing for a smooth reveal
        });
        
        loader.add({
            targets: ["#logo", "#bottom-line"],
            opacity: [1, 0],  // Fade out both the image and the line
            clipPath: ["inset(0 0% 0 0)", "inset(0 0% 0 100%)"], // Image disappears from left to right (clip from left)
            width: ["100%", "0%"],  // Line shrinks from 100% to 0% (from left to right)
            right: ["0%", "100%"],
            duration: 1000,  // 1 second for both the image and the line to disappear
            easing: "linear",  // Linear easing for the disappearing effect
            delay: 1000,  // Delay the disappearance by 1 second (after they have fully appeared)
        });      
    };

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10);
        animate();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="relative">
                <Image
                    id="logo"
                    src={cinema}
                    alt="placeholder"
                    className="min-w-[5rem] min-h-[5rem]"
                    width={60}
                    height={60}
                    style={{ opacity: 0 }} 
                />
                <span
                    id="bottom-line"
                    className="absolute -bottom-1 left-0 h-1 bg-white"
                    style={{ width: "0%" }} 
                ></span>
                <span
                    id="top-line"
                    className="absolute -top-1 right-0 h-1 bg-white"
                    style={{ width: "0%" }} 
                ></span>
            </div>
        </div>
    );
};

export default SplashScreen;
