"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { BookingListItem } from "@/lib/types";
import { getMyBookings } from "../_actions/getMyBookings";

const POLL_INTERVAL_MS = 2000;
const MAX_ATTEMPTS = 5;

export function PaymentConfirmWatcher({
  bookings,
}: {
  bookings: BookingListItem[];
}) {
  const router = useRouter();
  const hasPending = bookings.some((b) => b.payment?.status === "PENDING");

  useEffect(() => {
    if (!hasPending) return;

    let attempts = 0;

    const timer = setInterval(async () => {
      attempts += 1;

      let fresh: BookingListItem[] | null = null;
      try {
        fresh = await getMyBookings();
      } catch {
        // transient error — keep polling until max attempts
      }

      const stillPending =
        fresh === null || fresh.some((b) => b.payment?.status === "PENDING");

      if (!stillPending) {
        clearInterval(timer);
        toast.success("Payment confirmed — your booking is now PAID.");
        router.refresh();
        return;
      }

      if (attempts >= MAX_ATTEMPTS) {
        clearInterval(timer);
        toast.info(
          "Payment is still confirming — check your dashboard shortly."
        );
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [hasPending, router]);

  if (!hasPending) return null;

  return (
    <div
      className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30"
      role="status"
      aria-live="polite"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800 dark:text-amber-200">
        Payment confirming…
      </p>
      <p className="mt-1 text-sm leading-6 text-amber-900/80 dark:text-amber-100/80">
        Stripe is confirming one of your bookings. This page refreshes
        automatically once it goes through.
      </p>
    </div>
  );
}
