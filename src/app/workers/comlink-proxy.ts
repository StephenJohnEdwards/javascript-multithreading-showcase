import * as Comlink from 'comlink';
import {gzipBlob} from "../utils";

const comlinkWithProxy = {
    async zipAndCallback(fileBlob: Blob, callback: (zipBlob: Blob) => Promise<void>): Promise<void> {
        const zippedFile = await gzipBlob(fileBlob);
        await callback(zippedFile);
    }
}

Comlink.expose(comlinkWithProxy);