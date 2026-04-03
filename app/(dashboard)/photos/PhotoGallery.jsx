import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createServerSupabaseClient } from '../utils/supabase/server';

const SUPABASE_BASE_URL = process.env.SUPABASE_BASE_URL;

async function getPhotos() {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.from('photos').select()

    if (error) console.error(error.message)

    return data
}


export default async function PhotoGallery() {
    const supabase = await createServerSupabaseClient();
    const imgs = await getPhotos();
    if (imgs) {console.log(imgs)};
    
    return (
        <>
            <div>PhotoGallery</div>
            {imgs && imgs.map((img, idx) =>{
                const bucketName = 'analog-images'
                const { data } = supabase.storage.from(bucketName).getPublicUrl(img.image_path)
                console.log(data.publicUrl, 'public url')
                return (
                    <Link href={`/photos/${img.id}`} key={idx}>
                        <Image
                            src={data.publicUrl}
                            alt={img.place}
                            width={400}
                            height={600}
                            quality={75}
                            unoptimized
                        />
                    </Link>
                )
            })}
            {imgs.length === 0 && (
                <p>Hier gibts leider nichts zu sehen</p>
            )}
        </>
    )
}
