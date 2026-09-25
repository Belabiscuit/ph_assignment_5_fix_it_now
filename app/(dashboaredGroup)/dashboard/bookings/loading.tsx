export default function BookingsLoading() {
  return (
    <div
      className="space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7"
      role="status"
      aria-label="Loading bookings"
      aria-busy="true"
    >
      <span className="sr-only">Loading bookings</span>
      <div className="space-y-2">
        <div className="h-3 w-44 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-8 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="h-3 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-6 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="h-5 w-52 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-8 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
