export interface ButtonProps {
  text?: string | React.ReactNode;
  icon?: React.ReactNode;
  textColor?: string;
  className?: string;
  isDisabled?: boolean;
  to?: string;
  onClick?: () => void;
}
