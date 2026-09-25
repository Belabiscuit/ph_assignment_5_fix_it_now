export function TicketStub({
  top,
  bottom,
  hole = "h-1 w-6",
  width = "w-10",
}: {
  top: string;
  bottom: string;
  hole?: string;
  width?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden border-r border-teal-100 bg-gradient-to-b from-teal-50/90 via-card to-amber-50/70 dark:border-teal-900 dark:from-teal-950/40 dark:via-card dark:to-amber-950/30 ${width}`}
    >
      <span className="absolute left-1/2 top-3 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-[0.18em] text-teal-800 [writing-mode:vertical-rl] dark:text-teal-200">
        {top}
      </span>
      <span
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 ${hole}`}
      />
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-[0.18em] text-teal-800 [writing-mode:vertical-rl] dark:text-teal-200">
        {bottom}
      </span>
    </div>
  );
}
