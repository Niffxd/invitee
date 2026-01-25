import { Label, Switch } from "@heroui/react";

export function SwitchComponent({
  label,
  name,
  value,
  size = "lg",
  onChange,
}: {
  label: string;
  name: string;
  value: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 group">
      <Label className={`text-sm font-medium transition-colors cursor-pointer ${value ? 'text-accent' : ''}`}>
        {label}
      </Label>
      <Switch
        size={size}
        name={name}
        isSelected={value}
        onChange={onChange}
      >
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>
    </div>
  );
};
