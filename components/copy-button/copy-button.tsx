"use client";

import { useState } from "react";
import { Check, Files, X } from "lucide-react";
import { showToast } from "@/helpers";
import { CopyButtonProps } from "./types";

export const CopyButton = ({
  children,
  text,
  className,
  previousText,
}: CopyButtonProps) => {
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const copyToClipboard = (value: string): Promise<void> => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(value);
    }
    // Fallback for mobile / HTTP / older browsers
    return new Promise((resolve, reject) => {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      textarea.setAttribute("readonly", "");
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, value.length);
      try {
        const ok = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (ok) resolve();
        else reject(new Error("execCommand copy failed"));
      } catch (err) {
        document.body.removeChild(textarea);
        reject(err);
      }
    });
  };

  const handleCopy = async () => {
    try {
      setIsCopying(true);
      const value = previousText ? previousText.concat(text) : text;
      await copyToClipboard(value);

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
