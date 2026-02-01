import { Check, X } from "lucide-react";
import { ButtonsProps } from "./types";

export const BUTTONS: ButtonsProps[] = [
  {
    value: true,
    icon: <Check />,
    text: "Asistiré",
    variant: "primary",
  },
  {
    value: false,
    icon: <X />,
    text: "No asistiré",
    variant: "primary",
  },
] as const;
