import type { Metadata } from "next";
import { Onest } from "next/font/google"; // Updated to Onest

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
        className={`${onest.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <DemoRoleProvider>
            <NeuralBackground />
             <NotificationProvider>
                <IntercomSystem>
                  {children}
                  <Toaster />
                </IntercomSystem>
             </NotificationProvider>
          </DemoRoleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
