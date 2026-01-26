import Link from "next/link";

export const Button = ({
  text,
  icon,
  textColor,
  className,
  isDisabled = false,
  to = "",
  onClick,
}: {
  text?: string | React.ReactNode;
  icon?: React.ReactNode;
  textColor?: string;
  className?: string;
  isDisabled?: boolean;
  to?: string;
  onClick?: () => void;
}) => {
  if (onClick) {
    return (
      <button
        disabled={isDisabled}
        className={`${className} w-full px-4 py-2 bg-accent rounded-lg font-medium hover:bg-accent/90 transition-all shadow-sm hover:shadow-md border border-accent-soft-hover text-xs flex items-center justify-center gap-1.5 whitespace-nowrap`}
        style={{ color: textColor }}
      >
        {icon && icon}
        {text && text}
      </button>
    );
  };

  return (
    <Link href={to}>
      <button
        disabled={isDisabled}
        className={`${className} w-full px-4 py-2 bg-accent rounded-lg font-medium hover:bg-accent/90 transition-all shadow-sm hover:shadow-md border border-accent-soft-hover text-xs flex items-center justify-center gap-1.5 whitespace-nowrap`}
        style={{ color: textColor }}
      >
        {icon && icon}
        {text && text}
      </button>
    </Link>
  );
};
