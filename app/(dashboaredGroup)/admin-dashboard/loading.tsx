export default function AdminDashboardLoading() {
  return (
    <div
      className="rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7"
      role="status"
      aria-label="Loading admin dashboard"
      aria-busy="true"
    >
      <span className="sr-only">Loading admin dashboard</span>
      <div className="space-y-8 motion-safe:animate-pulse" aria-hidden="true">
        <div className="space-y-2">
          <div className="h-3 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-72 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-64 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-3 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="mt-3 h-8 w-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-3 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="mt-3 h-4 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="h-4 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-9 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 py-4 first:pt-5 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-2">
                <div className="h-4 w-48 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-6 w-20 rounded-full bg-amber-200 dark:bg-amber-950" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
