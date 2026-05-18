import * as useCopyToClipboard from "./use-copy-to-clipboard.mdx";
import type { ComponentType } from "react";

export type HookMetadata = {
  slug: string;
  title: string;
  description: string;
  category: string;
  signature: string;
};

type HookModule = {
  default: ComponentType;
  hook: HookMetadata;
};

const hookModules = {
  "use-copy-to-clipboard": useCopyToClipboard as HookModule,
} satisfies Record<string, HookModule>;

export type HookSlug = keyof typeof hookModules;

export function getHookSlugs() {
  return Object.keys(hookModules) as HookSlug[];
}

export function getHookBySlug(slug: string) {
  if (!isHookSlug(slug)) {
    return null;
  }

  const hookModule = hookModules[slug];

  return {
    ...hookModule.hook,
    Content: hookModule.default,
  };
}

export function getHooks() {
  return getHookSlugs()
    .map((slug) => hookModules[slug].hook)
    .sort((a, b) => a.title.localeCompare(b.title));
}

function isHookSlug(slug: string): slug is HookSlug {
  return slug in hookModules;
}
