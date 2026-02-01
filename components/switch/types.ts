export interface SwitchProps {
  label: string;
  name: string;
  value: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: (value: boolean) => void;
}
