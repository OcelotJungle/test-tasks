import { JsonParser, NewlineParser, Parser } from "../parsers/index.js"

const ParserType = {
    Json: "json",
    Newline: "newline"
}

class ParserFactory {
    static create(type = "") {
        switch(type) {
            case ParserType.Json:
                return new JsonParser();

            case ParserType.Newline:
                return new NewlineParser();

            default:
                console.error(`No parser with type ${type}`);
                return new Parser();
        }
    }
}

export { ParserFactory as default, ParserType };