import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import PlanSwitcher from "@/components/PlanSwitcher";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Moni — Smart Trading",
  description: "AI-powered Solana trading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-bg-base text-text-primary min-h-screen`}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <PlanSwitcher />
        </AuthProvider>
      </body>
    </html>
  );
}
