import { ACTIVITY_DATA } from "./consts";
import { ActivityItem } from "./types";

export const getActivityColor = (type: ActivityItem["type"]) => {
  switch (type) {
    case "invite":
      return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    case "confirm":
      return "text-green-500 bg-green-500/10 border-green-500/20";
    case "decline":
      return "text-red-500 bg-red-500/10 border-red-500/20";
    case "export":
      return "text-purple-500 bg-purple-500/10 border-purple-500/20";
  }
};

export const formatTimestamp = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const getFilteredActivities = (filter: string[]) => {
  if (filter.length === 0) {
    return ACTIVITY_DATA;
  }
  return ACTIVITY_DATA.filter((activity: ActivityItem) => filter.includes(activity.type));
};
