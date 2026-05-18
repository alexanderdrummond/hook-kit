import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { LogoMark } from "@/components/logo-mark";
import { getHookBySlug, getHooks, getHookSlugs } from "@/content/hooks";

export function generateStaticParams() {
  return getHookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/hooks/[slug]">) {
  const { slug } = await params;
  const hook = getHookBySlug(slug);

  if (!hook) {
    return {};
  }

  return {
    title: `${hook.title} - Hook Kit`,
    description: hook.description,
  };
}

export default async function HookPage({ params }: PageProps<"/hooks/[slug]">) {
  const { slug } = await params;
  const hook = getHookBySlug(slug);

  if (!hook) {
    notFound();
  }

  const { Content } = hook;
  const hooks = getHooks();

  return (
    <ViewTransition>
      <div className="min-h-screen w-full bg-white">
        <div className="mx-auto min-h-screen w-full max-w-3xl lg:relative">
          <aside
            aria-label="Hooks"
            className="border-b border-border px-6 py-4 sm:px-8 lg:absolute lg:right-full lg:top-0 lg:h-full lg:w-48 lg:border-b-0 lg:px-0 lg:py-16 lg:pr-8"
          >
            <nav className="flex gap-4 overflow-x-auto text-sm lg:sticky lg:top-16 lg:flex-col lg:gap-1 lg:overflow-visible">
              <Link
                className="inline-flex shrink-0 items-center gap-2 text-foreground/70 transition hover:text-foreground lg:mb-3"
                href="/"
                transitionTypes={["hook-navigation"]}
              >
                <LogoMark className="h-4 w-4 shrink-0" />
                Hook Kit
              </Link>
              {hooks.map((item) => (
                <Link
                  aria-current={item.slug === hook.slug ? "page" : undefined}
                  className="shrink-0 font-mono text-muted-foreground transition hover:text-foreground aria-[current=page]:text-foreground"
                  href={`/hooks/${item.slug}`}
                  key={item.slug}
                  transitionTypes={["hook-navigation"]}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex min-h-screen w-full flex-col border-x border-border">
            <header className="border-b border-border px-6 py-12 sm:px-8 sm:py-16">
              <h1 className="font-mono text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {hook.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-foreground/75">
                {hook.description}
              </p>
            </header>
            <article className="flex flex-col gap-5 px-6 py-8 sm:px-8">
              <Content />
            </article>
          </main>
        </div>
      </div>
    </ViewTransition>
  );
}
