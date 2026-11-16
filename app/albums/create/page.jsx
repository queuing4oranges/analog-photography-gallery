import { getAlbums } from "../../lib/data/albums";
import CreateForm from "./CreateForm";

export default async function AddPhoto() {
  const albums = await getAlbums();

  return (
    <main>
      <CreateForm albums={albums} />
    </main>
  );
}
