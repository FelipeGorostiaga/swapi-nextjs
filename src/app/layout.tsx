import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Metadata } from "next";
import Providers from "./@components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SWAPI Explorer",
  description: "SWAPI by Felipe Gorostiaga",
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
        <div className="relative grid grid-rows-[auto_1fr] w-full min-h-screen">
          <div className="row-[1]">
            <Navbar />
          </div>
          <div className="row-[2] h-full overflow-y-auto pt-[30px] md:pt-[50px]">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
