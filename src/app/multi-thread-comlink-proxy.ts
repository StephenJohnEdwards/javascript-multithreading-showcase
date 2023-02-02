import { saveAs } from "file-saver";

import * as Comlink from "comlink";
import {
  clearEventListeners,
  queryForApplicationControls,
  testButtonEventCallback,
  writeTitle,
} from "./utils";

function saveFileWhenCompressedProxyFn(filename: string) {
  return Comlink.proxy((fileBlob: Blob) => {
    saveAs(fileBlob, filename);
  });
}

export async function multiThreadComlinkProxy(domDocument: Document) {
  writeTitle(
    domDocument,
    "Example 4: multi threading with comlink and callback"
  );
  const { addBoxesButton, zipButton, greenBoxesContainer, fileInput } =
    clearEventListeners(domDocument, queryForApplicationControls);

  const worker = new Worker(
    new URL("./workers/comlink-proxy", import.meta.url)
  );

  const comlinked = Comlink.wrap(worker) as {
    zipAndCallback: (
      fileBlob: Blob,
      callback: (zippedBlob: Blob) => void
    ) => Promise<void>;
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
      await comlinked.zipAndCallback(
        blobForFile,
        saveFileWhenCompressedProxyFn(`${firstFile.name}.gz`)
      );
    }
  });
}
