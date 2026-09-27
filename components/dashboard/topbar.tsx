"use client";

import { usePathname } from "next/navigation";
import type { User } from "@/lib/types";
import { formatTodayBadge } from "@/lib/utils";
import { breadcrumb, sectionTitle } from "./nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function Topbar({
  role,
  user,
  onMenu,
}: {
  role: string;
  user?: User;
  onMenu: () => void;
}) {
  const pathname = usePathname();

  const today = formatTodayBadge();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 text-foreground shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open navigation"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M2 4h12M2 8h12M2 12h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="hidden text-[11px] font-semibold uppercase tracking-widest text-primary sm:block">
            {breadcrumb(pathname)}
          </span>
          <h1 className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {sectionTitle(pathname)}
          </h1>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="hidden text-xs font-medium text-muted-foreground lg:inline">
            {today}
          </span>
          <span className="hidden h-5 w-px bg-border lg:block" />
          <div className="hidden items-center gap-2.5 md:flex">
            <span className="max-w-36 truncate text-sm font-medium text-foreground">
              {user?.name ?? "…"}
            </span>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/15">
              {user?.name?.trim().charAt(0).toUpperCase() ?? role.charAt(0)}
            </span>
          </div>
          <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
            {role}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
