"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { ApiClientError, apiFetch, getToken } from "@/lib/api-client";
import type { User } from "@/lib/types";
import { formatBDT } from "@/lib/utils";
import {
  createBooking,
  type CreateBookingResult,
} from "../../_actions/createBooking";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground";

function minDate(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function loginHref(serviceId: string): string {
  return `/login?next=${encodeURIComponent(`/services/${serviceId}`)}`;
}

export function BookServiceButton({
  serviceId,
  title,
  price,
  durationMins,
  location,
  serial,
}: {
  serviceId: string;
  title: string;
  price: string;
  durationMins: number;
  location: string | null;
  serial: string;
}) {
  const router = useRouter();
  const { user, status, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleOpen() {
    if (!getToken() || status === "unauthenticated") {
      router.push(loginHref(serviceId));
      return;
    }
    touched.current = false;
    setAddress(user?.address ?? "");
    setError(null);
    setOpen(true);
    setLoadingProfile(true);
    try {
      const me = await apiFetch<User>("/api/auth/me");
      if (!touched.current) {
        setAddress(me.address ?? "");
      }
    } catch (err) {
      if (err instanceof ApiClientError && err.status === 401) {
        setOpen(false);
        router.push(loginHref(serviceId));
      }
    } finally {
      setLoadingProfile(false);
    }
  }

  function handleClose() {
    setOpen(false);
    setError(null);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!date || !time) {
      setError("Pick a date and time for the visit.");
      return;
    }

    const scheduledAt = new Date(`${date}T${time}`);
    if (scheduledAt.getTime() <= Date.now()) {
      setError("That time has already passed — pick one in the future.");
      return;
    }

    const trimmedAddress = address.trim();
    if (!trimmedAddress) {
      setError("Add the address where the work happens.");
      return;
    }

    if (
      location &&
      !trimmedAddress.toLowerCase().includes(location.toLowerCase())
    ) {
      setError(
        `The technician only works in ${location} — your address must include it.`,
      );
      return;
    }

    startTransition(async () => {
      let res: CreateBookingResult | undefined;
      try {
        res = await createBooking({
          serviceId,
          scheduledAt: scheduledAt.toISOString(),
          address: trimmedAddress,
          notes: notes.trim() || undefined,
        });
      } catch {
        return;
      }
      if (!res) return;
      if (res.statusCode === 401) {
        setOpen(false);
        await logout();
        toast.error(res.message);
        router.push(loginHref(serviceId));
        return;
      }
      setError(res.message);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
      >
        Book this job <span aria-hidden>{"\u2192"}</span>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={`Book ${title}`}
          >
            <div
              className="my-auto w-full max-w-lg animate-rise-in overflow-hidden rounded-3xl border border-border bg-card shadow-[0_28px_80px_-24px_rgba(15,23,42,0.6)] dark:shadow-[0_28px_80px_-20px_rgba(0,0,0,0.75)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-border bg-slate-950 px-5 py-3 text-white sm:px-6 dark:bg-slate-900">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200 dark:text-slate-300">
                  {"// Book this job \u00b7 "}
                  {serial}
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close booking form"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg text-white transition hover:border-teal-300 hover:bg-teal-500/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/30"
                >
                  {"\u00d7"}
                </button>
              </div>

              <div className="flex items-baseline justify-between gap-4 border-b border-border bg-muted/50 px-5 py-4 sm:px-6 dark:bg-slate-900/50">
                <div className="min-w-0">
                  <h2 className="truncate font-display text-2xl font-bold tracking-tight text-foreground">
                    {title}
                  </h2>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {durationMins} min
                    {location ? ` · ${location}` : ""}
                  </p>
                </div>
                <p className="shrink-0 font-display text-2xl font-bold tabular-nums text-primary">
                  {formatBDT(price)}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5 px-5 py-6 sm:px-6"
              >
                <div>
                  <p className={labelClass}>Schedule the visit</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="book-date" className="sr-only">
                        Date
                      </label>
                      <input
                        id="book-date"
                        type="date"
                        min={minDate()}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="book-time" className="sr-only">
                        Time
                      </label>
                      <input
                        id="book-time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                  <p className="mt-1.5 text-[10px] font-medium leading-relaxed text-muted-foreground">
                    Slots must be in the future — same-day times still count.
                  </p>
                </div>

                <div>
                  <label htmlFor="book-address" className={labelClass}>
                    Address
                  </label>
                  <input
                    id="book-address"
                    type="text"
                    autoComplete="street-address"
                    value={address}
                    onChange={(e) => {
                      touched.current = true;
                      setAddress(e.target.value);
                    }}
                    placeholder="House, road, area"
                    className={inputClass}
                    required
                  />
                  {loadingProfile ? (
                    <p className="mt-1.5 text-[10px] font-medium leading-relaxed text-muted-foreground">
                      Pulling your saved address…
                    </p>
                  ) : (
                    location && (
                      <p className="mt-1.5 text-[10px] font-medium leading-relaxed text-muted-foreground">
                        Must include “{location}” — the technician only works
                        there.
                      </p>
                    )
                  )}
                </div>

                <div>
                  <label htmlFor="book-notes" className={labelClass}>
                    Notes{" "}
                    <span className="normal-case tracking-normal text-muted-foreground/70">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="book-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Door code, parking, anything the technician should know…"
                    className={inputClass}
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-100"
                  >
                    <span
                      aria-hidden
                      className="text-sm font-bold text-red-600 dark:text-red-300"
                    >
                      {"\u2717"}
                    </span>
                    <span>{error}</span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pending || loadingProfile}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 disabled:pointer-events-none disabled:opacity-60"
                >
                  {pending ? (
                    <>
                      <span
                        aria-hidden
                        className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                      />
                      Booking…
                    </>
                  ) : loadingProfile ? (
                    "Checking your account…"
                  ) : (
                    "Book this job"
                  )}
                </button>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
