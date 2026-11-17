import React from "react";
import Image from "next/image";
import cats from "./components/cats-talking-trash.webp";
import BackButton from "./components/BackButton";

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
      <BackButton />
    </main>
  );
}
