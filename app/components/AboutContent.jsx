"use client";

import React, { useState } from 'react';
import Image from "next/image";
import selfportrait from "./self-portrait.webp";
import LoginModal from './LoginModal';
import { useRouter } from 'next/navigation';

export default function AboutContent() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (email, password) => {
    // console.log(email, password, 'this is the email and the password');
    router.push('/albums/create');

  }

  return (
    <section className="relative pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5 lg:col-span-5">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src={selfportrait}
              alt="Self portrait"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em]">
              Self · Diana F+
            </span>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em]">
            About · Notes from quiet frames
          </span>

          <h1 className="mt-6 font-serif font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            I take pictures <br />
            <span className="italic">
              slowly.
            </span>
          </h1>

          <div className="mt-12 space-y-6 max-w-xl">
            <p className="font-sans text-lg leading-relaxed">
              I grew up around analog photography, but like many people, I drifted away from it when digital cameras became the norm. Years later, I was given an old Polaroid as a birthday gift, and that small camera brought me back into it.
            </p>

            <p className="font-sans text-base leading-relaxed">
              Now I mostly shoot film again - 35mm, sometimes instant - experimenting with different stocks and seeing what each one does. I enjoy photographing people the most, especially in low light or quieter, moodier settings, but I also like to explore wherever the camera takes me.
            </p>

            <p className="font-sans text-base leading-relaxed">
              The images here are shot on film, and while I try to stay true to the original feel, I sometimes do light edits or adjustments to bring out the mood and details a bit more. Nothing heavy — just enough to let the photos speak the way I remember them.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-10 border-t pt-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em]">Based in</p>
              <p className="mt-2 font-serif text-base md:text-lg">Praha, CZ</p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em]">Shooting since</p>
              <p className="mt-2 font-serif text-base md:text-lg">2022</p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em]">Cameras</p>
              <p className="mt-2 font-serif text-base md:text-lg">Olympus 35 RC · Diana F+ · Pentax MX</p>
            </div>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-6">
            <a
              href="https://www.instagram.com/queuing4oranges/"
              target='_blank'
              className="group inline-flex items-center gap-3 px-6 py-3 border transition-all duration-500 font-mono text-[11px] uppercase tracking-[0.3em]"
              rel='noopener noreferrer'
            >
              Follow me
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" aria-hidden="true">
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
            <button
              onClick={() => setOpenModal(true)}
              className="group inline-flex items-center gap-3 px-6 py-3 border transition-all duration-500 font-mono text-[11px] uppercase tracking-[0.3em] cursor-pointer"
            >
                Login to upload photos
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" aria-hidden="true">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>

            </button>
          </div>
        </div>
      </div>
      <LoginModal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        setEmail={setEmail}
        setPassword={setPassword}
        email={email}
        password={password}
        handleLogin={handleLogin}
      />
    </section>
  )
}
