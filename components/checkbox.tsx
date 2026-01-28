"use client";

import { type Dispatch, type SetStateAction } from "react";
import { Checkbox as CheckboxHeroUI, Label } from "@heroui/react";

export const Checkbox = ({
  name,
  label,
  description,
  value,
  onChange,
  className = ""
}: {
  name: string;
  label?: string;
  description?: string
  value: boolean;
  onChange: () => void | Dispatch<SetStateAction<boolean>>;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-3">
        <CheckboxHeroUI name={name} isSelected={value} onChange={onChange}>
          <CheckboxHeroUI.Control>
            <CheckboxHeroUI.Indicator />
          </CheckboxHeroUI.Control>
        </CheckboxHeroUI>
        {label && <Label htmlFor={name}>{label}</Label>}
      </div>
      {description && <p className="text-sm text-muted">{description}</p>}
    </div>
  );
};
