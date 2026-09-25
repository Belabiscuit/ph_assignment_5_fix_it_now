import type { BookingStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<BookingStatus, string> = {
  REQUESTED:
    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200",
  ACCEPTED:
    "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-900 dark:bg-teal-950/50 dark:text-teal-200",
  DECLINED:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200",
  PAID:
    "border-teal-300 bg-teal-100 text-teal-900 dark:border-teal-800 dark:bg-teal-950/60 dark:text-teal-200",
  IN_PROGRESS:
    "border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-200",
  COMPLETED:
    "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-900 dark:bg-teal-950/50 dark:text-teal-200",
  CANCELLED:
    "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
        statusStyles[status]
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {status.replace("_", " ")}
    </span>
  );
}
