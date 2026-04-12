'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Carousel({ imgs }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const bucketName = 'analog-images';

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            {/* Viewport */}
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                <div className="flex">
                    {imgs && imgs.map((img, idx) => {
                        const { data } = supabase.storage.from(bucketName).getPublicUrl(img.image_path)

                        return (
                            <Link href={`/photos/${img.id}`} key={idx}>
                                <Image
                                    src={data.publicUrl}
                                    alt={img.place}
                                    width={400}
                                    height={600}
                                    quality={75}
                                    unoptimized
                                />
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Buttons */}
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
