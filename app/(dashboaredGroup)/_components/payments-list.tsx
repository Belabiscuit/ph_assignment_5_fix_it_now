"use client";

import { useState } from "react";
import Link from "next/link";
import type { PaymentListItem } from "@/lib/types";
import { formatBDT, formatDate } from "@/lib/utils";
import { PaymentStatusBadge } from "./payment-status-badge";
import { PaymentDetailDialog } from "./payment-detail-dialog";
import { EmptyState } from "./empty-state";

export function PaymentsList({ payments }: { payments: PaymentListItem[] }) {
  const [receiptId, setReceiptId] = useState<string | null>(null);

  return (
    <div className="space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Payment history
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Payments
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Every charge against your account, in taka.
        </p>
      </header>

      {payments.length > 0 ? (
        <ul className="grid gap-4 xl:grid-cols-2">
          {payments.map((p) => (
            <li
              key={p.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <p className="break-all text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {p.transactionId}
                </p>
                <PaymentStatusBadge status={p.status} />
              </div>

              <div className="grid flex-1 gap-4 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-bold text-slate-950 dark:text-slate-50">
                    {p.booking?.service?.title ?? "Booking payment"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(p.paidAt ?? p.createdAt)}
                  </p>
                  {p.booking?.id && (
                    <Link
                      href="/dashboard/bookings"
                      className="mt-2 inline-flex text-sm font-semibold text-teal-700 underline-offset-4 transition-colors hover:text-teal-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:text-teal-300 dark:hover:text-teal-100 dark:focus-visible:ring-offset-slate-900"
                    >
                      View booking →
                    </Link>
                  )}
                </div>

                <div className="flex flex-col items-start gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:items-end sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <span className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">
                    {formatBDT(p.amount)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setReceiptId(p.id)}
                    className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-900"
                  >
                    Receipt
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No payments yet."
          description="Payments appear here once you pay for an accepted booking."
          actionHref="/dashboard/bookings"
          actionLabel="See bookings"
        />
      )}

      <PaymentDetailDialog
        paymentId={receiptId}
        open={receiptId !== null}
        onClose={() => setReceiptId(null)}
      />
    </div>
  );
}
