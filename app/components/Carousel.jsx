"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

const options = {
  loop: false,
  skipSnaps: true,
  slidesToScroll: 1,
};

export default function Carousel({ album }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const bucketName = "analog-images";

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {album &&
            album.map((img, idx) => {
              const { data } = supabase.storage
                .from(bucketName)
                .getPublicUrl(img.image_path);

              return (
                <div className="flex-[0_0_25%] shrink-0" key={img.id}>
                  {" "}
                  {/* flex = calculate amount of slides */}
                  <Link href={`/photos/${img.id}`} key={idx}>
                    <Image
                      src={data.publicUrl}
                      alt={img.image_path}
                      width={600}
                      height={400}
                      quality={75}
                      unoptimized
                      loading="eager"
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
      >
        ◀
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
      >
        ▶
      </button>
    </div>
  );
}
