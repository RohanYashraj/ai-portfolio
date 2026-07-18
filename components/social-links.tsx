import type { SocialLink } from "@/sanity/lib/types";

const LABELS: Record<SocialLink["platform"], string> = {
  linkedin: "LinkedIn",
  email: "Email",
  scholar: "Google Scholar",
  sssia: "SSSIA",
  other: "Link",
};

function Icon({ platform }: { platform: SocialLink["platform"] }) {
  const common = { width: 18, height: 18, fill: "none", "aria-hidden": true } as const;
  switch (platform) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C20.2 8.75 21 11 21 14v7h-4v-6.2c0-1.48-.03-3.4-2.07-3.4-2.07 0-2.39 1.62-2.39 3.29V21H9V9Z"
            fill="currentColor"
          />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            d="M3 6.5h18v11H3v-11Zm1.6 1L12 12.6l7.4-5.1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "scholar":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            d="M12 3 1.5 8.5 12 14l8.5-4.45V15M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "sssia":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            d="M9 15l6-6M8.5 7.5 10 6a3.5 3.5 0 0 1 5 5l-1.5 1.5M15.5 16.5 14 18a3.5 3.5 0 0 1-5-5l1.5-1.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function SocialLinks({
  links,
  variant = "icons",
  className = "",
}: {
  links: SocialLink[];
  variant?: "icons" | "labels";
  className?: string;
}) {
  if (!links?.length) return null;

  if (variant === "labels") {
    return (
      <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
        {links.map((s) => (
          <li key={s.platform + s.url}>
            <a
              href={s.url}
              target={s.platform === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-indigo"
            >
              {LABELS[s.platform]}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {links.map((s) => (
        <li key={s.platform + s.url}>
          <a
            href={s.url}
            target={s.platform === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={LABELS[s.platform]}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-indigo hover:text-indigo"
          >
            <Icon platform={s.platform} />
          </a>
        </li>
      ))}
    </ul>
  );
}
