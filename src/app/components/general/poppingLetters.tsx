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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [initialDelay, speed, text]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrentIndex(text.length);
      return;
    }

    if (currentIndex >= text.length) return;

    const timeoutId = setTimeout(
      () => setCurrentIndex((index) => index + 1),
      currentIndex === 0 ? initialDelay : speed
    );

    return () => clearTimeout(timeoutId);
  }, [currentIndex, initialDelay, speed, text]);

  return (
    <div className={className} role="text" aria-label={text}>
      <span aria-hidden="true" className="whitespace-pre-wrap">{text.slice(0, currentIndex)}</span>
    </div>
  );
};

export default PoppingLetters;
