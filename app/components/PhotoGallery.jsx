import React from 'react';
import { createServerSupabaseClient } from '../lib/server';
import Carousel from './Carousel';

async function getPhotos() {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.from('photos').select()

    if (error) console.error(error.message)

    return data
}


export default async function PhotoGallery() {
    const supabase = await createServerSupabaseClient();
    const imgs = await getPhotos();
    
    return (
        <>
            <div>PhotoGallery</div>
            <Carousel
                imgs={imgs}
            />
        </>
    )
}
