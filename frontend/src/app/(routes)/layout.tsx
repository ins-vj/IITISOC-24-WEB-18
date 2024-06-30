"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      
      </head>
      <body>
        <Toaster />
        <div className=" min-h-[100vh] overflow-y-clip ">{children}</div>
      </body>
    </html>
  );
}
