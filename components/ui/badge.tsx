import { cn } from "@/lib/utils";

type Tone =
  | "neutral"
  | "green"
  | "amber"
  | "red"
  | "blue"
  | "purple"
  | "zinc";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  green: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200",
  amber: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  red: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-200",
  blue: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
  purple: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200",
  zinc: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
