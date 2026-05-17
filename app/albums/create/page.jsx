import { getAlbums } from "../../actions/albums.server";
import CreateForm from "./CreateForm";

export default async function AddPhoto() {
  const albums = await getAlbums();

  return (
    <main>
      <CreateForm albums={albums} />
    </main>
  );
}
