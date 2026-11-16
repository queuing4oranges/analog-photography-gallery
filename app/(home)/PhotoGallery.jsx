import React from "react";
import Image from "next/image";
import Link from 'next/link';
import { createServerSupabaseClient } from "../lib/server";

async function getPhotos() {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.from("albums")
        .select(`id, film_type, camera, place, slug,
            photos (id, album_id, image_path, image_path)
        `);

    if (error) {
        console.error(error.message)
        return [];
    }

    const bucketName = "analog-images";

    // sort albums - safeguard against null
    const albums = data.sort((a, b) => (a.place ?? '').localeCompare(b.place ?? ''));

    return albums?.map((album) => {
        const cover = album.photos?.[0];

        const publicUrl = cover
            ? supabase.storage.from(bucketName).getPublicUrl(cover.image_path).data.publicUrl
            : null;

        return {
            ...album,
            coverUrl: publicUrl,
        };
    });
}

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
                                <div className="absolute bottom-0 left-0 right-0 w-full flex flex-col bg-black/70 p-3 sm:p-4 md:p-5 min-h-[80px] sm:min-h-[120px]">
                                    <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-light leading-tight">{album.place}</h2>
                                    <div className="flex flex-wrap items-center text-white">
                                        <span>{album.camera}</span>
                                        <span>&nbsp;/&nbsp;</span>
                                        <span>{album.film_type}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
}
