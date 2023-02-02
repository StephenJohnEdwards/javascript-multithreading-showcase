import { saveAs } from "file-saver";

import * as Comlink from "comlink";
import {
  clearEventListeners,
  queryForApplicationControls,
  testButtonEventCallback,
  writeTitle,
} from "./utils";

export async function multiThreadComlink(domDocument: Document) {
  writeTitle(domDocument, "Example 3: multi threading with comlink");
  const { addBoxesButton, zipButton, greenBoxesContainer, fileInput } =
    clearEventListeners(domDocument, queryForApplicationControls);

  const worker = new Worker(new URL("./workers/comlink", import.meta.url));
  const comlinked = Comlink.wrap(worker) as {
    gzip: (fileBlob: Blob) => Promise<Blob>;
  };

  addBoxesButton!.addEventListener(
    "click",
    testButtonEventCallback(greenBoxesContainer!)
  );

  zipButton!.addEventListener("click", async () => {
    if (fileInput.files) {
      const firstFile = fileInput.files![0];
      const arrayBuffer = await firstFile.arrayBuffer();
      fileInput.files;
      const blobForFile = new Blob([arrayBuffer], {
        type: firstFile.type,
      });
      const gzippedFile = await comlinked.gzip(blobForFile);
      saveAs(gzippedFile, `${firstFile.name}.gz`);
    }
  });
}
