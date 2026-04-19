"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FotoSwiper({ album }) {
    const [fotoHeight, setFotoHeight] = useState("h-[200px]");
    const [width, setWidth] = useState(0);
    const bucketName = "analog-images";

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (width < 640) {
            setFotoHeight("h-[200px]");
        } else {
            setFotoHeight("h-[600px]");
        }
    }, [width]);


    return (
        <div className="w-full mx-auto">
            <Swiper
                modules={[Navigation]}
                navigation
                loop
                className={fotoHeight}
                slidesPerView={1}
                spaceBetween={5}
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 25 },
                }}
            >
                {album?.map((img) => {
                    const { data } = supabase.storage
                        .from(bucketName)
                        .getPublicUrl(img.image_path);

                    return (
                        <SwiperSlide key={img.id} className="h-full">
                            <div className={`relative w-full ${fotoHeight}`}>
                                <Image
                                    src={data.publicUrl}
                                    alt={img.image_path}
                                    fill
                                    className="object-cover"
                                    quality={75}
                                    unoptimized
                                />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
