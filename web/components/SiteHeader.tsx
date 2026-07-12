"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./SiteHeader.module.css";

const rooms = [
  { label: "Selected Works", href: "/#selected-works" },
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
  { label: "Speaking", href: "/speaking" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader({ siteName }: { siteName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.name}>
        {siteName}
      </Link>
      <nav
        id="room-nav"
        className={`${styles.nav} ${open ? styles.navOpen : ""}`}
        aria-label="Rooms"
      >
        {rooms.map((room) => (
          <Link key={room.href} href={room.href} onClick={() => setOpen(false)}>
            {room.label}
          </Link>
        ))}
      </nav>
      <div className={styles.actions}>
        <ThemeToggle className={styles.themeToggle} />
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="room-nav"
          aria-label={open ? "Close room navigation" : "Open room navigation"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
