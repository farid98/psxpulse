import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Topbar } from "@/components/layout/Topbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PSXPulse — Pakistan Stock Exchange Analytics",
  description: "Analytical dashboard for the Pakistan Stock Exchange (KSE-100)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#FAFAF7] font-sans text-stone-800">
        <Topbar />
        <Sidebar />
        <MobileNav />
        <main className="pt-[6.5rem] lg:pt-14 lg:pl-[220px] min-h-screen">
          <div className="px-4 sm:px-6 lg:px-8 py-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
