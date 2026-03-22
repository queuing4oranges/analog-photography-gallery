import Image from 'next/image';
import Link from 'next/link';

const API_BASE_URL = process.env.API_BASE_URL;

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
        return (
            <main style={{ padding: '2rem' }}>
                <p>Bild nicht gefunden</p>
                <Link href="/photos">Zurück zur Galerie</Link>
            </main>
        );
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
                <Link href="/photos">Zurück zur Galerie</Link>
            </div>
        </main>
    );
}