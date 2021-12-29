import { ColorData, ColorRGB, Color } from "./types";
const { getColor } = require("./apiMock");

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

async function getColorsData(...args: Color[]): Promise<Array<ColorData | undefined>> {
  const colorsPromise: Promise<ColorData | undefined>[] = [];

  for (const arg of args) {
    const colorData = (getColor(arg) as Promise<ColorData>)
      .then((data) => data)
      .catch((error) => {
        console.log(`${error} ${arg}`);
        return undefined;
      });
    colorsPromise.push(colorData);
  }

  return Promise.all(colorsPromise);
}

async function printColorsData(
  callback: (colorsData: Array<ColorData | undefined>) => Array<string | ColorRGB | undefined>,
  sync: boolean,
  ...args: Color[]
): Promise<void> {
  if (sync) {
    for (const arg of args) {
      let colorData = await getColorData(arg);
      console.log(callback([colorData]));
    }
  } else {
    let colorsData = await getColorsData(...args);
    console.log(callback(colorsData));
  }
}

function getColorsHex(colorsData: Array<ColorData | undefined>): Array<string | undefined> {
  return colorsData.map((color: ColorData | undefined) => (color ? color.HEX : undefined));
}

function getColorsRGB(colorsData: Array<ColorData | undefined>): Array<ColorRGB | undefined> {
  return colorsData.map((color: ColorData | undefined) => (color ? color.RGB : undefined));
}

async function main() {
  const argColors = process.argv[2];
  const argColorFormat = process.argv[3];
  const argSync = process.argv[4];
  const argColorList = argColors.split(" ");

  let callback: (colorsData: Array<ColorData | undefined>) => Array<string | ColorRGB | undefined>;

  if (argColorFormat === "--rgb") {
    callback = getColorsRGB;
  } else {
    callback = getColorsHex;
  }

  let sync: boolean = argSync === "--sync" ? true : false;

  await printColorsData(callback, sync, ...(argColorList as Color[]));
}

main();

/*
To run application:
ts-node src/index.ts "white bla-bla blue red" "--rgb" "--sync"
*/
