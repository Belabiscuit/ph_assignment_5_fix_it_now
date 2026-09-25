import type { TechnicianReview } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <span
      className="text-sm tracking-tight"
      aria-label={`Rated ${rating} out of 5`}
    >
      <span className="text-amber-500">{"★".repeat(full)}</span>
      <span className="text-slate-300 dark:text-slate-700">
        {"★".repeat(5 - full)}
      </span>
    </span>
  );
}

export function JobLedger({
  reviews,
  dispatched,
}: {
  reviews: TechnicianReview[];
  dispatched: number;
}) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {"// service history"}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Service history.
        </h2>
        <p className="mt-3 text-muted-foreground">
          {dispatched} job{dispatched === 1 ? "" : "s"} booked for this service · {reviews.length}{" "}
          reviewed by the people who booked it.
        </p>

        {reviews.length > 0 ? (
          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_55px_-34px_rgba(15,23,42,0.4)]">
            <div className="hidden items-center justify-between border-b border-border bg-slate-950 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white sm:grid sm:grid-cols-[1fr_auto] dark:bg-slate-900 dark:text-slate-100">
              <span>What the pro did well</span>
              <span className="text-right">Rating</span>
            </div>
            <ul className="divide-y divide-border">
              {reviews.map((review, index) => (
                <li
                  key={index}
                  className="grid gap-3 px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6 sm:px-6"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[10px] font-bold text-teal-700 dark:bg-teal-950/60 dark:text-teal-200">
                        {"✓"}
                      </span>
                      <span className="truncate text-sm font-semibold text-foreground">
                        Verified customer
                      </span>
                    </div>
                    {review.comment && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {review.comment}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <Stars rating={review.rating} />
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                      done {"✓"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
           <div className="mt-8 rounded-3xl border border-border bg-card p-10 text-center shadow-sm sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              No reviews yet
            </p>
            <p className="mx-auto mt-2 max-w-md font-display text-xl font-bold text-foreground">
              This service is new to FixItNow.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              No completed bookings yet. Be the first to book it — and set the standard for everyone after.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
