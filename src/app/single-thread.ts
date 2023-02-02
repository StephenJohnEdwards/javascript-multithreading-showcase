import { saveAs } from "file-saver";
import { gzip } from "pako";
import * as Comlink from "comlink";
import {
  clearEventListeners,
  createDiv,
  queryForApplicationControls,
  testButtonEventCallback,
  writeTitle,
} from "./utils";

export async function singleThreadApplication(domDocument: Document) {
  writeTitle(domDocument, "Example 1: Single threaded");

  const { addBoxesButton, zipButton, greenBoxesContainer, fileInput } =
    clearEventListeners(domDocument, queryForApplicationControls);

  addBoxesButton!.addEventListener(
    "click",
    testButtonEventCallback(greenBoxesContainer!)
  );

  zipButton!.addEventListener("click", async () => {
    if (fileInput.files) {
      const arrayBuffer = await fileInput.files![0].arrayBuffer();
      fileInput.files;
      const blobForFile = new Blob([arrayBuffer], {
        type: fileInput.files[0]!.type,
      });
      const byteArray = new Uint8Array(await blobForFile.arrayBuffer());
      const zipped = gzip(byteArray);
      const theBlob = new Blob([zipped], { type: "application/gzip" });
      saveAs(theBlob, `${fileInput.files[0].name}.gz`);
    }
  });
}
