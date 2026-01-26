"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CredentialProps } from "@/types";
import { Loading } from "../../loading";
import { getFilteredActivities } from "./utils";
import { ActivityNavbar } from "./navbar";
import { Filters as ActivityFilters } from "./components";
import { ActivityListTable } from "./list";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { activityColumns } from "./columns";

export const Activity = () => {
  const router = useRouter();

  const [credential, setCredential] = useState<CredentialProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string[]>([]);

  const filteredActivities = useMemo(
    () => getFilteredActivities(filter),
    [filter]
  );

  const table = useReactTable({
    data: filteredActivities,
    columns: activityColumns,
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

  const handleBack = () => {
    router.push("/dashboard");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!credential) {
    return null;
  }

  return (
    <div className="relative min-h-dvh bg-background">
      {/* Header */}
      <ActivityNavbar handleBack={handleBack} />

      {/* Filter Bar */}
      <ActivityFilters filter={filter} setFilter={setFilter} />

      {/* Activity List */}
      <ActivityListTable table={table} />
    </div>
  );
};
