import { literalRule, matchRule, regexRule, simpleRule, } from "highlight-mistakes";
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
export const PATTERNS_MISTAKE_NB_SPACE = [
    /\d(?: \d{3})+/,
    /[A-Z][A-Za-z]+ \d+\.\d+/,
    /USB Type/,
    /4K UHD/,
    /Core i\d/,
    /\d \d{4}/,
    /Geforce (?:G|R)TX\-/,
    /Ryzen \d+\-/,
    /(?:G|R)TX \d+(?: Ti)?/,
    /Vega \d+/,
    /R\d \d+/,
    /DVI(?:[-‑][DI])? DL\b/,
    /[^.:]\u0020[A-ZÅÄÖ][a-zåäöé]+ \d{1,3}(?!&nbsp;)\b/,
];
const RULES_NB_SPACE = [
    simpleNBSP(/[A-Z][A-Za-z]+/, /\d+\.\d+/),
    simpleNBSP(/\d/, /(?=\d{3})/),
    regexNBSP(/\d (?:[nµmcdk]|[KMGTP]i?)?(?:s|g|m|Hz|b|bit|B|fps|FPS|V|W|Wh|kr|USD|EUR|°C|%|st|dBA?)(?=$|[^\wåäöé])/),
    simpleNBSP(/\d+/, /(?:nano|mikro|milli|centi|deci|hekto|kilo|mega|giga|tera|peta)?(?:sekund(?:er)?|gram|meter|hertz|bit|byte|tum|bilder|volt|watt|wattimmar|kronor|dollar|euro|procent|stycken|decibel)(?:$|[^\wåäöé])/),
    matchNBSP(/[^:.] [A-ZÅÄÖ][a-zåäöé]+/, / (?=\d)/, /\d{1,3}(?=[.,;: ])/),
    simpleNBSP(/4K/, /UHD/),
    simpleNBSP(/USB/, /Type/),
    simpleNBSP(/PCI/, /Express/),
    simpleNBSP(/Core/, /i\d/),
    simpleNBSP(/\d/, /\d{4}/),
    regexNBSP(/[GR]TX \d{3,4}(?: Ti)?/),
    simpleNBSP(/Geforce/, /[GR]TX-/),
    simpleNBSP(/Ryzen/, /\d+-/),
    simpleNBSP(/Vega/, /\d+/),
    simpleNBSP(/R\d/, /\d+/),
    simpleNBSP(/DVI(?:[-‑][DI])?/, /DL/),
];
const RULES_NB_HYPHEN = [
    simpleNBH(/i\d/, /\d{4}/),
    simpleNBH(/Mini/, /ITX/),
    simpleNBH(/G/, /Sync/),
    simpleNBH(/V/, /[Ss]ync/),
    simpleNBH(/Counter/, /Strike/),
    simpleNBH(/DVI/, /(?:A|DL?|I)\b/),
    simpleNBH(/Type/, /C\b/),
    simpleNBH(/DDR\d/, /\d/),
    simpleNBH(/i\d/, /\d{4}/),
    simpleNBH(/[A-Z][a-z]+/, /[A-Z]{1,2}\b/),
    matchNBH(/\d+/, /\d+(?:-\d+)+/, null),
];
const RULES_EN_DASH = [
    simpleEND(/(?:^|>)/, / /),
    simpleEND(/(?:^|[^\d-])\d{1,3}(?:,\d+)?/, /\d+(?:,\d+)?\b/),
    simpleEND(/ /, / /),
];
export const PATTERNS_MISTAKE_TIMES = [
    / x /,
];
export const RULES_TIMES = [
    simpleRule({ good: "×", bad: "x", info: "gångertecken" })(/ /, / /),
];
export const PATTERN_DOPPELGANGERS = /&nbsp;|‑|–|×/g;
export const RULES = ([]
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
]));
//# sourceMappingURL=index.js.map