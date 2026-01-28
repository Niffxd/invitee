import { AlertCircle } from "lucide-react";
import { getAllPlusOne, getInvitees } from "@/helpers/invitees";
import { showToast } from "@/components";
import { InviteeStats } from "./types";

/**
 * Fetches invitee statistics from Firestore
 * @returns Promise that resolves to an array of invitee statistics
 */
export const getInviteeStats = async (): Promise<InviteeStats[]> => {
  try {
    const invitees = await getInvitees();
    const plusOnes = await getAllPlusOne();

    const total = invitees.length + plusOnes.length;
    const declined = invitees.filter((invitee) => invitee.isDeclined).length
    const confirmed = invitees.filter((invitee) => invitee.isConfirmed).length + plusOnes.length;
    const pending = total - confirmed;

    return [
      {
        status: "Invitees",
        count: total,
        description: "Total invitees",
        color: "accent",
      },
      {
        status: "Confirmed",
        count: confirmed,
        description: "Confirmations",
        color: "success",
      },
      {
        status: "Declined",
        count: declined,
        description: "Rejects",
        color: "danger",
      },
      {
        status: "Pending",
        count: pending,
        description: "Awaiting response",
        color: "warning",
      },
    ];
  } catch (error) {
    showToast({
      text: "Error",
      variant: "danger",
      icon: <AlertCircle />,
      description: `"Error fetching invitee stats:", ${error}`,
    });
    // Return default stats on error
    return [
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
        status: "Declined",
        count: 0,
        description: "Rejects",
        color: "danger",
      },
      {
        status: "Pending",
        count: 0,
        description: "Awaiting response",
        color: "warning",
      },
    ];
  }
};
