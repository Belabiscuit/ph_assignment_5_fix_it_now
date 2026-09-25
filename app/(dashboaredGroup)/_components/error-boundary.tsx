"use client";

export function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-white px-6 py-16 text-center shadow-sm dark:border-amber-900/70 dark:bg-slate-900">
      <p className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">
        Couldn&apos;t load this page.
      </p>
      <p
        className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300"
        role="alert"
      >
        {error.message ||
          "Something went wrong while loading your dashboard. Try again."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-900"
      >
        Try again
      </button>
    </div>
  );
}
