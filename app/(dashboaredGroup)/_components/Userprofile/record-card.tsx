import { Check, Star } from "lucide-react";
import type { User } from "@/lib/types";
import { cn } from "@/lib/utils";

function fmtDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function FieldRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-4 last:border-b-0 dark:border-slate-800 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="w-full text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:w-36">
        {label}
      </dt>
      <dd
        className={cn(
          "min-w-0 break-words text-sm text-slate-700 dark:text-slate-200",
          mono && "text-[13px] font-medium tabular-nums tracking-tight"
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function WorkshopFile({ user }: { user: User }) {
  const profile = user.technicianProfile;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-6 py-4 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Technician profile
        </p>
        {profile?.isVerified ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-200">
            <Check className="size-3" aria-hidden />
            Verified
          </span>
        ) : (
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Not verified
          </span>
        )}
      </div>

      <div className="px-6 py-6">
        {profile?.bio && (
          <p className="max-w-prose text-sm leading-6 text-slate-700 dark:text-slate-200">
            {profile.bio}
          </p>
        )}

        {profile && profile.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-800 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-200"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {profile && (
          <>
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 sm:grid-cols-4">
              <div className="bg-white px-4 py-3 dark:bg-slate-900">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Hourly rate
                </dt>
                <dd className="mt-1 font-display text-lg font-bold text-slate-950 dark:text-slate-50">
                  ৳{profile.hourlyRate}/hr
                </dd>
              </div>
              <div className="bg-white px-4 py-3 dark:bg-slate-900">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Experience
                </dt>
                <dd className="mt-1 font-display text-lg font-bold text-slate-950 dark:text-slate-50">
                  {profile.experienceYrs} yrs
                </dd>
              </div>
              <div className="bg-white px-4 py-3 dark:bg-slate-900">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Rating
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 font-display text-lg font-bold text-slate-950 dark:text-slate-50">
                  <Star className="size-4 fill-amber-400 text-amber-500" aria-hidden />
                  {profile.avgRating ? profile.avgRating.toFixed(1) : "—"}
                </dd>
              </div>
              <div className="bg-white px-4 py-3 dark:bg-slate-900">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Reviews
                </dt>
                <dd className="mt-1 font-display text-lg font-bold text-slate-950 dark:text-slate-50">
                  {profile.totalReviews}
                </dd>
              </div>
            </dl>

            {profile.location && (
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Base · {profile.location}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function RecordCard({ user }: { user: User }) {
  const initial =
    user.name?.trim().charAt(0).toUpperCase() ?? user.role.charAt(0);
  const fileNo = user.id.slice(0, 8).toUpperCase();
  const active = user.status === "ACTIVE";

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Account overview
        </p>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Your account details and service history.
        </p>
      </header>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <span
          aria-hidden
          className="absolute left-4 top-4 size-2 rounded-full bg-amber-400"
        />

        <div className="flex flex-col gap-2 border-b border-slate-100 px-6 py-4 pl-10 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
            Account details
          </p>
          <p
            className="text-xs font-medium text-slate-500 dark:text-slate-400"
            title={user.id}
          >
            Reference · {fileNo}
          </p>
        </div>

        <div className="flex flex-col gap-6 border-b border-slate-100 px-6 py-7 dark:border-slate-800 sm:flex-row sm:items-center sm:gap-8">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatarUrl}
              alt=""
              className="size-24 shrink-0 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
            />
          ) : (
            <span
              aria-hidden
              className="flex size-24 shrink-0 items-center justify-center rounded-full bg-teal-100 font-display text-4xl font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-100"
            >
              {initial}
            </span>
          )}
          <div className="min-w-0">
            <h2 className="truncate font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
              {user.name}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-200">
                {user.role}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    active ? "bg-teal-500" : "bg-slate-400"
                  )}
                  aria-hidden
                />
                {user.status.toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        <dl className="px-6 py-2">
          <FieldRow label="Email" value={user.email} mono />
          <FieldRow label="Phone" value={user.phone || "—"} mono />
          <FieldRow label="Address" value={user.address || "No address listed"} />
          <FieldRow label="Member since" value={fmtDate(user.createdAt)} mono />
          <FieldRow label="Account reference" value={fileNo} mono />
        </dl>
      </div>

      {user.technicianProfile && <WorkshopFile user={user} />}
    </section>
  );
}
