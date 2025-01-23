"use client";

import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
import { usePathname } from "next/navigation";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-row w-full px-8 py-6 items-center justify-center gap-6 md:gap-[100px] ${pressStart2P.className} flex-wrap border-2 border-b-neutral-600`}
    >
      <Link
        href="/"
        className={`text-xl md:text-2xl font-semibold cursor-pointer hover:text-slate-200 decoration-4 ${
          pathname === "/" ? "underline" : ""
        }`}
      >
        Home
      </Link>
      <Link
        href="/films"
        className={`text-xl md:text-2xl font-semibold cursor-pointer hover:text-slate-200 decoration-4 ${
          pathname === "/films" ? "underline" : ""
        }`}
      >
        Films
      </Link>
      <Link
        href="/characters"
        className={`text-xl md:text-2xl font-semibold cursor-pointer hover:text-slate-200 decoration-4 ${
          pathname === "/characters" ? "underline" : ""
        }`}
      >
        Characters
      </Link>
    </div>
  );
};

export default Navbar;
