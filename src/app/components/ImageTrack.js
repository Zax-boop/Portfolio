import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ImageTrack = ({ data }) => {
  const trackRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleOnScroll = () => {
    if (trackRef.current) {
      // Calculate the scroll percentage based on the scrollLeft and container width
      const scrollWidth = trackRef.current.scrollWidth - trackRef.current.clientWidth;
      const scrolled = trackRef.current.scrollLeft;
      const percentage = (scrolled / scrollWidth) * 100;

      setScrollPercentage(percentage);
    }
  };

  useEffect(() => {
    // Add scroll event listener on component mount
    const trackElement = trackRef.current;
    trackElement.addEventListener("scroll", handleOnScroll);

    // Clean up event listener on component unmount
    return () => {
      trackElement.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      // Apply the objectPosition effect to the images as the scroll percentage changes
      Array.from(trackRef.current.getElementsByClassName("image")).forEach((image) => {
        // Adjust object-position to create the movement effect without shrinking
        image.style.objectPosition = `${100 - scrollPercentage}% 50%`;
      });
    }
  }, [scrollPercentage]);

  return (
    <div
      className="relative h-[30rem] w-full overflow-x-scroll"
      ref={trackRef} // Track the scroll position
      style={{ scrollbarWidth: "none" }} // Hide scrollbar in Firefox
    >
      <div
        className="flex gap-[4vmin] select-none"
      >
        {data.map((src, index) => (
          <Image
            key={index}
            src={src.image}
            alt={`Climbing media ${index}`}
            width={400} // Fixed width
            height={400} // Fixed height
            className="image w-[20rem] h-[30rem] object-cover object-[100%_center]" // Ensure the size doesn't change
            draggable="false"
          />
        ))}
      </div>

      {/* Hiding scrollbar on Webkit browsers (Chrome, Safari, etc.) */}
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ImageTrack;
