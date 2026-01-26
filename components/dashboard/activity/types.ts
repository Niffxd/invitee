export interface ActivityItem {
  id: string;
  type: "invite" | "confirm" | "decline" | "export";
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
}
