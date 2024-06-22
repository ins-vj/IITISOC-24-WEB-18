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
      <body className=" ">
        <div className=" min-h-[100vh]">{children}</div>
      </body>
    </html>
  );
}
