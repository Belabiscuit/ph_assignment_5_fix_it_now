"use client";

import { useState } from "react";
import type {
  AdminBookingListItem,
  BookingStatus,
  PaginationMeta,
} from "@/lib/types";
import { formatBDT, formatDateTime } from "@/lib/utils";
import { Pagination } from "./pagination";
import { BookingStatusBadge } from "./booking-status-badge";
import { BookingDetailDialog } from "./booking-detail-dialog";
import { EmptyState } from "./empty-state";

const BOOKING_STATUSES: BookingStatus[] = [
  "REQUESTED",
  "ACCEPTED",
  "DECLINED",
  "PAID",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

const selectCls =
  "h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 shadow-sm transition-colors focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-teal-400 dark:focus:ring-teal-400/15";

function makeHref(
  search: string,
  status?: string,
  fromDate?: string,
  toDate?: string,
  page?: number
) {
  const q = new URLSearchParams();
  if (search) q.set("search", search);
  if (status) q.set("status", status);
  if (fromDate) q.set("fromDate", fromDate);
  if (toDate) q.set("toDate", toDate);
  if (page && page > 1) q.set("page", String(page));
  const qs = q.toString();
  return qs ? `/admin-dashboard/bookings?${qs}` : "/admin-dashboard/bookings";
}

export function AdminBookingsBoard({
  bookings,
  meta,
  search,
  status,
  fromDate,
  toDate,
}: {
  bookings: AdminBookingListItem[];
  meta: PaginationMeta;
  search: string;
  status?: BookingStatus;
  fromDate?: string;
  toDate?: string;
}) {
  const [detailId, setDetailId] = useState<string | null>(null);
  const detailBooking = bookings.find((b) => b.id === detailId) ?? null;
  const hasFilters = Boolean(search || status || fromDate || toDate);

  return (
    <div className="space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Admin overview · bookings
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Bookings
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Every booking on the platform, across every technician.
        </p>
      </header>

      <form
        action="/admin-dashboard/bookings"
        method="get"
        className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2 sm:p-5 lg:flex lg:flex-wrap lg:items-end"
      >
        <div className="min-w-0 sm:col-span-2 lg:min-w-[15rem] lg:flex-1">
          <label
            htmlFor="admin-bookings-search"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300"
          >
            Find
          </label>
          <input
            id="admin-bookings-search"
            name="search"
            type="search"
            defaultValue={search}
            placeholder="Customer or technician name…"
            className="mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-950 shadow-sm transition-colors placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/15"
          />
        </div>
        <div className="min-w-0">
          <label
            htmlFor="admin-bookings-status"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300"
          >
            Status
          </label>
          <select
            id="admin-bookings-status"
            name="status"
            defaultValue={status ?? ""}
            className={`mt-1.5 ${selectCls}`}
          >
            <option value="">Any status</option>
            {BOOKING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-0">
          <label
            htmlFor="admin-bookings-from"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300"
          >
            From
          </label>
          <input
            id="admin-bookings-from"
            name="fromDate"
            type="date"
            defaultValue={fromDate ?? ""}
            className={`mt-1.5 ${selectCls}`}
          />
        </div>
        <div className="min-w-0">
          <label
            htmlFor="admin-bookings-to"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300"
          >
            To
          </label>
          <input
            id="admin-bookings-to"
            name="toDate"
            type="date"
            defaultValue={toDate ?? ""}
            className={`mt-1.5 ${selectCls}`}
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-950"
        >
          Apply
        </button>
        {hasFilters && (
          <a
            href="/admin-dashboard/bookings"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
          >
            Clear
          </a>
        )}
      </form>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        {meta.total} booking{meta.total === 1 ? "" : "s"} available
        {status && <> · {status.replace("_", " ")}</>}
      </p>

      {bookings.length > 0 ? (
        <ul className="grid gap-4 xl:grid-cols-2">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <p className="flex min-w-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-amber-400" />
                  <span className="truncate">Booking · {b.id.slice(0, 8).toUpperCase()}</span>
                </p>
                <BookingStatusBadge status={b.status} />
              </div>

              <div className="grid flex-1 gap-5 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-bold text-slate-950 dark:text-slate-50">
                    {b.customer?.name ?? "Customer"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {b.technician?.user?.name ?? "Technician"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {formatDateTime(b.scheduledAt)}
                  </p>
                  {b.address && (
                    <p className="mt-1 break-words text-sm text-slate-500 dark:text-slate-400">
                      {b.address}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:min-w-32 sm:items-end sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                  <span className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">
                    {formatBDT(b.priceAtBooking)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setDetailId(b.id)}
                    className="inline-flex h-9 items-center justify-center rounded-xl bg-teal-700 px-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-950"
                  >
                    Details
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No bookings match."
          description="Try a different status, date range, or clear the filters."
          actionHref="/admin-dashboard/bookings"
          actionLabel="Clear filters"
        />
      )}

      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        makeHref={(page) => makeHref(search, status, fromDate, toDate, page)}
      />

      <BookingDetailDialog
        bookingId={detailId}
        customerName={detailBooking?.customer?.name ?? null}
        open={detailId !== null}
        onClose={() => setDetailId(null)}
      />
    </div>
  );
}
