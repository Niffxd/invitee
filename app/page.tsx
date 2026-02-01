"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Wrapper,
  Loading,
  Schedule,
  Details,
  Form,
  Home as HomeComponent,
  Carousel,
} from "@/components";
import { InviteeProps } from "@/types";
import { getInvitee } from "@/helpers";

export default function Home() {
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
      <Suspense fallback={<Loading className="min-h-dvh max-h-dvh" />}>
        <Wrapper>
          <HomeComponent inviteeId={inviteeId} />
        </Wrapper>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Wrapper>
        <Carousel hasNextChild>
          <HomeComponent
            inviteeId={inviteeId}
          />
          <Schedule />
          <Details />
          <Form
            inviteeId={inviteeId}
            inviteeName={invitee.name}
          />
        </Carousel>
      </Wrapper>
    </Suspense>
  )
};
