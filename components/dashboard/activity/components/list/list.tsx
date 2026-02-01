import { Clock } from "lucide-react";
import { Table } from "@/components";
import { ActivityItem } from "../../types";
import { ListProps } from "./types";

export const ActivityListTable = ({ table }: ListProps) => {
  const activities = table.getRowModel().rows;

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-muted mx-auto mb-4" />
        <p className="text-foreground font-medium">No activity found</p>
        <p className="text-sm text-muted mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return <Table<ActivityItem> table={table} />;
};
