import { createContext, ReactNode } from "react";

export interface CarouselProps {
  children: ReactNode[] | ReactNode;
  hasNextChild: boolean;
}

export interface SlideContextValue {
  isActive: boolean;
  hasBeenViewed: boolean;
  visitCount: number;
}

export const SlideContext = createContext<SlideContextValue>({
  isActive: false,
  hasBeenViewed: false,
  visitCount: 0,
});
