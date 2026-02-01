import { type Table as ReactTable } from "@tanstack/react-table";
import { InviteeProps } from "@/types";

export interface InviteesListTableProps {
  table: ReactTable<FlexibleInviteeProps>;
}

// Type that accepts both Timestamp and string for dates
export type FlexibleInviteeProps = Omit<InviteeProps, "createdAt" | "updatedAt"> & {
  createdAt: InviteeProps["createdAt"] | string;
  updatedAt: InviteeProps["updatedAt"] | string;
}
