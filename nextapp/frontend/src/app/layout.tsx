import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expresso",
  description: "Connect with your friends and family",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">

      <body >
        <NextUIProvider>
          <Navbar />
          <div className="max-h-screen min-h-[95vh]">
            {children}
          </div>
          <Footer />
        </NextUIProvider>
      </body>

    </html>

  );
}
