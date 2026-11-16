"use client";
import { useState, useEffect, useRef } from "react";

interface VideoSliderProps {
  videos: string[];
  isActive: boolean;
}

export default function VideoSlider({ videos, isActive }: VideoSliderProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && isActive) {
      videoElement.playbackRate = 1.5;
      videoElement.currentTime = 0;

      const handleVideoEnd = (): void => {
        nextSlide();
      };

      videoElement.addEventListener("ended", handleVideoEnd);

      void videoElement.play().catch((error: unknown) => {
        console.error("Unable to play the selected work preview.", error);
      });

      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [currentIndex, isActive]);

  return (
    <div className="relative mx-auto w-full">
      <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              ref={index === currentIndex ? videoRef : null}
              src={video}
              className="h-full w-full object-cover"
              muted
              autoPlay={isActive && index === currentIndex}
              preload={index === currentIndex ? (isActive ? "auto" : "metadata") : "none"}
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
