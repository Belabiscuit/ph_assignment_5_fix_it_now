import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-4 py-12 text-foreground">
      <article className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 text-center text-card-foreground shadow-sm sm:p-8">
        <span
          className="mx-auto inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-widest text-primary"
          aria-hidden
        >
          404
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          Back to home
        </Link>
      </article>
    </main>
  );
}
