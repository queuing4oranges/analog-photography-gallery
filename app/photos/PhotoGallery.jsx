import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const API_BASE_URL = process.env.API_BASE_URL;

async function getPhotos() {
    const res = await fetch(`${API_BASE_URL}/images/read.php`, { //TODO change this endpoint and also the attributes of it below
        next: {
            //revalidate: 604800 //sets the interval when it is refetched again (604800 = 1 week)
            revalidate: 0 // not cached
        }
    });
    
    return await res.json();
}


export default async function PhotoGallery() {
    const imgs = await getPhotos();
if (imgs) {console.log(imgs)}
    return (
        <>
            <div>PhotoGallery</div>
            {imgs && imgs.map((img, idx) =>{
                return (
                    <Link href={`/photos/${img.id}`} key={idx}>
                        <Image
                            src={`${API_BASE_URL}/images/images/${img.filename}`}
                            alt={img.title}
                            width={400}
                            height={600}
                            quality={70}
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
