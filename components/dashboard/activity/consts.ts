import { ActivityItem } from "./types";

// Mock activity data
export const ACTIVITY_DATA: ActivityItem[] = [
  {
    id: "1",
    type: "confirm",
    title: "Invitee Confirmed",
    description: "John Doe confirmed their attendance",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    user: "John Doe",
  },
  {
    id: "2",
    type: "invite",
    title: "New Invitee Added",
    description: "Jane Smith was added to the guest list",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    user: "Jane Smith",
  },
  {
    id: "3",
    type: "export",
    title: "List Exported",
    description: "Guest list exported to CSV",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
  {
    id: "4",
    type: "decline",
    title: "Invitee Declined",
    description: "Bob Johnson declined their invitation",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    user: "Bob Johnson",
  },
  {
    id: "5",
    type: "invite",
    title: "New Invitee Added",
    description: "Alice Brown was added to the guest list",
    timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    user: "Alice Brown",
  },
  {
    id: "6",
    type: "confirm",
    title: "Invitee Confirmed",
    description: "Charlie Wilson confirmed their attendance",
    timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
    user: "Charlie Wilson",
  },
];
