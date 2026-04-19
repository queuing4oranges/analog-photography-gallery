import Image from "next/image";
import PhotoGallery from "./components/PhotoGallery";

export default function Home() {
  return (
    <main className="px-5">
      {/* <h2>Analogue Photography</h2> */}
      <PhotoGallery />
      {/* TODO SEARCH? <input type="text" /> */}
    </main>
  );
}
