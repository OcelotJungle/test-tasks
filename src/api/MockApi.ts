import { readFile } from "fs/promises";
import Manager from "../models/Manager";
import Api from "./Api.interface";
import Rukovoditel from "../types/Rukovoditel";
import { convertApiFormatToModels } from "../converters/api-format-to-models";
import MaybeString from "../types/MaybeString";

class MockApi implements Api {
    private cache?: Manager[];
    private dataFilename: string;

    constructor(mockDataFilename: MaybeString) {
        if (!mockDataFilename) throw new Error("Mock data filename not specified");

        this.dataFilename = mockDataFilename;
    }

    async fetch(): Promise<Manager[]> {
        if(!this.cache) {
            const rawMockData = await readFile(this.dataFilename, { encoding: "utf8" });
            const rawApiLikeData = JSON.parse(rawMockData) as Rukovoditel[];
            this.cache = convertApiFormatToModels(rawApiLikeData);
        }

        return new Promise(resolve => resolve(this.cache!));
    }
}

export default MockApi;