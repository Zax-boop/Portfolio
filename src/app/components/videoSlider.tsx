"use client";
import { useState, useEffect, useRef } from "react";

interface VideoSliderProps {
  videos: string[]; 
}

export default function VideoSlider({ videos }: VideoSliderProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timer, setTimer] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimer(true);
    }, 2800);
    return () => clearTimeout(timerId);
  }, []);
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.playbackRate = 1.5; 
      videoElement.currentTime = 0;

      const handleVideoEnd = (): void => {
        nextSlide();
      };

      videoElement.addEventListener("ended", handleVideoEnd);

      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [currentIndex]);

  useEffect(() => {
    if (videoRef.current && timer) {
      videoRef.current.play();
    }
  }, [currentIndex]);
  return (
    <div className="relative w-full mx-auto xs:mt-4 xl:mt-0">
      <div className="relative xs:w-[20rem] xs:h-[11.4rem] sm:w-[30rem] sm:h-[16.8rem] xs: xl:w-[35rem] xl:h-[20rem] group overflow-hidden">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 xl:transition-opacity xl:duration-1000 xl:ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              ref={index === currentIndex ? videoRef : null}
              src={video}
              className="w-full h-full object-cover rounded-xl"
              muted
              autoPlay
              controls={false} 
              playsInline 
              onPlay={(e) => {
                const videoElement = e.currentTarget;
                videoElement.playbackRate = 1.5;
                videoElement.currentTime = 0; 
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
