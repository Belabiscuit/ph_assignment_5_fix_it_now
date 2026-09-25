export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-6 py-14 text-center shadow-sm">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-xl text-primary dark:bg-teal-950/60 dark:text-teal-300">
        ◌
      </div>
      <h3 className="text-base font-bold tracking-tight text-foreground">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
