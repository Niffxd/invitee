"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Credential {
  credentialId: string;
  username: string;
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
    router.push('/login');
  };

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted">Welcome back, {credential.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-foreground bg-default hover:bg-default/80 border border-border rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Stats Card */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Total Invitees</h3>
            <p className="text-3xl font-bold text-accent">0</p>
            <p className="text-sm text-muted mt-2">No invitees yet</p>
          </div>

          {/* Stats Card */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Confirmed</h3>
            <p className="text-3xl font-bold text-success">0</p>
            <p className="text-sm text-muted mt-2">Confirmations</p>
          </div>

          {/* Stats Card */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Pending</h3>
            <p className="text-3xl font-bold text-warning">0</p>
            <p className="text-sm text-muted mt-2">Awaiting response</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors">
              Add Invitee
            </button>
            <button className="px-6 py-3 bg-default border border-border text-foreground rounded-lg font-medium hover:bg-default/80 transition-colors">
              View All
            </button>
            <button className="px-6 py-3 bg-default border border-border text-foreground rounded-lg font-medium hover:bg-default/80 transition-colors">
              Export List
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
          <p className="text-muted">No recent activity</p>
        </div>
      </main>
    </div>
  );
}
