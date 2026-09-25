import type { BookingListItem } from "@/lib/types";
import { formatBDT, formatDateTime } from "@/lib/utils";
import { BookingStatusBadge } from "./booking-status-badge";
import { BookingActions } from "./booking-actions";
import { EmptyState } from "./empty-state";

export function BookingsList({ bookings }: { bookings: BookingListItem[] }) {
  return (
    <div className="space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Your bookings
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Bookings
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          {bookings.length} booking{bookings.length === 1 ? "" : "s"} in your account.
        </p>
      </header>

      {bookings.length > 0 ? (
        <ul className="grid gap-4 xl:grid-cols-2">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Booking · {b.id.slice(0, 8).toUpperCase()}
                </p>
                <BookingStatusBadge status={b.status} />
              </div>

              <div className="grid flex-1 gap-5 px-5 py-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-bold text-slate-950 dark:text-slate-50">
                    {b.service?.title ?? "Service"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {b.technician?.user?.name ?? "Technician"}
                    {b.technician?.location
                      ? ` · ${b.technician.location}`
                      : ""}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {formatDateTime(b.scheduledAt)}
                  </p>
                  {b.address && (
                    <p className="mt-1 break-words text-sm text-slate-500 dark:text-slate-400">
                      {b.address}
                    </p>
                  )}
                  {b.notes && (
                    <p className="mt-1 text-sm italic text-slate-500 dark:text-slate-400">
                      “{b.notes}”
                    </p>
                  )}
                  {b.status === "CANCELLED" && b.cancelReason && (
                    <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                      Cancelled: {b.cancelReason}
                    </p>
                  )}
                  {b.payment && (
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      Payment · {b.payment.status.toLowerCase()}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 lg:min-w-40 lg:items-end lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <span className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">
                    {formatBDT(b.priceAtBooking)}
                  </span>
                  <BookingActions booking={b} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No bookings yet."
          description="Once you book a service, it will appear here with its latest status."
          actionHref="/services"
          actionLabel="Browse services"
        />
      )}
    </div>
  );
}
