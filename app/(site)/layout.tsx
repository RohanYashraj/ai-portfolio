import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { getAuthor, getSiteSettings } from "@/sanity/lib/queries";
import { identityLd } from "@/lib/seo";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, author] = await Promise.all([getSiteSettings(), getAuthor()]);
  return (
    <>
      {/* Sitewide identity graph (WebSite + Person) — every public page carries it. */}
      <JsonLd data={identityLd(author)} />
      <SiteHeader siteTitle={settings.siteTitle} navLinks={settings.navLinks} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter settings={settings} />
    </>
  );
}
