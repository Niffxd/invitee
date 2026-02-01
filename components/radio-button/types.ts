interface RadioOption {
  value: string
  label?: string
  description?: string
}

export interface RadioButtonProps {
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  name: string
  label?: string
  description?: string
  className?: string
}
