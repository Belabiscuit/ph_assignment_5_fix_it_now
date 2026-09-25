const claims = [
  "Vetted & background-checked",
  "Fixed prices, paid up front",
  "Booked in under 2 minutes",
  "Rated by your neighbours",
];

export function TrustStrip() {
  return (
    <section
      aria-label="Why trust FixItNow"
      className="border-y border-amber-200/70 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/20"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {claims.map((claim) => (
            <li
              key={claim}
              className="flex items-center gap-2.5 rounded-2xl border border-amber-200/70 bg-card/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm dark:border-amber-900/60 dark:bg-card/80 dark:text-slate-200"
            >
              <span
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700 dark:bg-amber-900/60 dark:text-amber-200"
              >
                ✓
              </span>
              {claim}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
