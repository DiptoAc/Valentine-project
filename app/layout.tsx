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



// Remove the "Create Next App" version and keep this one
export const metadata: Metadata = {
  metadataBase: new URL('https://our-little-stories.netlify.app/'), // ADD THIS LINE
  title: "A Message for You 💌",
  description: "Click to open your surprise...",
  openGraph: {
    title: "A Message for You 💌",
    description: "Click to open your surprise...",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
