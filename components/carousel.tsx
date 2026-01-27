"use client";

import { useEffect, useState, useRef, ReactNode, createContext, useContext } from "react";
import { Wrapper } from "./wrapper";

interface CarouselProps {
  children: ReactNode[] | ReactNode;
}

interface SlideContextValue {
  isActive: boolean;
  hasBeenViewed: boolean;
  visitCount: number;
}

const SlideContext = createContext<SlideContextValue>({
  isActive: false,
  hasBeenViewed: false,
  visitCount: 0,
});

export const useSlide = () => useContext(SlideContext);

export const Carousel = ({ children }: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewedSlides, setViewedSlides] = useState<Set<number>>(new Set([0]));
  const [visitCounts, setVisitCounts] = useState<Record<number, number>>({ 0: 1 });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
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
      if (e.key === "ArrowLeft") {
        prevPage();
      } else if (e.key === "ArrowRight") {
        nextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
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
        {/* Carousel Track */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
          }}
        >
          {validChildren.map((child, index) => {
            const isActive = currentPage === index;
            const hasBeenViewed = viewedSlides.has(index);
            const visitCount = visitCounts[index] || 0;

            return (
              <div
                key={index}
                className="min-w-full h-full flex items-center justify-center"
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
              </div>
            );
          })}
        </div>

        {/* Page Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3 px-4 py-3 rounded-full bg-surface/40 backdrop-blur-md border border-border/30">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              disabled={isTransitioning}
              className={`transition-all duration-300 rounded-full ${currentPage === index
                ? "w-12 h-3 bg-muted/50 hover:bg-muted hover:scale-125"
                : "w-3 h-3 bg-muted/50 hover:bg-muted hover:scale-125"
                }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
