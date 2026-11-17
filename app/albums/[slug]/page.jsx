import React from 'react';
import { createServerSupabaseClient } from "../../lib/server";
import NotFound from '../../not-found';
import Image from "next/image";
import BackButton from '../../components/BackButton';

async function getAlbum(slug) { //example: prague-2
  const supabase = await createServerSupabaseClient(); //must be inside a function

  // get album
  const { data: album, error: albumError } = await supabase
    .from("albums")
    .select("id, slug, created_at, name")
    .eq("slug", slug)
    .maybeSingle();

  if (albumError || !album) {
    return null
  }

  // get photos from that album
  const { data: photos, error: photosError } = await supabase
    .from("photos")
    .select("id, album_id, image_path, place, created_at, camera, film_type, taken_at") //taken_at = timestamp
    .eq("album_id", album.id)

  if (photosError || !photos) {
    console.error(photosError?.message);
    return null
  }

  const photosWithUrls = photos.map((photo) => ({
    ...photo,
    publicUrl: supabase.storage
      .from("analog-images")
      .getPublicUrl(photo.image_path).data.publicUrl,
  }));

  return {
    ...album,
    photos: photosWithUrls,
    coverUrl: photosWithUrls[0]?.publicUrl || null,
  };
};

export default async function AlbumDetails({ params }) {
  const { slug } = await params;
  const album = await getAlbum(slug);

  if (!album) return <NotFound />;

  return (
    <section className="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24">
      {album &&
        <>
          <h1 className='text-xl font-light !font-body'>{album.name}</h1>
        </>
      }
      <BackButton />
      <div className="mt-5 columns-1 sm:columns-2 lg:columns-2 gap-6">
        {album && album.photos?.map((photo) => {
          return (
            <div key={photo.id} className="mb-6 break-inside-avoid">
              <Image
                src={photo.publicUrl}
                alt={`album for ${photo.place}`}
                width={800}
                height={600}
                quality={75}
                unoptimized
                loading="eager"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
