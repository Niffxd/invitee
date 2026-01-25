"use client";

import { Header } from "./header";

export const HeaderPage = () => {
  return (
    <div className="relative w-full flex items-center justify-center px-4" style={{ minHeight: "100dvh" }}>
      <div className="w-full max-w-4xl relative z-10">
        <Header />
      </div>
    </div>
  );
};
