"use server"

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../../app/lib/server";

export async function createAlbum(formData) {
  const supabase = await createServerSupabaseClient();

  const place = formData.get("place") || null;
  const camera = formData.get("camera") || null;
  const film_type = formData.get("film") || null;
  const slug = formData.get("slug")?.trim() || null;

  // create album in table
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
    return
  }

  // update UI
  revalidatePath("/create");
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

  const file = formData.get("photo");
  const fileType = file?.type;
  const fileName = file?.name;
  const albumId = formData.get("albumId");

  if (!file || !albumId) return;

  //validate size
  if (file && file?.size > 102400) {
    // setError("File is too big. Maximum is 100kB");
    return;
  }

  //validate file type
  const allowedFileTypes = ["image/jpeg", "image/png", "image/webp"];
  if (fileType && !allowedFileTypes.includes(fileType)) {
    // setError("File can only be JPEG, PNG, WEBP");
    return;
  }

  // setError("");

  // upload file to supabase storage
  const filePath = `${albumId}/${fileName}`;
  const { error: uploadError } = await supabase.storage
    .from("analog-images")
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(uploadError.message);
    // setError(uploadError.message);
  }

  // insert metadata into DB
  const { error: dbError } = await supabase
    .from("photos")
    .insert({
      album_id: albumId,
      image_path: filePath,
      // image_url: publicUrl,
    });

  if (dbError) {
    throw new Error(dbError.message);
  }
  // https://jpjxxivnalbhhpnuplkf.supabase.co/storage/v1/object/public/analog-images/88d8333e-f26b-4ce4-8be7-4911cc78cf3d/escalator.jpg

  // FormData {
  //   '$ACTION_ID_407f1aa93ee430b90aa719b757b181471b133d0dbc': '',
  //     albumId: '273a6b21-0d59-4f4f-b2cb-bffd81416470',
  //       photo: File {
  //     size: 43748,
  //       type: 'image/webp',
  //         name: 'self-portrait.webp',
  //           lastModified: 1779038618027
  //   }
  // } FILE ===



  // update UI
  // revalidatePath("/albums/create");


}
