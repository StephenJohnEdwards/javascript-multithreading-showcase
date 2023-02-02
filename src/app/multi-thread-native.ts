import { saveAs } from "file-saver";
import {
  blobFromFile,
  clearEventListeners,
  queryForApplicationControls,
  writeTitle,
} from "./utils";

export async function multiThreadNativeApi(domDocument: Document) {
  writeTitle(domDocument, "Example 2: multi threaded native worker API");
  const { zipButton, fileInput } = clearEventListeners(
    domDocument,
    queryForApplicationControls
  );

  const worker = new Worker(new URL("./workers/native", import.meta.url));

  worker.addEventListener("message", (workerMessage) => {
    const gzipBlob = workerMessage.data;
    saveAs(gzipBlob, `gzipped-file.gz`);
  });

  zipButton!.addEventListener("click", async () => {
    if (fileInput.files) {
      const fileBlob = await blobFromFile(fileInput.files![0]);
      worker.postMessage(fileBlob);
    }
  });
}
