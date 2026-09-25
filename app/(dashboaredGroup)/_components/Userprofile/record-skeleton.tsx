export function RecordSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-3xl animate-pulse space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7"
      role="status"
      aria-label="Loading profile"
      aria-busy="true"
    >
      <span className="sr-only">Loading profile</span>
      <div className="h-3 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="size-24 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="w-full flex-1 space-y-3">
            <div className="h-7 w-52 max-w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-5 rounded-xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
