import { ButtonVariant } from "@/helpers/types";

export interface ButtonsProps {
  value: boolean;
  icon: React.ReactNode;
  text: string;
  variant: ButtonVariant;
}
