"use client";
import React, { useState, useEffect } from "react";

const PoppingLetters = ({
  text,
  className = "",
  initialDelay = 0, 
  speed = 100,
}: {
  text: string;
  className?: string;
  initialDelay?: number;
  speed?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialDelayDone, setInitialDelayDone] = useState(initialDelay === 0);

  useEffect(() => {
    if (initialDelay > 0) {
      const delayTimeout = setTimeout(() => {
        setInitialDelayDone(true);
      }, initialDelay);

      return () => clearTimeout(delayTimeout);
    }
  }, [initialDelay]);

  useEffect(() => {
    if (initialDelayDone && currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text.charAt(currentIndex));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, text, initialDelayDone]);

  return <div className={className}>{displayedText}</div>;
};

export default PoppingLetters;
