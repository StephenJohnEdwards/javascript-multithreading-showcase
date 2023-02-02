import * as Comlink from 'comlink';
import {gzipBlob} from "../utils";

const gzipOperations = {
    async gzip(fileBlob: Blob) {
        return await gzipBlob(fileBlob);
    },
};

Comlink.expose(gzipOperations);
