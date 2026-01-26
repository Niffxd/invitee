"use client";

import { useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Table as DashboardTable } from "@/components";
import { CredentialProps } from "@/types";
import { dashboardColumns, inviteeStatsData } from "./table";
import { DashboardNavbar } from "./navbar";
import { DashboardActions } from "./actions";
import { InviteeStats } from "./table/types";
import { Loading } from "../loading";

export const Dashboard = () => {
  const router = useRouter();

  const [credential, setCredential] = useState<CredentialProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Table data
  const table = useReactTable({
    data: inviteeStatsData,
    columns: dashboardColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    // Check if user is authenticated
    const storedCredential = sessionStorage.getItem('credential');

    if (!storedCredential) {
      // Not authenticated, redirect to login
      router.push('/login');
      return;
    }

    try {
      const parsedCredential = JSON.parse(storedCredential);
      setCredential(parsedCredential);
    } catch (error) {
      console.error('Failed to parse credential:', error);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('credential');
    router.push('/');
  };

  const handleActivity = () => {
    router.push('/dashboard/activity')
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!credential) {
    return null; // Will redirect
  }

  return (
    <div className="relative min-h-dvh bg-background">
      {/* Header */}
      <DashboardNavbar
        credential={credential}
        handleLogout={handleLogout}
        handleActivity={handleActivity}
      />

      {/* Quick Actions Panel - Below Navbar */}
      <DashboardActions />

      {/* Main Content */}
      <DashboardTable<InviteeStats> table={table} />
    </div>
  );
};
