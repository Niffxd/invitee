"use client";

import { useEffect, useState } from "react";
import { Sparkle } from "./types";

export const SparklesBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [sparkles] = useState<Sparkle[]>(() => {
    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < 30; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
      });
    }
    return newSparkles;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <div
          suppressHydrationWarning
          key={sparkle.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}s`,
            backgroundColor: 'oklch(87.27% 0.1719 91.20)',
            transform: `translateY(${scrollY * (sparkle.id % 3) * 0.05}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      ))}
    </div>
  );
};
