import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

import { CodeBlock } from "@/components/code-block";

function ProseLink(props: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      {...props}
      className="font-medium text-foreground underline decoration-border underline-offset-4 transition hover:decoration-foreground"
    />
  );
}

function Code(props: ComponentPropsWithoutRef<"code">) {
  if ("data-language" in props) {
    return <code {...props} />;
  }

  return (
    <code
      {...props}
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
    />
  );
}

function HookNote(props: ComponentPropsWithoutRef<"aside">) {
  return (
    <aside
      {...props}
      className="border-y border-border py-4 text-sm leading-6 text-foreground/70 [&>p]:leading-6"
    />
  );
}

function HookSignature({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <h2 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-foreground">
        Signature
      </h2>
      <CodeBlock>
        <code>{children}</code>
      </CodeBlock>
    </>
  );
}

const components: MDXComponents = {
  a: ProseLink,
  code: Code,
  h2: (props) => (
    <h2
      {...props}
      className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-foreground"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-6 scroll-m-20 text-base font-semibold tracking-tight text-foreground"
    />
  ),
  li: (props) => <li {...props} className="pl-1" />,
  p: (props) => <p {...props} className="leading-7 text-muted-foreground" />,
  pre: CodeBlock,
  ul: (props) => (
    <ul
      {...props}
      className="my-5 list-disc space-y-2 pl-5 text-muted-foreground"
    />
  ),
  HookNote,
  HookSignature,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
