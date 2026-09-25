import { cn } from "@/lib/utils";

const areItems = [
  "Vetted & background-checked pros",
  "Fixed price printed before you book",
  "Paid securely up front",
  "Rated by the neighbours who hired them",
];

const notItems = [
  "Hourly surprises at the door",
  "Unvetted strangers in your home",
  "Handshake cash with no record",
  "A price that moves once you’re stuck",
];

export function Contrast() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {"// What we are — and what we’re not"}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          The fix, without the guesswork.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-teal-200 bg-teal-50/70 p-6 shadow-[0_20px_50px_-32px_rgba(15,118,110,0.4)] sm:p-8 dark:border-teal-900 dark:bg-teal-950/30">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-800 dark:text-teal-200">
              {"// We are"}
            </p>
            <ul className="mt-6 space-y-4">
              {areItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
                    {"✓"}
                  </span>
                  <span className="text-base font-medium leading-snug text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-slate-50 p-6 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.35)] sm:p-8 dark:bg-slate-900/70">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {"// We’re not"}
            </p>
            <ul className="mt-6 space-y-4">
              {notItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-amber-300 bg-amber-50 text-xs font-bold leading-none text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                    {"×"}
                  </span>
                  <span className="text-base leading-snug text-muted-foreground [text-decoration:line-through] [text-decoration-color:color-mix(in_oklab,var(--steel)_60%,transparent)] [text-decoration-thickness:1px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          className={cn(
            "mt-6 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
          )}
        >
          Clear details, fixed prices, no surprises.
        </p>
      </div>
    </section>
  );
}
