"use client"

import { Description, Label, Radio, RadioGroup } from "@heroui/react"

export interface RadioOption {
  value: string
  label?: string
  description?: string
}

interface RadioButtonProps {
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  name: string
  label?: string
  description?: string
  className?: string
}

export const RadioButton = ({
  options,
  value,
  onChange,
  name,
  label,
  description,
  className = "",
}: RadioButtonProps) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      <RadioGroup name={name} value={value} onChange={onChange}>
        {label && <Label>{label}</Label>}

        {options.map((option) => (
          <Radio key={option.value} value={option.value} className="my-2 mx-3">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>

            <Radio.Content>
              {option.label && <Label>{option.label}</Label>}
              {option.description && (
                <Description>{option.description}</Description>
              )}
            </Radio.Content>
          </Radio>
        ))}
      </RadioGroup>

      {description && (
        <p className="text-sm text-muted">
          {description} <span className="font-medium">{value}</span>
        </p>
      )}
    </div>
  )
};
