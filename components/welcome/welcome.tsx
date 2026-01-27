"use client";

import { useSearchParams } from "next/navigation"
import {
  Carousel,
  Header,
  Schedule,
  Details,
  Form,
  AlternativeWelcome,
} from "@/components";

export const Welcome = () => {
  const searchParams = useSearchParams();

  const inviteeId: string | null = searchParams.get("inviteeId");

  if (inviteeId !== typeof String) {
    return (
      <Carousel>
        <AlternativeWelcome />
      </Carousel>
    )
  }

  return (
    <Carousel>
      <Header inviteeId={inviteeId} />
      <Schedule />
      <Details />
      <Form />
    </Carousel>
  );
};
