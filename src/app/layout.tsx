
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from '@/lib/providers/ReactQuery'
import AuthWrapper from "@/components/AuthWrapper";
import { metadata } from "./metadata";
import Navbar from "@/components/Navbar";

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
        <AuthWrapper>
          <Providers>
            <Navbar/>
            {children}
          </Providers>
        </AuthWrapper>
      </body>
    </html>
  );
}