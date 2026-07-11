import React from "react";
import Link from "next/link";
import Image from "next/image";
import cats from "./components/cats-talking-trash.webp";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 mt-6">
      <p>Page not found...
        <br />
        And the cats are already talking about this.
      </p>
      <Image
        src={cats}
        alt="cats sitting in the dark"
        className="max-h-[60vh] w-auto"
        priority
      />
      <div>
        <Link
          href="/"
          className="group inline-flex items-center gap-3 px-6 py-3 border transition-all duration-500 font-mono text-[11px] uppercase tracking-[0.3em]"
        >
          Back to the Gallery
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" aria-hidden="true">
            <path d="M7 7h10v10"></path>
            <path d="M7 17 17 7"></path>
          </svg>
        </Link>
      </div>
    </main>
  );
}
