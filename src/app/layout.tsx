import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";
import Navbar from "@/components/Navbar";
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "PropMart",
  description: "Find your place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.variable}>
        <Navbar />
        {children}
       
      </body>
    </html>
  );
}
