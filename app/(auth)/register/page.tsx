import type { Metadata } from "next";
import RegisterForm from "../_components/RegisterForm";

export const metadata: Metadata = {
  title: "Create an account — FixItNow",
};

export default function RegisterPage() {
  return (
    <section className="grid min-h-[80dvh] bg-background lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative isolate flex items-center overflow-hidden bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-14">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="hero-grid absolute inset-0 opacity-20" />
          <div className="absolute -left-24 bottom-8 size-80 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="absolute -right-20 top-0 size-80 rounded-full bg-amber-400/15 blur-3xl" />
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <p className="inline-flex rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">
            {"// FixItNow · account setup"}
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl">
            Create your account.
          </h1>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-slate-300">
            Whether you need a fix at home or want to get hired, it starts with
            one account. Pick your role — the form on the right changes to match.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-slate-200">
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
              Vetted pros
            </li>
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
              Fixed prices in taka
            </li>
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
              Booked in minutes
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center bg-muted/40 px-6 py-14 sm:px-10 sm:py-16">
        <RegisterForm />
      </div>
    </section>
  );
}
