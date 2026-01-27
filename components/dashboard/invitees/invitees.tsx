"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCoreRowModel, getExpandedRowModel, Row, useReactTable } from "@tanstack/react-table";
import { Loading } from "@/components";
import { getAllPlusOneById, getInvitees } from "@/db";
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
  const [loadingPlusOneIds, setLoadingPlusOneIds] = useState<Set<string>>(new Set());

  const handleToggleExpand = async (inviteeId: string, row: Row<FlexibleInviteeProps>) => {
    // Collapse if already expanded
    if (row.getIsExpanded()) {
      row.toggleExpanded();
      return;
    }

    // If we already loaded children, just expand
    if (row.original.children && row.original.children.length > 0) {
      row.toggleExpanded();
      return;
    }

    // Avoid duplicate fetches for the same invitee
    setLoadingPlusOneIds((prev) => new Set(prev).add(inviteeId));
    try {
      const plusOnes = await getAllPlusOneById(inviteeId);

      const plusOneRows: FlexibleInviteeProps[] = plusOnes.map((p) => ({
        inviteeId: p.inviteeId,
        name: p.name,
        isConfirmed: false,
        hasPlusOne: false,
        notes: "",
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        rowType: "plusOne",
        plusOneId: p.plusOneId,
        children: [],
      }));

      setInvitees((prev) =>
        prev.map((invitee) =>
          invitee.inviteeId === inviteeId ? { ...invitee, children: plusOneRows } : invitee
        )
      );
      row.toggleExpanded();
    } catch (error) {
      console.error("Failed to load plus ones:", error);
    } finally {
      setLoadingPlusOneIds((prev) => {
        const next = new Set(prev);
        next.delete(inviteeId);
        return next;
      });
    }
  };

  const table = useReactTable<FlexibleInviteeProps>({
    data: invitees,
    columns: inviteesColumns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.children,
    getRowCanExpand: () => true,
    meta: {
      isLoading: true,
      onInviteeDeleted: (inviteeId: string) => {
        setInvitees((prev) => prev.filter((i) => i.inviteeId !== inviteeId));
      },
      onToggleExpand: handleToggleExpand,
      isLoadingPlusOnes: (inviteeId: string) => loadingPlusOneIds.has(inviteeId),
      onRowClick: (row: Row<FlexibleInviteeProps>) => {
        // Only top-level invitee rows should toggle
        if (row.depth !== 0) return;
        if (loadingPlusOneIds.has(row.original.inviteeId)) return;
        handleToggleExpand(row.original.inviteeId, row);
      },
    },
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
          children: [],
          rowType: "invitee",
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
