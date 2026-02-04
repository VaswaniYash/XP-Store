import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/providers/cart-context";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XP Store | Ultimate Gaming Marketplace",
  description: "The best place to buy games, consoles, and accessories. Built by Yash Vaswani.",
  // This helps social media sites know what image to show (optional but good)
  openGraph: {
    title: "XP Store | Ultimate Gaming Marketplace",
    description: "The best place to buy games, consoles, and accessories.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="xp-store-theme"
          >
            <CartProvider>
              {children}
            </CartProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
