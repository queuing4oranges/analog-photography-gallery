"use client";

import React, { useState, useRef } from "react";
import { createAlbum, uploadPhoto } from "../../actions/albums.server";


export default function CreateForm({ albums }) {
  const [allAlbums, setAllAlbums] = useState(albums);
  const [selectedFile, setSelectedFile] = useState(null);
  const [albumId, setAlbumId] = useState("");
  const uploadRef = useRef(null);

  return (
    <section className="create-form-container pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg space-y-12" data-testid="upload-form">
        <header className="space-y-1">
          <h1 className="text-2xl font-medium tracking-tight">Upload photos</h1>
          <p className="text-sm text-white/50">
            Create a new album or add photos to an existing one.
          </p>
        </header>

        {/* add album */}
        <section className="space-y-5" data-testid="album-section">

          {/* on submit, send to server and run createAlbum on server */}
          <form action={createAlbum}>

            <div className="flex items-baseline justify-between border-b border-white/15 pb-2">
              <h2 className="text-sm uppercase tracking-wider text-white/80">
                New album
              </h2>
              <span className="text-xs text-white/35">optional</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label
                  htmlFor="place"
                  className="font-medium text-xs uppercase tracking-wider text-white/60"
                >
                  Place
                </label>
                <input
                  type="text"
                  id="place"
                  name="place"
                  placeholder="Prague"
                  className="w-full bg-transparent border border-white/20 px-3 py-2 h-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="slug"
                  className="font-medium text-xs uppercase tracking-wider text-white/60"
                >
                  URL path
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  placeholder="/prague-2"
                  className="w-full bg-transparent border border-white/20 px-3 py-2 h-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label
                  htmlFor="camera"
                  className="font-medium text-xs uppercase tracking-wider text-white/60"
                >
                  Camera
                </label>
                <input
                  type="text"
                  id="camera"
                  name="camera"
                  placeholder="Pentax MX"
                  className="w-full bg-transparent border border-white/20 px-3 py-2 h-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="film"
                  className="font-medium text-xs uppercase tracking-wider text-white/60"
                >
                  Film type
                </label>
                <input
                  type="text"
                  id="film"
                  name="film"
                  placeholder="Kodak Ultramax 400"
                  className="w-full bg-transparent border border-white/20 px-3 py-2 h-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                />
              </div>
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
          <div className="flex items-baseline justify-between border-b border-white/15 pb-2">
            <h2 className="text-sm uppercase tracking-wider text-white/80">
              Add photos
            </h2>
          </div>

          <form action={uploadPhoto}>
            <div className="space-y-2">
              <label className="font-medium text-xs uppercase tracking-wider text-white/60">
                Choose an album
                <select
                  type="button"
                  className="flex items-center justify-between w-full capitalize border border-white/20 px-3 py-2 h-10 text-sm text-white/60"
                  name="albumId"
                >
                  {allAlbums && allAlbums.map((alb, idx) => (
                    <option
                      className="font-medium text-xs uppercase tracking-wider bg-black text-white/60"
                      key={idx}
                      value={alb.id}
                      onChange={() => setAlbumId(alb.id)}
                    >
                      {alb.place}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="photo" className="font-medium text-xs uppercase tracking-wider text-white/60 mt-2">
                Photos ( max. 100kB)
                {/* {error &&
                  <p className="text-red-400 text-xs">
                    {error}
                  </p>
                } */}
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
