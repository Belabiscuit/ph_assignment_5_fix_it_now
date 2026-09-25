"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AdminCategoryListItem } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { createCategory } from "../_actions/createCategory";
import { EmptyState } from "./empty-state";

const labelCls =
  "text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300";
const inputCls =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm transition-colors placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/15";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function AdminCategoriesBoard({
  categories,
}: {
  categories: AdminCategoryListItem[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      const res = await createCategory({
        name: name.trim(),
        description: description.trim() || undefined,
      });

      if (res.success) {
        toast.success(res.message);
        setName("");
        setDescription("");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <div className="space-y-6 rounded-3xl bg-slate-50/80 p-5 dark:bg-slate-950/60 sm:p-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
          Admin overview · service directory
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Categories
        </h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          The service directory technicians list their work under.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
            Categories listed · {categories.length}
          </p>

          {categories.length > 0 ? (
            <ul className="mt-4 grid gap-4">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate font-display text-lg font-bold text-slate-950 dark:text-slate-50">
                        {category.name}
                      </p>
                      {category.description && (
                        <p className="mt-1 break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {category.description}
                        </p>
                      )}
                      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                        {category._count?.services ?? 0} service
                        {(category._count?.services ?? 0) === 1 ? "" : "s"} ·
                        added {formatDate(category.createdAt)}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
                        category.isActive
                          ? "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-900 dark:bg-teal-950/50 dark:text-teal-200"
                          : "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200"
                      )}
                    >
                      <span
                        className="size-1.5 rounded-full bg-current"
                        aria-hidden
                      />
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4">
              <EmptyState
                title="No categories yet."
                description="Add the first category on the right."
                actionHref="/admin-dashboard/categories"
                actionLabel="Add a category"
              />
            </div>
          )}
        </section>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24 lg:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
            Add a category
          </p>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <Field label="Name" htmlFor="cat-name">
              <input
                id="cat-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                className={inputCls}
                placeholder="Gardening"
              />
            </Field>
            <Field label="Description" htmlFor="cat-desc">
              <textarea
                id="cat-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={cn(inputCls, "resize-y")}
                placeholder="Garden maintenance and landscaping…"
              />
            </Field>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex w-full items-center justify-center rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500 dark:focus-visible:ring-offset-slate-950"
            >
              {pending ? "Adding…" : "Add category"}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
