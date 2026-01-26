"use client";

import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '@heroui/react';
import { useEffect, useState } from 'react';
import { Wrapper } from '@/components/wrapper';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  // Generate sparkle positions once on mount
  const [sparkles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 6 + 3,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 3,
    }))
  );

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  return (
    <Wrapper className="overflow-hidden bg-background">
      <div className="relative h-full flex items-center justify-center p-4">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-background to-primary/10 animate-gradient-shift" />

        {/* Floating Sparkles Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {mounted && sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute rounded-full bg-accent animate-sparkle-float"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                animationDelay: `${sparkle.delay}s`,
                animationDuration: `${sparkle.duration}s`,
                boxShadow: '0 0 12px rgba(255, 200, 100, 0.8), 0 0 20px rgba(255, 200, 100, 0.4)',
              }}
            />
          ))}
        </div>

        {/* Main Content Container */}
        <div className="relative max-w-2xl w-full">
          {/* Animated Card with Glow Effect */}
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <div className="group relative">
              {/* Animated Glow Border */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-accent via-primary to-accent rounded-2xl opacity-75 blur transition duration-500 group-hover:opacity-100" />

              <div className="relative rounded-2xl backdrop-blur-sm bg-surface/90 border border-border/30 shadow-2xl p-6 sm:p-8 items-center justify-center flex flex-col">
                {/* 404 Illustration */}
                <div
                  className="text-center mb-6 animate-fade-in"
                  style={{ animationDelay: "0.2s", animationFillMode: "both" }}
                >
                  {/* Static Container with Background - More Rounded */}
                  <div className="relative inline-block bg-linear-to-br from-accent/10 to-primary/10 rounded-[2rem] p-8 border border-accent-soft-hover">
                    {/* Fancy Filled Stickman */}
                    <svg
                      viewBox="0 0 200 160"
                      className="w-48 sm:w-64 h-auto"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        {/* Gradient for the stickman */}
                        <linearGradient id="stickmanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: 'oklch(87.27% 0.1719 91.20)', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: 'oklch(87.27% 0.1719 91.20)', stopOpacity: 0.7 }} />
                        </linearGradient>

                        {/* Glow filter */}
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Fancy stickman - confused pose */}
                      <g filter="url(#glow)">
                        {/* Head - filled circle with gradient */}
                        <circle cx="100" cy="45" r="20" fill="url(#stickmanGradient)" opacity="0.95" />
                        <circle cx="100" cy="45" r="20" fill="none" stroke="url(#stickmanGradient)" strokeWidth="3" opacity="0.6" />

                        {/* Chest/Torso/Belly - more fit/slim rounded rectangle */}
                        <rect x="90" y="65" width="20" height="40" rx="6" fill="url(#stickmanGradient)" opacity="0.95" />

                        {/* Left arm - bent upward to head (thick, smooth) */}
                        {/* Shoulder to elbow */}
                        <line x1="88" y1="73" x2="75" y2="80" stroke="url(#stickmanGradient)" strokeWidth="9" strokeLinecap="round" opacity="0.9" />
                        {/* Elbow to hand */}
                        <line x1="75" y1="80" x2="82" y2="50" stroke="url(#stickmanGradient)" strokeWidth="9" strokeLinecap="round" opacity="0.9" />

                        {/* Right arm - hanging down (thick, smooth) */}
                        {/* Shoulder to elbow */}
                        <line x1="112" y1="73" x2="120" y2="90" stroke="url(#stickmanGradient)" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
                        {/* Elbow to hand */}
                        <line x1="120" y1="90" x2="125" y2="110" stroke="url(#stickmanGradient)" strokeWidth="9" strokeLinecap="round" opacity="0.85" />

                        {/* Legs - more natural stance */}
                        {/* Left leg - slight angle outward */}
                        <line x1="95" y1="105" x2="88" y2="145" stroke="url(#stickmanGradient)" strokeWidth="10" strokeLinecap="round" opacity="0.9" />
                        {/* Right leg - slight angle outward */}
                        <line x1="105" y1="105" x2="112" y2="145" stroke="url(#stickmanGradient)" strokeWidth="10" strokeLinecap="round" opacity="0.9" />

                        {/* Hands */}
                        <circle cx="82" cy="50" r="5" fill="url(#stickmanGradient)" opacity="0.9" />
                        <circle cx="125" cy="110" r="5" fill="url(#stickmanGradient)" opacity="0.9" />

                        {/* Feet */}
                        <ellipse cx="88" cy="145" rx="8" ry="4" fill="url(#stickmanGradient)" opacity="0.9" />
                        <ellipse cx="112" cy="145" rx="8" ry="4" fill="url(#stickmanGradient)" opacity="0.9" />

                        {/* Animated Question marks floating around */}
                        <text x="140" y="50" className="fill-primary text-3xl font-bold opacity-90 animate-bounce-gentle" style={{ animationDelay: "0s" }}>?</text>
                        <text x="45" y="65" className="fill-primary text-2xl font-bold opacity-80 animate-bounce-gentle" style={{ animationDelay: "0.3s" }}>?</text>
                        <text x="135" y="100" className="fill-accent text-xl font-bold opacity-70 animate-bounce-gentle" style={{ animationDelay: "0.6s" }}>?</text>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Warning Icon with Animation */}
                <div
                  className="flex justify-center mb-4 animate-fade-in"
                  style={{ animationDelay: "0.3s", animationFillMode: "both" }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent-soft-hover rounded-full blur-xl animate-pulse-slow" />
                    <AlertTriangle className="relative h-12 w-12 sm:h-16 sm:w-16 text-accent animate-bounce-gentle" />
                  </div>
                </div>

                {/* Title */}
                <div
                  className="text-center mb-3 animate-slide-in-up"
                  style={{ animationDelay: "0.4s", animationFillMode: "both" }}
                >
                  <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
                    Página no encontrada
                  </h2>
                  <div className="flex justify-center">
                    <div className="relative h-1 w-32 overflow-hidden rounded-full bg-accent/10">
                      <div className="absolute inset-0 bg-linear-to-r from-accent/50 via-primary to-accent/50 animate-shimmer" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-center text-muted text-base sm:text-lg mb-6 animate-fade-in max-w-xs"
                  style={{ animationDelay: "0.5s", animationFillMode: "both" }}
                >
                  Lo sentimos, el enlace no es válido o la página que buscas no existe.
                </p>

                {/* Action Buttons */}
                <div
                  className="flex justify-center animate-slide-in-up pb-4"
                  style={{ animationDelay: "0.6s", animationFillMode: "both" }}
                >
                  <Link href="/">
                    <Button
                      className="group relative overflow-hidden transition-all duration-500 active:scale-[0.98] w-full sm:w-auto"
                      size="lg"
                    >
                      {/* Button Shimmer Effect on Hover */}
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

                      <div className="relative flex items-center justify-center gap-2">
                        <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
                        <span className="font-semibold">Volver al inicio</span>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Floating Elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-accent/10 rounded-full blur-2xl animate-pulse-slow" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        </div>
      </div>
    </Wrapper>
  );
}
