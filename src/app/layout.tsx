import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Legacy of Excellence - Mrs. Molly Treasa Mammen",
  description: "Celebrating 35 Years of Excellence at The Asian School Bahrain",
  keywords: ["tribute", "legacy", "education", "Bahrain", "CBSE"],
  other: {
    "image-src": "/images/retirement/portrait.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href="/images/retirement/portrait.jpg" as="image" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

