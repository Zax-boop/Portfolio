"use client";
import { useState, useEffect, useRef } from "react";

interface VideoSliderProps {
  videos: string[]; 
}

export default function VideoSlider({ videos }: VideoSliderProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    if (videoRef.current) {
      var playPromise = videoRef.current.play();
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full mx-auto">
      <div className="relative w-[35rem] h-[20rem] group overflow-hidden">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              ref={index === currentIndex ? videoRef : null}
              src={video}
              className="w-full h-full object-cover rounded-xl"
              muted
              autoPlay
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
