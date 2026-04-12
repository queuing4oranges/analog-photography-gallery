import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const API_BASE_URL = process.env.API_BASE_URL;

export const dynamicParams = true; // util if route for a specific img is not created yet

export async function generateStateParams() { // will pre-render the images to improve performance
    const res = await fetch(`${API_BASE_URL}/images/read.php`);
    const imgs = await res.json();
    
    return imgs.map((img) => ({
        id: img.id
    }))
}

async function getPhotos() {
    const res = await fetch(`${API_BASE_URL}/images/read.php`, {
        next: { revalidate: 60 },
    });

    const text = await res.text();

    try {
        const data = JSON.parse(text);
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error('Failed to parse gallery JSON:', text);
        return [];
    }
}

export default async function PhotoDetail({ params }) {
    const { id } = await params; // async param in App Router
    const imgs = await getPhotos();

    const img = imgs.find((i) => String(i.id) === String(id));

    if (!img) {
        notFound(); // out of the box fct that serves the 404 page
    }

    return (
        <main style={{ padding: '2rem' }}>
            <h2>{img.title}</h2>
            <Image
                src={`${API_BASE_URL}/images/images/${img.filename}`}
                alt={img.title}
                width={400}
                height={600}
                quality={70}
            />
            <div style={{ marginTop: '1rem' }}>
                <Link href="/photos">Back to gallery</Link>
            </div>
        </main>
    );
}