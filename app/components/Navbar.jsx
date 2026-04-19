"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./Navbar.scss";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <>
            <nav className="navbar-container flex items-between justify-end py-4 px-5">
                <div className="flex items-center gap-4">
                    <h1>Analog Photo Gallery</h1>
                    <Image
                        src="/images/logo.webp"
                        alt="Picture gallery logo"
                        width={70}
                        height={70}
                        quality={[100, 75]}
                    />
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
        </>
    );
}
