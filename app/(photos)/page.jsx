import React, { Suspense } from "react";
import PhotoGallery from "../components/PhotoGallery";
import Loading from "./loading";

export default function Photos() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <PhotoGallery />
      </Suspense>
    </main>
  );
}
