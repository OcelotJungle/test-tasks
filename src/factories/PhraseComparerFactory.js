import {
    PhraseComparer,
    ParaphraserPhraseComparer
} from "../phrase-comparers/index.js";

const PhraseComparerType = {
    Paraphraser: "paraphraser",
}

class PhraseComparerFactory {
    static create(type = "") {
        switch(type) {
            case PhraseComparerType.Paraphraser:
                return new ParaphraserPhraseComparer(
                    process.env.PARAPHRASER_TOKEN,
                    process.env.PARAPHRASER_LANG,
                    process.env.PARAPHRASER_TYPE,
                    process.env.PARAPHRASER_FORMAT
                );

            default:
                console.error(`No phrase comparer with type ${type}`);
                return new PhraseComparer();
        }
    }
}

export default PhraseComparerFactory;