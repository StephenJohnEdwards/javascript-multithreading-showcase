import { saveAs } from "file-saver";
import { gzip } from "pako";
import * as Comlink from "comlink";
import {
  blobFromFile,
  clearEventListeners,
  createDiv,
  queryForApplicationControls,
  testButtonEventCallback,
  writeTitle,
} from "./utils";

export async function singleThreadApplication(domDocument: Document) {
  writeTitle(domDocument, "Example 1: Single threaded");

  const { zipButton, fileInput } = clearEventListeners(
    domDocument,
    queryForApplicationControls
  );

  zipButton!.addEventListener("click", async () => {
    if (fileInput.files) {
      const firstFile = fileInput.files![0];
      const fileBlob = await blobFromFile(firstFile);
      const byteArray = new Uint8Array(await fileBlob.arrayBuffer());
      const zipped = gzip(byteArray);
      const gzipFile = new Blob([zipped], { type: "application/gzip" });
      saveAs(gzipFile, `${firstFile.name}.gz`);
    }
  });
}
