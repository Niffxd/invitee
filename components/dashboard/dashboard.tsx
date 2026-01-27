"use client";

import { useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Table as DashboardTable, Loading } from "@/components";
import { CredentialProps } from "@/types";
import { dashboardColumns, getInviteeStats, InviteeStats } from "./table";
import { DashboardNavbar } from "./navbar";
import { DashboardActions } from "./actions";

export const Dashboard = () => {
  const router = useRouter();

  const [credential, setCredential] = useState<CredentialProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statsData, setStatsData] = useState<InviteeStats[]>([]);

  // Table data
  const table = useReactTable({
    data: statsData,
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

  // Fetch invitee stats from Firestore
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getInviteeStats();
        setStatsData(stats);
      } catch (error) {
        console.error('Error fetching invitee stats:', error);
      }
    };

    if (credential) {
      fetchStats();
    }
  }, [credential]);

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
