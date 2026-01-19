import type { Metadata } from "next";
import { Onest } from "next/font/google"; // Updated to Onest
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/providers/auth-provider";
import { NeuralBackground } from "@/components/ui/neural-background";
import { DemoRoleProvider } from "@/components/providers/demo-role-provider";
import { IntercomSystem } from "@/components/intercom/intercom-system";
import { NotificationProvider } from "@/components/providers/notification-provider";
import { RealTimeProvider } from "@/components/providers/realtime-provider";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-sans",
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
        className={`${onest.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <DemoRoleProvider>
            <NeuralBackground />
             <NotificationProvider>
                <IntercomSystem>
                  <RealTimeProvider>
                    {children}
                    <Toaster />
                  </RealTimeProvider>
                </IntercomSystem>
             </NotificationProvider>
          </DemoRoleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
