import { Label, ListBox, Select as SelectHeroui } from "@heroui/react";
import { SelectProps } from "./types";

export const Select = ({
  options,
  label,
  value,
  onChange,
  className,
  selectionMode = "single",
}: SelectProps) => {
  return (
    <SelectHeroui
      className={`max-h-full text-xs ${className} rounded-xl`}
      placeholder={label}
      selectionMode={selectionMode}
      value={value}
      onChange={onChange}
    >
      {label && <Label>{label}</Label>}
      <SelectHeroui.Trigger className="rounded-xl">
        <SelectHeroui.Value className="max-h-full text-xs" />
        <SelectHeroui.Indicator className="max-h-full text-xs" />
      </SelectHeroui.Trigger>
      <SelectHeroui.Popover>
        <ListBox selectionMode={selectionMode} className="text-xs">
          {options.map((option) => (
            <ListBox.Item key={option.id} id={option.id} textValue={option.content?.toString()}>
              {option.content}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </SelectHeroui.Popover>
    </SelectHeroui>
  );
};
