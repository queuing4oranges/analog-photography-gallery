"use server"

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../../app/lib/server";

/*Create, edit, delete = album mutations*/

// create an album
export async function createAlbum(formData) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Only admin can create an album"
    }
  }

  const name = formData.get("name")?.toString().trim();
  const slug = formData.get("slug")?.toString().trim();

  if (!name || !slug) {
    return {
      success: false,
      message: "All fields are required"
    }
  }

  const { error } = await supabase.from("albums").insert({
    name, slug
  });


  if (error) {
    const message = error.code === "23505" // in PostgreSQL, error code 23505 means unique_violation
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

// upload an image
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
  const place = formData.get("place");
  const camera = formData.get("camera");
  const film_type = formData.get("film_type");

  const tags = formData.get("tags")
    ?.toString()
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean) || [];

  if (!file || !albumId) {
    return { success: false, message: "Missing file or album" };
  }

  if (file.size > 102400) {
    return { success: false, message: "File is too big. Maximum is 100kB" };
  }

  const allowedFileTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedFileTypes.includes(fileType) || !fileType ) {
    return { success: false, message: "File must be JPEG, PNG, or WEBP" };
  }

  // uploading image to storage
  const filePath = `${albumId}/${fileName}`;
  const { error: uploadError } = await supabase.storage
    .from("analog-images")
    .upload(filePath, file);

  if (uploadError) {
    return { success: false, message: uploadError.message };
  }

  // uploading image info to database
  const { error: dbError } = await supabase
    .from("photos")
    .insert({
      album_id: albumId,
      image_path: filePath,
      place: place,
      camera: camera,
      film_type: film_type,
      tags: tags
    });

  if (dbError) {
    console.error("Database insert failed:", dbError);
    return { success: false, message: dbError.message };
  }

  // update UI
  revalidatePath("/albums/create");

  return {
    success: true,
    message: "Photo added successfully"
  }
}

// upload multiple images
export async function uploadPhotos(formData) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Not authorized" };
  }

  // get all selected files
  const files = formData.getAll("photos");

  // shared information for all bulk upload
  const albumId = formData.get("albumId");
  const place = formData.get("place");
  const camera = formData.get("camera");
  const film_type = formData.get("film_type");

  const tags = formData.get("tags")
    ?.toString()
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean) || [];

  if (!files.length || !albumId) {
    return { success: false, message: "Select photos and an album" };
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  // Validate every file before uploading anything
  for (const file of files) {
    if (!(file instanceof File) || !file.size) {
      return { success: false, message: "Invalid file" };
    }

    if (!allowedTypes.includes(file.type)) {
      return { success: false, message: "Unsupported image type" };
    }

    if (file.size > 102400) {
      return { success: false, message: "A photo is too large (100kB max)" };
    }
  }

  const uploadedPaths = [];
  const photoRows = [];

  // upload each file to storage
  for (const file of files) {
    // const filePath = `${albumId}/${randomUUID()}-${file.name}`;
    const filePath = `${albumId}-${file.name}`;

    const { error } = await supabase.storage
      .from("analog-images")
      .upload(filePath, file);

    if (error) {
      // clean up files already uploaded in this batch
      if (uploadedPaths.length) {
        await supabase.storage
          .from("analog-images")
          .remove(uploadedPaths);
      }

      return { success: false, message: error.message };
    }

    uploadedPaths.push(filePath);

    photoRows.push({
      album_id: albumId,
      image_path: filePath,
      place,
      camera,
      film_type,
      tags,
    });
  }

  // insert all in table, in one database operation
  const { error: dbError } = await supabase
    .from("photos")
    .insert(photoRows);

  if (dbError) {
    await supabase.storage
      .from("analog-images")
      .remove(uploadedPaths);

    console.error("Photo database insert failed:", dbError);

    return { success: false, message: dbError.message };
  }

  revalidatePath("/albums/create");

  return {
    success: true,
    message: `${files.length} photos uploaded successfully`,
  };
}

