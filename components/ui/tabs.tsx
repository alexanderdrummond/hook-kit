"use client";

import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";

export const Tabs = BaseTabs.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof BaseTabs.List>,
  Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.List>, "className"> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={joinClasses("relative flex items-center gap-1", className)}
    {...props}
  />
));

TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Tab>,
  Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>, "className"> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <BaseTabs.Tab
    ref={ref}
    className={joinClasses(
      "inline-flex h-7 items-center justify-center whitespace-nowrap rounded-md border border-transparent px-2 text-xs font-medium text-code-muted outline-none transition hover:text-code-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground data-[active]:border-input data-[active]:bg-background data-[active]:text-foreground",
      className,
    )}
    {...props}
  />
));

TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Panel>,
  Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>, "className"> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <BaseTabs.Panel
    ref={ref}
    className={joinClasses("outline-none", className)}
    {...props}
  />
));

TabsContent.displayName = "TabsContent";

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
