import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-24">
      <div className="text-center">
        <p className="section-heading text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Page not found</h1>
        <p className="mt-2 text-sm text-slate">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-wash"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
