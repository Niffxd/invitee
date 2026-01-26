"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginLink = ({ children, enable = true }: { children: React.ReactNode, enable: boolean }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (enable) {
      router.push("/login");
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (enable) {
      router.push("/login");
    }
  };

  return (
    <Link
      href={enable ? "/" : "/login"}
      aria-label="Go to login"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="touch-manipulation"
    >
      {children}
    </Link>
  );
};
