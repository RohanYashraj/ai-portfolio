import type { Metadata } from "next";
import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import "../styles/tokens.css";

const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--next-font-display",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--next-font-default",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--next-font-mono",
});

export const metadata: Metadata = {
  title: "Dr. Rohan Yashraj Gupta — the AI Actuary",
  description:
    "Dr. Rohan Yashraj Gupta — the AI Actuary. Actuary (FIA, FIAI) × data scientist: selected works, research papers, and conference talks.",
};

/* Applies the saved (or system) theme before first paint to avoid a flash */
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(!t)t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
