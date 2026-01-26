"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Loading } from "@/components/loading";
import { getInvitees } from "@/api";
import { CredentialProps } from "@/types";
import { InviteesNavbar } from "./navbar";
import { InviteesListTable } from "./list";
import { inviteesColumns } from "./columns";
import { FlexibleInviteeProps, SerializedInviteeProps } from "./types";

export const Invitees = () => {
  const router = useRouter();

  const [credential, setCredential] = useState<CredentialProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [invitees, setInvitees] = useState<SerializedInviteeProps[]>([]);
  const [isLoadingInvitees, setIsLoadingInvitees] = useState<boolean>(true);

  const table = useReactTable<FlexibleInviteeProps>({
    data: invitees,
    columns: inviteesColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const storedCredential = sessionStorage.getItem("credential");

    if (!storedCredential) {
      router.push("/login");
      return;
    }

    try {
      const parsedCredential = JSON.parse(storedCredential);
      setCredential(parsedCredential);
    } catch (error) {
      console.error("Failed to parse credential:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const fetchInvitees = async () => {
      try {
        setIsLoadingInvitees(true);
        const inviteesData = await getInvitees();

        // Convert Firestore Timestamps to ISO strings for serialization
        const serializedInvitees: SerializedInviteeProps[] = inviteesData.map((invitee) => ({
          ...invitee,
          createdAt: invitee.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: invitee.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        }));
        setInvitees(serializedInvitees);
      } catch (error) {
        console.error("Failed to fetch invitees:", error);
        // Log more details about the error
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
      } finally {
        setIsLoadingInvitees(false);
      }
    };

    if (credential) {
      fetchInvitees();
    }
  }, [credential]);

  const handleBack = () => {
    router.push("/dashboard");
  };

  if (isLoading || isLoadingInvitees) {
    return <Loading />;
  }

  if (!credential) {
    return null;
  }

  return (
    <div className="relative min-h-dvh bg-background">
      {/* Header */}
      <InviteesNavbar handleBack={handleBack} />

      {/* Invitees List */}
      <InviteesListTable table={table} />
    </div>
  );
};
