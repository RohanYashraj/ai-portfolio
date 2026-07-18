import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { getResume, getSiteSettings } from "@/sanity/lib/queries";
import type { Publication } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Education, work experience, skills, certifications, and publications.",
};

const PUB_LABELS: Record<Publication["type"], string> = {
  paper: "Paper",
  chapter: "Chapter",
  presentation: "Presentation",
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t-[1.5px] border-outline py-12 first:border-t-0">
      <h2 className="section-heading mb-8 text-4xl sm:text-5xl">
        {title}{" "}
        <span className="sparkle align-middle text-xl sm:text-2xl">✦</span>
      </h2>
      <div>{children}</div>
    </section>
  );
}

export default async function ResumePage() {
  const [resume, settings] = await Promise.all([
    getResume(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Curriculum vitae"
        title="Resume"
        intro="Education, experience, credentials, and publications — the full record."
      />

      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {settings.resumePdfUrl && (
          <div className="flex justify-end py-6">
            <a
              href={settings.resumePdfUrl}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-outline px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-indigo hover:text-indigo"
              download
            >
              Download PDF ↓
            </a>
          </div>
        )}

        <Section id="education" title="Education">
          <ul className="space-y-6">
            {resume.education.map((e) => (
              <li key={e._id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-lg text-ink">{e.qualification}</h3>
                  <span className="font-mono text-xs text-slate tnum">
                    {[e.start, e.end].filter(Boolean).join(" – ")}
                  </span>
                </div>
                <p className="text-sm text-slate">
                  {[e.institution, e.field].filter(Boolean).join(" · ")}
                </p>
                {e.note && <p className="mt-1 text-sm text-slate">{e.note}</p>}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="relative space-y-8 border-l border-line pl-6">
            {resume.experience.map((x) => (
              <li key={x._id} className="relative">
                <span
                  className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-indigo"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-lg text-ink">{x.role}</h3>
                  <span className="font-mono text-xs text-slate tnum">
                    {[x.start, x.end].filter(Boolean).join(" – ")}
                  </span>
                </div>
                <p className="text-sm text-slate">
                  {[x.org, x.location].filter(Boolean).join(" · ")}
                </p>
                {x.bullets && x.bullets.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate">
                    {x.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="milestones" title="Milestones">
          <ul className="space-y-4">
            {resume.milestones.map((m) => (
              <li key={m._id} className="flex gap-4">
                <span className="w-14 shrink-0 font-mono text-sm text-indigo tnum">
                  {m.year}
                </span>
                <div>
                  <h3 className="text-ink">{m.title}</h3>
                  {m.description && (
                    <p className="text-sm text-slate">{m.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="skills" title="Skills">
          <div className="space-y-6">
            {resume.skillGroups.map((g) => (
              <div key={g._id}>
                <h3 className="mb-2 text-sm font-medium text-ink">{g.groupName}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border-[1.5px] border-outline px-3.5 py-1 text-sm text-ink"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="certifications" title="Certifications & Fellowships">
          <ul className="space-y-3">
            {resume.credentials.map((c) => (
              <li key={c._id} className="flex flex-wrap items-baseline justify-between gap-x-4">
                <span className="text-ink">
                  {c.name}
                  {c.issuer && <span className="text-slate"> · {c.issuer}</span>}
                </span>
                <span className="font-mono text-xs text-slate tnum">{c.year}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="publications" title="Publications & Presentations">
          <ul className="space-y-4">
            {resume.publications.map((pub) => (
              <li key={pub._id} className="flex gap-4">
                <span className="mt-0.5 shrink-0 rounded bg-wash px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-indigo">
                  {PUB_LABELS[pub.type]}
                </span>
                <div>
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink underline decoration-line underline-offset-4 hover:decoration-indigo"
                    >
                      {pub.title}
                    </a>
                  ) : (
                    <span className="text-ink">{pub.title}</span>
                  )}
                  <p className="text-sm text-slate tnum">
                    {[pub.venue, pub.year].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <div className="h-16" />
      </div>
    </>
  );
}
