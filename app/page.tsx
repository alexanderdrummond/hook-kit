import Link from "next/link";
import { Suspense, ViewTransition } from "react";

import { CategoryTabs } from "@/components/category-tabs";
import { LogoMark } from "@/components/logo-mark";
import { getHooks, type HookMetadata } from "@/content/hooks";

export default function Home() {
  const hooks = getHooks();
  const categories = Array.from(new Set(hooks.map((hook) => hook.category))).sort(
    (a, b) => a.localeCompare(b),
  );

  return (
    <ViewTransition>
      <div className="min-h-screen w-full bg-white">
        <main className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-1 flex-col border-x border-border">
          <header className="px-6 py-12 sm:px-8 sm:py-16">
            <div className="flex items-center gap-3 text-foreground">
              <LogoMark className="h-9 w-9 shrink-0" />
              <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Hook Kit
              </h1>
            </div>
            <p className="mt-4 max-w-xl text-base leading-7 text-foreground/75">
              Small React hooks with source and usage notes.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/70">
              <Link
                className="inline-flex items-center gap-1.5 transition hover:text-foreground"
                href="https://github.com/alexanderdrummond/hook-kit"
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91c.58.1.79-.25.79-.56v-2.01c-3.2.7-3.87-1.54-3.87-1.54c-.52-1.33-1.28-1.69-1.28-1.69c-1.05-.72.08-.7.08-.7c1.15.08 1.76 1.18 1.76 1.18c1.03 1.76 2.69 1.25 3.35.96c.1-.74.4-1.25.73-1.54c-2.55-.29-5.23-1.28-5.23-5.69c0-1.26.45-2.28 1.18-3.08c-.12-.29-.51-1.46.11-3.04c0 0 .96-.31 3.16 1.18A10.9 10.9 0 0 1 12 5.49c.98 0 1.95.13 2.87.39c2.19-1.49 3.15-1.18 3.15-1.18c.63 1.58.24 2.75.12 3.04c.74.8 1.18 1.82 1.18 3.08c0 4.42-2.69 5.39-5.25 5.68c.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
                GitHub
              </Link>
              <span aria-hidden="true" className="text-border">
                /
              </span>
              <span>
                Created by{" "}
                <Link
                  className="transition hover:text-foreground"
                  href="https://github.com/alexanderdrummond"
                  rel="noreferrer"
                  target="_blank"
                >
                  Alexander Drummond
                </Link>
              </span>
            </div>
          </header>

          <Suspense fallback={<HookList hooks={hooks} />}>
            <CategoryTabs categories={categories} hooks={hooks} />
          </Suspense>
        </main>
      </div>
    </ViewTransition>
  );
}

function HookList({ hooks }: { hooks: HookMetadata[] }) {
  return (
    <section className="divide-y divide-border border-t border-border">
      {hooks.map((hook) => (
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
  );
}
