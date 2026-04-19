"use client";

import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FotoSwiper({ album }) {
  const bucketName = "analog-images";

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        className="h-[600px]"
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
              <div className="relative w-full h-[600px]">
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
