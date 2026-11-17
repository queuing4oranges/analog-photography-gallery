import React from "react";
import Image from "next/image";
import Link from 'next/link';
import { getPhotos } from "../lib/data/photos";

export default async function PhotoGallery() {
  const albums = await getPhotos();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {albums &&
        albums.map((album, i) => {
          return (
            <Link
              key={i}
              href={`albums/${album.slug}`}
            >
              <div key={album.id} className="relative h-[300px] sm:h-[400px] md:h-[500px]">
                {album.coverUrl && (
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={album.coverUrl}
                      alt={album.slug}
                      fill
                      className="object-cover"
                      quality={75}
                      unoptimized
                    />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 w-full flex flex-col bg-black/70 p-3 sm:p-4 md:p-5 min-h-[30px] sm:min-h-[70px]"
                >
                  <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-light leading-tight"
                  >
                    {album.name}
                  </h2>
                </div>
              </div>
            </Link>
          )
        })
      }
    </div>
  );
}
