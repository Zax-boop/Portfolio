"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import slide2 from "../../../public/home_slideshow/slide2.jpg";
import slide4 from "../../../public/home_slideshow/slide4.jpg";
import slide5 from "../../../public/home_slideshow/slide5.jpg";
import slide6 from "../../../public/home_slideshow/slide6.jpg";
import slide7 from "../../../public/home_slideshow/slide7.jpg";
import slide9 from "../../../public/home_slideshow/slide9.jpg";
import slide11 from "../../../public/home_slideshow/slide11.jpg";
import slide15 from "../../../public/home_slideshow/slide15.jpg";
import slide19 from "../../../public/home_slideshow/slide19.jpg";
import slide22 from "../../../public/home_slideshow/slide22.jpg";
import slide23 from "../../../public/home_slideshow/slide23.jpg";
import slide25 from "../../../public/home_slideshow/slide25.jpg";

const images = [
    slide2, slide4, slide5, slide6, slide7, slide9, slide11, slide15, slide19, slide22, slide23, slide25,
  ];
  export default function ImageSlider(): JSX.Element {
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
  