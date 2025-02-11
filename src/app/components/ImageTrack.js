import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useMediaQuery } from "react-responsive";

const ImageTrack = ({ data, onImageClick, width = 'xs:w-[6.67rem] sm:w-[10rem] xl:w-[20rem]', scroll = 2 }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })
  const isBungus = useMediaQuery({ query: '(min-width: 1700px)' })
  const trackRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(1);
  const handleOnScroll = () => {
    if (trackRef.current) {
      const scrollWidth = trackRef.current.scrollWidth - trackRef.current.clientWidth;
      const scrolled = trackRef.current.scrollLeft;
      const percentage = (scrolled / scrollWidth) * 100;
      setScrollPercentage(percentage);
    }
  };

  useEffect(() => {
    const trackElement = trackRef.current;
    trackElement.addEventListener("scroll", handleOnScroll);
    return () => {
      trackElement.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      Array.from(trackRef.current.getElementsByClassName("image")).forEach((image) => {
        image.style.objectPosition = `${100 - scrollPercentage}% 50%`;
      });
    }
  }, [scrollPercentage]);

  useEffect(() => {
    let animationFrameId;
    const scrollSpeed = (isMobile ? 1.5 : scroll); 

    const smoothScroll = () => {
      if (!isHovered && trackRef.current) {
        const maxScrollLeft = trackRef.current.scrollWidth - trackRef.current.clientWidth;
        if (trackRef.current.scrollLeft >= (maxScrollLeft - (isBungus ? 100 : 0))) {
          setScrollDirection(-1); 
        } else if (trackRef.current.scrollLeft <= 0) {
          setScrollDirection(1);
        }

        trackRef.current.scrollLeft += scrollSpeed * scrollDirection;
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };
    if (!isHovered) {
      animationFrameId = requestAnimationFrame(smoothScroll);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, scrollDirection]);

  return (
    <div
      className="relative xs:h-[10rem] sm:h-[15rem] xl:h-[30rem] w-full overflow-x-scroll"
      ref={trackRef}
      style={{ scrollbarWidth: "none" }}
      // onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-[2vmin] select-none">
        {data.map((src, index) => (
          <Image
            key={index}
            src={src.image}
            alt={`Media ${index}`}
            width={400}
            height={400}
            className={`image ${width} xs:h-[10rem] sm:h-[15rem] xl:h-[30rem] object-cover object-[100%_center] cursor-pointer`}
            draggable="false"
            onClick={() => onImageClick(index)}
          />
        ))}
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ImageTrack;