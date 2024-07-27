import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

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
      <head></head>
      <body className=" ">
        <div className="relative min-h-[100vh] flex flex-col items-center justify-start overflow-clip">{children}</div>
      </body>
    </html>
  );
}
