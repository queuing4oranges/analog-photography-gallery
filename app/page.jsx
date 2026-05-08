import Image from "next/image";
import PhotoGallery from "./components/PhotoGallery";
import hero from "./components/hero.png"

export default function Home() {
  //TODO show a random image as cover
  return (
    <main className="w-full">
      <section className="relative h-screen w-full mb-5">
        <Image
          src={hero}
          alt="Analog photography hero"
          fill
          className="object-cover object-right sm:object-center"
          priority
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-between py-16 px-6 sm:px-10 md:px-16 lg:px-[7rem] overflow-hidden">

          <span className="mt-3 font-accent text-[10px] sm:text-[11px] uppercase tracking-tight sm:tracking-wide md:tracking-wider">
            Volume One · 2022—2026
          </span>

          <h1 className="
            font-accent
            font-normal
            text-[3rem]
            sm:text-[5rem]
            lg:text-[8.5rem]
            tracking-[0.01em]
            text-white sm:text-[var(--color-accent-warm)]
          ">
            Analog
            <br />
            <span className="italic">Archives.</span>
          </h1>

        </div>
      </section >
      <section className="px-5 sm:px-10 md:px-16">
        <PhotoGallery />
      </section>
    </main >
  );
}
