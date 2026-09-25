"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-background p-4 sm:p-8">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="absolute left-8 top-10 size-72 rounded-full bg-teal-100/70 blur-3xl dark:bg-teal-950/40" />
        <div className="absolute bottom-0 right-8 size-80 rounded-full bg-amber-100/70 blur-3xl dark:bg-amber-950/30" />
      </div>
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-7 shadow-[0_24px_65px_-36px_rgba(15,23,42,0.45)] sm:p-8">
        <p className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
          Payment cancelled
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
          No charge was made.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          You can retry payment anytime from your dashboard. The booking stays
          reserved until then.
        </p>
        {tranId && (
          <p className="mt-4 rounded-xl bg-muted/70 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Transaction · {tranId}
          </p>
        )}
        <div className="mt-6">
          <Link
            href="/dashboard/bookings"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 sm:w-auto"
          >
            Back to my bookings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={null}>
      <PaymentCancelContent />
    </Suspense>
  );
}
