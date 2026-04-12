'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function Carousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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
                    {[
                        '/images/img1.jpg',
                        '/images/img2.jpg',
                        '/images/img3.jpg',
                    ].map((src, index) => (
                        <div
                            className="flex-[0_0_100%] min-w-0"
                            key={index}
                        >
                            <img
                                src={src}
                                alt={`Slide ${index}`}
                                className="w-full h-[400px] object-cover"
                            />
                        </div>
                    ))}
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