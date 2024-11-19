"use client"

import { useEffect, useState } from "react";

type LazyLoaderProps = {
  children: React.ReactNode;
  id: string;
};

export default function LazyLoader({ children, id }: LazyLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(id);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [id]);

  return <div id={id}>{isVisible ? children : null}</div>;
}
