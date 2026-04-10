import { Card as CardHeroui } from "@heroui/react";
import { CardProps } from "./types";

export const Card = ({
  title,
  description,
  icon,
  className = "",
  children,
}: CardProps) => {
  return (
    <div
      className="animate-slide-in-up"
      style={{ animationDelay: "0.1s", animationFillMode: "both" }}
    >
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-linear-to-r from-accent/90 via-primary/80 to-accent/90 rounded-2xl opacity-60 blur-md transition duration-500 group-hover:opacity-80" />

        <div className="relative transform transition-all duration-300 group-hover:-translate-y-0.5">
          <CardHeroui className={`w-full p-4 backdrop-blur-md bg-surface/92 border border-border/40 shadow-[0_12px_40px_-12px_color-mix(in_oklch,var(--palette-bronze)_18%,transparent)] transition-all duration-300 ${className}`}>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-accent-soft to-primary/20 ring-1 ring-border/50 shadow-inner">
                {icon}
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium text-muted block mb-0.5">{title}</span>
                <p className="text-xs font-bold text-foreground">{description}</p>
                {children && children}
              </div>
            </div>
          </CardHeroui>
        </div>
      </div>
    </div>
  );
};
