import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expresso",
  description: "Connect with friends and Family on Expresso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <header>
          <Navbar />
        </header> */}

        <div className="max-h-[100vh] max-w-[100vw] overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
