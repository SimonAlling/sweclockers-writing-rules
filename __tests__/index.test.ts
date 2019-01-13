import {
  highlightWith,
  highlightMistakesWith,
  highlightVerifiedWith,
} from "highlight-mistakes";

import { PATTERN_VERIFY, MISTAKES } from "../index";

const CLASS_MIS = "mis";
const CLASS_VER = "ver";

function markWith(
  id: string
): (info: string | null) => (s: string) => string {
  return info => s => [`<`, id, (info ? " " + info : ""), `>`, s, `</`, id, `>`].join("");
}

const NO_INFO = null;
const markM = markWith(CLASS_MIS);
const markV = markWith(CLASS_VER)(NO_INFO);

const highlightMistakes = highlightMistakesWith(MISTAKES, markM);
const highlightVerified = highlightVerifiedWith(PATTERN_VERIFY, markV);

const highlight = highlightWith({
  mistakes: MISTAKES,
  verify: PATTERN_VERIFY,
  identifiers: { mistake: CLASS_MIS, verified: CLASS_VER },
  markWith
});

it("does something right", () => {
  expect(highlightMistakes("5 GHz")).toMatchInlineSnapshot(
    `"5<mis hårt mellanslag> </mis>GHz"`
  );
  expect(highlightVerified("5&nbsp;GHz")).toMatchInlineSnapshot(
    `"5<ver>&nbsp;</ver>GHz"`
  );
  expect(highlight("5&nbsp;GHz eller 4 GHz")).toMatchInlineSnapshot(
    `"5<ver>&nbsp;</ver>GHz eller 4<mis hårt mellanslag> </mis>GHz"`
  );
});

it("highlights examples correctly", () => {
  expect(
    highlight(
      `The Division 2 får systemkrav – RTX 2080 Ti eller Radeon VII för 4K-spelande`
    )
  ).toMatchInlineSnapshot(
    `"The Division<mis hårt mellanslag> </mis>2 får systemkrav <ver>–</ver> RTX<mis hårt mellanslag> </mis>2080<mis hårt mellanslag> </mis>Ti eller Radeon VII för 4K-spelande"`
  );
  expect(
    highlight(
      `The Division 2 får systemkrav – RTX 2080&nbsp;Ti eller Radeon VII för 4K-spelande`
    )
  ).toMatchInlineSnapshot(
    `"The Division<mis hårt mellanslag> </mis>2 får systemkrav <ver>–</ver> RTX<mis hårt mellanslag> </mis>2080<ver>&nbsp;</ver>Ti eller Radeon VII för 4K-spelande"`
  );
  expect(highlight(`144 Hz IPS med Freesync på 27 tum`)).toMatchInlineSnapshot(
    `"144<mis hårt mellanslag> </mis>Hz IPS med Freesync på 27<mis hårt mellanslag> </mis>tum"`
  );
  expect(
    highlight(`10-bitars IPS-panel, upplösningen 2 560 × 1 440 pixlar, 144 Hz`)
  ).toMatchInlineSnapshot(
    `"10-bitars IPS-panel, upplösningen 2<mis hårt mellanslag> </mis>560<mis hårt mellanslag> </mis><ver>×</ver><mis hårt mellanslag> </mis>1<mis hårt mellanslag> </mis>440 pixlar, 144<mis hårt mellanslag> </mis>Hz"`
  );
  expect(highlight(`cirka 6 700 kronor`)).toMatchInlineSnapshot(
    `"cirka 6<mis hårt mellanslag> </mis>700<mis hårt mellanslag> </mis>kronor"`
  );
  expect(
    highlight(`Nvidia G-Sync Ultimate är skärmar med 4K UHD, 144 Hz och HDR`)
  ).toMatchInlineSnapshot(
    `"Nvidia G<mis hårt bindestreck>-</mis>Sync Ultimate är skärmar med 4K<mis hårt mellanslag> </mis>UHD, 144<mis hårt mellanslag> </mis>Hz och HDR"`
  );
  expect(highlight(`den 18/1–20/1`)).toMatchInlineSnapshot(
    `"den 18/1<ver>–</ver>20/1"`
  );
  expect(highlight(`den 18/1-20/1`)).toMatchInlineSnapshot(
    `"den 18/1<mis tankstreck>-</mis>20/1"`
  );
  expect(highlight(`Geforce RTX-serien`)).toMatchInlineSnapshot(
    `"Geforce<mis hårt mellanslag> </mis>RTX-serien"`
  );
  expect(
    highlight(`Detta kan jämföras med 648 respektive 1 476 MHz för GTX 285`)
  ).toMatchInlineSnapshot(
    `"Detta kan jämföras med 648 respektive 1<mis hårt mellanslag> </mis>476<mis hårt mellanslag> </mis>MHz för GTX<mis hårt mellanslag> </mis>285"`
  );
  expect(
    highlight(
      `Med en minnesfrekvens på närmare 2 000 MHz uppgick bandbredden till 112 GB/s per grafikkrets.`
    )
  ).toMatchInlineSnapshot(
    `"Med en minnesfrekvens på närmare 2<mis hårt mellanslag> </mis>000<mis hårt mellanslag> </mis>MHz uppgick bandbredden till 112<mis hårt mellanslag> </mis>GB/s per grafikkrets."`
  );
  expect(highlight(`guldstandarden 120 FPS`)).toMatchInlineSnapshot(
    `"guldstandarden 120<mis hårt mellanslag> </mis>FPS"`
  );
  expect(
    highlight(`Nvidias Geforce GTX 295 kostade trots allt hela 5 300 kronor.`)
  ).toMatchInlineSnapshot(
    `"Nvidias Geforce GTX<mis hårt mellanslag> </mis>295 kostade trots allt hela 5<mis hårt mellanslag> </mis>300<mis hårt mellanslag> </mis>kronor."`
  );
  expect(
    highlight(
      `Intel Core i9-9900K, i7-9700K och i5-9600K – "Coffee Lake Refresh"`
    )
  ).toMatchInlineSnapshot(
    `"Intel Core<mis hårt mellanslag> </mis>i9<mis hårt bindestreck>-</mis>9900K, i7<mis hårt bindestreck>-</mis>9700K och i5<mis hårt bindestreck>-</mis>9600K <ver>–</ver> \\"Coffee Lake Refresh\\""`
  );
  expect(highlight(`på 14 nanometer`)).toMatchInlineSnapshot(
    `"på 14<mis hårt mellanslag> </mis>nanometer"`
  );
  expect(highlight(`50 W eller 70 %`)).toMatchInlineSnapshot(
    `"50<mis hårt mellanslag> </mis>W eller 70<mis hårt mellanslag> </mis>%"`
  );
  expect(highlight(`vid 4,7 GHz`)).toMatchInlineSnapshot(
    `"vid 4,7<mis hårt mellanslag> </mis>GHz"`
  );
  expect(highlight(`AMD:s toppmodell Ryzen 7 2700X`)).toMatchInlineSnapshot(
    `"AMD:s toppmodell Ryzen<mis hårt mellanslag> </mis>7 2700X"`
  );
  expect(highlight(`Mini-ITX-chassin`)).toMatchInlineSnapshot(
    `"Mini<mis hårt bindestreck>-</mis>ITX-chassin"`
  );
  expect(highlight(`Counter-Strike`)).toMatchInlineSnapshot(
    `"Counter<mis hårt bindestreck>-</mis>Strike"`
  );
  expect(highlight(`Silent Wings 3 i 120 mm-utförande`)).toMatchInlineSnapshot(
    `"Silent Wings<mis hårt mellanslag> </mis>3 i 120<mis hårt mellanslag> </mis>mm-utförande"`
  );
  expect(
    highlight(
      `på 4 TB. Det som demonstreras är en prototyp som ansluts via USB Type-C och`
    )
  ).toMatchInlineSnapshot(
    `"på 4<mis hårt mellanslag> </mis>TB. Det som demonstreras är en prototyp som ansluts via USB<mis hårt mellanslag> </mis>Type<mis hårt bindestreck>-</mis>C och"`
  );
  expect(highlight(`HDMI 2.0`)).toMatchInlineSnapshot(
    `"HDMI<mis hårt mellanslag> </mis>2.0"`
  );
  expect(
    highlight(
      `DVI-D, DVI-A och DVI-I; en annan sak är DVI-DL och tänk på att DVI-D DL behövs`
    )
  ).toMatchInlineSnapshot(
    `"DVI<mis hårt bindestreck>-</mis>D, DVI<mis hårt bindestreck>-</mis>A och DVI<mis hårt bindestreck>-</mis>I; en annan sak är DVI<mis hårt bindestreck>-</mis>DL och tänk på att DVI<mis hårt bindestreck>-</mis>D<mis hårt mellanslag> </mis>DL behövs"`
  );
  expect(highlight(`4 500 kilogram`)).toMatchInlineSnapshot(
    `"4<mis hårt mellanslag> </mis>500<mis hårt mellanslag> </mis>kilogram"`
  );
  expect(highlight(`3 500 000 watt`)).toMatchInlineSnapshot(
    `"3<mis hårt mellanslag> </mis>500<mis hårt mellanslag> </mis>000<mis hårt mellanslag> </mis>watt"`
  );
  expect(
    highlight(`Vi pratar Ryzen 3000-serien med AMD – Zen 2 och 7 nanometer`)
  ).toMatchInlineSnapshot(
    `"Vi pratar Ryzen<mis hårt mellanslag> </mis>3000-serien med AMD <ver>–</ver> Zen<mis hårt mellanslag> </mis>2 och 7<mis hårt mellanslag> </mis>nanometer"`
  );
  expect(highlight(`2 x Ethernet RJ45`)).toMatchInlineSnapshot(
    `"2 <mis gångertecken>x</mis> Ethernet RJ45"`
  );
  expect(highlight(`2 × Ethernet RJ45`)).toMatchInlineSnapshot(
    `"2<mis hårt mellanslag> </mis><ver>×</ver><mis hårt mellanslag> </mis>Ethernet RJ45"`
  );
  expect(highlight(`2 560 x 1 440`)).toMatchInlineSnapshot(
    `"2<mis hårt mellanslag> </mis>560 <mis gångertecken>x</mis> 1<mis hårt mellanslag> </mis>440"`
  );
  expect(highlight(`2&nbsp;560 × 1&nbsp;440`)).toMatchInlineSnapshot(
    `"2<ver>&nbsp;</ver>560<mis hårt mellanslag> </mis><ver>×</ver><mis hårt mellanslag> </mis>1<ver>&nbsp;</ver>440"`
  );
});
