"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Globe from "@/components/purpleglobe/globe";
import Particle from "@/components/particlejs/particle";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Particle></Particle>
        <Globe className="z-0"></Globe>
        <div className="z-20 min-h-[100vh] w-[100vw] ">{children}</div>
      </body>
    </html>
  );
}
