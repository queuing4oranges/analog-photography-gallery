import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    // TODO styling
    <main>
        <h2>Page not found.</h2>
        <p>But we found a kitty ... </p>
        <p>Go back to the <Link href="/photos">Gallery</Link></p>
    </main>
  )
}
