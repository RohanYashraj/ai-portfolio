import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { getAuthor } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about actuarial work, teaching, or writing.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Dr Rohan Yashraj Gupta",
    description: "Get in touch about actuarial work, teaching, or writing.",
    url: "/contact",
    type: "website",
  },
};

export default async function ContactPage() {
  const author = await getAuthor();
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact"
        intro="For actuarial work, teaching, speaking, or publishing enquiries."
      />
      <section className="mx-auto grid max-w-4xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm leading-relaxed text-slate">
            Fill in the form and I&apos;ll reply by email. You can also write to me
            directly.
          </p>
          {author.email && (
            <a
              href={`mailto:${author.email}`}
              className="mt-4 inline-block font-mono text-sm text-indigo underline decoration-line underline-offset-4 hover:decoration-indigo"
            >
              {author.email}
            </a>
          )}
        </div>
        <ContactForm />
      </section>
    </>
  );
}
