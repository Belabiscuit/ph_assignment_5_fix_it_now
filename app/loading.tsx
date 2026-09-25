"use client";

import { useEffect, useState } from "react";

const STATUSES = [
  "Matching you with a vetted pro…",
  "Locking the price in taka…",
  "Heading to your address…",
];

export default function Loading() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const id = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUSES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="grid min-h-dvh place-items-center bg-background px-4 py-10 text-foreground">
      <section className="w-full max-w-lg" aria-labelledby="loading-title">
        <div className="mb-4 flex items-center justify-between gap-4 px-1">
          <p className="text-sm font-semibold text-foreground">FixItNow</p>
          <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            Service status
          </span>
        </div>

        <article
          aria-busy="true"
          className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm"
        >
          <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-5 py-4 sm:px-6">
            <span className="flex size-3 shrink-0" aria-hidden>
              <span className="size-3 rounded-full bg-primary motion-safe:animate-pulse" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Live update
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                We&apos;ll keep you informed while we prepare your request.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <h1
              id="loading-title"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Preparing your service request.
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The next update will appear here automatically.
            </p>

            <div className="mt-6 flex gap-2" aria-hidden="true">
              {STATUSES.map((status, index) => (
                <span
                  key={status}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                    index <= statusIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="mt-4 min-h-6 text-sm font-medium text-foreground"
            >
              {STATUSES[statusIndex]}
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
