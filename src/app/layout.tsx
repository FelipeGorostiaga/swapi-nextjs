import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./@components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Wars API Explorer",
  description: "Explore the vast Star Wars universe with this API explorer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased
          bg-[radial-gradient(white_1px,transparent_1px)]
          bg-[length:100px_100px]
          bg-repeat
          w-screen
          h-screen
        `}
      >
        <div className="relative grid grid-rows-[auto_1fr] w-full h-full">
          <div className="row-[1] fixed top-0 left-0 right-0 z-10">
            <Navbar />
          </div>
          <div className="row-[2] overflow-y-auto pt-[80px] mt-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
