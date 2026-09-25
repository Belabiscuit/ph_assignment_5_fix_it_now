import type { PaymentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<PaymentStatus, string> = {
  PENDING:
    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200",
  COMPLETED:
    "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-900 dark:bg-teal-950/50 dark:text-teal-200",
  FAILED:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200",
  REFUNDED:
    "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
        statusStyles[status]
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}
