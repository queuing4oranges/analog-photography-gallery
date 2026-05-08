import React from "react";
import Image from "next/image";
import { createServerSupabaseClient } from "../lib/server";
// import Swiper from "./Swiper";
// import "./Swiper.scss";

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

    return data?.map((album) => {
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
                    const widths = ["w-[60%]", "w-[40%]", "w-[75%]", "w-[50%]"];
                    const widthClass = widths[i % widths.length];
                    return (
                        <React.Fragment key={i}>
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
                                <div className="absolute bottom-0 flex flex-col m-3 sm:m-4 md:m-5 max-w-[90%]">
                                    <h2 className="font-serif text-xl sm:text-2xl md:text-5xl font-light mb-2 leading-tight">{album.place}</h2>
                                    <div className="flex flex-wrap italic items-center bg-black/30 text-white px-2 py-1 sm:px-3 sm:py-1">
                                        <span className="text-lg sm:text-xl md:text-2xl">{album.camera}</span>
                                        <span className="text-lg sm:text-xl md:text-2xl">&nbsp;/&nbsp;</span>
                                        <span>{album.film_type}</span>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })
            }
            {/* {albums &&
                albums.map((album) => (
                    <div key={album.id} className="mb-10">
                        <div className="flex items-baseline gap-2 m-5 ms-0">
                            <h2>{album.camera}</h2>
                            <span className="text-accent-warm opacity-60">/</span>
                            <h3>{album.film_type}</h3>
                        </div>
                        <Swiper album={album.photos} />
                    </div>
                ))
            } */}
        </div>
    );
}
