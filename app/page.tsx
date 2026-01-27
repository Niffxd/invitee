"use client";

import { useSearchParams } from 'next/navigation'
import {
  Carousel,
  Header,
  Schedule,
  Details,
  Form,
} from "@/components";

export default function Home() {
  const searchParams = useSearchParams();

  const inviteeId: string | null = searchParams.get('inviteeId');

  if (inviteeId === null) {
    return (
      <Carousel>
        <Header />
      </Carousel>
    )
  }

  console.log("inviteeId", inviteeId);

  return (
    <Carousel>
      <Header inviteeId={"inviteeId"} />
      <Schedule />
      <Details />
      <Form />
    </Carousel>
  );
};
