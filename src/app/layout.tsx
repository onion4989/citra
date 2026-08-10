import type { Metadata } from "next";
import { Fraunces, Noto_Sans_JP, Outfit } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "CITRA — scroll scrub experiment",
  description:
    "Hero scroll-scrub with citrus generative video and a fictional sparkling drink.",
  icons: {
    icon: [{ url: "/favicon/icon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [
      { url: "/favicon/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${fraunces.variable} ${outfit.variable} ${notoSansJp.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
