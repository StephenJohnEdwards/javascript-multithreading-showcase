import { gzip } from "pako";
import { ApplicationControls } from "./types";

export async function gzipBlob(fileBlob: Blob) {
  const byteArray = new Uint8Array(await fileBlob.arrayBuffer());
  const zipped = gzip(byteArray);
  return new Blob([zipped], { type: "application/gzip" });
}

export function createDiv(content: string) {
  const divElement = document.createElement("div");
  divElement.classList.add("text-bg-success", "p-3");
  divElement.textContent = content;
  return divElement;
}

export function queryForApplicationControls(
  domDocument: Document
): ApplicationControls {
  const fileInput = domDocument.getElementById(
    "file-upload"
  )! as HTMLInputElement;

  const zipButton = domDocument.getElementById("start-zip")!;

  return { fileInput, zipButton };
}

export function testButtonEventCallback(concurrencyTestContainer: HTMLElement) {
  return () => {
    const divs = concurrencyTestContainer.querySelectorAll("div");
    const divCount = divs.length;
    const newDiv = createDiv(`${divCount + 1}`);
    concurrencyTestContainer.appendChild(newDiv);
  };
}

export function writeTitle(domDocument: Document, title: string) {
  const heading = document.querySelector("h1");
  heading!.textContent = title;
}

export function clearEventListeners(
  domDocument: Document,
  applicationControlsQueryFn: (domDocument: Document) => ApplicationControls
): ApplicationControls {
  function cloneNode(node: HTMLElement): HTMLElement {
    const newNode = node.cloneNode(true);
    const targetNode = node.parentNode!;
    targetNode.replaceChild(newNode, node);
    return newNode as HTMLElement;
  }

  const { zipButton: oldZipButton, fileInput: oldFileInput } =
    applicationControlsQueryFn(domDocument);

  return {
    zipButton: cloneNode(oldZipButton),
    fileInput: cloneNode(oldFileInput) as HTMLInputElement,
  };
}

export async function blobFromFile(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  return new Blob([arrayBuffer], {
    type: file.type,
  });
}
