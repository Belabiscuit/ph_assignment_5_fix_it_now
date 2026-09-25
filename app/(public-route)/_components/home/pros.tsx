import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { TechnicianListItem } from "@/lib/types";
import type { HomePro } from "./data";
import { bdt } from "./data";
import { SectionHeading } from "./section-heading";
import { getAllTechnician } from "../../_actions/getAllTechnician";

function toHomePro(t: TechnicianListItem): HomePro {
  const name = t.user.name;
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return {
    name,
    initials,
    skill: t.skills[0] ?? "Technician",
    area: t.location ?? "Dhaka",
    bio: t.bio ?? "Background-checked and rated by the people who hired them.",
    rating: t.avgRating ?? 0,
    reviews: t.totalReviews ?? 0,
    experienceYrs: t.experienceYrs ?? 0,
    hourlyRate: Number(t.hourlyRate) || 0,
    verified: t.isVerified,
  };
}

export async function Pros() {
  const technicians = await getAllTechnician();
  const list = (technicians.data?.data ?? []).map(toHomePro);

  return (
    <section id="pros" className="scroll-mt-20 border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="// Pros worth knowing"
          title="Vetted, rated, ready."
          sub="Every FixItNow technician is background-checked and rated by the people who actually hired them."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {list.map((pro: HomePro) => (
            <Card
              key={pro.name}
              className="flex flex-col rounded-3xl border-border bg-background p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.4)] transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_50px_-28px_rgba(15,118,110,0.32)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary font-display text-base font-bold text-primary-foreground shadow-md shadow-primary/20">
                  {pro.initials}
                </span>
                <Badge className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                  {"✓"} verified
                </Badge>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                {pro.name}
              </h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {`${pro.skill} · ${pro.area}`}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {pro.bio}
              </p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="font-medium text-amber-700 dark:text-amber-300">
                  {"★"} {pro.rating} ({pro.reviews})
                </span>
                <span>{pro.experienceYrs} yrs</span>
                <span className="font-bold text-primary">
                  {bdt(pro.hourlyRate)}/hr
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
