import { type Dispatch, type SetStateAction } from "react";

export interface CheckboxProps {
  name: string;
  label?: string;
  description?: string
  value: boolean;
  onChange: () => void | Dispatch<SetStateAction<boolean>>;
  className?: string;
}
