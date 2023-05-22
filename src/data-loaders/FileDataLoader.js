import { readFile } from "node:fs/promises";
import { DataLoader } from "./index.js";
import path from "node:path";

class FileDataLoader extends DataLoader {
    async load(uri = "") {
        const filePath = path.resolve(process.cwd(), uri);
        const data = await readFile(filePath, { encoding: "utf8" });

        return data;
    }
}

export default FileDataLoader;