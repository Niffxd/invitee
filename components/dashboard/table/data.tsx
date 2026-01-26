import { InviteeStats } from "./types";

export const inviteeStatsData: InviteeStats[] = [
  {
    status: "Invitees",
    count: 0,
    description: "Total invitees",
    color: "accent",
  },
  {
    status: "Confirmed",
    count: 0,
    description: "Confirmations",
    color: "success",
  },
  {
    status: "Pending",
    count: 0,
    description: "Awaiting response",
    color: "warning",
  },
];
