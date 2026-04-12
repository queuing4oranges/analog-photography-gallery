import React from 'react';
import { createServerSupabaseClient } from '../lib/server';
import Carousel from './Carousel';

async function getPhotos() {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
        .from('albums')
        .select(`id, film_type, camera, place, slug,
            photos (id, album_id, image_path, image_path)
        `);

    if (error) console.error(error.message)

    return data
}


export default async function PhotoGallery() {
    const albums = await getPhotos();
    
    return (
        <>
            <div>PhotoGallery</div>
            {albums && albums.map((album) => (
                <div key={album.id} className="mb-10">
                    <h3 className="text-xl font-bold">{album.camera}/ {album.film_type}</h3>
                    <Carousel album={album.photos}/>
                </div>
            ))}
        </>
    )
}
