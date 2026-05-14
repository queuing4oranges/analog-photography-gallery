"use server"

import { createServerSupabaseClient } from "../../app/lib/server";

export async function createAlbum(formData) {
  const supabase = await createServerSupabaseClient();

  const place = formData.get("place") || null;
  const camera = formData.get("camera") || null;
  const film_type = formData.get("film") || null;
  const slug = formData.get("slug")?.trim() || null;

  const { error } = await supabase
    .from('albums')
    .insert({
      place,
      camera,
      film_type,
      slug,
    })
    .select()

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}