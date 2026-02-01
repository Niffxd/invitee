import { cn } from "@heroui/styles";
import { Spinner } from "@heroui/react";
import { LoadingProps } from "./types";

export const Loading = ({
  text = "Loading...",
  size = "xl",
  className = "",
}: LoadingProps) => {
  return (
    <div className={cn("flex flex-col gap-1 items-center justify-center min-h-full bg-background", className)}>
      <Spinner size={size} />
      {text && <p className="text-muted">{text}</p>}
    </div>
  );
};
