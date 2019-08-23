// NB: \u00A0 is NBSP.

import {
    Rule,
    literalRule,
    matchRule,
    regexRule,
    simpleRule,
} from "highlight-mistakes";

const DESC_NBSP = {
    bad: " ",
    good: "\u00A0", // NBSP
    info: "hårt mellanslag",
};

const DESC_NBH = {
    bad: "-",
    good: "‑",
    info: "hårt bindestreck",
};

const DESC_END = {
    bad: "-",
    good: "–",
    info: "tankstreck",
};

const literalNBSP = literalRule(DESC_NBSP);
const simpleNBSP = simpleRule(DESC_NBSP);
const matchNBSP = matchRule(DESC_NBSP);
const regexNBSP = regexRule(DESC_NBSP);

const literalNBH = literalRule(DESC_NBH);
const simpleNBH = simpleRule(DESC_NBH);
const matchNBH = matchRule(DESC_NBH);
const regexNBH = regexRule(DESC_NBH);

const literalEND = literalRule(DESC_END);
const simpleEND = simpleRule(DESC_END);
const matchEND = matchRule(DESC_END);
const regexEND = regexRule(DESC_END);

/*
IMPORTANT ABOUT RULES:

Capture groups are used internally if lookaround === "group". Using capture
groups in the rules themselves, when lookaround === "group", may result in
unexpected results.
*/

export const PATTERNS_MISTAKE_NB_SPACE = [
    /\d(?: \d{3})+/, // numbers
    /[A-Z][A-Za-z]+ \d+\.\d+/, // USB 3.0, HDMI 2.1, Bluetooth 4.2 etc
    /USB Type/,
    /4K UHD/,
    /Core i\d/, // Intel CPUs
    /\d \d{4}/, // AMD CPUs (7 2700X)
    /Geforce (?:G|R)TX\-/, // Geforce GTX-serien
    /Ryzen \d+\-/, // Ryzen 2-familjen, Ryzen 3000-serien
    /(?:G|R)TX \d+(?: Ti)?/, // Nvidia GPUs
    /Vega \d+/, // AMD GPUs
    /R\d \d+/, // AMD GPUs
    /DVI(?:[-‑][DI])? DL\b/,
    /[^.:]\u0020[A-ZÅÄÖ][a-zåäöé]+ \d{1,3}(?!\u00A0)\b/, // Battlefield 1, Far Cry 5; but not capitalized words at the start of sentences
];

/*
"lanseringen av Windows_7 år 2009" (with _ = NBSP) is tricky: We should not
expect an NBSP in "7 år" unless it actually means "7 år", so when looking for
numbers, we have to look for the beginning of the string or something that is
not an NBSP.
*/
const NUMBER = /(?:^|[^\u00A0])\d(?:\u00A0\d{3})*(?:,\d+)?/;

const RULES_NB_SPACE: ReadonlyArray<Rule> = [
    simpleNBSP(/[A-Z][A-Za-z]+/, /\d+\.\d+/), // USB 3.0, HDMI 2.1, Bluetooth 4.2 etc
    simpleNBSP(/\d/, /(?=\d{3})/),
    // Number followed by space, then unit, then something that is not a word character or
    // common Swedish letter:
    simpleNBSP(NUMBER, /(?:[nµmcdk]|[KMGTP]i?)?(?:s|g|m|Hz|b|bit|B|fps|FPS|V|W|Wh|kr|USD|EUR|°C|%|st|dBA?)(?=$|[^\wåäöé])/),
    simpleNBSP(NUMBER, /(?:nano|mikro|milli|centi|deci|hekto|kilo|mega|giga|tera|peta)?(?:sekund(?:er)?|gram|meter|hertz|bit|byte|tum|bilder|volt|watt|wattimmar|kronor|dollar|euro|procent|stycken|decibel|år)(?:$|[^\wåäöé])/),
    matchNBSP(/[^:.] [A-ZÅÄÖ][a-zåäöé]+/, / (?=\d)/, /\d{1,3}(?=[.,;: ])/), // Battlefield 1, Far Cry 5; but not capitalized words at the start of sentences
    simpleNBSP(/4K/, /UHD/),
    simpleNBSP(/USB/, /Type/),
    simpleNBSP(/Windows/, /95|98|ME|2000|XP|Vista|7|8(?:\.1)?|10/),
    simpleNBSP(/PCI/, /Express/),
    simpleNBSP(/Core/, /i\d/), // Intel CPUs
    simpleNBSP(/\d/, /\d{4}/), // AMD CPUs (7 2700X)
    regexNBSP(/[GR]TX \d{3,4}(?: Ti)?/), // RTX 2080 Ti
    simpleNBSP(/Geforce/, /[GR]TX-/), // Geforce GTX-serien
    simpleNBSP(/Ryzen/, /\d+-/), // Ryzen 2-familjen, Ryzen 3000-serien
    simpleNBSP(/Vega/, /\d+/), // AMD GPUs
    simpleNBSP(/R\d/, /\d+/), // AMD GPUs
    simpleNBSP(/DVI(?:[-‑][DI])?/, /DL/), // -‑ = hyphen and non-breaking hyphen
];

const RULES_NB_HYPHEN: ReadonlyArray<Rule> = [
    simpleNBH(/i\d/, /\d{4}/), // Intel CPUs
    simpleNBH(/Mini/, /ITX/),
    simpleNBH(/G/, /Sync/),
    simpleNBH(/V/, /[Ss]ync/),
    simpleNBH(/Counter/, /Strike/),
    simpleNBH(/DVI/, /(?:A|DL?|I)\b/), // DVI-A, DVI-D, DVI-DL, DVI-I
    simpleNBH(/Type/, /C\b/), // USB Type-C
    simpleNBH(/DDR\d/, /\d/), // DDR4-3200, LPDDR3-2133 etc
    simpleNBH(/i\d/, /\d{4}/), // Intel CPUs
    simpleNBH(/[A-Z][a-z]+/, /[A-Z]{1,2}\b/), // Haswell-E, Kaby Lake-X etc
    matchNBH(/\d+/, /-\d+(?:-\d+)+/, null), // dates, RAM latencies etc
];

const RULES_EN_DASH: ReadonlyArray<Rule> = [
    simpleEND(/^/, / /), // beginning of quote (talstreck)
    simpleEND(/(?:^|[^\d-])\d{1,3}(?:,\d+)?/, /\d+(?:,\d+)?(?=[^\d-]|$)/), // intervals, e.g. 2-5; 1,5-2,0)
    simpleEND(/(?:^|[^\d-])\d{4}/, /\d{4}(?=[^\d-]|$)/), // intervals of years, e.g. 1955–2011
    simpleEND(/ /, / /),
];

export const PATTERNS_MISTAKE_TIMES = [
    / x /,
];

export const RULES_TIMES: ReadonlyArray<Rule> = [
    simpleRule({ good: "×", bad: "x", info: "gångertecken" })(/ /, / /),
    simpleRule({ good: "×", bad: "x", info: "gångertecken" })(/\u00A0/, /\u00A0/),
];

// Non-breaking space, non-breaking hyphen, en dash:
export const PATTERN_DOPPELGANGERS = /\u00A0|‑|–|×/g; // \u00A0 = NBSP

const GIBBERISH = "sahdufhaweafdafda";

export const RULES: ReadonlyArray<Rule> = (([] as ReadonlyArray<Rule>)
    .concat([
        literalRule({
            bad: " × ",
            good: "\u00A0×\u00A0",
            info: "hårda mellanslag",
        })(null, null),
    ])
    .concat(RULES_NB_SPACE)
    .concat(RULES_NB_HYPHEN)
    .concat(RULES_EN_DASH)
    .concat(RULES_TIMES)
    .concat([
        // We also want to highlight good superscript:
        literalRule({
            bad: GIBBERISH,
            good: "²",
            info: null,
        })(null, null),
        literalRule({
            bad: GIBBERISH,
            good: "³",
            info: null,
        })(null, null),
    ])
);

export const RULES_SUP: ReadonlyArray<Rule> = [
    simpleRule({
        bad: `2`,
        good: GIBBERISH,
        info: "tecknet ² istället för en upphöjd tvåa",
    })(/^/, /$/),
    simpleRule({
        bad: `3`,
        good: GIBBERISH,
        info: "tecknet ³ istället för en upphöjd trea",
    })(/^/, /$/),
];
