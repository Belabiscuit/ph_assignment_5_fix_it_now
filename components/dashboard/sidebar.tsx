"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import type { User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { navByRole, sectionLabel } from "./nav";

export function Sidebar({
  role,
  user,
  mobileOpen,
  onClose,
}: {
  role: string;
  user?: User;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const links = navByRole[role] ?? navByRole.CUSTOMER;
  const initial = user?.name?.trim().charAt(0).toUpperCase() ?? role.charAt(0);

  async function handleLogout() {
    await logout();
    toast.success("Logged out");
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        aria-label="Dashboard navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-border bg-card text-card-foreground shadow-xl transition-transform duration-200 ease-out",
          "lg:sticky lg:top-0 lg:z-0 lg:h-dvh lg:max-w-none lg:translate-x-0 lg:shadow-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full min-h-0 flex-col">
          <div className="border-b border-border px-5 py-5">
            <Link
              href="/"
              onClick={onClose}
              className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-sm">
                &#10003;
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-widest text-primary">
                  Service platform
                </span>
                <span className="mt-0.5 block text-xl font-bold tracking-tight text-foreground">
                  FixItNow
                </span>
              </span>
            </Link>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
            <p className="px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {sectionLabel[role] ?? "Manage"}
            </p>
            <div className="mt-3 space-y-1.5">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                      active
                        ? "border-primary/10 bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full transition-colors",
                        active
                          ? "bg-primary"
                          : "bg-border group-hover:bg-primary/50",
                      )}
                    />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-border bg-muted/20 p-4">
            <div className="flex items-center gap-3 px-1">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
                {initial}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {user?.name ?? "Loading…"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {role.toLowerCase()}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              Log out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
