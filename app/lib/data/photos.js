"use server"
import { createServerSupabaseClient } from "../server";

export async function getPhotos() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("albums")
    .select(`id, id, created_at, slug, name,
            photos (id, album_id, image_path, image_path)
        `);

  if (error) {
    console.error(error.message)
    return [];
  }

  const bucketName = "analog-images";

  // sort albums - safeguard against null
  const albums = data.sort((a, b) => (a.place ?? '').localeCompare(b.place ?? ''));

  return albums?.map((album) => {
    const cover = album.photos?.[0];

    const publicUrl = cover
      ? supabase.storage.from(bucketName).getPublicUrl(cover.image_path).data.publicUrl
      : null;

    return {
      ...album,
      coverUrl: publicUrl,
    };
  });
}