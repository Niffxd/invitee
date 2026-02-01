"use client";

import { Suspense } from "react";
import { Loading, Home as HomeComponent } from "@/components";

export default function Home() {
  return (
    <Suspense fallback={<Loading className="min-h-dvh max-h-dvh" />}>
      <HomeComponent />
    </Suspense>
  );
}
