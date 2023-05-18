import { readFile } from "fs/promises";
import { convertApiFormatToModels } from "../converters/api-format-to-models";
import { Api } from ".";
import { Manager } from "../models";
import { MaybeString, Rukovoditel } from "../types";

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