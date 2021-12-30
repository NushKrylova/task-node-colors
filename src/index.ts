import { ColorData, Color, FormatColorDataFn } from "./types";
const { getColor } = require("./apiMock");

// Works with Api
async function getColorData(color: Color): Promise<ColorData | undefined> {
  let colorData: ColorData | undefined;

  try {
    colorData = await (getColor(color) as Promise<ColorData>);
  } catch (error) {
    console.log(`${error} ${color}`);
    colorData = undefined;
  }

  return colorData;
}

function getColorsHex(colorsData: Array<ColorData | undefined>): string {
  const colorsHex = colorsData.map((color: ColorData | undefined) => (color ? color.HEX : "undefined"));
  return colorsHex.join(", ");
}

function getColorsRGB(colorsData: Array<ColorData | undefined>): string {
  const colorsHex = colorsData.map((color: ColorData | undefined) => {
    if (color) {
      return `(R:${color.RGB.R}; G:${color.RGB.G}; B:${color.RGB.B})`;
    } else {
      return "undefined";
    }
  });
  return colorsHex.join(", ");
}

async function printColorsDataEach(colorNames: Color[], formatColorData: FormatColorDataFn) {
  for (const colorName of colorNames) {
    const colorData = await getColorData(colorName);
    console.log(formatColorData([colorData]));
  }
}

async function printColorsDataBatch(colorNames: Color[], formatColorData: FormatColorDataFn) {
  const colorsData = await Promise.all(colorNames.map(getColorData));
  console.log(formatColorData(colorsData));
}

async function main() {
  const colorNames = process.argv[2].split(" ") as Color[];
  const isRgb = process.argv[3] === "--rgb";
  const isSync = process.argv[4] === "--sync";

  let formatColorData: FormatColorDataFn = isRgb ? getColorsRGB : getColorsHex;

  if (isSync) {
    printColorsDataEach(colorNames, formatColorData);
  } else {
    printColorsDataBatch(colorNames, formatColorData);
  }
}

main();

/*
To run application:
ts-node src/index.ts "white bla-bla blue red" --rgb --sync
*/
