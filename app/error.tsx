"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center bg-background px-4 py-12 text-foreground">
      <article className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 text-center text-card-foreground shadow-sm sm:p-8">
        <span
          className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-accent text-lg font-semibold text-accent-foreground"
          aria-hidden
        >
          !
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {error.message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          Try again
        </button>
      </article>
    </main>
  );
}
