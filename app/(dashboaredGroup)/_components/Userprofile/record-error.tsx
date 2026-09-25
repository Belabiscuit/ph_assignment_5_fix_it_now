import Link from "next/link";

export function RecordError({ retryHref = "/dashboard/profile" }: { retryHref?: string }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-white px-6 py-16 text-center shadow-sm dark:border-amber-900/70 dark:bg-slate-900">
      <p className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">
        Couldn&apos;t read your record.
      </p>
      <p
        className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300"
        role="alert"
      >
        We couldn&apos;t load your account details. Check your connection and try
        again.
      </p>
      <Link
        href={retryHref}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-900"
      >
        Try again
      </Link>
    </div>
  );
}
