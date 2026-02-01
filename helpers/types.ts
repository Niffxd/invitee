import { type ReactNode } from "react";

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

export interface ToastActionProps {
  children: string;
  onPress: () => void;
  variant: ButtonVariant;
}

export interface ToastOptions {
  indicator?: ReactNode;
  description?: ReactNode;
  timeout?: number;
  actionProps?: ToastActionProps;
}
