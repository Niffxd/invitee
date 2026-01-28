
import { type ColumnDef } from "@tanstack/react-table";
import { InviteeStats } from "./types";
import { CircleCheckBig, CircleX, Clock4, Users } from "lucide-react";

// Table columns
export const dashboardColumns: ColumnDef<InviteeStats>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const color = info.row.original.color;
      const status = info.getValue() as string;

      let icon;
      if (status === "Invitees") {
        icon = (
          <Users className="w-4 h-4" color={`var(--${color})`} />
        );
      } else if (status === "Confirmed") {
        icon = (
          <CircleCheckBig className="w-4 h-4" color={`var(--${color})`} />
        );
      } else if (status === "Declined") {
        icon = (
          <CircleX className="w-4 h-4" color={`var(--${color})`} />
        );
      } else {
        icon = (
          <Clock4 className="w-4 h-4" color={`var(--${color})`} />
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
        <span className="text-xl font-bold" style={{ color: `var(--${color})` }}>
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
];
