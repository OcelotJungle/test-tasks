import { Parser } from "./index.js";

class JsonParser extends Parser {
    parse(rawText = "") {
        return JSON.parse(rawText);
    }
}

export default JsonParser;