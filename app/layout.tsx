import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ClientSessionProvider from "@/lib/clientSessionProvider";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "An Internet/Intranet Chat System",
  description: "A Chat app system designed for easy communication in a work environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={space_grotesk.className} suppressHydrationWarning>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          <ClientSessionProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </ClientSessionProvider>

        </ThemeProvider>
        <Toaster/>
        </body>
    </html>
  );
}
