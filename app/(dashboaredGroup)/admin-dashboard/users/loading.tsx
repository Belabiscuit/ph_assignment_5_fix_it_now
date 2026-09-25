export default function AdminUsersLoading() {
  return (
    <div
      className="space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7"
      role="status"
      aria-label="Loading admin users"
      aria-busy="true"
    >
      <span className="sr-only">Loading admin users</span>
      <div className="space-y-6 motion-safe:animate-pulse" aria-hidden="true">
        <div className="space-y-2">
          <div className="h-3 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-56 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-72 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="h-28 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 last:border-b-0 dark:border-slate-800"
            >
              <div className="size-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-48 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-6 w-16 rounded-full bg-teal-200 dark:bg-teal-950" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
