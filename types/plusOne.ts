import { Timestamp } from "firebase/firestore";

export interface PlusOneProps {
  plusOneId: string;
  inviteeId: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
