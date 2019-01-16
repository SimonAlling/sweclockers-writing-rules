/*
IMPORTANT ABOUT PATTERNS:

If a pattern contains no capture groups, the entire match will have highlighting
applied. Note that (...) is a capture group, but (?:...) is not. Examples:

    /Mini-ITX/
    /\d [kMG]?(?:b|bit|B|byte)/

If a pattern contains one or more capture groups, only the string captured by
the FIRST MATCHING capture group (i.e. $1) will have highlighting applied.
It is OK to have more than one capture group, but keep in mind that only $1 will
have any characters highlighted. Example:

    /(\d \d{3}) /

With that pattern, "8 500 " will be replaced by "8_500 ", where _ means NBSP.
Without the capture group, it would have been replaced with "8_500_".
*/
export const PATTERNS_MISTAKE_NB_SPACE = [
    // *** BE CAREFUL! Read above. ***
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
    /[^.:] ([A-ZÅÄÖ][a-zåäöé]+ \d{1,3})(?!&nbsp;)\b/, // Battlefield 1, Far Cry 5; but not capitalized words at the start of sentences
    // *** BE CAREFUL! Read above. ***
];

/*
Some patterns interfere/overlap with each other and have to be processed in
separate sequential passes.
Example: space in number (8_500) and space between number and unit (8 500_kr).
*/
export const PATTERNS_MISTAKE_NB_SPACE_POST = [
    // *** BE CAREFUL! Read above. ***
    // Number followed by space, then unit, then something that is not a
    // word character or common Swedish letter:
    // (Capture group because our word boundary substitute matches a space.)
    /(\d+ (?:[nµmcdk]|[KMGTP]i?)?(?:s|g|m|Hz|b|bit|B|fps|FPS|V|W|Wh|kr|USD|EUR|°C|%|st|dBA?))(?:$|[^\wåäöé])/,
    /(\d+ (?:nano|mikro|milli|centi|deci|hekto|kilo|mega|giga|tera|peta)?(?:sekund(?:er)?|gram|meter|hertz|bit|byte|tum|bilder|volt|watt|wattimmar|kronor|dollar|euro|procent|stycken|decibel))(?:$|[^\wåäöé])/,

    /PCI Express/, // overlaps with the version number check (e.g. " 3.0")
    // *** BE CAREFUL! Read above. ***
];

export const PATTERNS_MISTAKE_NB_HYPHEN = [
    // *** BE CAREFUL! Read above. ***
    /i\d-\d{4}/, // Intel CPUs
    /Mini-ITX/,
    /G-Sync/,
    /V-[Ss]ync/,
    /Counter-Strike/,
    /DVI-(?:A|DL?|I)\b/,
    /Type-C\b/, // USB Type-C
    /DDR\d-\d/, // DDR4-3200, LPDDR3-2133 etc
    /i\d-\d{4}/, // Intel CPUs
    /[A-Z][a-z]+-[A-Z]{1,2}\b/, // Haswell-E, Kaby Lake-X etc
    /\d+-\d+(?:-\d+)+/, // dates, RAM latencies etc
    // *** BE CAREFUL! Read above. ***
];

export const PATTERNS_MISTAKE_EN_DASH = [
    // *** BE CAREFUL! Read above. ***
    /(?:^|>)- /, // beginning of quote (talstreck); they are often enclosed in <em> tags
    / - /,
    /* The first group prevents hyphens in dates to be markes as mistakes.
    We have to use a Unicode escape sequence there (\u002D = hyphen) because a
    literal hyphen would be overwritten with an en dash for the verify phase. */
    /(?:^|[^\d\u002D])\d{1,3}(?:,\d+)?(-)\d+(?:,\d+)?\b/, // intervals, e.g. 2-5; 1,5-2,0
    // *** BE CAREFUL! Read above. ***
];

export const PATTERNS_MISTAKE_TIMES = [
    // *** BE CAREFUL! Read above. ***
    / x /,
    // *** BE CAREFUL! Read above. ***
];

// Non-breaking space, non-breaking hyphen, en dash:
export const PATTERN_DOPPELGANGERS = /&nbsp;|‑|–|×/g;

export const RULES = [
    { change: { from: " × ", to: "&nbsp;×&nbsp;" }, contexts: [ /\d( × )\d/ ], info: "hårda mellanslag" }, // resolutions etc
    { change: { from: " ", to: "&nbsp;" }, contexts: PATTERNS_MISTAKE_NB_SPACE, info: "hårt mellanslag" },
    { change: { from: " ", to: "&nbsp;" }, contexts: PATTERNS_MISTAKE_NB_SPACE_POST, info: "hårt mellanslag" },
    { change: { from: "-", to: "‑" }, contexts: PATTERNS_MISTAKE_NB_HYPHEN, info: "hårt bindestreck" },
    { change: { from: "-", to: "–" }, contexts: PATTERNS_MISTAKE_EN_DASH, info: "tankstreck" },
    { change: { from: "x", to: "×" }, contexts: PATTERNS_MISTAKE_TIMES, info: "gångertecken" },
    { change: { from: `<sup class="bbSup">2</sup>`, to: "²" }, contexts: [ /<sup class="bbSup">2<\/sup>/ ], info: "tecknet ² istället för en upphöjd tvåa" },
    { change: { from: `<sup class="bbSup">3</sup>`, to: "³" }, contexts: [ /<sup class="bbSup">3<\/sup>/ ], info: "tecknet ³ istället för en upphöjd trea" },
];
