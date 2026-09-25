import Link from "next/link";

export function DispatchHeader({ serial }: { serial: string }) {
  return (
    <section className="border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <Link
          href="/services"
          className="rounded-lg px-1 py-1 text-sm font-medium text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
        >
          {"←"} Service library · all services
        </Link>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          Service reference · {serial}
        </span>
      </div>
    </section>
  );
}

export function BoardCta() {
  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-[0_24px_70px_-34px_rgba(15,23,42,0.6)] sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border dark:border-border dark:bg-card dark:text-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-teal-500/15 blur-3xl"
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            {"// not the one?"}
          </p>
          <p className="mt-2 font-display text-2xl font-bold leading-snug">
            Need something else fixed?
          </p>
        </div>
        <Link
          href="/services"
          className="relative inline-flex shrink-0 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          Browse all services
        </Link>
      </div>
    </section>
  );
}
