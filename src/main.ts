import { fromEvent } from "rxjs";
import { singleThreadApplication } from "./app/single-thread";
import "./style/style.scss";
import { multiThreadNativeApi } from "./app/multi-thread-native";
import { multiThreadComlink } from "./app/multi-thread-comlink";
import { multiThreadComlinkProxy } from "./app/multi-thread-comlink-proxy";
(async () => {
  document.addEventListener("DOMContentLoaded", () => {
    const demoSelector = document.getElementById(
      "demo-selector"
    )! as HTMLSelectElement;

    singleThreadApplication(document);

    demoSelector.addEventListener("change", (changeEvent) => {
      switch (demoSelector.value) {
        case "multi-thread-native":
          multiThreadNativeApi(document);
          break;
        case "multi-thread-comlink":
          multiThreadComlink(document);
          break;
        case "comlink-with-proxy":
          multiThreadComlinkProxy(document);
          break;
        default:
          singleThreadApplication(document);
          break;
      }
    });

    // singleThreadApplication(document);
    // multiThreadNativeApi(document);
    // multiThreadComlink(document);
    // multiThreadComlinkProxy(document);
  });
})();
