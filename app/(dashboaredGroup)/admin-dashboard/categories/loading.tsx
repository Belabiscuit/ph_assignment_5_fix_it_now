export default function AdminCategoriesLoading() {
  return (
    <div
      className="space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7"
      role="status"
      aria-label="Loading admin categories"
      aria-busy="true"
    >
      <span className="sr-only">Loading admin categories</span>
      <div className="space-y-6 motion-safe:animate-pulse" aria-hidden="true">
        <div className="space-y-2">
          <div className="h-3 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-56 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="h-4 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="mt-3 h-3 w-56 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
          <div className="h-96 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:p-6" />
        </div>
      </div>
    </div>
  );
}
