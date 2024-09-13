import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KNOMS",
  description:
    "A secure and user-friendly web application for managing KNUST nominations. Request, review, and submit nomination forms with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster position="top-center" />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
