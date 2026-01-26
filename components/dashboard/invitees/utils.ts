import { Timestamp } from "firebase/firestore";

export const formatDate = (timestamp: Timestamp) => {
  if (!timestamp) return "-";

  // Handle Firestore Timestamp objects
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // Handle ISO strings or other date strings
  const date = new Date(timestamp as string);
  if (isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
