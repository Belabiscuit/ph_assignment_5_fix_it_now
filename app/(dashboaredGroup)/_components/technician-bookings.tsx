"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { BookingListItem, UpdateBookingStatusRequest } from "@/lib/types";
import { formatBDT, formatDateTime } from "@/lib/utils";
import { nextActionsForBooking } from "@/lib/booking-status";
import { BookingStatusBadge } from "./booking-status-badge";
import { EmptyState } from "./empty-state";
import { updateBookingStatus } from "../_actions/updateBookingStatus";

const primaryBtn =
  "inline-flex items-center justify-center rounded-xl bg-teal-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-950";
const dangerBtn =
  "inline-flex items-center justify-center rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-sm font-semibold text-amber-900 transition-colors hover:border-amber-400 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/70 dark:focus-visible:ring-offset-slate-950";

export function TechnicianBookings({
  initialBookings,
}: {
  initialBookings: BookingListItem[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [bookings, setBookings] = useState(initialBookings);
  const [pendingId, setPendingId] = useState<string | null>(null);

  function handleAction(booking: BookingListItem, next: UpdateBookingStatusRequest) {
    const previous = booking.status;

    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, status: next } : b))
    );
    setPendingId(booking.id);

    startTransition(async () => {
      const res = await updateBookingStatus(booking.id, next);

      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        setBookings((prev) =>
          prev.map((b) => (b.id === booking.id ? { ...b, status: previous } : b))
        );
        toast.error(res.message);
      }
      setPendingId(null);
    });
  }

  return (
    <div className="space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Technician dashboard · incoming bookings
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Bookings
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          {bookings.length} booking{bookings.length === 1 ? "" : "s"} assigned to you.
        </p>
      </header>

      {bookings.length > 0 ? (
        <ul className="grid gap-4 xl:grid-cols-2">
          {bookings.map((b) => {
            const actions = nextActionsForBooking(b.status, "TECHNICIAN");
            const busy = pendingId === b.id;

            return (
              <li
                key={b.id}
                className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    <span aria-hidden="true" className="size-2 rounded-full bg-amber-400" />
                    Booking · {b.id.slice(0, 8).toUpperCase()}
                  </p>
                  <BookingStatusBadge status={b.status} />
                </div>

                <div className="grid flex-1 gap-5 px-5 py-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-bold text-slate-950 dark:text-slate-50">
                      {b.service?.title ?? "Service"}
                    </p>
                    {b.customer && (
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {b.customer.name}
                        {b.customer.phone ? ` · ${b.customer.phone}` : ""}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {formatDateTime(b.scheduledAt)}
                    </p>
                    {b.address && (
                      <p className="mt-1 break-words text-sm text-slate-500 dark:text-slate-400">
                        {b.address}
                      </p>
                    )}
                    {b.notes && (
                      <p className="mt-1 break-words text-sm italic text-slate-500 dark:text-slate-400">
                        “{b.notes}”
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 lg:min-w-40 lg:items-end lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                    <span className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">
                      {formatBDT(b.priceAtBooking)}
                    </span>
                    {actions.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        {actions.map((action) => (
                          <button
                            key={action.status}
                            type="button"
                            disabled={pendingId !== null}
                            onClick={() => handleAction(b, action.status)}
                            className={action.kind === "danger" ? dangerBtn : primaryBtn}
                          >
                            {busy ? "Working…" : action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState
          title="No bookings yet."
          description="When a customer books one of your services, the booking lands here for you to accept."
          actionHref="/technician-dashboard/services"
          actionLabel="Manage services"
        />
      )}
    </div>
  );
}
