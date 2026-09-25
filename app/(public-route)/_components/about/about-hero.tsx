export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-card">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="absolute -left-20 top-10 size-72 rounded-full bg-teal-100/70 blur-3xl dark:bg-teal-950/40" />
        <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-amber-100/70 blur-3xl dark:bg-amber-950/30" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-800 dark:border-teal-900 dark:bg-teal-950/50 dark:text-teal-200">
            {"// About FixItNow"}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Every fix starts
            <br />
            with a service request.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            FixItNow is Dhaka&apos;s home-services platform. Vetted pros, fixed
            prices in taka, booked in minutes — the same way, every day.
          </p>
        </div>
        <div aria-hidden className="relative hidden h-64 lg:block">
          <div className="absolute inset-8 rotate-6 rounded-[2.5rem] border border-teal-200 bg-teal-50/70 shadow-[0_24px_60px_-30px_rgba(15,118,110,0.4)] dark:border-teal-900 dark:bg-teal-950/30" />
          <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] border border-amber-200 bg-amber-50/70 shadow-[0_24px_60px_-30px_rgba(245,158,11,0.32)] dark:border-amber-900 dark:bg-amber-950/25" />
           <div className="absolute inset-12 rounded-full border border-primary/15" />
        </div>
      </div>
    </section>
  );
}
