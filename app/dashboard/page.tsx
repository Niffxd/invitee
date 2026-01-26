"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { capitalizeAll } from "@/helpers";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { Wrapper } from "@/components";
import { Bell } from "lucide-react";

interface Credential {
  credentialId: string;
  username: string;
}

interface InviteeStats {
  status: string;
  count: number;
  description: string;
  color: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [credential, setCredential] = useState<Credential | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // Table data
  const data: InviteeStats[] = useMemo(
    () => [
      {
        status: "Invitees",
        count: 0,
        description: "Total invitees",
        color: "accent",
      },
      {
        status: "Confirmed",
        count: 0,
        description: "Confirmations",
        color: "success",
      },
      {
        status: "Pending",
        count: 0,
        description: "Awaiting response",
        color: "warning",
      },
    ],
    []
  );

  // Table columns
  const columns = useMemo<ColumnDef<InviteeStats>[]>(
    () => [
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const color = info.row.original.color;
          const status = info.getValue() as string;

          let icon;
          if (status === "Invitees") {
            icon = (
              <svg className={`w-4 h-4 text-${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            );
          } else if (status === "Confirmed") {
            icon = (
              <svg className={`w-4 h-4 text-${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            );
          } else {
            icon = (
              <svg className={`w-4 h-4 text-${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            );
          }

          return (
            <div className="flex items-center gap-2">
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-${color}/10 border border-${color}/20`}>
                {icon}
              </div>
              <span className="text-sm font-semibold text-foreground">{status}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "count",
        header: "Count",
        cell: (info) => {
          const color = info.row.original.color;
          return (
            <span className={`text-xl font-bold text-${color}`}>
              {info.getValue() as number}
            </span>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => (
          <span className="text-xs text-muted">
            {info.getValue() as string}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (!credential) {
    return null; // Will redirect
  }

  return (
    <Wrapper>
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
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-b border-border bg-default/30">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-2.5 text-left text-xs font-semibold text-foreground"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-border">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-default/20 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </Wrapper>
  );
}
