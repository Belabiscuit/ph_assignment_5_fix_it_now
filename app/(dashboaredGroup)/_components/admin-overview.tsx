import Link from "next/link";
import type {
  AdminBookingListItem,
  AdminCategoryListItem,
  AdminUserListItem,
  BookingStatus,
  PaginationMeta,
} from "@/lib/types";
import { formatBDT, formatDateTime } from "@/lib/utils";
import { ACTIVE_STATUSES } from "@/lib/booking-status";
import { StatCard } from "./stat-card";
import { BookingStatusBadge } from "./booking-status-badge";

const QUICK_LINKS = [
  {
    href: "/admin-dashboard/users",
    label: "Users",
    hint: "search · filter · ban",
  },
  {
    href: "/admin-dashboard/bookings",
    label: "Bookings",
    hint: "every booking, every technician",
  },
  {
    href: "/admin-dashboard/categories",
    label: "Categories",
    hint: "the service directory",
  },
];

// Revenue is computed from bookings because the API exposes no admin
// payments route: sum priceAtBooking where the status implies the
// customer paid (PAID → IN_PROGRESS → COMPLETED).
const PAID_STATUSES: BookingStatus[] = ["PAID", "IN_PROGRESS", "COMPLETED"];

function countStatus(bookings: AdminBookingListItem[], statuses: BookingStatus[]): number {
  return bookings.filter((b) => statuses.includes(b.status)).length;
}

export function AdminOverview({
  users,
  bookings,
  categories,
}: {
  users: { data: AdminUserListItem[]; meta: PaginationMeta };
  bookings: { data: AdminBookingListItem[]; meta: PaginationMeta };
  categories: AdminCategoryListItem[];
}) {
  const technicians = users.data.filter((u) => u.role === "TECHNICIAN").length;
  const banned = users.data.filter((u) => u.status === "BANNED").length;
  const activeBookings = countStatus(bookings.data, ACTIVE_STATUSES);
  const completedBookings = countStatus(bookings.data, ["COMPLETED"]);
  const revenue = bookings.data.reduce((sum, b) => {
    if (!PAID_STATUSES.includes(b.status)) return sum;
    const amount = Number(b.priceAtBooking);
    return sum + (Number.isFinite(amount) ? amount : 0);
  }, 0);

  const recent = [...bookings.data]
    .sort(
      (a, b) =>
        new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-8 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Admin overview
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Platform overview
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          A clear view of people, bookings and revenue across the platform.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total users"
          value={users.meta.total}
          hint={`${technicians} technician${technicians === 1 ? "" : "s"} · ${banned} banned · ${categories.length} categor${categories.length === 1 ? "y" : "ies"}`}
        />
        <StatCard
          label="Total bookings"
          value={bookings.meta.total}
          hint={`${activeBookings} active right now`}
        />
        <StatCard
          label="Completed"
          value={completedBookings}
          hint="done & delivered"
        />
        <StatCard
          label="Revenue"
          value={formatBDT(revenue)}
          hint="paid bookings · calculated from paid bookings"
        />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color,background-color,transform] hover:border-teal-300 hover:bg-teal-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-700 dark:hover:bg-teal-950/30 dark:focus-visible:ring-offset-slate-950"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
              {link.label}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {link.hint}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition-colors group-hover:text-teal-900 dark:text-teal-300 dark:group-hover:text-teal-100">
              Open <span aria-hidden="true">→</span>
            </p>
          </Link>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              Recent bookings
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              The five most recent bookings across the platform.
            </p>
          </div>
          <Link
            href="/admin-dashboard/bookings"
            className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-950"
          >
            View all
          </Link>
        </div>

        {recent.length > 0 ? (
          <ul className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
            {recent.map((b) => (
              <li
                key={b.id}
                className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] font-bold text-slate-950 dark:text-slate-50">
                    Booking · {b.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="mt-1 break-words text-sm text-slate-600 dark:text-slate-300">
                    {b.customer?.name ?? "Customer"} ·{" "}
                    {b.technician?.user?.name ?? "Technician"} ·{" "}
                    {formatDateTime(b.scheduledAt)}
                  </p>
                </div>
                <span className="font-display text-sm font-bold text-slate-950 dark:text-slate-50 sm:text-right">
                  {formatBDT(b.priceAtBooking)}
                </span>
                <BookingStatusBadge status={b.status} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
            No bookings yet.
          </p>
        )}
      </section>
    </div>
  );
}
