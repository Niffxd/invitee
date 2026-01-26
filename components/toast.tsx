"use client";

import { toast } from "@heroui/react";
import { ReactNode } from "react";

export type ToastVariant = "default" | "accent" | "success" | "warning" | "danger";
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger" | "danger-soft" | "ghost" | "outline";

export interface ShowToastProps {
  text: string;
  variant?: ToastVariant;
  onPress?: () => void;
  icon?: ReactNode;
  description?: string;
  actionText?: string;
  actionVariant?: ButtonVariant;
}

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
  const toastOptions: {
    indicator?: ReactNode;
    description?: ReactNode;
    actionProps?: {
      children: string;
      onPress: () => void;
      variant: ButtonVariant;
    };
  } = {};

  if (icon) {
    toastOptions.indicator = icon;
  }

  if (description) {
    toastOptions.description = description;
  }

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
