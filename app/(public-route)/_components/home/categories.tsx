import Link from "next/link";
import { Card } from "@/components/ui/card";
import { tickerItems } from "./data";
import { SectionHeading } from "./section-heading";
import { getAllCategory } from "../../_actions/getAllCategory";
import { Category } from "@/lib/types";

function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="border-y border-teal-100 bg-teal-50/80 dark:border-teal-900 dark:bg-teal-950/30">
      <div className="marquee-mask">
        <div className="animate-marquee flex w-max items-center py-3">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-8 pr-8 text-xs font-semibold uppercase tracking-[0.2em] text-teal-800 dark:text-teal-200"
            >
              {item}
              <span className="size-1.5 rounded-full bg-amber-400" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function Categories() {
  const categories = await getAllCategory();
  const allCategories = categories.data.data;

  return (
    <section id="categories" className="scroll-mt-20 bg-card">
      <Ticker />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="// What needs fixing"
          title="Pick your problem."
          sub="Say what's wrong in plain words — we'll match you to a vetted pro who's done it a hundred times."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {allCategories.map((category: Category) => (
            <Card
              key={category.id}
              className="group rounded-3xl border-border bg-background p-3 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_22px_45px_-24px_rgba(15,118,110,0.28)] dark:hover:border-primary/50"
            >
              <Link
                href="/services"
                className="flex h-full w-full items-center gap-4 rounded-2xl p-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                aria-label={`${category.name} services`}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-md shadow-primary/20">
                  {category.name.charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-base font-bold text-foreground">
                    {category.name}
                  </span>
                  <span className="mt-0.5 block line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {category.description}
                  </span>
                </span>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
