"use client";

import React, { useState, useRef } from "react";
import { createAlbum, uploadPhoto } from "../../actions/albums.server";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";
import { albumDetails, photoDetails } from "./albumData";
import { useRouter } from "next/navigation";

export default function CreateForm({ albums }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const uploadRef = useRef(null);
  const router = useRouter();

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
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

    router.refresh();
  }

  const handleUploadPhoto = async (formData) => {
    const result = await uploadPhoto(formData);

    if(!result.success) {
      toast(result.message, {
        className: "p-0 w-[400px] border border-[#a93f06]",
      });
    } else {
        toast(result.message, {
          className: "p-0 w-[400px] border border-[#3F6B2A]",
        });
    }
  }

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

          <form action={handleUploadPhoto}>
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
                {/* TODO sort album titles and make scrollbar */}
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

            <div className="space-y-2 flex flex-col">
              <label htmlFor="photo" className="font-medium text-xs uppercase tracking-wider text-white/60 mt-2">
                Photos ( max. 100kB)
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => uploadRef.current?.click()}
                  className="border border-white/20 px-4 h-10 text-sm"
                >
                  Choose file
                </button>

                <span className="text-sm text-white/50">
                  {selectedFile ? selectedFile.name : "No file chosen"}
                </span>
              </div>
              <input
                ref={uploadRef}
                name="photo"
                id="photo"
                accept="image/*"
                type="file"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files?.[0])}
              />
            </div>

            <button
              className="w-full bg-white text-black hover:bg-white/85 px-5 py-2 h-9 text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
              type="submit"
            >
              Add Image to Album
            </button>
          </form>
        </section>
      </div>
    </section>
  )
}
