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
      <Label className="text-sm font-medium transition-colors group-hover:text-accent cursor-pointer">
        {label}
      </Label>
      <Switch 
        size={size} 
        name={name} 
        isSelected={value}
        onChange={onChange}
        className="transition-transform duration-200 hover:scale-110"
      >
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>
    </div>
  );
};
