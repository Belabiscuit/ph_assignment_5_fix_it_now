export default function AdminBookingsLoading() {
  return (
    <div
      className="space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7"
      role="status"
      aria-label="Loading admin bookings"
      aria-busy="true"
    >
      <span className="sr-only">Loading admin bookings</span>
      <div className="space-y-6 motion-safe:animate-pulse" aria-hidden="true">
        <div className="space-y-2">
          <div className="h-3 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-56 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="h-32 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />

        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="h-4 w-40 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-6 w-24 rounded-full bg-amber-200 dark:bg-amber-950" />
              </div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="h-5 w-48 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-8 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
