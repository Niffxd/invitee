import { type ColumnDef } from "@tanstack/react-table";
import { Clock, Download, UserCheck, UserPlus, UserX } from "lucide-react";
import { ActivityItem } from "./types";
import { formatTimestamp, getActivityColor } from "./utils";

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "invite":
      return <UserPlus className="w-4 h-4" />;
    case "confirm":
      return <UserCheck className="w-4 h-4" />;
    case "decline":
      return <UserX className="w-4 h-4" />;
    case "export":
      return <Download className="w-4 h-4" />;
  }
};

export const activityColumns: ColumnDef<ActivityItem>[] = [
  {
    accessorKey: "type",
    header: "Event",
    cell: (info) => {
      const type = info.getValue() as ActivityItem["type"];
      const colorClasses = getActivityColor(type);

      return (
        <div className="flex items-center gap-2">
          <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${colorClasses}`}>
            {getActivityIcon(type)}
          </div>
        </div>
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
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: (info) => {
      const timestamp = info.getValue() as Date;
      return (
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-muted" />
          <span className="text-xs text-muted">
            {formatTimestamp(timestamp)}
          </span>
        </div>
      );
    },
  },
];
