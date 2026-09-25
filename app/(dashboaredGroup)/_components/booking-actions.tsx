"use client";

import { useSyncExternalStore, useState, useTransition } from "react";
import { toast } from "sonner";
import type { BookingListItem } from "@/lib/types";
import { CancelBookingDialog } from "./cancel-booking-dialog";
import { ReviewDialog } from "./review-dialog";
import { createPayment } from "../_actions/createPayment";

const primaryBtn =
  "inline-flex items-center justify-center rounded-xl bg-teal-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-950";
const dangerBtn =
  "inline-flex items-center justify-center rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-sm font-semibold text-amber-900 transition-colors hover:border-amber-400 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/70 dark:focus-visible:ring-offset-slate-950";
const reviewedBtn =
  "inline-flex items-center justify-center rounded-xl border border-teal-200 bg-teal-50 px-3.5 py-2 text-sm font-semibold text-teal-800 transition-colors disabled:cursor-default disabled:opacity-80 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-200";

const REVIEWED_KEY = "fixitnow-reviewed-bookings";
const listeners = new Set<() => void>();

function readReviewedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(REVIEWED_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function subscribeReviewed(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function persistReviewed(id: string) {
  try {
    const ids = readReviewedIds();
    ids.add(id);
    localStorage.setItem(REVIEWED_KEY, JSON.stringify([...ids]));
  } catch {
    // storage unavailable — the store still updates for this session
  }
  for (const cb of listeners) cb();
}

export function BookingActions({ booking }: { booking: BookingListItem }) {
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewSession, setReviewSession] = useState(0);
  const [pendingPayment, startPayment] = useTransition();
  const { status, payment } = booking;
  const isConfirming = payment?.status === "PENDING";

  const locallyReviewed = useSyncExternalStore(
    subscribeReviewed,
    () => readReviewedIds().has(booking.id),
    () => false
  );
  const hasReview = locallyReviewed || booking.review != null;

  function openReview() {
    setReviewSession((s) => s + 1);
    setReviewOpen(true);
  }

  function handlePay() {
    startPayment(async () => {
      const res = await createPayment(booking.id);
      if (res.success && res.data?.paymentURL) {
        window.location.href = res.data.paymentURL;
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {status === "ACCEPTED" && (
          <button
            type="button"
            className={primaryBtn}
            onClick={handlePay}
            disabled={pendingPayment || isConfirming}
          >
            {isConfirming
              ? "Confirming…"
              : pendingPayment
                ? "Opening checkout…"
                : "Pay now"}
          </button>
        )}

        {(status === "REQUESTED" ||
          status === "ACCEPTED" ||
          status === "PAID") && (
          <button
            type="button"
            className={dangerBtn}
            onClick={() => setCancelOpen(true)}
          >
            Cancel
          </button>
        )}

        {status === "COMPLETED" && !hasReview && (
          <button
            type="button"
            className={primaryBtn}
            onClick={openReview}
          >
            Leave review
          </button>
        )}

        {status === "COMPLETED" && hasReview && (
          <button type="button" className={reviewedBtn} disabled>
            Reviewed
          </button>
        )}
      </div>

      <CancelBookingDialog
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        bookingId={booking.id}
        serviceTitle={booking.service?.title ?? "this booking"}
      />

      <ReviewDialog
        key={reviewSession}
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onReviewed={() => persistReviewed(booking.id)}
        booking={booking}
      />
    </>
  );
}
