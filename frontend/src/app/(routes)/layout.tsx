"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Globe2 from "@/components/purpleglobe/globe";
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
      
        
        <div className="z-20 min-h-[100vh]  ">{children}</div>
      </body>
    </html>
  );
}
