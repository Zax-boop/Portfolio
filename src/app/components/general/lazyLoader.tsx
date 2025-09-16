"use client";

import { useEffect } from "react";

type LazyLoaderProps = {
  children: React.ReactNode;
  id: string;
};

export default function LazyLoader({ children, id }: LazyLoaderProps) {
  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [id]);

  return <div id={id}>{children}</div>;
}
