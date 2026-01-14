import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/auth-provider";


import { NeuralBackground } from "@/components/ui/neural-background";
import { DemoRoleProvider } from "@/components/providers/demo-role-provider";
import { IntercomSystem } from "@/components/intercom/intercom-system";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ha-Meem Group | Enterprise Portal",
  description: "Unified Corporate Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <DemoRoleProvider>
            <NeuralBackground />
                {children}
                <Toaster />
                <IntercomSystem />
          </DemoRoleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
