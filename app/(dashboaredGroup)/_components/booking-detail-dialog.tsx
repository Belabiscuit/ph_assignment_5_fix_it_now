"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import type { BookingListItem } from "@/lib/types";
import { formatBDT, formatDateTime } from "@/lib/utils";
import { BookingStatusBadge } from "./booking-status-badge";
import { getAdminBookingDetail } from "../_actions/getAdminBookingDetail";

export function BookingDetailDialog({
  bookingId,
  customerName,
  open,
  onClose,
}: {
  bookingId: string | null;
  customerName: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<BookingListItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !bookingId) return;
    let cancelled = false;

    getAdminBookingDetail(bookingId)
      .then((data) => {
        if (!cancelled) {
          setDetail(data);
          setError(null);
          setLoadedFor(bookingId);
        }
      })
      .catch((e: Error) => {
        if (!cancelled) {
          setError(e.message || "Couldn\u2019t load this booking.");
          setLoadedFor(bookingId);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, bookingId]);

  const loading = open && !!bookingId && loadedFor !== bookingId;

  return (
    <Dialog open={open} onClose={onClose} title="Booking detail">
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : loading ? (
        <div
          className="space-y-3 animate-pulse"
          role="status"
          aria-label="Loading booking details"
          aria-busy="true"
        >
          <div className="h-4 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-64 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-52 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      ) : detail ? (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Booking · {detail.id.slice(0, 8).toUpperCase()}
            </p>
            <BookingStatusBadge status={detail.status} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
              Service
            </p>
            <p className="font-display text-lg font-bold text-slate-950 dark:text-slate-50">
              {detail.service?.title ?? "—"}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {detail.service?.description}
            </p>
          </div>

          <dl className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900/60">
            <div className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Customer
              </dt>
              <dd className="min-w-0 break-words text-sm text-slate-700 dark:text-slate-200 sm:text-right">
                {customerName ?? "—"}
              </dd>
            </div>
            <div className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Technician
              </dt>
              <dd className="min-w-0 break-words text-sm text-slate-700 dark:text-slate-200 sm:text-right">
                {detail.technician?.user?.name ?? "—"}
              </dd>
            </div>
            <div className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Scheduled
              </dt>
              <dd className="min-w-0 break-words text-sm text-slate-700 dark:text-slate-200 sm:text-right">
                {formatDateTime(detail.scheduledAt)}
              </dd>
            </div>
            <div className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Price
              </dt>
              <dd className="font-display font-bold text-slate-950 dark:text-slate-50 sm:text-right">
                {formatBDT(detail.priceAtBooking)}
              </dd>
            </div>
          </dl>

          {detail.address && (
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Address · {detail.address}
            </p>
          )}
          {detail.notes && (
            <p className="text-sm italic leading-6 text-slate-500 dark:text-slate-400">
              “{detail.notes}”
            </p>
          )}
          {detail.cancelReason && (
            <p className="text-sm text-red-700 dark:text-red-300">
              Cancelled: {detail.cancelReason}
            </p>
          )}
          {detail.payment && (
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Payment · {detail.payment.status.toLowerCase()}
            </p>
          )}
        </div>
      ) : null}
    </Dialog>
  );
}
