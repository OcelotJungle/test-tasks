import { Parser } from "./index.js";

class NewlineParser extends Parser {
    parse(rawText = "") {
        return rawText.split("\n").map(s => s.trim());
    }
}

export default NewlineParser;