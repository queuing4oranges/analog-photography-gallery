"use client";

import React, { useState } from "react";
import { createAlbum, uploadPhotos } from "../../actions/albums.server";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";
import { albumDetails, photoDetails } from "./albumData";
import { useRouter } from "next/navigation";

export default function CreateForm({ albums }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);

    const result = await createAlbum(formData);

    if (!result?.success) {
      toast(result.message, {
        className: "p-0 w-[400px] border border-[#a93f06]",
      });
      return;
    }

    toast(result.message, {
      className: "p-0 w-[400px] border border-[#3F6B2A]",
    });

    form.reset();
    router.refresh();
  }

  async function handleUploadPhotos(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // add every selected photo
    files.forEach((file) => {
      formData.append("photos", file);
    });

    const result = await uploadPhotos(formData);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert(result.message);
    setFiles([]);
  }

  // add files to state
  function addFiles(newFiles) {
    const imageFiles = Array.from(newFiles).filter((file) =>
      file.type?.startsWith("image/")
    );

    setFiles((currentFiles) => [
      ...currentFiles,
      ...imageFiles,
    ]);
  }

  // handle when files are dropped
  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    addFiles(event.dataTransfer.files);
  }

  // handle when files are selected using the file picker
  function handleFileChange(event) {
    addFiles(event.target.files);
    event.target.value = "";
  }

  // get all albums names for drop down
  function getAlbumName(albums) {
    return [...albums].sort((a, b) => a.name.localeCompare(b.name));
  }
  const sortedAlbums = getAlbumName(albums);

  return (
    <section className="mt-4 create-form-container pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg space-y-12" data-testid="upload-form">
        <BackButton />
        <header className="space-y-1">
          <h1 className="text-2xl font-medium tracking-tight">Uploads</h1>
          <p className="text-sm text-white/50">
            Create a new album or add photos to an existing one.
          </p>
        </header>

        {/* add album */}
        <section className="space-y-5" data-testid="album-section">

          {/* on submit, send to server and run createAlbum on server */}
          <form onSubmit={handleCreateAlbum}>

            <div className="flex items-baseline justify-between border-b border-white/15">
              <h2 className="text-m uppercase tracking-wider text-white/80">
                New album
              </h2>
              <span className="text-xs text-white/35">optional</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {albumDetails?.map((album) => (
                <div className="space-y-2" key={album.id}>
                  <label
                    htmlFor={album.htmlFor}
                    className="font-medium text-xs uppercase tracking-wider text-white/60"
                  >
                    {album.label}
                  </label>
                  <input
                    type="text"
                    id={album.id}
                    name={album.name}
                    placeholder={album.placeholder}
                    className="w-full bg-transparent border border-white/20 px-3 py-2 h-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                  />
                </div>
              ))}
            </div>

            <button
              className="w-full bg-white text-black hover:bg-white/85 px-5 py-2 h-9 text-xs mt-4 uppercase tracking-wider"
              data-testid="album-submit-btn"
              type="submit"
            >
              Create new album (optional)
            </button>
          </form>
        </section>

        {/* add photos */}
        <section className="space-y-5" data-testid="photos-section">
          <div className="flex items-baseline justify-between border-b border-white/15">
            <h2 className="text-m uppercase tracking-wider text-white/80">
              Add photos
            </h2>
          </div>

          <form onSubmit={handleUploadPhotos}>
            <div className="space-y-2">
              <select
                defaultValue=""
                type="button"
                className="flex items-center justify-between w-full capitalize border border-white/20 px-3 py-2 h-10 text-sm text-white/60 max-h-[40px] overflow-y-auto"
                name="albumId"
                required
              >
                <option value="" disabled>
                  Choose an album
                </option>
                  {sortedAlbums?.map((alb) => (
                    <option
                      className="font-medium text-xs uppercase tracking-wider bg-black text-white/60"
                      key={alb.id}
                      value={alb.id}
                    >
                      {alb.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {photoDetails?.map((album) => (
                <div className="space-y-2" key={album.id}>
                  <label
                    htmlFor={album.htmlFor}
                    className="font-medium text-xs uppercase tracking-wider text-white/60"
                  >
                    {album.label}
                  </label>
                  <input
                    type="text"
                    id={album.id}
                    name={album.name}
                    placeholder={album.placeholder}
                    className="w-full bg-transparent border border-white/20 px-3 py-2 h-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                  />
                </div>
              ))}
            </div>

            {/* drag-and-drop component*/}
            <div className="mt-5 bg-transparent border border-white/20 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white border-2 border-dashed border-[#999]">
              <label
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className="pt-2 font-medium text-xs uppercase tracking-wider text-white/60 bg-white/30 block h-15 cursor-pointer text-center"
              >
                <p>Drag photos here, or click to select</p>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  hidden
                />
              </label>

              <p>{files.length} photos selected</p>

              <div className="flex flex-wrap gap-3">
                {files.map((file, index) => (
                  <div key={`${file.name}-${index}`}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      width="120"
                      height="120"
                      style={{ objectFit: "cover" }}
                    />
                    <p>{file.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full bg-white text-black hover:bg-white/85 px-5 py-2 h-9 text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
              type="submit"
            >
              Add Images to Album
            </button>
          </form>
        </section>
      </div>
    </section>
  )
}
