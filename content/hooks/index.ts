import * as useCopyToClipboard from "./use-copy-to-clipboard.mdx";
import * as useDebounce from "./use-debounce.mdx";
import * as useFormDirty from "./use-form-dirty.mdx";
import * as useInputMask from "./use-input-mask.mdx";
import * as useMediaQuery from "./use-media-query.mdx";
import * as useMemoCost from "./use-memo-cost.mdx";
import * as useOnClickOutside from "./use-on-click-outside.mdx";
import * as usePageLeave from "./use-page-leave.mdx";
import * as useQueue from "./use-queue.mdx";
import * as useRenderBudget from "./use-render-budget.mdx";
import * as useRenderCount from "./use-render-count.mdx";
import * as useScrollDirection from "./use-scroll-direction.mdx";
import * as useScrollLock from "./use-scroll-lock.mdx";
import * as useToggle from "./use-toggle.mdx";
import * as useUndoRedo from "./use-undo-redo.mdx";
import * as useWhyDidUpdate from "./use-why-did-update.mdx";
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
  "use-debounce": useDebounce as HookModule,
  "use-form-dirty": useFormDirty as HookModule,
  "use-input-mask": useInputMask as HookModule,
  "use-media-query": useMediaQuery as HookModule,
  "use-memo-cost": useMemoCost as HookModule,
  "use-on-click-outside": useOnClickOutside as HookModule,
  "use-page-leave": usePageLeave as HookModule,
  "use-queue": useQueue as HookModule,
  "use-render-budget": useRenderBudget as HookModule,
  "use-render-count": useRenderCount as HookModule,
  "use-scroll-direction": useScrollDirection as HookModule,
  "use-scroll-lock": useScrollLock as HookModule,
  "use-toggle": useToggle as HookModule,
  "use-undo-redo": useUndoRedo as HookModule,
  "use-why-did-update": useWhyDidUpdate as HookModule,
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
