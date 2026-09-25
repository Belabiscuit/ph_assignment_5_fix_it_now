import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-14 text-center text-white shadow-[0_28px_80px_-32px_rgba(15,23,42,0.65)] sm:px-10 sm:py-20 dark:border dark:border-border dark:bg-card dark:text-foreground">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-24 size-72 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="absolute -bottom-28 -right-16 size-80 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="hero-grid absolute inset-0 opacity-20" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            {"// Join FixItNow"}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Are you the fix?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-300 dark:text-muted-foreground">
            Technicians: publish your services and let the neighbourhood book you
            in. Free to join, paid on every completed job.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            >
              <Link href="/register">Become a technician</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-slate-600 bg-slate-900/60 px-6 font-semibold text-white shadow-sm hover:border-teal-400 hover:bg-teal-950/40 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              <Link href="#services">Browse services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
