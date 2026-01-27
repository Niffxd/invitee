"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"
import {
  Carousel,
  Header,
  Schedule,
  Details,
  Form,
  AlternativeWelcome,
} from "@/components";
import { InviteeProps } from "@/types";
import { getInvitee } from "@/db";

export const Welcome = () => {
  const searchParams = useSearchParams();
  const inviteeId: string | null = searchParams.get("inviteeId");

  const [invitee, setInvitee] = useState<InviteeProps | null>(null);

  const isValidInviteeId = typeof inviteeId === "string" && inviteeId.length > 0;

  useEffect(() => {
    let isMounted = true;

    const loadInvitee = async () => {
      if (!isValidInviteeId || !inviteeId) {
        setInvitee(null);
        return;
      }


      try {
        const invitee = await getInvitee(inviteeId);
        if (!isMounted) return;

        if (!invitee) {
          setInvitee(null);
          return;
        }

        setInvitee(invitee);
      } catch {
        if (!isMounted) return;
        setInvitee(null);
      } finally {
        if (!isMounted) return;
      }
    };

    loadInvitee();

    return () => {
      isMounted = false;
    };
  }, [inviteeId, isValidInviteeId]);

  if (inviteeId === null || typeof inviteeId !== "string" || invitee === null) {
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
      <Form inviteeId={inviteeId} inviteeName={invitee?.name} />
    </Carousel>
  );
};
