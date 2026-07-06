"use server"

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../../app/lib/server";

export async function createAlbum(formData) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Only admin can create an album"
    }
  }

  const { error } = await supabase.from("albums").insert({
    place: formData.get("place"),
    camera: formData.get("camera"),
    film_type: formData.get("film"),
    slug: formData.get("slug")?.trim(),
  });


  if (error) {
    const message = error.code === "23505"
      ? "An album with that URL path already exists"
      : error.message;
    return { success: false, message };
  }

  // update UI
  revalidatePath("/albums/create");

  return {
    success: true,
    message: "Album created successfully"
  }
}

export async function getAlbums() {
  const supabase = await createServerSupabaseClient();

  const { data: albums, error: albumsError } = await supabase
    .from("albums")
    .select("id, film_type, camera, place")

  if (albumsError || !albums) {
    console.error(albumsError?.message);
    return null;
  }

  return albums;
}

export async function uploadPhoto(formData) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Only admin can add photos"
    }
  }

  const file = formData.get("photo");
  const fileType = file?.type;
  const fileName = file?.name;
  const albumId = formData.get("albumId");

  if (!file || !albumId) {
    return { success: false, message: "Missing file or album" };
  }

  if (file.size > 102400) {
    return { success: false, message: "File is too big. Maximum is 100kB" };
  }

  const allowedFileTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedFileTypes.includes(fileType)) {
    return { success: false, message: "File must be JPEG, PNG, or WEBP" };
  }

  const filePath = `${albumId}/${fileName}`;
  const { error: uploadError } = await supabase.storage
    .from("analog-images")
    .upload(filePath, file);

  if (uploadError) {
    return { success: false, message: uploadError.message };
  }

  const { error: dbError } = await supabase
    .from("photos")
    .insert({
      album_id: albumId,
      image_path: filePath,
    });

  if (dbError) {
    return { success: false, message: dbError.message };
  }

  // update UI
  revalidatePath("/albums/create");

  return {
    success: true,
    message: "Photos added successfully"
  }
}
