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
            <h2 className="m-5 ms-0">{album.camera}</h2>
            <h3 className="m-5 ms-0">{album.film_type}</h3>

            <Swiper album={album.photos} />
          </div>
        ))}
    </>
  );
}
