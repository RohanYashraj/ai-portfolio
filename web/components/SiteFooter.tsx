import styles from "./SiteFooter.module.css";

type Props = {
  siteName: string;
  contactEmail: string;
  socialLinks: { label: string; url: string }[] | null;
};

/* Quiet close: contact path, socials, no dead links — renders only what exists */
export function SiteFooter({ siteName, contactEmail, socialLinks }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        {(socialLinks ?? []).map((link) => (
          <a key={link.url} href={link.url} rel="me noopener">
            {link.label}
          </a>
        ))}
      </div>
      <p>
        © {new Date().getFullYear()} {siteName}
      </p>
    </footer>
  );
}
