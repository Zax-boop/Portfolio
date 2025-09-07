"use client";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

  export default function ImageSlider({images}: {images: StaticImageData[]}): JSX.Element {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);
  
    const nextSlide = (): void => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    useEffect(() => {
      if (!isHovered) {
        const interval = setInterval(() => {
          nextSlide();
        }, 3000);
        return () => clearInterval(interval);
      }
    }, [isHovered]);
  
    const handleMouseOver = (): void => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = (): void => {
      setIsHovered(false);
    };
  
    return (
      <div className="relative w-full mx-auto">
        <div
          className="relative w-[30rem] h-[20rem] group overflow-hidden"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Slider Image ${index + 1}`}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  