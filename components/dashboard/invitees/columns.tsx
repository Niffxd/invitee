import { type ColumnDef } from "@tanstack/react-table";
import { UserCheck, UserX, Clock } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { FlexibleInviteeProps } from "./types";
import { formatDate } from "./utils";

export const inviteesColumns: ColumnDef<FlexibleInviteeProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">
          {info.getValue() as string}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "isConfirmed",
    header: "Status",
    cell: (info) => {
      const isConfirmed = info.getValue() as boolean;
      const colorClasses = isConfirmed
        ? "bg-green-500/10 border-green-500/20 text-green-600"
        : "bg-yellow-500/10 border-yellow-500/20 text-yellow-600";

      return (
        <div className="flex items-center gap-2">
          <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${colorClasses}`}>
            {isConfirmed ? (
              <UserCheck className="w-4 h-4" />
            ) : (
              <UserX className="w-4 h-4" />
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "hasPlusOne",
    header: "Plus One",
    cell: (info) => {
      const hasPlusOne = info.getValue() as boolean;
      return (
        <span className="text-xs text-muted">
          {hasPlusOne ? "Yes" : "No"}
        </span>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (info) => {
      const notes = info.getValue() as string;
      return (
        <span className="text-xs text-muted">
          {notes || "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (info) => {
      const timestamp = info.getValue() as Timestamp;
      const formattedDate = formatDate(timestamp);

      return (
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-muted" />
          <span className="text-xs text-muted">
            {formattedDate}
          </span>
        </div>
      );
    },
  },
];
