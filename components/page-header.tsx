export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="border-b-[1.5px] border-outline">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="section-heading text-6xl sm:text-8xl">
          {title} <span className="sparkle align-middle text-3xl sm:text-5xl">✦</span>
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
