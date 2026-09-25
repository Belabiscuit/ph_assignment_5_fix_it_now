import Link from "next/link";
import type { Category, ServiceListItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ServiceCard, toServiceCard, type ServiceCardData } from "./service-card";

interface ServicesBoardProps {
  services: ServiceListItem[];
  total: number;
  totalPages: number;
  currentPage: number;
  search: string;
  category: string;
  categories: Category[];
}

function makeHref(params: { search?: string; category?: string; page?: number }) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);
  if (params.page && params.page > 1) query.set("page", String(params.page));
  const qs = query.toString();
  return qs ? `/services?${qs}` : "/services";
}

export function ServicesBoard({
  services,
  total,
  totalPages,
  currentPage,
  search,
  category,
  categories,
}: ServicesBoardProps) {
  const list = services.map(toServiceCard);
  const hasFilters = Boolean(search || category);
  const tabs = [
    { name: "All", value: "" },
    ...categories.map((c) => ({ name: c.name, value: c.name })),
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border bg-card">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="hero-grid absolute inset-0 opacity-70" />
          <div className="absolute -right-24 -top-28 size-96 rounded-full bg-teal-100/70 blur-3xl dark:bg-teal-950/40" />
          <div className="absolute -bottom-36 left-1/4 size-80 rounded-full bg-amber-100/60 blur-3xl dark:bg-amber-950/25" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-800 dark:border-teal-900 dark:bg-teal-950/50 dark:text-teal-200">
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            {"// Service library · all services"}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Every service, one clear booking.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Fixed prices in taka, set before anyone picks up a tool. Request a
            service, pick a slot, and a vetted professional takes it from there.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="rounded-3xl border border-border bg-card p-4 shadow-[0_20px_55px_-34px_rgba(15,23,42,0.38)] sm:p-5">
          <form
            action="/services"
            method="get"
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            {category && <input type="hidden" name="category" value={category} />}
            <label
              htmlFor="services-search"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Find
            </label>
            <input
              id="services-search"
              name="search"
              type="search"
              defaultValue={search}
              placeholder="AC cooling, leak, wiring…"
              className="h-12 min-w-0 flex-1 rounded-xl border border-input bg-background px-4 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
            />
            <button
              type="submit"
              className="h-12 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
            >
              Go
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Category
            </span>
            {tabs.map((tab) => {
              const active = category === tab.value;
              const href = makeHref({
                search,
                category: tab.value || undefined,
              });
              return (
                <Link
                  key={tab.value || "all"}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "border-border bg-background text-slate-600 hover:border-primary/30 hover:bg-teal-50 hover:text-teal-900 dark:text-slate-300 dark:hover:bg-teal-950/30 dark:hover:text-teal-100"
                  )}
                >
                  {tab.name}
                </Link>
              );
            })}
            {hasFilters && (
              <Link
                href="/services"
                className="ml-auto rounded-full border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-800 transition hover:border-amber-300 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/40 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/70"
              >
                clear filters
              </Link>
            )}
          </div>
        </div>

        <div className="mt-7">
          <p className="text-xs font-medium text-muted-foreground">
            {"// "}
            {list.length} of {total} services
            {category && <> · {category}</>}
            {search && <> · “{search}”</>}
          </p>
        </div>

        {list.length > 0 ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((service: ServiceCardData) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
           <div className="mt-5 rounded-3xl border border-border bg-card p-12 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              No services match
            </p>
            <p className="mt-2 font-display text-xl font-bold text-foreground">
              “{search || category || "that"}”.
            </p>
            <Link
              href="/services"
              className="mt-5 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
            >
              clear filters
            </Link>
          </div>
        )}

        {totalPages > 1 && (
          <nav
            className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs font-medium"
            aria-label="Pagination"
          >
            {currentPage > 1 ? (
              <Link
                href={makeHref({ search, category, page: currentPage - 1 })}
                className="rounded-xl border border-border bg-card px-4 py-2.5 text-foreground shadow-sm transition hover:border-primary/30 hover:bg-teal-50 dark:hover:bg-teal-950/30"
              >
                {"‹"} Prev
              </Link>
            ) : (
              <span className="rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-muted-foreground/50">
                {"‹"} Prev
              </span>
            )}
            <span className="px-4 py-2.5 text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages ? (
              <Link
                href={makeHref({ search, category, page: currentPage + 1 })}
                className="rounded-xl border border-border bg-card px-4 py-2.5 text-foreground shadow-sm transition hover:border-primary/30 hover:bg-teal-50 dark:hover:bg-teal-950/30"
              >
                Next {"›"}
              </Link>
            ) : (
              <span className="rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-muted-foreground/50">
                Next {"›"}
              </span>
            )}
          </nav>
        )}
      </div>
    </>
  );
}
