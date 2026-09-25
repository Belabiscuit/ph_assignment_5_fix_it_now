"use client";

import { useState } from "react";
import type {
  AdminUserListItem,
  PaginationMeta,
  Role,
  UserStatus,
} from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Pagination } from "./pagination";
import { UserStatusStamp } from "./user-status-stamp";
import { BanUserDialog } from "./ban-user-dialog";
import { EmptyState } from "./empty-state";

const labelCls =
  "text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300";
const fieldCls =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-950 shadow-sm transition-colors placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/15";
const selectCls =
  "mt-1.5 h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 shadow-sm transition-colors focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-teal-400 dark:focus:ring-teal-400/15";

const ROSTER_COLS =
  "lg:grid-cols-[minmax(3.5rem,0.4fr)_minmax(0,2.5fr)_minmax(0,1.4fr)_minmax(0,1.6fr)_auto_auto_auto]";

function makeHref(search: string, role?: string, status?: string, page?: number) {
  const q = new URLSearchParams();
  if (search) q.set("search", search);
  if (role) q.set("role", role);
  if (status) q.set("status", status);
  if (page && page > 1) q.set("page", String(page));
  const qs = q.toString();
  return qs ? `/admin-dashboard/users?${qs}` : "/admin-dashboard/users";
}

function FilterTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-200">
      {children}
    </span>
  );
}

export function UsersBoard({
  users,
  meta,
  error,
  search,
  role,
  status,
}: {
  users: AdminUserListItem[];
  meta: PaginationMeta;
  error?: string | null;
  search: string;
  role?: Role;
  status?: UserStatus;
}) {
  const [banTarget, setBanTarget] = useState<AdminUserListItem | null>(null);
  const hasFilters = Boolean(search || role || status);

  return (
    <div className="space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Admin overview · people
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Users
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Every account — customers and technicians, service stats included. Ban to
          lock an account.
        </p>
      </header>

      <form
        action="/admin-dashboard/users"
        method="get"
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-end">
          <div className="min-w-0 sm:col-span-2 lg:min-w-[16rem] lg:flex-1">
            <label htmlFor="admin-users-search" className={labelCls}>
              Find
            </label>
            <input
              id="admin-users-search"
              name="search"
              type="search"
              defaultValue={search}
              placeholder="Name or email…"
              className={fieldCls}
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="admin-users-role" className={labelCls}>
              Role
            </label>
            <select
              id="admin-users-role"
              name="role"
              defaultValue={role ?? ""}
              className={selectCls}
            >
              <option value="">All roles</option>
              <option value="CUSTOMER">Customer</option>
              <option value="TECHNICIAN">Technician</option>
            </select>
          </div>
          <div className="min-w-0">
            <label htmlFor="admin-users-status" className={labelCls}>
              Status
            </label>
            <select
              id="admin-users-status"
              name="status"
              defaultValue={status ?? ""}
              className={selectCls}
            >
              <option value="">Any status</option>
              <option value="ACTIVE">Active</option>
              <option value="BANNED">Banned</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-950"
          >
            Apply
          </button>
          {hasFilters && (
            <a
              href="/admin-dashboard/users"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
            >
              Clear
            </a>
          )}
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        {!error && (
          <span>
            {meta.total} account{meta.total === 1 ? "" : "s"}
          </span>
        )}
        {search && <FilterTag>find “{search}”</FilterTag>}
        {role && <FilterTag>role {role}</FilterTag>}
        {status && <FilterTag>status {status}</FilterTag>}
      </div>

      {error ? (
        <div
          className="rounded-2xl border border-red-200 bg-red-50/70 p-6 dark:border-red-900 dark:bg-red-950/30"
          role="alert"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-700 dark:text-red-200">
            Users unavailable
          </p>
          <p className="mt-2 text-sm font-medium text-red-950 dark:text-red-100">
            {error}
          </p>
          <p className="mt-1 text-sm leading-6 text-red-800 dark:text-red-200">
               The user list could not be loaded. If you just logged in, refresh the
               page — this usually means the admin session token was rejected or
               expired.
          </p>
        </div>
      ) : users.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div
            className={`hidden gap-x-4 border-b border-slate-200 bg-slate-50 px-5 py-3 lg:grid ${ROSTER_COLS} dark:border-slate-800 dark:bg-slate-950/40`}
          >
            {[
               "Reference",
              "Person",
              "Contact",
              "Address",
              "Role",
              "Status",
              "Action",
            ].map((label) => (
              <span
                key={label}
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
              >
                {label}
              </span>
            ))}
          </div>

          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((user) => {
              const initial =
                user.name?.trim().charAt(0).toUpperCase() ?? user.role.charAt(0);

              return (
                <li
                  key={user.id}
                  className={`grid items-start gap-x-4 gap-y-3 px-4 py-4 transition-colors hover:bg-slate-50 sm:px-5 lg:items-center dark:hover:bg-slate-800/40 ${ROSTER_COLS}`}
                >
                  <span
                    className="hidden text-[11px] font-medium text-slate-500 lg:col-start-1 lg:block dark:text-slate-400"
                    title={user.id}
                  >
                    #{user.id.slice(0, 6).toUpperCase()}
                  </span>

                  <div className="flex min-w-0 items-center gap-3 lg:col-start-2">
                    {user.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.avatarUrl}
                        alt=""
                        className="size-10 shrink-0 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                      />
                    ) : (
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-teal-200 bg-teal-50 font-display text-sm font-bold text-teal-800 ring-4 ring-teal-50 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-200 dark:ring-teal-950/60">
                        {initial}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-display text-[15px] font-bold text-slate-950 dark:text-slate-50 lg:text-base">
                        {user.name}
                      </p>
                      <p className="truncate text-sm text-slate-600 dark:text-slate-300">
                        {user.email}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        Avatar {user.avatarUrl ?? "—"}
                      </p>
                    </div>
                  </div>

                  <div className="min-w-0 text-sm lg:col-start-3">
                    <p className="truncate text-slate-950 dark:text-slate-50">
                      {user.phone || "—"}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user.updatedAt ? `Updated ${formatDate(user.updatedAt)}` : "—"}
                    </p>
                  </div>

                  <div className="min-w-0 text-sm lg:col-start-4">
                    <p className="break-words text-slate-950 dark:text-slate-50">
                      {user.address || "No address listed"}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      User ID {user.id}
                    </p>
                  </div>

                  <span className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 lg:col-start-5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {user.role}
                  </span>

                  <div className="min-w-0 text-sm lg:col-start-6 lg:hidden">
                    <p className="truncate text-slate-950 dark:text-slate-50">
                      Created {formatDate(user.createdAt)}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      Updated {formatDate(user.updatedAt)}
                    </p>
                  </div>

                  <div className="min-w-0 text-sm lg:col-start-6">
                    <UserStatusStamp status={user.status} />
                  </div>

                  <div className="col-span-full flex justify-end lg:col-span-1 lg:col-start-7 lg:justify-start">
                    <button
                      type="button"
                      onClick={() => setBanTarget(user)}
                      className={
                        user.status === "ACTIVE"
                          ? "inline-flex w-fit items-center justify-center rounded-xl border border-red-200 bg-white px-3.5 py-2 text-sm font-semibold text-red-700 shadow-sm transition-colors hover:border-red-300 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 dark:border-red-900 dark:bg-slate-900 dark:text-red-200 dark:hover:border-red-800 dark:hover:bg-red-950/40 dark:focus-visible:ring-red-400 dark:focus-visible:ring-offset-slate-950"
                          : "inline-flex w-fit items-center justify-center rounded-xl border border-teal-200 bg-white px-3.5 py-2 text-sm font-semibold text-teal-800 shadow-sm transition-colors hover:border-teal-300 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 dark:border-teal-800 dark:bg-slate-900 dark:text-teal-200 dark:hover:border-teal-700 dark:hover:bg-teal-950/40 dark:focus-visible:ring-teal-400 dark:focus-visible:ring-offset-slate-950"
                      }
                    >
                      {user.status === "ACTIVE" ? "Ban" : "Unban"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <EmptyState
          title="No accounts match."
          description="No accounts match that search. Try another name, role, or status."
          actionHref="/admin-dashboard/users"
          actionLabel="Clear filters"
        />
      )}

      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        makeHref={(page) => makeHref(search, role, status, page)}
      />

      {banTarget && (
        <BanUserDialog
          user={banTarget}
          open={true}
          onClose={() => setBanTarget(null)}
        />
      )}
    </div>
  );
}
