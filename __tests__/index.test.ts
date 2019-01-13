import { highlightWith, proofreadWith } from "highlight-mistakes";

import { PATTERN_DOPPELGANGERS, RULES } from "../index";

const CLASS_MIS = "mis";
const CLASS_VER = "ver";
const CLASS_ANY = "any";

function markWith(id: string): (info: string | null) => (s: string) => string {
  return info => s =>
    [`<`, id, info ? " " + info : "", `>`, s, `</`, id, `>`].join("");
}

const NO_INFO = null;

const proofread = proofreadWith({
  rules: RULES,
  identifiers: { mistake: CLASS_MIS, verified: CLASS_VER },
  markWith
});

const highlight = highlightWith({
  pattern: PATTERN_DOPPELGANGERS,
  mark: markWith(CLASS_ANY)(NO_INFO)
});

it("does something right", () => {
  expect(proofread("5&nbsp;GHz eller 4 GHz")).toMatchInlineSnapshot(
    `"5<ver>&nbsp;</ver>GHz eller 4<mis hårt mellanslag> </mis>GHz"`
  );
});

it("proofreads examples correctly", () => {
  expect(
    proofread(
      `The Division 2 får systemkrav – RTX 2080 Ti eller Radeon VII för 4K-spelande`
    )
  ).toMatchInlineSnapshot(
    `"The Division<mis hårt mellanslag> </mis>2 får systemkrav <ver>–</ver> RTX<mis hårt mellanslag> </mis>2080<mis hårt mellanslag> </mis>Ti eller Radeon VII för 4K-spelande"`
  );
  expect(
    proofread(
      `The Division 2 får systemkrav – RTX 2080&nbsp;Ti eller Radeon VII för 4K-spelande`
    )
  ).toMatchInlineSnapshot(
    `"The Division<mis hårt mellanslag> </mis>2 får systemkrav <ver>–</ver> RTX<mis hårt mellanslag> </mis>2080&nbsp;Ti eller Radeon VII för 4K-spelande"`
  );
  expect(proofread(`144 Hz IPS med Freesync på 27 tum`)).toMatchInlineSnapshot(
    `"144<mis hårt mellanslag> </mis>Hz IPS med Freesync på 27<mis hårt mellanslag> </mis>tum"`
  );
  expect(
    proofread(`10-bitars IPS-panel, upplösningen 2 560 × 1 440 pixlar, 144 Hz`)
  ).toMatchInlineSnapshot(
    `"10-bitars IPS-panel, upplösningen 2<mis hårt mellanslag> </mis>560<mis hårda mellanslag> <ver>×</ver> </mis>1<mis hårt mellanslag> </mis>440 pixlar, 144<mis hårt mellanslag> </mis>Hz"`
  );
  expect(proofread(`cirka 6 700 kronor`)).toMatchInlineSnapshot(
    `"cirka 6<mis hårt mellanslag> </mis>700<mis hårt mellanslag> </mis>kronor"`
  );
  expect(
    proofread(`Nvidia G-Sync Ultimate är skärmar med 4K UHD, 144 Hz och HDR`)
  ).toMatchInlineSnapshot(
    `"Nvidia G<mis hårt bindestreck>-</mis>Sync Ultimate är skärmar med 4K<mis hårt mellanslag> </mis>UHD, 144<mis hårt mellanslag> </mis>Hz och HDR"`
  );
  expect(proofread(`den 18/1–20/1`)).toMatchInlineSnapshot(
    `"den 18/1<ver>–</ver>20/1"`
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
    `"Intel Core<mis hårt mellanslag> </mis>i9<mis hårt bindestreck>-</mis>9900K, i7<mis hårt bindestreck>-</mis>9700K och i5<mis hårt bindestreck>-</mis>9600K <ver>–</ver> \\"Coffee Lake Refresh\\""`
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
    `"AMD:s toppmodell Ryzen<mis hårt mellanslag> </mis>7 2700X"`
  );
  expect(proofread(`Mini-ITX-chassin`)).toMatchInlineSnapshot(
    `"Mini<mis hårt bindestreck>-</mis>ITX-chassin"`
  );
  expect(proofread(`Counter-Strike`)).toMatchInlineSnapshot(
    `"Counter<mis hårt bindestreck>-</mis>Strike"`
  );
  expect(proofread(`Silent Wings 3 i 120 mm-utförande`)).toMatchInlineSnapshot(
    `"Silent Wings<mis hårt mellanslag> </mis>3 i 120<mis hårt mellanslag> </mis>mm-utförande"`
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
    `"Vi pratar Ryzen<mis hårt mellanslag> </mis>3000-serien med AMD <ver>–</ver> Zen<mis hårt mellanslag> </mis>2 och 7<mis hårt mellanslag> </mis>nanometer"`
  );
  expect(proofread(`2 x Ethernet RJ45`)).toMatchInlineSnapshot(
    `"2 <mis gångertecken>x</mis> Ethernet RJ45"`
  );
  expect(proofread(`2 × Ethernet RJ45`)).toMatchInlineSnapshot(
    `"2 <ver>×</ver> Ethernet RJ45"`
  );
  expect(proofread(`2 560 x 1 440`)).toMatchInlineSnapshot(
    `"2<mis hårt mellanslag> </mis>560 <mis gångertecken>x</mis> 1<mis hårt mellanslag> </mis>440"`
  );
  expect(proofread(`2&nbsp;560 × 1&nbsp;440`)).toMatchInlineSnapshot(
    `"2<ver>&nbsp;</ver>560<mis hårda mellanslag> <ver>×</ver> </mis>1<ver>&nbsp;</ver>440"`
  );
  expect(proofread(`2&nbsp;560&nbsp;×&nbsp;1&nbsp;440`)).toMatchInlineSnapshot(
    `"2<ver>&nbsp;</ver>560<ver>&nbsp;×&nbsp;</ver>1<ver>&nbsp;</ver>440"`
  );
  expect(
    proofread(`en yta på 32 mm<sup class="bbSup">2</sup>`)
  ).toMatchInlineSnapshot(
    `"en yta på 32<mis hårt mellanslag> </mis>mm<mis tecknet ² istället för en upphöjd tvåa><sup class=\\"bbSup\\">2</sup></mis>"`
  );
  expect(
    proofread(`en volym på 5 m<sup class="bbSup">3</sup>`)
  ).toMatchInlineSnapshot(
    `"en volym på 5<mis hårt mellanslag> </mis>m<mis tecknet ³ istället för en upphöjd trea><sup class=\\"bbSup\\">3</sup></mis>"`
  );
});

it("highlights examples correctly", () => {
  expect(highlight("hello&nbsp;world")).toMatchInlineSnapshot(
    `"hello<any>&nbsp;</any>world"`
  );
  expect(
    highlight(proofread("hello&nbsp;world och 4 GHz eller 5&nbsp;GHz"))
  ).toMatchInlineSnapshot(
    `"hello<any>&nbsp;</any>world och 4<mis hårt mellanslag> </mis>GHz eller 5<ver><any>&nbsp;</any></ver>GHz"`
  );
});
