import { Suspense } from "react";
import { Wrapper, Welcome, Loading } from "@/components";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Wrapper>
        <Welcome />
      </Wrapper>
    </Suspense>
  )
};
