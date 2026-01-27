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
  /**
   * Nested rows rendered when an invitee is expanded.
   * We model plus-ones as "invitee-like" rows so TanStack's sub-row typing works.
   */
  children?: FlexibleInviteeProps[] | undefined;
  rowType?: "invitee" | "plusOne";
  plusOneId?: string;
};
