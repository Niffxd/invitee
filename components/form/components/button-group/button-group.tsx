import { Button, ButtonGroup as ButtonGroupHeroui } from "@heroui/react";
import { ButtonGroupProps } from "./types";

export const ButtonGroup = ({
  value,
  onChange,
  buttons,
  variant = "primary",
  description,
  className = "",
}: ButtonGroupProps) => {
  return (
    <div className={`w-full flex flex-col items-center gap-2 ${className}`}>
      {description && <p className="text-sm text-muted">{description}</p>}
      <ButtonGroupHeroui variant={variant}>
        {buttons.map((button) => (
          <Button
            key={button.text}
            variant={button.variant}
            onPress={() => onChange?.(button.value as boolean | null)}
            className={value === button.value ? "bg-primary" : "bg-foreground/10"}
          >
            {button.icon}
            {button.text}
          </Button>
        ))}
      </ButtonGroupHeroui>
    </div >
  );
};
