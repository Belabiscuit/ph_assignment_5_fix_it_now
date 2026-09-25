import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LiveCounter } from "./live-counter";
import { TicketStub } from "./ticket-stub";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="absolute -left-24 top-8 size-72 rounded-full bg-teal-100/70 blur-3xl dark:bg-teal-950/40" />
        <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-amber-100/70 blur-3xl dark:bg-amber-950/30" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-800 dark:border-teal-900 dark:bg-teal-950/60 dark:text-teal-200">
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            {"// Home services · Dhaka · BDT"}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Something broken?
            <br />
            <span className="text-primary">Get it fixed now.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Vetted technicians for plumbing, electrics, AC and more — booked in
            minutes, priced in taka before anyone picks up a tool.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-primary px-6 font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90"
            >
              <Link href="/services">Browse services</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-slate-300 bg-card px-6 font-semibold text-foreground shadow-sm hover:border-teal-300 hover:bg-teal-50 hover:text-foreground dark:border-slate-700 dark:bg-card dark:hover:border-teal-700 dark:hover:bg-teal-950/30"
            >
              <Link href="#pros">Book a technician</Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
            <li className="rounded-full border border-border bg-card/90 px-3 py-2 shadow-sm backdrop-blur">
              Vetted pros
            </li>
            <li className="rounded-full border border-border bg-card/90 px-3 py-2 shadow-sm backdrop-blur">
              Fixed prices
            </li>
            <li className="rounded-full border border-border bg-card/90 px-3 py-2 shadow-sm backdrop-blur">
              Booked in 2 minutes
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-teal-200/50 via-transparent to-amber-200/60 blur-2xl dark:from-teal-900/30 dark:to-amber-900/20"
          />
          <div
            aria-hidden
            className="absolute -inset-2 rounded-[2rem] border border-primary/10"
          />
          <article className="animate-rise-in relative grid grid-cols-[2.75rem_1fr] overflow-hidden rounded-3xl border border-border bg-card/95 text-card-foreground shadow-[0_24px_70px_-28px_rgba(15,23,42,0.38)] backdrop-blur dark:shadow-[0_24px_70px_-20px_rgba(0,0,0,0.65)]">
            <TicketStub
              top="FixItNow"
              bottom="FIN-0742"
              width="w-11"
              hole="h-1 w-5"
            />
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Service request
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold leading-tight text-foreground">
                    AC unit won&apos;t cool
                  </h2>
                </div>
                <span className="animate-settle-in shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                  Done &#10003;
                </span>
              </div>

              <dl className="mt-5 grid grid-cols-[5rem_1fr] gap-y-3 text-sm">
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Technician
                </dt>
                <dd className="font-medium text-foreground">
                  {"Rafiq Uddin · Electronics"}
                </dd>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Time
                </dt>
                <dd className="font-medium text-foreground">
                  {"Today · 4:00 PM"}
                </dd>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Area
                </dt>
                <dd className="font-medium text-foreground">Mirpur 10, Dhaka</dd>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Price
                </dt>
                <dd className="font-display text-2xl font-bold text-primary">
                  {"৳"}450
                </dd>
              </dl>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>Requested</span>
                  <span aria-hidden>&#8594;</span>
                  <span>Accepted</span>
                  <span aria-hidden>&#8594;</span>
                  <span>Paid</span>
                  <span aria-hidden>&#8594;</span>
                  <span className="text-amber-700 dark:text-amber-300">Done</span>
                </div>
              </div>
            </div>
          </article>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            <LiveCounter /> jobs fixed across Dhaka today
          </p>
        </div>
      </div>
    </section>
  );
}
