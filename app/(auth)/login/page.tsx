import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in — FixItNow",
};

type LoginSearchParams = Promise<{ next?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: LoginSearchParams;
}) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "";

  return (
    <section className="grid min-h-[80dvh] bg-background md:grid-cols-2">
      <div className="relative isolate flex items-center overflow-hidden bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-14">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="hero-grid absolute inset-0 opacity-20" />
          <div className="absolute -left-24 top-12 size-80 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 size-80 rounded-full bg-amber-400/15 blur-3xl" />
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <p className="inline-flex rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">
            {"// FixItNow · member sign-in"}
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl">
            Welcome back.
          </h1>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-slate-300">
            Your bookings and account are waiting. Sign in to continue.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-slate-200">
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
              Vetted pros
            </li>
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
              Fixed prices
            </li>
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
              Booked in 2 min
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center bg-muted/40 px-6 py-14 sm:px-10 sm:py-16">
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_65px_-36px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-4 border-b border-border bg-teal-50/70 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-800 sm:px-6 dark:bg-teal-950/30 dark:text-teal-200">
            <span>{"// Member sign-in"}</span>
            <span aria-hidden>{"○"} Account access</span>
          </div>

          <LoginForm redirectTo={next} />

          <div className="border-t border-border bg-muted/30 px-5 py-4 sm:px-6 dark:bg-slate-900/30">
            <p className="text-xs text-muted-foreground">
              New to FixItNow?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary underline-offset-4 transition hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
