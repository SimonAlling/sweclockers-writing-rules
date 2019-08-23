import { highlightWith, proofreadWith } from "highlight-mistakes";

import { PATTERN_DOPPELGANGERS, RULES, RULES_SUP } from "../src/index";

const CLASS_MIS = "mis";
const CLASS_VER = "ver";
const CLASS_ANY = "any";

function markWith(id: string): (info: string | null) => (s: string) => string {
  return info => s =>
    [`<`, id, info ? " " + info : "", `>`, s, `</`, id, `>`].join("");
}

const NO_INFO = null;

const proofreadSup = proofreadWith({
  rules: RULES_SUP,
  markMistake: markWith(CLASS_MIS),
  markVerified: markWith(CLASS_VER)
});

const proofread = proofreadWith({
  rules: RULES,
  markMistake: markWith(CLASS_MIS),
  markVerified: markWith(CLASS_VER)
});

const highlight = highlightWith({
  pattern: PATTERN_DOPPELGANGERS,
  mark: markWith(CLASS_ANY)(NO_INFO)
});

it("does something right", () => {
  expect(proofread("5\u00A0GHz eller 4 GHz")).toMatchInlineSnapshot(
    `"5<ver hårt mellanslag>\u00A0</ver>GHz eller 4<mis hårt mellanslag> </mis>GHz"`
  );
});

it("proofreads examples correctly", () => {
  expect(
    proofread(
      `The Division 2 får systemkrav – RTX 2080 Ti eller Radeon VII för 4K-spelande`
    )
  ).toMatchInlineSnapshot(
    `"The Division<mis hårt mellanslag> </mis>2 får systemkrav <ver tankstreck>–</ver> RTX<mis hårt mellanslag> </mis>2080<mis hårt mellanslag> </mis>Ti eller Radeon VII för 4K-spelande"`
  );
  expect(
    proofread(
      `The Division 2 får systemkrav – RTX 2080\u00A0Ti eller Radeon VII för 4K-spelande`
    )
  ).toMatchInlineSnapshot(
    `"The Division<mis hårt mellanslag> </mis>2 får systemkrav <ver tankstreck>–</ver> RTX<mis hårt mellanslag> </mis>2080\u00A0Ti eller Radeon VII för 4K-spelande"`
  );
  expect(proofread(`144 Hz IPS med Freesync på 27 tum`)).toMatchInlineSnapshot(
    `"144<mis hårt mellanslag> </mis>Hz IPS med Freesync på 27<mis hårt mellanslag> </mis>tum"`
  );
  expect(
    proofread(`10-bitars IPS-panel, upplösningen 2 560 × 1 440 pixlar, 144 Hz`)
  ).toMatchInlineSnapshot(
    `"10-bitars IPS-panel, upplösningen 2<mis hårt mellanslag> </mis>560<mis hårda mellanslag> <ver gångertecken>×</ver> </mis>1<mis hårt mellanslag> </mis>440 pixlar, 144<mis hårt mellanslag> </mis>Hz"`
  );
  expect(proofread(`cirka 6 700 kronor`)).toMatchInlineSnapshot(
    `"cirka 6<mis hårt mellanslag> </mis>700<mis hårt mellanslag> </mis>kronor"`
  );
  expect(
    proofread(`Nvidia G-Sync Ultimate är skärmar med 4K UHD, 144 Hz och HDR`)
  ).toMatchInlineSnapshot(
    `"Nvidia G<mis hårt bindestreck>-</mis>Sync Ultimate är skärmar med 4K<mis hårt mellanslag> </mis>UHD, 144<mis hårt mellanslag> </mis>Hz och HDR"`
  );
  expect(proofread(`med V-Sync`)).toMatchInlineSnapshot(
    `"med V<mis hårt bindestreck>-</mis>Sync"`
  );
  expect(proofread(`med V-sync`)).toMatchInlineSnapshot(
    `"med V<mis hårt bindestreck>-</mis>sync"`
  );
  expect(proofread(`med V‑sync`)).toMatchInlineSnapshot(
    `"med V<ver hårt bindestreck>‑</ver>sync"`
  );
  expect(proofread(`den 18/1–20/1`)).toMatchInlineSnapshot(
    `"den 18/1<ver tankstreck>–</ver>20/1"`
  );
  expect(proofread(`den 18/1-20/1`)).toMatchInlineSnapshot(
    `"den 18/1<mis tankstreck>-</mis>20/1"`
  );
  expect(proofread(`Geforce RTX-serien`)).toMatchInlineSnapshot(
    `"Geforce<mis hårt mellanslag> </mis>RTX-serien"`
  );
  expect(
    proofread(`Detta kan jämföras med 648 respektive 1 476 MHz för GTX 285`)
  ).toMatchInlineSnapshot(
    `"Detta kan jämföras med 648 respektive 1<mis hårt mellanslag> </mis>476<mis hårt mellanslag> </mis>MHz för GTX<mis hårt mellanslag> </mis>285"`
  );
  expect(
    proofread(
      `Med en minnesfrekvens på närmare 2 000 MHz uppgick bandbredden till 112 GB/s per grafikkrets.`
    )
  ).toMatchInlineSnapshot(
    `"Med en minnesfrekvens på närmare 2<mis hårt mellanslag> </mis>000<mis hårt mellanslag> </mis>MHz uppgick bandbredden till 112<mis hårt mellanslag> </mis>GB/s per grafikkrets."`
  );
  expect(proofread(`guldstandarden 120 FPS`)).toMatchInlineSnapshot(
    `"guldstandarden 120<mis hårt mellanslag> </mis>FPS"`
  );
  expect(
    proofread(`Nvidias Geforce GTX 295 kostade trots allt hela 5 300 kronor.`)
  ).toMatchInlineSnapshot(
    `"Nvidias Geforce GTX<mis hårt mellanslag> </mis>295 kostade trots allt hela 5<mis hårt mellanslag> </mis>300<mis hårt mellanslag> </mis>kronor."`
  );
  expect(
    proofread(
      `Intel Core i9-9900K, i7-9700K och i5-9600K – "Coffee Lake Refresh"`
    )
  ).toMatchInlineSnapshot(
    `"Intel Core<mis hårt mellanslag> </mis>i9<mis hårt bindestreck>-</mis>9900K, i7<mis hårt bindestreck>-</mis>9700K och i5<mis hårt bindestreck>-</mis>9600K <ver tankstreck>–</ver> \\"Coffee Lake Refresh\\""`
  );
  expect(proofread(`på 14 nanometer`)).toMatchInlineSnapshot(
    `"på 14<mis hårt mellanslag> </mis>nanometer"`
  );
  expect(proofread(`50 W eller 70 %`)).toMatchInlineSnapshot(
    `"50<mis hårt mellanslag> </mis>W eller 70<mis hårt mellanslag> </mis>%"`
  );
  expect(proofread(`vid 4,7 GHz`)).toMatchInlineSnapshot(
    `"vid 4,7<mis hårt mellanslag> </mis>GHz"`
  );
  expect(proofread(`AMD:s toppmodell Ryzen 7 2700X`)).toMatchInlineSnapshot(
    `"AMD:s toppmodell Ryzen 7<mis hårt mellanslag> </mis>2700X"`
  );
  expect(proofread(`Mini-ITX-chassin`)).toMatchInlineSnapshot(
    `"Mini<mis hårt bindestreck>-</mis>ITX-chassin"`
  );
  expect(proofread(`Counter-Strike`)).toMatchInlineSnapshot(
    `"Counter<mis hårt bindestreck>-</mis>Strike"`
  );
  expect(
    proofread(
      `på 4 TB. Det som demonstreras är en prototyp som ansluts via USB Type-C och`
    )
  ).toMatchInlineSnapshot(
    `"på 4<mis hårt mellanslag> </mis>TB. Det som demonstreras är en prototyp som ansluts via USB<mis hårt mellanslag> </mis>Type<mis hårt bindestreck>-</mis>C och"`
  );
  expect(proofread(`HDMI 2.0`)).toMatchInlineSnapshot(
    `"HDMI<mis hårt mellanslag> </mis>2.0"`
  );
  expect(
    proofread(
      `DVI-D, DVI-A och DVI-I; en annan sak är DVI-DL och tänk på att DVI-D DL behövs`
    )
  ).toMatchInlineSnapshot(
    `"DVI<mis hårt bindestreck>-</mis>D, DVI<mis hårt bindestreck>-</mis>A och DVI<mis hårt bindestreck>-</mis>I; en annan sak är DVI<mis hårt bindestreck>-</mis>DL och tänk på att DVI<mis hårt bindestreck>-</mis>D<mis hårt mellanslag> </mis>DL behövs"`
  );
  expect(proofread(`4 500 kilogram`)).toMatchInlineSnapshot(
    `"4<mis hårt mellanslag> </mis>500<mis hårt mellanslag> </mis>kilogram"`
  );
  expect(proofread(`3 500 000 watt`)).toMatchInlineSnapshot(
    `"3<mis hårt mellanslag> </mis>500<mis hårt mellanslag> </mis>000<mis hårt mellanslag> </mis>watt"`
  );
  expect(
    proofread(`Vi pratar Ryzen 3000-serien med AMD – Zen 2 och 7 nanometer`)
  ).toMatchInlineSnapshot(
    `"Vi pratar Ryzen<mis hårt mellanslag> </mis>3000-serien med AMD <ver tankstreck>–</ver> Zen<mis hårt mellanslag> </mis>2 och 7<mis hårt mellanslag> </mis>nanometer"`
  );
  expect(proofread(`2 x Ethernet RJ45`)).toMatchInlineSnapshot(
    `"2 <mis gångertecken>x</mis> Ethernet RJ45"`
  );
  expect(proofread(`2 × Ethernet RJ45`)).toMatchInlineSnapshot(
    `"2<mis hårda mellanslag> <ver gångertecken>×</ver> </mis>Ethernet RJ45"`
  );
  expect(proofread(`2 560 x 1 440`)).toMatchInlineSnapshot(
    `"2<mis hårt mellanslag> </mis>560 <mis gångertecken>x</mis> 1<mis hårt mellanslag> </mis>440"`
  );
  expect(proofread(`2\u00A0560 × 1\u00A0440`)).toMatchInlineSnapshot(
    `"2<ver hårt mellanslag>\u00A0</ver>560<mis hårda mellanslag> <ver gångertecken>×</ver> </mis>1<ver hårt mellanslag>\u00A0</ver>440"`
  );
  expect(proofread(`2\u00A0560\u00A0×\u00A01\u00A0440`)).toMatchInlineSnapshot(
    `"2<ver hårt mellanslag>\u00A0</ver>560<ver hårda mellanslag>\u00A0<ver gångertecken>×</ver>\u00A0</ver>1<ver hårt mellanslag>\u00A0</ver>440"`
  );
  expect(proofread(`med PCI Express-anslutning`)).toMatchInlineSnapshot(
    `"med PCI<mis hårt mellanslag> </mis>Express-anslutning"`
  );
  expect(proofread(`med PCI Express 3.0`)).toMatchInlineSnapshot(
    `"med PCI<mis hårt mellanslag> </mis>Express<mis hårt mellanslag> </mis>3.0"`
  );
});

it("handles ranges correctly", () => {
  // With hyphens:
  expect(proofread(`till 4-5 GHz`)).toMatchInlineSnapshot(
    `"till 4<mis tankstreck>-</mis>5<mis hårt mellanslag> </mis>GHz"`
  );
  expect(proofread(`Steve Jobs (1955-2011)`)).toMatchInlineSnapshot(
    `"Steve Jobs (1955<mis tankstreck>-</mis>2011)"`
  );
  expect(proofread(`1939-1945`)).toMatchInlineSnapshot(
    `"1939<mis tankstreck>-</mis>1945"`
  );
  // With en dashes:
  expect(proofread(`till 4–5 GHz`)).toMatchInlineSnapshot(
    `"till 4<ver tankstreck>–</ver>5<mis hårt mellanslag> </mis>GHz"`
  );
  expect(proofread(`Steve Jobs (1955–2011)`)).toMatchInlineSnapshot(
    `"Steve Jobs (1955<ver tankstreck>–</ver>2011)"`
  );
  expect(proofread(`1939–1945`)).toMatchInlineSnapshot(
    `"1939<ver tankstreck>–</ver>1945"`
  );
});

it("handles dates correctly", () => {
  // With regular hyphens:
  expect(proofread(`Uppdatering 2019-01-13:`)).toMatchInlineSnapshot(
    `"Uppdatering 2019<mis hårt bindestreck>-</mis>01<mis hårt bindestreck>-</mis>13:"`
  );
  expect(proofread(`2019-01-13 är ett datum`)).toMatchInlineSnapshot(
    `"2019<mis hårt bindestreck>-</mis>01<mis hårt bindestreck>-</mis>13 är ett datum"`
  );
  // With non-breaking hyphens:
  expect(proofread(`Uppdatering 2019‑01‑13:`)).toMatchInlineSnapshot(
    `"Uppdatering 2019<ver hårt bindestreck>‑</ver>01<ver hårt bindestreck>‑</ver>13:"`
  );
});

it("handles general number series correctly", () => {
  expect(proofread(`11-11-11-31`)).toMatchInlineSnapshot(
    `"11<mis hårt bindestreck>-</mis>11<mis hårt bindestreck>-</mis>11<mis hårt bindestreck>-</mis>31"`
  );
});

it("handles names correctly", () => {
  expect(proofread(`Hela 25 undantag`)).toMatchInlineSnapshot(
    `"Hela 25 undantag"`
  );
  expect(
    proofread(`finns. Hur 25 kan vara mindre än 20 är dock okänt.`)
  ).toMatchInlineSnapshot(
    `"finns. Hur 25 kan vara mindre än 20 är dock okänt."`
  );
  expect(
    proofread(`nämligen så: Banka 34 gånger i bordet.`)
  ).toMatchInlineSnapshot(`"nämligen så: Banka 34 gånger i bordet."`);
  expect(
    proofread(`och det är viktigt; Destiny 2 får inte glömmas`)
  ).toMatchInlineSnapshot(
    `"och det är viktigt; Destiny<mis hårt mellanslag> </mis>2 får inte glömmas"`
  );
  expect(
    proofread(`Vi vet att Battlefield 1, eller Slagfält 1, är ett spel`)
  ).toMatchInlineSnapshot(
    `"Vi vet att Battlefield<mis hårt mellanslag> </mis>1, eller Slagfält<mis hårt mellanslag> </mis>1, är ett spel"`
  );
  expect(
    proofread(`Därför framhäver Asus 144\u00A0Hz på sin nya skärm`)
  ).toMatchInlineSnapshot(
    `"Därför framhäver Asus 144<ver hårt mellanslag>\u00A0</ver>Hz på sin nya skärm"`
  );
  expect(proofread(`som på Computex 2018 i fjol`)).toMatchInlineSnapshot(
    `"som på Computex 2018 i fjol"`
  );
});

it("handles currencies correctly", () => {
  expect(proofread(`kostar 40 euro`)).toMatchInlineSnapshot(
    `"kostar 40<mis hårt mellanslag> </mis>euro"`
  );
  expect(proofread(`kostar 40 dollar`)).toMatchInlineSnapshot(
    `"kostar 40<mis hårt mellanslag> </mis>dollar"`
  );
  expect(proofread(`kostar 40 EUR`)).toMatchInlineSnapshot(
    `"kostar 40<mis hårt mellanslag> </mis>EUR"`
  );
  expect(proofread(`kostar 40 USD`)).toMatchInlineSnapshot(
    `"kostar 40<mis hårt mellanslag> </mis>USD"`
  );
  expect(proofread(`kostar 40\u00A0euro`)).toMatchInlineSnapshot(
    `"kostar 40<ver hårt mellanslag>\u00A0</ver>euro"`
  );
  expect(proofread(`kostar 40\u00A0dollar`)).toMatchInlineSnapshot(
    `"kostar 40<ver hårt mellanslag>\u00A0</ver>dollar"`
  );
  expect(proofread(`kostar 40\u00A0EUR`)).toMatchInlineSnapshot(
    `"kostar 40<ver hårt mellanslag>\u00A0</ver>EUR"`
  );
  expect(proofread(`kostar 40\u00A0USD`)).toMatchInlineSnapshot(
    `"kostar 40<ver hårt mellanslag>\u00A0</ver>USD"`
  );
});

it("handles leading en dashes correctly", () => {
  // Regular hyphens:
  expect(proofread(`- `)).toMatchInlineSnapshot(`"<mis tankstreck>-</mis> "`);
  expect(
    proofread(`- Jag har ställt upp med studiehjälp tidigare`)
  ).toMatchInlineSnapshot(
    `"<mis tankstreck>-</mis> Jag har ställt upp med studiehjälp tidigare"`
  );
  // En dashes:
  expect(proofread(`– `)).toMatchInlineSnapshot(`"<ver tankstreck>–</ver> "`);
  expect(
    proofread(`– Jag har ställt upp med studiehjälp tidigare`)
  ).toMatchInlineSnapshot(
    `"<ver tankstreck>–</ver> Jag har ställt upp med studiehjälp tidigare"`
  );
});

it("handles version numbers correctly", () => {
  expect(proofread(`använder Bluetooth 4.0`)).toMatchInlineSnapshot(
    `"använder Bluetooth<mis hårt mellanslag> </mis>4.0"`
  );
  expect(proofread(`USB 3.0`)).toMatchInlineSnapshot(
    `"USB<mis hårt mellanslag> </mis>3.0"`
  );
  expect(
    proofread(`USB version 3.0 och 3.1 finns nu ute`)
  ).toMatchInlineSnapshot(`"USB version 3.0 och 3.1 finns nu ute"`);
  expect(
    proofread(`utrustad med PCI Express 3.0 kanske`)
  ).toMatchInlineSnapshot(
    `"utrustad med PCI<mis hårt mellanslag> </mis>Express<mis hårt mellanslag> </mis>3.0 kanske"`
  );
});

it("handles times correctly", () => {
  expect(proofread(`16,7 ms`)).toMatchInlineSnapshot(
    `"16,7<mis hårt mellanslag> </mis>ms"`
  );
  expect(proofread(`16,7\u00A0ms`)).toMatchInlineSnapshot(
    `"16,7<ver hårt mellanslag>\u00A0</ver>ms"`
  );
  expect(proofread(`mer än 8,3 millisekunder`)).toMatchInlineSnapshot(
    `"mer än 8,3<mis hårt mellanslag> </mis>millisekunder"`
  );
  expect(proofread(`20 sekunder`)).toMatchInlineSnapshot(
    `"20<mis hårt mellanslag> </mis>sekunder"`
  );
  expect(proofread(`fyller SweClockers 20 år`)).toMatchInlineSnapshot(
    `"fyller SweClockers 20<mis hårt mellanslag> </mis>år"`
  );
  expect(proofread(`fyller SweClockers 20\u00A0år`)).toMatchInlineSnapshot(
    `"fyller SweClockers 20<ver hårt mellanslag>\u00A0</ver>år"`
  );
});

it("handles resolutions etc correctly", () => {
  expect(proofread(`2 560 x 1 440`)).toMatchInlineSnapshot(
    `"2<mis hårt mellanslag> </mis>560 <mis gångertecken>x</mis> 1<mis hårt mellanslag> </mis>440"`
  );
  expect(proofread(`2 560 × 1 440`)).toMatchInlineSnapshot(
    `"2<mis hårt mellanslag> </mis>560<mis hårda mellanslag> <ver gångertecken>×</ver> </mis>1<mis hårt mellanslag> </mis>440"`
  );
  expect(proofread(`2\u00A0560\u00A0x\u00A01\u00A0440`)).toMatchInlineSnapshot(
    `"2<ver hårt mellanslag> </ver>560 <mis gångertecken>x</mis> 1<ver hårt mellanslag> </ver>440"`
  );
  expect(proofread(`2\u00A0560 × 1\u00A0440`)).toMatchInlineSnapshot(
    `"2<ver hårt mellanslag>\u00A0</ver>560<mis hårda mellanslag> <ver gångertecken>×</ver> </mis>1<ver hårt mellanslag>\u00A0</ver>440"`
  );
  expect(proofread(`2\u00A0560\u00A0×\u00A01\u00A0440`)).toMatchInlineSnapshot(
    `"2<ver hårt mellanslag>\u00A0</ver>560<ver hårda mellanslag>\u00A0<ver gångertecken>×</ver>\u00A0</ver>1<ver hårt mellanslag>\u00A0</ver>440"`
  );
});

it("handles superscript correctly", () => {
  expect(proofreadSup(`2`)).toMatchInlineSnapshot(
    `"<mis tecknet ² istället för en upphöjd tvåa>2</mis>"`
  );
  expect(proofreadSup(`3`)).toMatchInlineSnapshot(
    `"<mis tecknet ³ istället för en upphöjd trea>3</mis>"`
  );
  expect(proofreadSup(` 2`)).toMatchInlineSnapshot(`" 2"`);
  expect(proofreadSup(` 3`)).toMatchInlineSnapshot(`" 3"`);
  expect(proofread(`500\u00A0mm² eller mm³`)).toMatchInlineSnapshot(
    `"500<ver hårt mellanslag> </ver>mm<ver>²</ver> eller mm<ver>³</ver>"`
  );
});

it("handles fake quantities correctly", () => {
  expect(
    proofread(`Vid lanseringen av Windows\u00A07 år 2009 hade Windows Vista`)
  ).toMatchInlineSnapshot(
    `"Vid lanseringen av Windows<ver hårt mellanslag> </ver>7 år 2009 hade Windows<mis hårt mellanslag> </mis>Vista"`
  );
  expect(
    proofread(`Vid lanseringen av Windows 7 år 2009 hade Windows Vista`)
  ).toMatchInlineSnapshot(
    `"Vid lanseringen av Windows<mis hårt mellanslag> </mis>7<mis hårt mellanslag> </mis>år 2009 hade Windows<mis hårt mellanslag> </mis>Vista"`
  );
});

it("highlights examples correctly", () => {
  expect(highlight("hello\u00A0world")).toMatchInlineSnapshot(
    `"hello<any>\u00A0</any>world"`
  );
  expect(
    highlight(proofread("hello\u00A0world och 4 GHz eller 5\u00A0GHz"))
  ).toMatchInlineSnapshot(
    `"hello<any>\u00A0</any>world och 4<mis hårt mellanslag> </mis>GHz eller 5<ver hårt mellanslag><any>\u00A0</any></ver>GHz"`
  );
});
