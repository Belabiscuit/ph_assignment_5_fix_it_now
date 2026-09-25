import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: [
      { href: "#services", label: "Plumbing" },
      { href: "#services", label: "Electrical" },
      { href: "#services", label: "AC & Cooling" },
      { href: "#services", label: "Cleaning" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "#how", label: "How it works" },
      { href: "#pros", label: "Technicians" },
      { href: "/login", label: "Log in" },
      { href: "/register", label: "Join as a technician" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:gap-16 lg:px-8 lg:py-14">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            aria-label="FixItNow — back to home"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold leading-none text-primary-foreground shadow-sm">
              {"\u2713"}
            </span>
            <span className="text-lg font-bold tracking-tight">FixItNow</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Home services across Dhaka. Vetted pros, fixed prices in taka,
            booked in minutes.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent-foreground/10 bg-accent/60 px-3 py-1.5 text-xs font-medium text-accent-foreground">
            <span className="size-1.5 rounded-full bg-amber-500" aria-hidden />
            {"Open today \u00b7 8:00 AM \u2013 9:00 PM"}
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block rounded-md text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <span>{"\u00a9"} 2026 FixItNow</span>
          <span>Made for the homes of Dhaka</span>
          <span>Prices in BDT</span>
        </div>
      </div>
    </footer>
  );
}
