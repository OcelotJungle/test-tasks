import dotenv from "dotenv";
dotenv.config();

import minimist from "minimist";
import {
    DataLoaderFactory,
    ParserFactory,
    ParserType,
    PhraseComparerFactory
} from "./factories/index.js";

const argv = minimist(process.argv.slice(2));

const {
    DOCTORS_URI,
    SERVICES_URI,
    PHRASE_COMPARISON_SCORE_THRESHOLD
} = process.env;

if(!DOCTORS_URI) throw new Error("Doctors uri is not defined");
if(!SERVICES_URI) throw new Error("Services uri is not defined");
if(!PHRASE_COMPARISON_SCORE_THRESHOLD) throw new Error("Phrase comparison score threshold uri is not defined");

async function main() {
    const dataLoader = DataLoaderFactory.create(argv.loader);
    const jsonParser = ParserFactory.create(ParserType.Json);
    const newlineParser = ParserFactory.create(ParserType.Newline);

    const doctors = await loadAndParse(DOCTORS_URI, dataLoader, jsonParser);
    const services = await loadAndParse(SERVICES_URI, dataLoader, newlineParser);

    const phraseComparer = PhraseComparerFactory.create(argv.comparer);
    const scoreThreshold = Number(PHRASE_COMPARISON_SCORE_THRESHOLD);

    const mappings = new Map();

    for(const doctor of doctors) {
        const appropriateServices = [];

        for(const service of services) {
            const score = await phraseComparer.compare(doctor.name, service);
            if(score >= scoreThreshold) {
                appropriateServices.push(service);
            }
        }

        mappings.set(doctor, appropriateServices);
    }

    for(const [doctor, services] of mappings) {
        console.log(`Доктор: ${doctor.name}`);
        console.log(services.map(s => `    - ${s}`).join("\n"));
    }
}

async function loadAndParse(uri = "", loader, parser) {
    const rawData = await loader.load(uri);
    const parsedData = parser.parse(rawData);

    return parsedData;
}

main();