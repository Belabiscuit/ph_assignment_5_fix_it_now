import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ServiceListItem } from "@/lib/types";
import { bdt } from "../home/data";
import { TicketStub } from "../home/ticket-stub";

export interface ServiceCardData {
  serial: string;
  id: string;
  category: string;
  title: string;
  description: string;
  durationMins: number;
  price: number;
  technician: string;
  rating: number;
  reviews: number;
  area: string;
}

export function toServiceCard(
  s: ServiceListItem,
  index: number
): ServiceCardData {
  return {
    serial: `FIN-${1042 + index}`,
    id: s.id,
    category: s.category?.name ?? "Service",
    title: s.title,
    description: s.description,
    durationMins: s.durationMins,
    price: Number(s.price) || 0,
    technician: s.technician?.user.name ?? "Technician",
    rating: s.technician?.avgRating ?? 0,
    reviews: s.technician?.totalReviews ?? 0,
    area: s.technician?.location ?? "Dhaka",
  };
}

export function ServiceCard({ service }: { service: ServiceCardData }) {
  return (
    <article className="group flex overflow-hidden rounded-3xl border border-border bg-card shadow-[0_18px_45px_-30px_rgba(15,23,42,0.4)] transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_52px_-28px_rgba(15,118,110,0.34)]">
      <TicketStub top={service.serial} bottom={bdt(service.price)} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950/50 dark:text-teal-200">
            {service.category}
          </span>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            {service.durationMins} min
          </span>
        </div>
        <h3 className="mt-4 font-display text-lg font-bold leading-snug text-foreground">
          {service.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3 border-t border-border pt-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground">
                {service.technician}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {"★"} {service.rating} ({service.reviews})
                {" · "}
                {service.area}
              </p>
            </div>
            <span className="shrink-0 font-display text-xl font-bold tabular-nums text-primary">
              {bdt(service.price)}
            </span>
          </div>
          <Button
            asChild
            className="mt-4 block w-full rounded-xl bg-primary px-4 py-2.5 text-center font-semibold text-primary-foreground shadow-md shadow-primary/15 group-hover:bg-primary/90"
          >
            <Link href={`/services/${service.id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
