
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/lenis";
import Providers from "./themeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App Builder",
  description: "Generated Apps with just a prompt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} h-full antialiased `}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <LenisScroll />
            {children}
        </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}
