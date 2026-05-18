"use client";

import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

export const TooltipProvider = BaseTooltip.Provider;
export const Tooltip = BaseTooltip.Root;
export const TooltipTrigger = BaseTooltip.Trigger;

export function TooltipContent({
  children,
  className,
  sideOffset = 8,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup>,
  "className"
> & {
  className?: string;
  sideOffset?: number;
}) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner sideOffset={sideOffset}>
        <BaseTooltip.Popup
          className={joinClasses(
            "z-50 rounded-md border border-border bg-card px-2 py-1 text-xs text-card-foreground shadow-md outline-none transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
