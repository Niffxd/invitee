import { Timestamp } from "firebase/firestore";

export interface UpdateInviteeProps {
  isConfirmed: boolean;
  isDeclined: boolean;
  hasPlusOne: boolean;
  notes: string;
}

export interface InviteeProps extends UpdateInviteeProps {
  inviteeId: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
