import Link from "next/link";
import type {
  BookingListItem,
  BookingStatus,
  PaymentListItem,
  User,
} from "@/lib/types";
import { formatBDT, formatDate } from "@/lib/utils";
import { StatCard } from "./stat-card";
import { BookingStatusBadge } from "./booking-status-badge";
import { EmptyState } from "./empty-state";

const ACTIVE_STATUSES: BookingStatus[] = [
  "REQUESTED",
  "ACCEPTED",
  "PAID",
  "IN_PROGRESS",
];

export function DashboardOverview({
  user,
  bookings,
  payments,
}: {
  user: User;
  bookings: BookingListItem[];
  payments: PaymentListItem[];
}) {
  const firstName = user.name?.trim().split(/\s+/)[0] ?? "there";
  const totalSpent = payments.reduce((sum, payment) => {
    const amount = Number(payment.amount);
    return sum + (Number.isFinite(amount) ? amount : 0);
  }, 0);
  const activeCount = bookings.filter((b) =>
    ACTIVE_STATUSES.includes(b.status)
  ).length;
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;

  const recent = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
    )
    .slice(0, 4);

  return (
    <div className="space-y-8 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Customer dashboard
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Good to see you, {firstName}.
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Here&apos;s a clear view of your bookings and payments.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total bookings"
          value={bookings.length}
          hint={`${activeCount} active right now`}
        />
        <StatCard
          label="Active jobs"
          value={activeCount}
          hint="requested → in progress"
        />
        <StatCard
          label="Completed"
          value={completedCount}
          hint="done and ready to review"
        />
        <StatCard
          label="Total spent"
          value={formatBDT(totalSpent)}
          hint={`${payments.length} payment${payments.length === 1 ? "" : "s"}`}
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              Recent bookings
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Your four most recent bookings.
            </p>
          </div>
          <Link
            href="/dashboard/bookings"
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
                className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[15px] font-bold text-slate-950 dark:text-slate-50">
                    {b.service?.title ?? "Service"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {b.technician?.user?.name ?? "Technician"} ·{" "}
                    {formatDate(b.scheduledAt)}
                  </p>
                </div>
                <span className="font-display text-sm font-bold text-slate-950 dark:text-slate-50">
                  {formatBDT(b.priceAtBooking)}
                </span>
                <BookingStatusBadge status={b.status} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5">
            <EmptyState
              title="No bookings yet."
              description="Browse available services to get started with your first booking."
              actionHref="/services"
              actionLabel="Browse services"
            />
          </div>
        )}
      </section>
    </div>
  );
}
