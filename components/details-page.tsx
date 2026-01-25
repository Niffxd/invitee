"use client";

import { Details } from "./details";

export const DetailsPage = () => {
  return (
    <div className="relative w-full flex justify-center px-4 py-8" style={{ minHeight: "100dvh" }}>
      <div className="w-full max-w-4xl relative z-10">
        <Details />
      </div>
    </div>
  );
};
