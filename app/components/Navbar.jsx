"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.scss";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 z-20 w-full bg-transparent px-6 sm:px-10 md:px-16 lg:px-[7rem] h-20">
            <nav className="font-heading navbar-container flex items-between justify-between py-4">
                <div className="flex items-center gap-4">
                    <span className="text-lg sm:text-xl md:text-2xl font-normal tracking-[0.15em] md:tracking-[0.25em]">Analog Archives</span>
                </div>
                <div className="p-2 rounded bg-gradient-to-b from-black/30 via-transparent to-black/40">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className={`link-accent body-text ${pathname === "/" ? "active" : ""}`}
                        >
                            Photos
                        </Link>
                        <Link
                            href="/about"
                            className={`link-accent body-text ${pathname === "/about" ? "active" : ""}`}
                        >
                            About
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
