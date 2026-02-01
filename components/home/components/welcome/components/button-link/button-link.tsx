"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonLinkProps } from "./types";

export const ButtonLink = ({
  children,
  enable = true,
  to = "",
  description = ""
}: ButtonLinkProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (enable) {
      router.push(to);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (enable) {
      router.push(to);
    }
  };

  return (
    <Link
      href={to}
      aria-label={description}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="touch-manipulation"
    >
      {children}
    </Link>
  );
};
