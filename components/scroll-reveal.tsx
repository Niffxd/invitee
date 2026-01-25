"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  threshold = 0.1,
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optionally unobserve after triggering
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getAnimationStyle = () => {
    const baseStyle = {
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}s`,
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDelay: `${delay}s`,
    };

    if (!isVisible) {
      const hiddenStyles = {
        up: { opacity: 0, transform: "translateY(40px)" },
        down: { opacity: 0, transform: "translateY(-40px)" },
        left: { opacity: 0, transform: "translateX(40px)" },
        right: { opacity: 0, transform: "translateX(-40px)" },
        scale: { opacity: 0, transform: "scale(0.9)" },
        fade: { opacity: 0, transform: "none" },
      };
      return { ...baseStyle, ...hiddenStyles[direction] };
    }

    return {
      ...baseStyle,
      opacity: 1,
      transform: "translateY(0) translateX(0) scale(1)",
    };
  };

  return (
    <div ref={ref} style={getAnimationStyle()} className={className}>
      {children}
    </div>
  );
};
