import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_NAME } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: {
    template: `%s - modern e-commerce platfrom`,
    default: APP_NAME,
  },
  description: "modern e-commerce platfrom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
