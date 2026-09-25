"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import type { PaymentStatus } from "@/lib/types";
import { cn, formatBDT, formatDate, formatDateTime } from "@/lib/utils";
import { getPaymentById } from "../_actions/getPaymentById";

const STAMP: Record<PaymentStatus, { text: string; cls: string }> = {
  COMPLETED: {
    text: "PAID",
    cls: "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-900 dark:bg-teal-950/70 dark:text-teal-200",
  },
  PENDING: {
    text: "AWAITING",
    cls: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/70 dark:text-amber-200",
  },
  FAILED: {
    text: "VOID",
    cls: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/70 dark:text-red-200",
  },
  REFUNDED: {
    text: "REFUNDED",
    cls: "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
};

function Stamp({ status }: { status: PaymentStatus }) {
  const { text, cls } = STAMP[status];
  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-5 right-4 select-none rounded-xl border px-3 py-1.5",
        "font-display text-sm font-bold uppercase tracking-[0.16em]",
        cls
      )}
    >
      {text}
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </dt>
      <dd className="text-right text-sm font-medium text-slate-700 dark:text-slate-200">
        {children}
      </dd>
    </div>
  );
}

export function PaymentDetailDialog({
  paymentId,
  open,
  onClose,
}: {
  paymentId: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<Awaited<
    ReturnType<typeof getPaymentById>
  > | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !paymentId) return;
    let cancelled = false;

    getPaymentById(paymentId)
      .then((data) => {
        if (!cancelled) {
          setDetail(data);
          setError(null);
          setLoadedFor(paymentId);
        }
      })
      .catch((e: Error) => {
        if (!cancelled) {
          setError(e.message || "Couldn\u2019t load this payment.");
          setLoadedFor(paymentId);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, paymentId]);

  const loading = open && !!paymentId && loadedFor !== paymentId;

  return (
    <Dialog open={open} onClose={onClose} title="Payment receipt">
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : loading ? (
        <div
          className="space-y-3 animate-pulse"
          role="status"
          aria-label="Loading payment details"
          aria-busy="true"
        >
          <div className="h-4 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-64 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-52 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      ) : detail ? (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Stamp status={detail.status} />

          <header className="border-b border-slate-100 px-5 py-5 dark:border-slate-800">
            <div className="flex items-end justify-between gap-4 pr-24">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
                  FixItNow
                </p>
                <p className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
                  Payment receipt
                </p>
              </div>
              <p className="pb-1 text-xs text-slate-500 dark:text-slate-400">
                {formatDate(detail.createdAt)}
              </p>
            </div>
          </header>

          <dl className="space-y-4 px-5 py-5">
            <Row label="Transaction">
              <span className="font-bold">{detail.transactionId}</span>
            </Row>

            <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                For
              </dt>
              <dd className="mt-1 font-display text-lg font-bold leading-snug text-slate-950 dark:text-slate-50">
                {detail.booking?.service?.title ?? "Booking payment"}
              </dd>
              {detail.booking?.service?.description && (
                <dd className="mt-0.5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {detail.booking.service.description}
                </dd>
              )}
            </div>

            {detail.booking && (
              <Row label="Booking">
                <Link
                  href="/dashboard/bookings"
                  className="font-bold text-teal-700 underline-offset-4 transition-colors hover:text-teal-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:text-teal-300 dark:hover:text-teal-100 dark:focus-visible:ring-offset-slate-900"
                >
                  #{detail.booking.id.slice(0, 8).toUpperCase()}
                </Link>
              </Row>
            )}

            <Row label="Method">{detail.provider}</Row>
            <Row label={detail.paidAt ? "Paid at" : "Recorded"}>
              {formatDateTime(detail.paidAt ?? detail.createdAt)}
            </Row>

            {detail.failureReason && (
              <p className="text-sm leading-6 text-red-700 dark:text-red-300">
                {detail.failureReason}
              </p>
            )}
          </dl>

          <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/50">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Total
            </p>
            <p className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
              {formatBDT(detail.amount)}
            </p>
          </div>
        </div>
      ) : null}
    </Dialog>
  );
}
