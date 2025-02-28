
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from '@/lib/providers/ReactQuery'
import AuthWrapper from "@/components/AuthWrapper";
import { metadata } from "./metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AuthWrapper>{children}</AuthWrapper> {}
        </Providers>
      </body>
    </html>
  );
}