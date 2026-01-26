"use client";

import { useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { capitalizeAll } from "@/helpers";
import { CredentialProps } from "@/types";
import { dashboardColumns, DashboardTable, inviteeStatsData } from "./table";
import { Loading } from "../loading";

export const Dashboard = () => {
  const router = useRouter();

  const [credential, setCredential] = useState<CredentialProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <Loading />;
  }

  if (!credential) {
    return null; // Will redirect
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Header */}
      <header className="relative border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="container mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted mt-1">Welcome, {capitalizeAll(credential.username)}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard/activity')}
              className="relative h-10 w-10 flex items-center justify-center text-foreground bg-default hover:bg-default/80 border border-border rounded-lg transition-colors shadow-sm group"
              aria-label="Recent Activity"
            >
              <Bell className="w-5 h-5" />
              {/* Optional notification badge */}
              {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span> */}
            </button>
            <button
              onClick={handleLogout}
              className="h-10 px-5 text-sm font-medium text-black bg-accent hover:bg-accent/90 border border-accent-soft-hover rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Quick Actions Panel - Below Navbar */}
      <div className="relative border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="px-8 py-3">
          <div className="grid grid-cols-2 gap-2 max-w-md">
            {/* Top Row */}
            <button className="px-4 py-2 bg-accent text-black rounded-lg font-medium hover:bg-accent/90 transition-all shadow-sm hover:shadow-md border border-accent-soft-hover text-xs flex items-center justify-center gap-1.5 whitespace-nowrap">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Invitee
            </button>
            <button className="px-4 py-2 bg-default border border-border text-foreground rounded-lg font-medium hover:bg-default/80 transition-all shadow-sm hover:shadow-md text-xs flex items-center justify-center gap-1.5 whitespace-nowrap">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              View All
            </button>

            {/* Bottom Row */}
            <button className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-black/80 transition-all shadow-sm hover:shadow-md border border-black text-xs flex items-center justify-center gap-1.5 whitespace-nowrap">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Black List
            </button>
            <button className="px-4 py-2 bg-default border border-border text-foreground rounded-lg font-medium hover:bg-default/80 transition-all shadow-sm hover:shadow-md text-xs flex items-center justify-center gap-1.5 whitespace-nowrap">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export List
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative container mx-auto px-8 py-8">
        {/* Stats Table */}
        <div className="relative bg-surface border border-border rounded-lg shadow-lg overflow-hidden max-w-3xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-accent to-transparent" />

          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">Invitee Statistics</h2>
            <p className="text-xs text-muted mt-1">Overview of your invitations</p>
          </div>

          <div className="overflow-x-auto">
            <DashboardTable table={table} />
          </div>
        </div>
      </main>
    </div>
  );
};