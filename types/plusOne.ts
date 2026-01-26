import { Timestamp } from "firebase/firestore";

export interface PlusOne {
  plusOneId: string;
  inviteeId: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
