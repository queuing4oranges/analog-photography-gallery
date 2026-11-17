"use server"
import { createServerSupabaseClient } from "../server";

/* Get albums - read data only*/

// fetch all albums
export async function getAlbums() {
  const supabase = await createServerSupabaseClient();

  const { data: albums, error: albumsError } = await supabase
    .from("albums")
    .select("id, created_at, slug, name")

  if (albumsError || !albums) {
    console.error(albumsError?.message);
    return null;
  }

  return albums;
}
