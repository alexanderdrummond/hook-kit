"use client";

import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import type { ButtonProps as BaseButtonProps } from "@base-ui/react/button";

type ButtonVariant = "default" | "ghost";
type ButtonSize = "default" | "icon";

export type ButtonProps = BaseButtonProps & {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      size = "default",
      variant = "default",
      ...props
    },
    ref,
  ) => (
    <BaseButton
      ref={ref}
      className={joinClasses(
        "inline-flex items-center justify-center rounded-md text-sm font-medium outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:pointer-events-none disabled:opacity-50",
        variant === "default" &&
          "border border-border bg-primary text-primary-foreground hover:opacity-90",
        variant === "ghost" &&
          "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        size === "default" && "h-9 px-3",
        size === "icon" && "size-7 p-0",
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
