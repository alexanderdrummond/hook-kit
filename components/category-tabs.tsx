"use client";

import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { useTransition, ViewTransition } from "react";

import type { HookMetadata } from "@/content/hooks";

type CategoryTabsProps = {
  categories: string[];
  hooks: HookMetadata[];
};

export function CategoryTabs({ categories, hooks }: CategoryTabsProps) {
  const [, startTransition] = useTransition();
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("all"),
  );
  const activeCategory = categories.includes(category) ? category : "all";
  const visibleHooks =
    activeCategory === "all"
      ? hooks
      : hooks.filter((hook) => hook.category === activeCategory);

  return (
    <>
      <aside
        aria-label="Hook categories"
        className="flex justify-end px-6 sm:px-8"
      >
        <div className="flex flex-wrap justify-end gap-1">
          {["all", ...categories].map((item) => {
            const isActive = item === activeCategory;

            return (
              <button
                aria-pressed={isActive}
                className="-mb-px shrink-0 rounded-t-md border border-border bg-white px-3 py-1.5 text-xs font-medium capitalize text-muted-foreground transition hover:text-foreground aria-pressed:border-b-white aria-pressed:text-foreground"
                key={item}
                onClick={() => {
                  startTransition(() => {
                    void setCategory(item);
                  });
                }}
                type="button"
              >
                {item}
              </button>
            );
          })}
        </div>
      </aside>

      <ViewTransition
        default="none"
        enter="category-list"
        key={activeCategory}
        name="hook-category-list"
        share="category-list"
      >
        <section className="divide-y divide-border border-t border-border">
          {visibleHooks.map((hook) => (
            <Link
              className="group grid gap-1 px-6 py-4 transition hover:bg-muted/40 sm:grid-cols-[12rem_1fr] sm:gap-6 sm:px-8"
              href={`/hooks/${hook.slug}`}
              key={hook.slug}
              transitionTypes={["hook-navigation"]}
            >
              <span className="font-mono text-sm text-foreground">
                {hook.title}
              </span>
              <span className="text-sm leading-6 text-muted-foreground">
                {hook.description}
              </span>
            </Link>
          ))}
        </section>
      </ViewTransition>
    </>
  );
}
