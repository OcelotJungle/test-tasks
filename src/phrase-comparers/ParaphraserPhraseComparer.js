import axios from "axios";
import { PhraseComparer } from "./index.js";

const Language = {
    Ru: "ru",
    En: "en"
};

const Type = {
    Vector: "vector",
    Syn: "syn",
    Root: "root"
};

class ParaphraserPhraseComparer extends PhraseComparer {
    #token = "";
    #lang = "";
    #type = "";
    #format = "";

    #url = "";

    constructor(
        token = "",
        lang = Language.Ru,
        type = Type.Vector,
        format = "json"
    ) {
        this.#token = token;
        this.#lang = lang;
        this.#type = type;
        this.#format = format;

        this.#url = process.env.PARAPHRASER_URL;
    }

    async compare(phraseA = "", phraseB = "") {
        const data = this.#getResponseData(phraseA, phraseB);
        const response = await axios.post(this.#url, { data });

        return this.#getScore(response.data);
    }

    #getResponseData(phraseA = "", phraseB = "") {
        return {
            c: "sim",
            token: this.#token,
            type: this.#type,
            lang: this.#lang,
            format: this.#format,
            query: `${phraseA};${phraseB}`,
        };
    }

    #getScore(data = {}) {
        return Number(data.response["1"].sim.score);
    }
}

export default ParaphraserPhraseComparer;