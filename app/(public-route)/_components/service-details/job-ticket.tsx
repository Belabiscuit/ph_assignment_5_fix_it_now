import type { ServiceDetails } from "@/lib/types";
import { formatBDT } from "@/lib/utils";
import { BookServiceButton } from "./book-service-button";

export function JobTicket({
  service,
  serial,
}: {
  service: ServiceDetails;
  serial: string;
}) {
  const category = service.category?.name ?? "Service";
  const area = service.technician?.location ?? "Dhaka";
  const jobs = service._count?.bookings ?? 0;

  return (
    <article className="animate-rise-in grid overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_65px_-34px_rgba(15,23,42,0.42)] sm:grid-cols-[3.5rem_1fr]">
      <aside className="relative hidden border-r border-teal-100 bg-teal-50/80 sm:block dark:border-teal-900 dark:bg-teal-950/40">
        <span className="absolute left-1/2 top-4 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-800 [writing-mode:vertical-rl] dark:text-teal-200">
          {serial}
        </span>
        <span className="absolute left-1/2 top-1/2 h-10 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/35" />
        <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-sm" />
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-800 [writing-mode:vertical-rl] dark:text-teal-200">
          fixed price
        </span>
      </aside>

      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:hidden">
          <span>{serial}</span>
          <span className="text-primary">{formatBDT(service.price)}</span>
        </div>

        <p className="mt-5 inline-flex w-fit rounded-full bg-teal-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-800 sm:mt-0 dark:bg-teal-950/50 dark:text-teal-200">
          {"// "}
          {category}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl">
          {service.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        <dl className="mt-7 grid gap-3 border-t border-border pt-5 sm:grid-cols-3">
          <div className="rounded-2xl bg-muted/70 p-4 dark:bg-slate-900/60">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Duration
            </dt>
            <dd className="mt-1 font-display text-xl font-bold tabular-nums text-foreground">
              {service.durationMins} min
            </dd>
          </div>
          <div className="rounded-2xl bg-muted/70 p-4 dark:bg-slate-900/60">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Service area
            </dt>
            <dd className="mt-1 font-display text-xl font-bold text-foreground">
              {area}
            </dd>
          </div>
          <div className="rounded-2xl bg-muted/70 p-4 dark:bg-slate-900/60">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Jobs completed
            </dt>
            <dd className="mt-1 font-display text-xl font-bold tabular-nums text-foreground">
              {jobs}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Fixed price
            </p>
            <p className="mt-1 font-display text-4xl font-bold tabular-nums text-primary">
              {formatBDT(service.price)}
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              set before the work starts
            </p>
          </div>
          <BookServiceButton
            serviceId={service.id}
            title={service.title}
            price={service.price}
            durationMins={service.durationMins}
            location={service.technician?.location ?? null}
            serial={serial}
          />
        </div>
      </div>
    </article>
  );
}
