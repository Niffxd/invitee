"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export const InvitationLink = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const waLink = "https://wa.me/5493816631856?text=Hola%2C%20quisiera%20solicitar%20una%20invitaci%C3%B3n%20para%20el%20evento.%20%C2%A1Gracias!";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(waLink);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(waLink);
  };

  return (
    <Link
      href={waLink}
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
