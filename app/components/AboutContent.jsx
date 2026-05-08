import React from 'react';
import Image from "next/image";
import selfportrait from "./self-portrait.webp";

export default function AboutContent() {
  return (
    <section class="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div class="md:col-span-5 lg:col-span-5">
          <div class="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src={selfportrait}
              alt="Self portrait"
              fill
              className="object-cover"
              priority
            />
            <span class="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em]">
              Self · Diana F+
            </span>
          </div>
        </div>

        <div class="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <span class="font-mono text-[11px] uppercase tracking-[0.3em]">
            About · Notes from quiet frames
          </span>

          <h1 class="mt-6 font-serif font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            I take pictures <br />
            <span class="italic">
              slowly.
            </span>
          </h1>

          <div class="mt-12 space-y-6 max-w-xl">
            <p class="font-sans text-lg leading-relaxed">
              I grew up around analog photography, but like many people, I drifted away from it when digital cameras became the norm. Years later, I was given an old Polaroid as a birthday gift, and that small camera brought me back into it.
            </p>

            <p class="font-sans text-base leading-relaxed">
              Now I mostly shoot film again - 35mm, sometimes instant - experimenting with different stocks and seeing what each one does. I enjoy photographing people the most, especially in low light or quieter, moodier settings, but I also like to explore wherever the camera takes me.
            </p>

            <p class="font-sans text-base leading-relaxed">
              The images here are shot on film, and while I try to stay true to the original feel, I sometimes do light edits or adjustments to bring out the mood and details a bit more. Nothing heavy — just enough to let the photos speak the way I remember them.
            </p>
          </div>

          <div class="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-10 border-t pt-10">
            <div>
              <p class="font-mono text-[10px] uppercase tracking-[0.3em]">Based in</p>
              <p class="mt-2 font-serif text-base md:text-lg">Praha, CZ</p>
            </div>

            <div>
              <p class="font-mono text-[10px] uppercase tracking-[0.3em]">Shooting since</p>
              <p class="mt-2 font-serif text-base md:text-lg">2022</p>
            </div>

            <div>
              <p class="font-mono text-[10px] uppercase tracking-[0.3em]">Cameras</p>
              <p class="mt-2 font-serif text-base md:text-lg">Olympus 35 RC · Diana F+ · Pentax MX</p>
            </div>
          </div>

          <div class="mt-16 flex flex-col sm:flex-row sm:items-center gap-6">
            <a
              href="https://www.instagram.com/queuing4oranges/"
              target='_blank'
              class="group inline-flex items-center gap-3 px-6 py-3 border transition-all duration-500 font-mono text-[11px] uppercase tracking-[0.3em]"
              rel='noopener noreferrer'
            >
              Follow me
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" aria-hidden="true">
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
    // <section class="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24">
    //   <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
    //     <div class="md:col-span-5 lg:col-span-5">
    //       <div class="relative w-full aspect-[3/4] overflow-hidden bg-surface photo-hover">
    //         <Image
    //           // src={hero}
    //           alt="Self portrait"
    //           fill
    //           className="object-cover object-right sm:object-center"
    //           priority
    //         />
    //         <span class="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80">Self · Pentax 67 · Portra 400</span>
    //       </div>
    //     </div>
    //     <div class="md:col-span-7 lg:col-span-6 lg:col-start-7">
    //       <span class="font-mono text-[11px] uppercase tracking-[0.3em] text-sienna">About · Notes from the darkroom</span>
    //       <h1 class="mt-6 font-serif font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-bone">
    //         I make pictures <br />
    //         <span class="italic text-sienna">slowly.</span>
    //       </h1>
    //       <div class="mt-12 space-y-6 max-w-xl">
    //         <p class="font-sans text-lg leading-relaxed text-bone/80">I'm a film photographer based somewhere between a darkroom and a long train ride. I shoot 35mm and medium format, mostly at night and at the edges of cities, looking for the small in-between moments that don't make it into the stories we tell ourselves.</p>
    //         <p class="font-sans text-base leading-relaxed text-bone/70">Everything on this site was photographed on film, developed by hand, and scanned at home. Nothing here was generated, retouched into another life, or hurried. The pictures are quiet on purpose.</p>
    //         <p class="font-sans text-base leading-relaxed text-bone/70">If a photograph here makes you slow down for a second — that's the only thing I was hoping for.</p>
    //       </div>
    //       <div class="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-10 border-t border-hairline/60 pt-10">
    //         <div>
    //           <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">Based in</p>
    //           <p class="mt-2 font-serif text-base md:text-lg text-bone">Lisbon, PT</p>
    //         </div>
    //         <div>
    //           <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">Shooting since</p>
    //           <p class="mt-2 font-serif text-base md:text-lg text-bone">2014</p>
    //         </div>
    //         <div>
    //           <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">Cameras</p>
    //           <p class="mt-2 font-serif text-base md:text-lg text-bone">Leica M6 · Pentax 67</p>
    //         </div>
    //         <div>
    //           <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">Stock</p>
    //           <p class="mt-2 font-serif text-base md:text-lg text-bone">Portra · Tri-X · HP5+</p>
    //         </div>
    //         <div>
    //           <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">Lab</p>
    //           <p class="mt-2 font-serif text-base md:text-lg text-bone">Home darkroom</p>
    //         </div>
    //         <div>
    //           <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">Status</p>
    //           <p class="mt-2 font-serif text-base md:text-lg text-bone">Open for prints</p>
    //         </div>
    //       </div>
    //       <div class="mt-16 flex flex-col sm:flex-row sm:items-center gap-6">
    //         <a href="mailto:hello@analogarchives.io" data-testid="about-email-cta" class="group inline-flex items-center gap-3 px-6 py-3 border border-bone/30 hover:border-bone hover:bg-bone hover:text-ink transition-all duration-500 font-mono text-[11px] uppercase tracking-[0.3em]">Send a letter<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right w-4 h-4 group-hover:rotate-45 transition-transform duration-500" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
    //         </a>
    //         <a href="#" data-testid="about-instagram-cta" class="font-mono text-[11px] uppercase tracking-[0.3em] text-ash hover:text-bone transition-colors">@analog.archives →</a>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  )
}

//TODO login button for uploading images