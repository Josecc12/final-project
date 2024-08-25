import React from "react";
import { cn } from "@/lib/utils";
type TypographyProps = {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "p"
    | "blockquote"
    | "caption"
    | "lead"
    | "large"
    | "small"
    | "muted";
  className?: string;
  children?: React.ReactNode;
};

export const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  className,
  children,
}) => {
  const baseStyles = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    h5: "scroll-m-20 text-lg font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    caption: "text-sm text-muted-foreground",
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    muted: "text-sm text-muted-foreground",
  };

  const Component = variant === "large" ? "div" : "p";

  return (
    <Component className={cn(baseStyles[variant], className)}>
      {children}
    </Component>
  );
};
