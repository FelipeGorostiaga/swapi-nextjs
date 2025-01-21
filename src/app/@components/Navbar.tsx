"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
import { usePathname } from "next/navigation";
import path from "path";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div
      className={`flex w-full px-4 py-6 items-center justify-center gap-[100px] wrap ${pressStart2P.className}`}
    >
      <Link
        href="/"
        className={`text-2xl font-semibold cursor-pointer hover:text-slate-200 decoration-4 ${
          pathname === "/" ? "underline" : ""
        }`}
      >
        Home
      </Link>
      <Link
        href="/films"
        className={`text-2xl font-semibold cursor-pointer hover:text-slate-200 decoration-4 ${
          pathname === "/films" ? "underline" : ""
        }`}
      >
        Films
      </Link>
      <Link
        href="/characters"
        className={`text-2xl font-semibold cursor-pointer hover:text-slate-200 decoration-4 ${
          pathname === "/characters" ? "underline" : ""
        }`}
      >
        Characters
      </Link>
    </div>
  );
};

export default Navbar;
