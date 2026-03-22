import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './octopus.png';

export default function Navbar() {
    return (
        <nav>
            <Image //TODO replace with logo of Orange (the fruit)
                src={Logo}
                alt='Picture gallery logo'
                width={70}
                quality={[100, 75]}
                placeholder='blur' //creates blur effect while img loads
            />
            <h1>World In Analogue</h1>
            <Link href="/">Home</Link> {/*//TODO - improve this with Photos route!*/}
            <Link href="/about">About</Link>
            <Link href="/photos">Photos</Link>
        </nav>
    )
}
