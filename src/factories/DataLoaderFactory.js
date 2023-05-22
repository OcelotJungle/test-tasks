import { DataLoader, FileDataLoader } from "../data-loaders/index.js";

const DataLoaderType = {
    File: "file",
}

class DataLoaderFactory {
    static create(type = "") {
        switch(type) {
            case DataLoaderType.File:
                return new FileDataLoader();

            default:
                console.error(`No data loader with type '${type}'`)
                return new DataLoader();
        }
    }
}

export default DataLoaderFactory;