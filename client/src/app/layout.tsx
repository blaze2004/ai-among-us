import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { LayoutProps } from "@/types";
import { Provider } from "@/components/provider";
import Wrapper from './wrapper'

const inter=Inter({ subsets: ["latin"] });

export const metadata: Metadata={
  title: "AI Among Us",
  description:
    "Find the AI among other humans. A simple game to test your AI content detection skills.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Wrapper>
          {children}
          </Wrapper>
          <Toaster position={"top-center"} />
        </Provider>
      </body>
      <Analytics />
    </html>
  );
}