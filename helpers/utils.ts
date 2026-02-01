import * as bcrypt from "bcryptjs";
import { toast } from "@heroui/react";
import { Timestamp } from "firebase/firestore";
import { ACTIVITY_DATA } from "@/mocks";
import { ActivityItem } from "@/components/dashboard/activity/types";
import { ShowToastProps, ToastOptions } from "./types";

/**
 * Hashes a password using bcrypt
 * @param password - Plain text password to hash
 * @returns Promise that resolves to the hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Capitalizes all words in a string or array of strings
 * @param strings - String or array of strings to capitalize
 * @param separator - Separator to use between words
 * @returns Capitalized string or array of strings
 */
export const capitalizeAll = (strings: string[] | string, separator: string = ' '): string => {
  if (Array.isArray(strings)) {
    return strings.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(separator);
  }
  return strings.charAt(0).toUpperCase() + strings.slice(1);
};

/**
 * Standardized utility function for displaying toast notifications
 * @param text - Main toast message
 * @param variant - Toast style variant (default, accent, success, warning, danger)
 * @param onPress - Optional action callback when action button is pressed
 * @param icon - Optional icon to display in the toast
 * @param description - Optional description text
 * @param actionText - Optional text for the action button
 * @param actionVariant - Optional button variant for the action button
 */
export const showToast = ({
  text,
  variant = "default",
  onPress,
  icon,
  description,
  actionText,
  actionVariant = "tertiary",
}: ShowToastProps) => {
  const toastOptions: ToastOptions = {};

  if (icon) {
    toastOptions.indicator = icon;
  }

  if (description) {
    toastOptions.description = description;
  }

  // Auto-close the toast after 3 seconds
  toastOptions.timeout = 3000;

  if (onPress && actionText) {
    toastOptions.actionProps = {
      children: actionText,
      onPress,
      variant: actionVariant,
    };
  }

  // Map variant to appropriate toast method
  switch (variant) {
    case "accent":
      toast.info(text, toastOptions);
      break;
    case "success":
      toast.success(text, toastOptions);
      break;
    case "warning":
      toast.warning(text, toastOptions);
      break;
    case "danger":
      toast.danger(text, toastOptions);
      break;
    default:
      toast(text, toastOptions);
  }
};

/**
 * Formats a Firebase Timestamp to a readable date string
 * @param timestamp - Firebase Timestamp to format
 * @returns Formatted date string
 */
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

/**
 * Gets the color for an activity type
 * @param type - Activity type
 * @returns Color class string
 */
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

/**
 * Formats a date to a readable timestamp string
 * @param date - Date to format
 * @returns Formatted timestamp string
 */
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

/**
 * Gets filtered activities based on the filter array
 * @param filter - Array of activity types to filter by
 * @returns Filtered activities
 */
export const getFilteredActivities = (filter: string[]) => {
  if (filter.length === 0) {
    return ACTIVITY_DATA;
  }
  return ACTIVITY_DATA.filter((activity: ActivityItem) => filter.includes(activity.type));
};
