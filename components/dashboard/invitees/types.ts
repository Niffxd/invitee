import { InviteeProps } from "@/types";

// Serialized version of InviteeProps with ISO string dates from API
export type SerializedInviteeProps = Omit<InviteeProps, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

// Type that accepts both Timestamp and string for dates
export type FlexibleInviteeProps = Omit<InviteeProps, "createdAt" | "updatedAt"> & {
  createdAt: InviteeProps["createdAt"] | string;
  updatedAt: InviteeProps["updatedAt"] | string;
};
