import clsx from "clsx";
import BaseIconProps from "./base-icon-props";

export default function BaseIcon({ children, className }: BaseIconProps) {
  return (
    <svg
      className={clsx(className)}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}


