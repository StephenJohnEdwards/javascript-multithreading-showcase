import { saveAs } from "file-saver";
import * as Comlink from "comlink";
import {
  blobFromFile,
  clearEventListeners,
  queryForApplicationControls,
  writeTitle,
} from "./utils";

export async function multiThreadComlink(domDocument: Document) {
  writeTitle(domDocument, "Example 3: multi threading with comlink");
  const { zipButton, fileInput } = clearEventListeners(
    domDocument,
    queryForApplicationControls
  );

  const worker = new Worker(new URL("./workers/comlink", import.meta.url));
  const comlinked = Comlink.wrap(worker) as {
    gzip: (fileBlob: Blob) => Promise<Blob>;
  };

  zipButton!.addEventListener("click", async () => {
    if (fileInput.files) {
      const firstFile = fileInput.files![0];
      const blobForFile = await blobFromFile(firstFile);
      const gzippedFile = await comlinked.gzip(blobForFile);
      saveAs(gzippedFile, `${firstFile.name}.gz`);
    }
  });
}
