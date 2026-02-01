import { ButtonVariant } from "@/helpers/types";

export interface ButtonGroupProps {
  value: boolean | null;
  onChange?: (value: boolean | null) => void;
  buttons: {
    icon: React.ReactNode;
    text: string;
    variant: ButtonVariant;
    value: boolean | null;
  }[];
  variant: ButtonVariant;
  description?: string;
  className?: string;
}
