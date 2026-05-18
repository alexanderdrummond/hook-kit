"use client";

import { useMemo, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/ui/copy-button";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

type CodeBlockCommandProps = Partial<Record<PackageManager, string>>;

const storageKey = "hook-kit-package-manager";
const packageManagers: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

export function CodeBlockCommand(props: CodeBlockCommandProps) {
  const [packageManager, setPackageManager] = useState<PackageManager>(() => {
    if (typeof window === "undefined") {
      return "pnpm";
    }

    const stored = window.localStorage.getItem(storageKey);
    return isPackageManager(stored) ? stored : "pnpm";
  });
  

  const commands = useMemo(
    () =>
      packageManagers
        .map((manager) => [manager, props[manager]] as const)
        .filter((command): command is readonly [PackageManager, string] =>
          Boolean(command[1]),
        ),
    [props],
  );

  const activeCommand = props[packageManager] ?? commands[0]?.[1] ?? "";

  function selectPackageManager(manager: PackageManager) {
    setPackageManager(manager);
    window.localStorage.setItem(storageKey, manager);
  }

  return (
    <div className="code-command">
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          if (isPackageManager(value)) {
            selectPackageManager(value);
          }
        }}
      >
        <div className="code-command__bar">
          <span className="code-command__terminal" aria-hidden="true">
            <TerminalIcon />
          </span>
          <TabsList aria-label="Package manager" className="code-command__tabs">
            {commands.map(([manager]) => (
              <TabsTrigger key={manager} value={manager}>
                {manager}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {commands.map(([manager, command]) => (
          <TabsContent
            className="code-command__content"
            key={manager}
            value={manager}
          >
            <pre className="code-command__pre">
              <code data-language="bash">{command}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
      <CopyButton className="code-command__copy" size="sm" value={activeCommand} />
    </div>
  );
}

function isPackageManager(value: string | null): value is PackageManager {
  return packageManagers.includes(value as PackageManager);
}

function TerminalIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="14"
      viewBox="0 0 24 24"
      width="14"
      {...props}
    >
      <path
        d="m4 17 6-5-6-5M12 19h8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
