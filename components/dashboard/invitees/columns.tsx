import { type ColumnDef } from "@tanstack/react-table";
import { UserCheck, UserSearch, Check, X, Link as LinkIcon, CornerDownRight } from "lucide-react";
import { CopyButton } from "@/components";
import { FlexibleInviteeProps } from "./types";
import { ActionsCell } from "./actions";
import { productionPath, developmentPath } from "./consts";

export const inviteesColumns: ColumnDef<FlexibleInviteeProps>[] = [
  {
    accessorKey: "isConfirmed",
    header: "Status",
    cell: (info) => {
      const invitationPath = `${process.env.NODE_ENV === "production"
        ? productionPath
        : developmentPath
        }/?inviteeId=${info.row.original.inviteeId}`;

      const { plusOneId } = info.row.original;
      const isConfirmed = info.getValue() as boolean;
      const colorClasses = isConfirmed
        ? "bg-green-500/10 border-green-500/20 text-green-600"
        : "bg-yellow-500/10 border-yellow-500/20 text-yellow-600";

      if (plusOneId) {
        return (
          <div className="flex items-center justify-center gap-2 py-3">
            <CornerDownRight className="w-4 h-4" />
          </div>
        )
      }

      return (
        <div className="flex items-center gap-2 py-3 px-3">
          <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${colorClasses}`}>
            {isConfirmed ? (
              <UserCheck className="w-4 h-4" />
            ) : (
              <UserSearch className="w-4 h-4" />
            )}
          </div>
          <CopyButton text={invitationPath} className="w-4 h-4">
            <LinkIcon className="w-4 h-4" />
          </CopyButton>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => (
      <div className="flex items-center gap-2 py-3 px-3 text-xs">
        {info.getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "hasPlusOne",
    header: "+ 1",
    cell: (info) => {
      const hasPlusOne = info.getValue() as boolean;
      const { plusOneId } = info.row.original;

      if (plusOneId) {
        return null;
      }

      return (
        <div className="flex items-center gap-2 py-3 px-3 text-xs">
          {hasPlusOne ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </div>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: (info) => {
      const notes = info.getValue() as string;
      const { plusOneId } = info.row.original;

      if (plusOneId) {
        return null;
      }

      return (
        <div className="flex items-center gap-2 py-3 px-3">
          {notes || "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      if (row.original.rowType === "plusOne" || row.depth > 0) return null;
      const { inviteeId, name } = row.original

      const meta = table.options.meta as { onInviteeDeleted?: (inviteeId: string) => void } | undefined;
      return (
        <ActionsCell
          inviteeId={inviteeId}
          name={name}
          onDeleted={() => meta?.onInviteeDeleted?.(inviteeId)}
        />
      );
    },
  },
];
