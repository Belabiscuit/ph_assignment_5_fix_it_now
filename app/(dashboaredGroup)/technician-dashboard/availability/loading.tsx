export default function AvailabilityLoading() {
  return (
    <div
      className="mx-auto w-full max-w-3xl rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7"
      role="status"
      aria-label="Loading technician availability"
      aria-busy="true"
    >
      <span className="sr-only">Loading technician availability</span>
      <div className="animate-pulse space-y-6" aria-hidden="true">
        <div className="space-y-2">
          <div className="h-3 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-52 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
            <div className="h-3 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-8 w-28 rounded-xl bg-teal-200 dark:bg-teal-950" />
          </div>
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 last:border-b-0 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="space-y-2">
                <div className="h-3 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-28 rounded-xl bg-amber-200 dark:bg-amber-950" />
              </div>
              <div className="h-9 w-44 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
