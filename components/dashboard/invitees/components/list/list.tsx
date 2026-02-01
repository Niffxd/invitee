import { Users } from "lucide-react";
import { Table } from "@/components";
import { FlexibleInviteeProps, InviteesListTableProps } from "./types";

export const InviteesListTable = ({ table }: InviteesListTableProps) => {
  const invitees = table.getRowModel().rows;

  if (invitees.length === 0) {
    return (
      <div className="max-w-dvw text-center py-12 overflow-x-auto">
        <Users className="w-12 h-12 text-muted mx-auto mb-4" />
        <p className="text-foreground font-medium">No invitees found</p>
        <p className="text-sm text-muted mt-1">Add invitees to get started</p>
      </div>
    );
  }

  return <Table<FlexibleInviteeProps> table={table} rowClassName="" />;
};
