"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './Navbar.scss';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className = "navbar-container container-analog flex items-between justify-between py-4">
            <div className="flex items-center gap-4">
                <Image
                    src="/images/logo.webp"
                    alt='Picture gallery logo'
                    width={70}
                    height={70}
                    quality={[100, 75]}
                    className="rounded-lg"
                />
                <h1 className="heading-lg">
                    <span className="accent-text block leading-none">
                        Analog Photo Gallery
                    </span>
                </h1>
                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className={`link-accent body-text ${pathname === '/' ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={`link-accent body-text ${pathname === '/about' ? 'active' : ''}`}
                    >
                        About
                    </Link>
                </div>
                <div className="divider" />
            </div>
        </nav>
    )
}
