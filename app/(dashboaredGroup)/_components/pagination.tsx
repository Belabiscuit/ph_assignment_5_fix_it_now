import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  makeHref,
}: {
  currentPage: number;
  totalPages: number;
  makeHref: (page: number) => string;
}) {
  const safeTotalPages = Math.max(totalPages, 1);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < safeTotalPages;

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
      aria-label="Pagination"
    >
      {canGoPrev ? (
        <Link
          href={makeHref(currentPage - 1)}
          className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-slate-700 shadow-sm transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-700 dark:hover:bg-teal-950/40 dark:hover:text-teal-100 dark:focus-visible:ring-offset-slate-950"
        >
          ‹ Prev
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-slate-400 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-600"
        >
          ‹ Prev
        </span>
      )}
      <span className="rounded-xl bg-slate-100 px-3 py-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        Page {currentPage} of {safeTotalPages}
      </span>
      {canGoNext ? (
        <Link
          href={makeHref(currentPage + 1)}
          className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-slate-700 shadow-sm transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-700 dark:hover:bg-teal-950/40 dark:hover:text-teal-100 dark:focus-visible:ring-offset-slate-950"
        >
          Next ›
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-slate-400 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-600"
        >
          Next ›
        </span>
      )}
    </nav>
  );
}
