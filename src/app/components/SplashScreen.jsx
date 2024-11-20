import React, { useEffect } from "react";
import anime from "animejs";

const SplashScreen = ({ finishLoading }) => {
    const animate = () => {
        const loader = anime.timeline({
            complete: () => finishLoading(),
        });
        loader.add({
            targets: ["#logo", "#bottom-line"],
            opacity: [0, 1],
            clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
            width: ["0%", "100%"],
            duration: 1000,
            easing: "linear",
        });

        loader.add({
            targets: ["#logo", "#bottom-line"],
            opacity: [1, 0],
            clipPath: ["inset(0 0% 0 0)", "inset(0 0% 0 100%)"],
            width: ["100%", "0%"],
            left: ["0%", "100%"],
            duration: 1000,
            easing: "linear",
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => 10);
        animate();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="relative">
                <div
                    id="logo"
                    className="min-w-[5rem] min-h-[5rem] flex flex-row justify-center items-center"
                    style={{ opacity: 0 }}>
                    <p
                    className="text-[3.5rem]"
                    >RA</p>
                </div>
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
