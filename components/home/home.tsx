"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getInvitee } from "@/helpers";
import { InviteeProps } from "@/types";
import { Welcome } from "./components";
import {
  Wrapper,
  Carousel,
  Schedule,
  Details,
  Form,
} from "@/components";

export const Home = () => {
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

  if (!isValidInviteeId || !invitee) {
    return (
      <Wrapper>
        <Welcome inviteeId={inviteeId} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Carousel hasNextChild>
        <Welcome inviteeId={inviteeId} />
        <Schedule />
        <Details />
        <Form
          inviteeId={inviteeId}
          inviteeName={invitee.name}
        />
      </Carousel>
    </Wrapper>
  );
}