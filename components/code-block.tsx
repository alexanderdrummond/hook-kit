import type { ComponentPropsWithoutRef } from "react";

import { CopyButton } from "@/components/ui/copy-button";

export function CodeBlock({
  children,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const code = getTextContent(children);

  return (
    <div className="code-block">
      <pre {...props}>{children}</pre>
      <CopyButton className="code-block__copy" size="sm" value={code} />
    </div>
  );
}

function getTextContent(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(getTextContent).join("");
  }

  if (isReactElement(value)) {
    return getTextContent(value.props.children);
  }

  return "";
}

function isReactElement(
  value: unknown,
): value is { props: { children?: unknown } } {
  return (
    typeof value === "object" &&
    value !== null &&
    "props" in value &&
    typeof value.props === "object" &&
    value.props !== null
  );
}
