"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const highlight_mistakes_1 = require("highlight-mistakes");
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
const literalNBSP = highlight_mistakes_1.literalRule(DESC_NBSP);
const simpleNBSP = highlight_mistakes_1.simpleRule(DESC_NBSP);
const matchNBSP = highlight_mistakes_1.matchRule(DESC_NBSP);
const regexNBSP = highlight_mistakes_1.regexRule(DESC_NBSP);
const literalNBH = highlight_mistakes_1.literalRule(DESC_NBH);
const simpleNBH = highlight_mistakes_1.simpleRule(DESC_NBH);
const matchNBH = highlight_mistakes_1.matchRule(DESC_NBH);
const regexNBH = highlight_mistakes_1.regexRule(DESC_NBH);
const literalEND = highlight_mistakes_1.literalRule(DESC_END);
const simpleEND = highlight_mistakes_1.simpleRule(DESC_END);
const matchEND = highlight_mistakes_1.matchRule(DESC_END);
const regexEND = highlight_mistakes_1.regexRule(DESC_END);
exports.PATTERNS_MISTAKE_NB_SPACE = [
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
    matchNBH(/\d+/, /-\d+(?:-\d+)+/, null),
];
const RULES_EN_DASH = [
    simpleEND(/(?:^|>)/, / /),
    simpleEND(/(?:^|[^\d-])\d{1,3}(?:,\d+)?/, /\d+(?:,\d+)?(?=[^\d-]|$)/),
    simpleEND(/(?:^|[^\d-])\d{4}/, /\d{4}(?=[^\d-]|$)/),
    simpleEND(/ /, / /),
];
exports.PATTERNS_MISTAKE_TIMES = [
    / x /,
];
exports.RULES_TIMES = [
    highlight_mistakes_1.simpleRule({ good: "×", bad: "x", info: "gångertecken" })(/ /, / /),
];
exports.PATTERN_DOPPELGANGERS = /&nbsp;|‑|–|×/g;
exports.RULES = ([]
    .concat([
    highlight_mistakes_1.literalRule({
        bad: " × ",
        good: "&nbsp;×&nbsp;",
        info: "hårda mellanslag",
    })(null, null),
])
    .concat(RULES_NB_SPACE)
    .concat(RULES_NB_HYPHEN)
    .concat(RULES_EN_DASH)
    .concat(exports.RULES_TIMES)
    .concat([
    highlight_mistakes_1.literalRule({
        bad: `<sup class="bbSup">2</sup>`,
        good: "²",
        info: "tecknet ² istället för en upphöjd tvåa",
    })(null, null),
    highlight_mistakes_1.literalRule({
        bad: `<sup class="bbSup">3</sup>`,
        good: "³",
        info: "tecknet ³ istället för en upphöjd trea",
    })(null, null),
]));
//# sourceMappingURL=index.js.map