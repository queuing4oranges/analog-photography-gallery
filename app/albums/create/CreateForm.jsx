"use client";

import React from "react";
import { createAlbum } from "../../actions/albums.server";


export default function CreateForm() {
  return (
    <section className="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg space-y-12" data-testid="upload-form">
        <header className="space-y-1">
          <h1 className="text-2xl font-medium tracking-tight">Upload photos</h1>
          <p className="text-sm text-white/50">
            Create a new album or add photos to an existing one.
          </p>
        </header>

        {/* add album */}
        <section className="space-y-5" data-testid="album-section">
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
              className="w-full bg-white text-black hover:bg-white/85 px-5 py-2 h-9 text-xs uppercase tracking-wider"
              data-testid="album-submit-btn"
              type="submit"
            >
              Save album
            </button>
          </form>
        </section>

        {/* add photos */}
        {/* <section className="space-y-5" data-testid="photos-section">
          <div className="flex items-baseline justify-between border-b border-white/15 pb-2">
            <h2 className="text-sm uppercase tracking-wider text-white/80">
              Add photos
            </h2>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-xs uppercase tracking-wider text-white/60">
              Album
            </label>
            <button
              type="button"
              className="flex items-center justify-between w-full border border-white/20 px-3 py-2 h-10 text-sm text-white"
            >
              <span>Choose an album</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 opacity-50"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-xs uppercase tracking-wider text-white/60">
              Photos
            </label>

            <div
              className="border border-dashed border-white/25 px-4 py-8 text-center cursor-pointer"
              data-testid="dropzone"
            >
              <p className="text-sm text-white/80">
                Drop photos here or{" "}
                <span className="underline underline-offset-4">browse</span>
              </p>
              <p className="text-xs text-white/40 mt-1">jpg, png, webp</p>

              <input
                multiple
                accept="image/*"
                type="file"
                className="hidden"
                data-testid="photo-file-input"
              />
            </div>
          </div>

          <button
            className="w-full bg-white text-black hover:bg-white/85 px-5 py-2 h-9 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            data-testid="photos-submit-btn"
          >
            Upload
          </button>
        </section> */}
      </div>
    </section>
  )
}
