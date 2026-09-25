import Link from "next/link";

export function NoTicket({ serial }: { serial: string }) {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-4xl items-center px-4 py-16 sm:px-6 sm:py-24">
      <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center shadow-[0_24px_65px_-38px_rgba(15,23,42,0.42)] sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="absolute -right-20 -top-20 size-64 rounded-full bg-amber-100/70 blur-3xl dark:bg-amber-950/30"
        />
        <div className="relative">
          <p className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
            {"// service · not found"}
          </p>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl">
            Service {serial} isn&apos;t available.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            This service may have been taken down, or the link is wrong. Check the
            service reference, or browse all services.
          </p>
          <Link
            href="/services"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
          >
            {"←"} Back to services
          </Link>
        </div>
      </div>
    </section>
  );
}
