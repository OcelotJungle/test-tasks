import {
    PhraseComparer,
    ParaphraserPhraseComparer
} from "../phrase-comparers/index.js";

const PhraseComparerType = {
    Paraphraser: 0,
}

class PhraseComparerFactory {
    static create(type = -1) {
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