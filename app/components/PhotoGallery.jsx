import React from "react";
import { createServerSupabaseClient } from "../lib/server";
import Swiper from "./Swiper";
import "./Swiper.scss";

async function getPhotos() {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.from("albums")
        .select(`id, film_type, camera, place, slug,
            photos (id, album_id, image_path, image_path)
        `);

    if (error) console.error(error.message);

    return data;
}

export default async function PhotoGallery() {
    const albums = await getPhotos();

    return (
        <>
            {albums &&
                albums.map((album) => (
                    <div key={album.id} className="mb-10">
                        <div className="flex items-baseline gap-2 m-5 ms-0">
                            <h2>{album.camera}</h2>
                            <span className="text-accent-warm opacity-60">/</span>
                            <h3>{album.film_type}</h3>
                        </div>
                        <Swiper album={album.photos} />
                    </div>
                ))}
        </>
    );
}
