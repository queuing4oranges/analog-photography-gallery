import React from 'react';
import { createServerSupabaseClient } from "../../lib/server";
import NotFound from '../../not-found';
import Image from "next/image";

async function getAlbum(slug) { //example: prague-2
  const supabase = await createServerSupabaseClient(); //must be inside a function

  // get album
  const { data: album, error: albumError } = await supabase
    .from("albums")
    .select("id, film_type, camera, place, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (albumError || !album) {
    return null
  }

  // get photos from that album
  const { data: photos, error: photosError } = await supabase
    .from("photos")
    .select("id, image_path, place, created_at")
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
          <h1 className='text-xl font-light !font-body'>{album.camera}</h1>
          <h1 className='text-xl font-light !font-body'>{album.film_type}</h1>
        </>
      }
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-6">
        <a
          href="/"
          className="group inline-flex items-center gap-3 px-6 py-3 border transition-all duration-500 font-mono text-[11px] uppercase tracking-[0.3em]"
          rel='noopener noreferrer'
        >
          Back to Gallery
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" aria-hidden="true">
            <path d="M7 7h10v10"></path>
            <path d="M7 17 17 7"></path>
          </svg>
        </a>
      </div>
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
