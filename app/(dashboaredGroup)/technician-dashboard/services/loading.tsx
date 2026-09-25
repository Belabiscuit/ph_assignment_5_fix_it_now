export default function ServicesLoading() {
  return (
    <div
      className="rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7"
      role="status"
      aria-label="Loading technician services"
      aria-busy="true"
    >
      <span className="sr-only">Loading technician services</span>
      <div className="animate-pulse space-y-6" aria-hidden="true">
        <div className="space-y-2">
          <div className="h-3 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-44 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            <div className="h-3 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-48 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-64 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-28 rounded-xl bg-teal-200 dark:bg-teal-950" />
                  </div>
                  <div className="h-6 w-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-96 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:p-6">
            <div className="h-3 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="mt-5 space-y-4">
              <div className="h-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-10 rounded-xl bg-teal-200 dark:bg-teal-950" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
