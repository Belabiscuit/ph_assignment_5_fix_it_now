import Link from "next/link";
import type { BookingListItem, BookingStatus, TechnicianListItem, User } from "@/lib/types";
import { formatBDT, formatDate } from "@/lib/utils";
import { ACTIVE_STATUSES } from "@/lib/booking-status";
import { StatCard } from "./stat-card";
import { BookingStatusBadge } from "./booking-status-badge";
import { EmptyState } from "./empty-state";

const QUICK_LINKS = [
  { href: "/technician-dashboard/profile", label: "Profile", hint: "bio · rate · skills" },
  { href: "/technician-dashboard/availability", label: "Availability", hint: "weekly schedule" },
  { href: "/technician-dashboard/services", label: "Services", hint: "what you offer" },
  { href: "/technician-dashboard/bookings", label: "Bookings", hint: "accept · start · complete" },
];

function countStatus(bookings: BookingListItem[], statuses: BookingStatus[]): number {
  return bookings.filter((b) => statuses.includes(b.status)).length;
}

export function TechnicianOverview({
  user,
  technician,
  bookings,
}: {
  user: User;
  technician: TechnicianListItem | null;
  bookings: BookingListItem[];
}) {
  const firstName = user.name?.trim().split(/\s+/)[0] ?? "there";
  const pending = countStatus(bookings, ["REQUESTED"]);
  const active = countStatus(bookings, ACTIVE_STATUSES);
  const completed = countStatus(bookings, ["COMPLETED"]);
  const earned = bookings.reduce((sum, b) => {
    if (b.status !== "COMPLETED") return sum;
    const amount = Number(b.priceAtBooking);
    return sum + (Number.isFinite(amount) ? amount : 0);
  }, 0);
  const serviceCount = technician?._count?.services ?? technician?.services?.length ?? 0;

  const recent = [...bookings]
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-8 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Technician dashboard · overview
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Good to see you, {firstName}.
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Your jobs, earnings and open requests at a glance.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total jobs"
          value={bookings.length}
          hint={`${serviceCount} service${serviceCount === 1 ? "" : "s"} in your service library`}
        />
        <StatCard
          label="Pending requests"
          value={pending}
          hint="awaiting your accept or decline"
        />
        <StatCard
          label="Active jobs"
          value={active}
          hint="accepted → in progress"
        />
        <StatCard
          label="Earned"
          value={formatBDT(earned)}
          hint={`${completed} completed job${completed === 1 ? "" : "s"}`}
        />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-700 dark:hover:bg-teal-950/30 dark:focus-visible:ring-offset-slate-950"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
              {link.label}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{link.hint}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition-colors group-hover:text-teal-900 dark:text-teal-300 dark:group-hover:text-teal-100">
              Open <span aria-hidden="true">→</span>
            </p>
          </Link>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="size-2 rounded-full bg-amber-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
                Recent bookings
              </p>
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Your four most recent bookings.
            </p>
          </div>
          <Link
            href="/technician-dashboard/bookings"
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
                    {b.service?.title ?? "Service"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {b.customer?.name ?? "Customer"} · {formatDate(b.scheduledAt)}
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
          <div className="mt-5">
            <EmptyState
              title="No bookings yet."
              description="Once customers book your services, bookings show up here with their latest status."
              actionHref="/technician-dashboard/services"
              actionLabel="Add a service"
            />
          </div>
        )}
      </section>
    </div>
  );
}
