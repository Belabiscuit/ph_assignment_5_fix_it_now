import type { ServiceDetails } from "@/lib/types";

function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function TechnicianCard({
  technician,
}: {
  technician: ServiceDetails["technician"];
}) {
  const name = technician?.user.name ?? "Technician";
  const area = technician?.location ?? "Dhaka";
  const rating = technician?.avgRating ?? 0;
  const reviews = technician?.totalReviews ?? 0;
  const skills = technician?.skills ?? [];
  const experience = technician?.experienceYrs ?? 0;
  const verified = technician?.isVerified ?? false;

  return (
    <aside className="flex h-fit flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_22px_55px_-32px_rgba(15,23,42,0.42)] lg:sticky lg:top-24">
      <div className="border-b border-border bg-teal-50/70 p-5 dark:bg-teal-950/30">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-800 dark:text-teal-200">
          {"// the professional for this service"}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary font-display text-lg font-bold text-primary-foreground shadow-md shadow-primary/20">
            {initialsOf(name)}
          </span>
          <div className="min-w-0">
            <h2 className="truncate font-display text-xl font-bold leading-tight text-foreground">
              {name}
            </h2>
            <p className="mt-1 truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {area}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-4 text-[11px] text-muted-foreground">
          <span className="font-semibold text-amber-700 dark:text-amber-300">
            {"★"}{" "}
            {rating > 0 ? rating.toFixed(1) : "new"} ({reviews})
          </span>
          <span>
            {experience} yr{experience === 1 ? "" : "s"} on the tools
          </span>
          {verified && (
            <span className="font-semibold text-primary">{"✓"} verified</span>
          )}
        </div>

        {technician?.bio && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {technician.bio}
          </p>
        )}

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Skills
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {(skills.length > 0 ? skills : ["Vetted pro"]).map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-teal-800 dark:border-teal-900 dark:bg-teal-950/50 dark:text-teal-200"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900 dark:bg-amber-950/25">
        <p className="text-[10px] font-medium uppercase leading-relaxed tracking-wider text-amber-900 dark:text-amber-200">
          {verified
            ? "Background-checked and rated by past customers."
            : "New professional · profile pending verification."}
        </p>
      </div>
    </aside>
  );
}
