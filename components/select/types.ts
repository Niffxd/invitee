import { Key } from "@heroui/react";

export interface SelectProps {
  options: { id: string; content: React.ReactNode | string }[];
  label?: string;
  value: string[];
  onChange: (value: Key | Key[] | null) => void;
  className?: string;
  selectionMode?: "single" | "multiple";
}
