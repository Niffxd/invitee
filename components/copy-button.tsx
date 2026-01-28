"use client";

import { useState } from "react";
import { Check, Files, X } from "lucide-react";
import { showToast } from "./toast";

export const CopyButton = ({ children, text, className }: { children: React.ReactNode, text: string, className: string }) => {
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(text)

      showToast({
        text: "¡Enlace copiado!",
        variant: "success",
        icon: <Check />,
      });
    } catch (error) {
      showToast({
        text: "¡El enlace no pudo ser copiado!",
        variant: "danger",
        icon: <X />,
        description: `Error: ${error}`
      });
    } finally {
      setTimeout(() => setIsCopying(false), 1500);
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleCopy()
      }}
      className={className}
    >
      {isCopying ? <Files className="w-4 h-4" /> : children}
    </button>
  )
};
