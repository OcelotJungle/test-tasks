import { convertApiFormatToModels } from "../converters/api-format-to-models";
import Manager from "../models/Manager";
import MaybeString from "../types/MaybeString";
import Rukovoditel from "../types/Rukovoditel";
import Api from "./Api.interface";
import axios from "axios";

class FetchApi implements Api {
    private url: string;

    constructor(apiUrl: MaybeString) {
        if (!apiUrl) throw new Error("API url not specified");

        this.url = apiUrl;
    }

    async fetch(): Promise<Manager[]> {
        try {
            const response = await axios.get(this.url);
            return convertApiFormatToModels(response.data as Rukovoditel[]);
        } catch(e) {
            console.error(e);
            return [];
        }
    }
}

export default FetchApi;