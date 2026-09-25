"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerAction } from "../_actions/authAction";
import type { Role } from "@/lib/types";
import { Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

const slipInputClass =
  "w-full rounded-xl border border-input bg-muted/50 px-4 py-3 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 dark:bg-slate-900/60";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground";

const roleOptions = [
  {
    value: "CUSTOMER",
    label: "Customer",
    note: "I need a fix at home",
  },
  {
    value: "TECHNICIAN",
    label: "Technician",
    note: "I want to get hired",
  },
] as const;

export default function RegisterForm() {
  const [role, setRole] = useState<Role>("CUSTOMER");
  const [state, formAction, pending] = useActionState(registerAction, {
    success: false,
    message: null,
  });

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_65px_-36px_rgba(15,23,42,0.45)]">
      <div className="flex items-center justify-between gap-4 border-b border-border bg-teal-50/70 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-800 sm:px-6 dark:bg-teal-950/30 dark:text-teal-200">
        <span>{"// Account details"}</span>
        <span aria-hidden>{"\u25cb"} Account setup</span>
      </div>

      <form action={formAction} className="px-5 py-7 sm:px-6">
        <input type="hidden" name="role" value={role} />

        <fieldset className="border-0 p-0">
          <legend className={labelClass}>Account type</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="group" aria-label="Account type">
            {roleOptions.map((option) => {
              const active = role === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRole(option.value)}
                  className={cn(
                    "flex flex-col gap-1 rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "border-border bg-background text-foreground hover:border-primary/30 hover:bg-teal-50 dark:hover:bg-teal-950/25"
                  )}
                >
                  <span className="flex w-full items-center justify-between gap-2 font-display text-sm font-bold uppercase tracking-wide">
                    {option.label}
                    <span
                      aria-hidden
                      className={cn(
                        "font-display text-xs font-bold",
                        active ? "text-amber-200" : "text-muted-foreground/50"
                      )}
                    >
                      {active ? "\u2713" : "\u25CB"}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "font-sans text-[10px] uppercase tracking-wider",
                      active
                        ? "text-white/75"
                        : "text-muted-foreground"
                    )}
                  >
                    {option.note}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name" className={labelClass}>
              Full name
            </Label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              placeholder="e.g. Rahim Uddin"
              className={inputClass}
            />
          </div>
          <div>
            <Label htmlFor="email" className={labelClass}>
              Email
            </Label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
          <div>
            <Label htmlFor="phone" className={labelClass}>
              Phone
            </Label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="+8801711XXXXXX"
              className={inputClass}
            />
          </div>
          <div>
            <Label htmlFor="password" className={labelClass}>
              Password
            </Label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={1}
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="address" className={labelClass}>
              Address
              <span className="normal-case tracking-normal text-muted-foreground/60">
                {" "}
                \u00b7 optional
              </span>
            </Label>
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="street-address"
              placeholder="Area, city \u2014 e.g. Dhanmondi, Dhaka"
              className={inputClass}
            />
          </div>
        </div>

        {role === "TECHNICIAN" && (
          <div className="animate-rise-in">
            <div className="overflow-hidden rounded-2xl border border-border bg-muted/40 dark:bg-slate-900/50">
              <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span>{"// Professional details"}</span>
                <span aria-hidden>{"\u25cf"} Profile</span>
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="bio" className={labelClass}>
                    Bio
                  </Label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    placeholder="What you do and how long you've done it"
                    className={cn(slipInputClass, "min-h-20 resize-y")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="skills" className={labelClass}>
                    Skills
                  </Label>
                  <input
                    id="skills"
                    name="skills"
                    type="text"
                    placeholder="Comma separated \u2014 e.g. plumbing, pipe fitting"
                    className={slipInputClass}
                  />
                </div>
                <div>
                  <Label htmlFor="hourlyRate" className={labelClass}>
                    Hourly rate (BDT)
                  </Label>
                  <input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    min={0}
                    step="any"
                    inputMode="decimal"
                    placeholder="e.g. 500"
                    className={slipInputClass}
                  />
                </div>
                <div>
                  <Label htmlFor="experienceYrs" className={labelClass}>
                    Years of experience
                  </Label>
                  <input
                    id="experienceYrs"
                    name="experienceYrs"
                    type="number"
                    min={0}
                    step={1}
                    inputMode="numeric"
                    placeholder="e.g. 5"
                    className={slipInputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="location" className={labelClass}>
                    Service area
                  </Label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g. Mirpur"
                    className={slipInputClass}
                  />
                  <p className="mt-1.5 text-[10px] font-medium leading-relaxed text-muted-foreground">
                    Bookings must contain this text in their address
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {state.message && (
          <p
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/70 dark:bg-red-950/30"
          >
            <span
              aria-hidden
              className="text-sm font-bold text-red-600 dark:text-red-300"
            >
              {"\u2717"}
            </span>
            <span className="text-sm leading-relaxed text-red-900 dark:text-red-100">
              {state.message}
            </span>
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 disabled:pointer-events-none disabled:opacity-60"
        >
          {pending && (
            <span
              aria-hidden
              className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          )}
          {pending ? "Creating account\u2026" : "Create account"}
        </button>
      </form>

      <div className="border-t border-border bg-muted/30 px-5 py-4 sm:px-6 dark:bg-slate-900/30">
        <p className="text-xs text-muted-foreground">
          Already a member?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary underline-offset-4 transition hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}