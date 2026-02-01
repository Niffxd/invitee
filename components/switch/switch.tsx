import { Label, Switch as SwitchHeroUI } from "@heroui/react";
import { SwitchProps } from "./types";

export const Switch = ({
  label,
  name,
  value,
  size = "lg",
  onChange,
}: SwitchProps) => {
  return (
    <div className="flex items-center justify-between gap-3 group">
      <Label className={`text-sm font-medium transition-colors cursor-pointer ${value ? 'text-accent' : ''}`}>
        {label}
      </Label>
      <SwitchHeroUI
        size={size}
        name={name}
        isSelected={value}
        onChange={onChange}
      >
        <SwitchHeroUI.Control>
          <SwitchHeroUI.Thumb />
        </SwitchHeroUI.Control>
      </SwitchHeroUI>
    </div>
  );
};
