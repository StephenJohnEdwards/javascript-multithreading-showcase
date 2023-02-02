import {gzipBlob} from "../utils";

onmessage = (messageEvent) => {
    (async () => {
        const fileBlob = messageEvent.data;
        const gzipped = await gzipBlob(fileBlob);
        postMessage(gzipped);
    })();
}