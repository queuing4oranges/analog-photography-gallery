"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.scss";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 w-full z-20 bg-transparent">
            <nav className="font-heading navbar-container flex items-between justify-between py-4">
                <div className="flex items-center gap-4">
                    <span>Analog Archives</span>
                </div>
                <div className="bg-gradient-to-b from-black/30 via-transparent to-black/40">
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
