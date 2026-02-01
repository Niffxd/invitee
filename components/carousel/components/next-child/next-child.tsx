import { NextChildProps } from "./types";

export const NextChild = ({
  text,
  icon,
  className,
}: NextChildProps) => {
  const textArray = Array.isArray(text) ? text : [text];

  return (
    <div className={`flex flex-col items-center justify-center mt-12 pb-8 ${className}`}>
      <div
        className="inline-flex flex-col gap-4 items-center justify-center w-50 rounded-full bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 relative shadow-lg animate-scale-in"
        style={{ animationDelay: "0.1s", animationFillMode: "both" }}
      >
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping-slow" />
        <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow" />
        {icon && icon}
        {text && <p className="text-primary text-xs font-medium text-center flex flex-col gap-2">{textArray.map((text, index) => (
          <span key={index} className="text-center">{text}</span>
        ))}</p>}
      </div>
    </div>
  );
};
