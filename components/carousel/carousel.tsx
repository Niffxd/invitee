"use client";

import { useEffect, useState, useRef } from "react";
import { Wrapper } from "@/components";
import { NextChild } from "./components";
import { CarouselProps, SlideContext } from "./types";
import { ArrowBigDown } from "lucide-react";
import { nextChildTexts } from "./consts";

export const Carousel = ({ children, hasNextChild = false }: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewedSlides, setViewedSlides] = useState<Set<number>>(new Set([0]));
  const [visitCounts, setVisitCounts] = useState<Record<number, number>>({ 0: 1 });
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter out falsy children (null, undefined, false)
  const validChildren = [children]?.flat()?.filter(child => child != null && child !== false) ?? [];
  const totalPages = validChildren.length;

  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentPage(pageIndex);
      // Mark this slide as viewed
      setViewedSlides(prev => new Set([...prev, pageIndex]));
      // Increment visit count for this slide
      setVisitCounts(prev => ({
        ...prev,
        [pageIndex]: (prev[pageIndex] || 0) + 1
      }));
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        prevPage();
      } else if (e.key === "ArrowDown") {
        nextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Touch/swipe support (vertical)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        nextPage();
      } else {
        prevPage();
      }
    }
  };

  // Mouse wheel navigation
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 30) {
          nextPage();
        } else if (e.deltaY < -30) {
          prevPage();
        }
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: true });
      return () => {
        container.removeEventListener("wheel", handleWheel);
        clearTimeout(wheelTimeout);
      };
    }
  }, [currentPage, isTransitioning]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel Track (vertical) */}
        <div
          className="flex flex-col h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateY(-${currentPage * 100}%)`,
          }}
        >
          {validChildren.map((child, index) => {
            const isActive = currentPage === index;
            const hasBeenViewed = viewedSlides.has(index);
            const visitCount = visitCounts[index] || 0;

            return (
              <div
                key={index}
                className="h-full w-full flex flex-col items-center justify-center shrink-0"
                style={{
                  opacity: isActive ? 1 : 0.3,
                  transition: "opacity 0.6s ease-in-out",
                }}
              >
                <SlideContext.Provider value={{ isActive, hasBeenViewed, visitCount }}>
                  <div key={visitCount} className="w-full h-full overflow-y-auto">
                    {child}
                  </div>
                </SlideContext.Provider>
                {hasNextChild && index < totalPages - 1 && (
                  <NextChild
                    text={nextChildTexts[index]}
                    icon={<ArrowBigDown className="w-12 h-12 text-primary relative z-50 animate-bounce-gentle transition-transform" />}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};
