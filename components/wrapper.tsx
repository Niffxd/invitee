import { cn } from "@heroui/styles";

export const Wrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={cn("relative w-full flex justify-center min-h-dvh max-h-dvh", className)}>
    <div className="w-full max-w-4xl relative z-10">
      {children}
    </div>
  </div>;
};
