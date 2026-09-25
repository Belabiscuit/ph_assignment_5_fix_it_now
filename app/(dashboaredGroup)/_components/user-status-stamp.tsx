import type { UserStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function UserStatusStamp({ status }: { status: UserStatus }) {
  const banned = status === "BANNED";

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
        banned
          ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
          : "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-900 dark:bg-teal-950/50 dark:text-teal-200"
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}
