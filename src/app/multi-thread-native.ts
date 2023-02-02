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

export async function multiThreadNativeApi(domDocument: Document) {
  writeTitle(domDocument, "Example 2: multi threaded native worker API");
  const { addBoxesButton, zipButton, greenBoxesContainer, fileInput } =
    clearEventListeners(domDocument, queryForApplicationControls);

  const worker = new Worker(new URL("./workers/native", import.meta.url));

  worker.addEventListener("message", (workerMessage) => {
    const gzipBlob = workerMessage.data;
    saveAs(gzipBlob, `gzipped-file.gz`);
  });

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

      worker.postMessage(blobForFile);
    }
  });
}
