import {
    Rule,
    literalRule,
    matchRule,
    regexRule,
    simpleRule,
} from "highlight-mistakes";

const DESC_NBSP = {
    bad: " ",
    good: "&nbsp;",
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
    /[^.:]\u0020[A-ZÅÄÖ][a-zåäöé]+ \d{1,3}(?!&nbsp;)\b/, // Battlefield 1, Far Cry 5; but not capitalized words at the start of sentences
];

const RULES_NB_SPACE: ReadonlyArray<Rule> = [
    simpleNBSP(/[A-Z][A-Za-z]+/, /\d+\.\d+/), // USB 3.0, HDMI 2.1, Bluetooth 4.2 etc
    simpleNBSP(/\d/, /(?=\d{3})/),
    // Number followed by space, then unit, then something that is not a word character or
    // common Swedish letter:
    regexNBSP(/\d (?:[nµmcdk]|[KMGTP]i?)?(?:s|g|m|Hz|b|bit|B|fps|FPS|V|W|Wh|kr|USD|EUR|°C|%|st|dBA?)(?=$|[^\wåäöé])/),
    simpleNBSP(/\d+/, /(?:nano|mikro|milli|centi|deci|hekto|kilo|mega|giga|tera|peta)?(?:sekund(?:er)?|gram|meter|hertz|bit|byte|tum|bilder|volt|watt|wattimmar|kronor|dollar|euro|procent|stycken|decibel)(?:$|[^\wåäöé])/),
    matchNBSP(/[^:.] [A-ZÅÄÖ][a-zåäöé]+/, / (?=\d)/, /\d{1,3}(?=[.,;: ])/), // Battlefield 1, Far Cry 5; but not capitalized words at the start of sentences
    simpleNBSP(/4K/, /UHD/),
    simpleNBSP(/USB/, /Type/),
    simpleNBSP(/PCI/, /Express/),
    simpleNBSP(/Core/, /i\d/), // Intel CPUs
    simpleNBSP(/\d/, /\d{4}/), // AMD CPUs (7 2700X)
    regexNBSP(/[GR]TX \d{3,4}(?: Ti)?/), // RTX 2080 Ti
    simpleNBSP(/Geforce/, /[GR]TX-/), // Geforce GTX-serien
    simpleNBSP(/Ryzen/, /\d+-/), // Ryzen 2-familjen, Ryzen 3000-serien
    simpleNBSP(/Vega/, /\d+/), // AMD GPUs
    simpleNBSP(/R\d/, /\d+/), // AMD GPUs
    simpleNBSP(/DVI(?:[-‑][DI])?/, /DL/), // -‑ = hyphen and non-breaking hyphen
    // simpleNBSP(/\d/, /×/),
    // simpleNBSP(/×/, /\d/),
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
    matchNBH(/\d+/, /\d+(?:-\d+)+/, null), // dates, RAM latencies etc
];

const RULES_EN_DASH: ReadonlyArray<Rule> = [
    simpleEND(/(?:^|>)/, / /), // beginning of quote (talstreck); they are often enclosed in <em> tags
    simpleEND(/(?:^|[^\d-])\d{1,3}(?:,\d+)?/, /\d+(?:,\d+)?\b/), // intervals, e.g. 2-5; 1,5-2,0)
    simpleEND(/ /, / /),
];

export const PATTERNS_MISTAKE_TIMES = [
    / x /,
];

export const RULES_TIMES: ReadonlyArray<Rule> = [
    simpleRule({ good: "×", bad: "x", info: "gångertecken" })(/ /, / /),
];

// Non-breaking space, non-breaking hyphen, en dash:
export const PATTERN_DOPPELGANGERS = /&nbsp;|‑|–|×/g;

export const RULES: ReadonlyArray<Rule> = (([] as ReadonlyArray<Rule>)
    .concat([
        literalRule({
            bad: " × ",
            good: "&nbsp;×&nbsp;",
            info: "hårda mellanslag",
        })(null, null),
    ])
    .concat(RULES_NB_SPACE)
    .concat(RULES_NB_HYPHEN)
    .concat(RULES_EN_DASH)
    .concat(RULES_TIMES)
    .concat([
        literalRule({
            bad: `<sup class="bbSup">2</sup>`,
            good: "²",
            info: "tecknet ² istället för en upphöjd tvåa",
        })(null, null),
        literalRule({
            bad: `<sup class="bbSup">3</sup>`,
            good: "³",
            info: "tecknet ³ istället för en upphöjd trea",
        })(null, null),
    ])
);
