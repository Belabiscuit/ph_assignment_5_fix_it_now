export default function TechnicianDashboardLoading() {
  return (
    <div
      className="rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7"
      role="status"
      aria-label="Loading technician dashboard"
      aria-busy="true"
    >
      <span className="sr-only">Loading technician dashboard</span>
      <div className="animate-pulse space-y-8" aria-hidden="true">
        <div className="space-y-2">
          <div className="h-3 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-72 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-64 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-3 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="mt-3 h-8 w-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
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
            <div className="h-8 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0 dark:border-slate-800"
            >
              <div className="space-y-2">
                <div className="h-4 w-48 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-6 w-20 rounded-xl bg-amber-200 dark:bg-amber-950" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
