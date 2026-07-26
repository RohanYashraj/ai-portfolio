export function PageHeader({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="section-heading text-5xl sm:text-7xl">{title}</h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
