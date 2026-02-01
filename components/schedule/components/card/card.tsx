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
        <div className="absolute -inset-0.5 bg-linear-to-r from-accent via-primary to-accent rounded-2xl opacity-75 blur transition duration-500" />

        <div className="relative transform transition-all duration-300">
          <CardHeroui className={`w-full p-4 backdrop-blur-sm bg-surface/90 border border-border/30 shadow-lg transition-all duration-300 ${className}`}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10">
                {icon}
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium text-muted block mb-0.5">{title}</span>
                <span className="text-base sm:text-lg font-bold text-foreground">{description}</span>
                {children && children}
              </div>
            </div>
          </CardHeroui>
        </div>
      </div>
    </div>
  );
};
