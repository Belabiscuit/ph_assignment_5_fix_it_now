export function Why() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {"// Why it exists"}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Repairs shouldn&apos;t be a gamble.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.4)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {"// The old way"}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
              Finding someone to fix a leak in Dhaka means calling around,
              trusting a stranger&apos;s word, and hearing the real price only
              when the job is half done. No record, no recourse, no way to know
              who you just let into your home.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A small job becomes a gamble with your door open.
            </p>
          </div>
          <div className="rounded-3xl border border-teal-200 bg-teal-50/70 p-6 shadow-[0_20px_50px_-32px_rgba(15,118,110,0.42)] sm:p-8 dark:border-teal-900 dark:bg-teal-950/30">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-800 dark:text-teal-200">
              {"// The FixItNow way"}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
              We rebuilt it around clear service details. The price is printed
              before you book, the professional is background-checked and rated
              by the people who hired them, and payment is settled up front — so
              nothing changes hands at your door.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              You always know the what, the who, and the cost before the job
              starts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
