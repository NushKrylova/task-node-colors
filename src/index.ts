import { ColorData, ColorRGB, Colors } from "./types";
const { getColor } = require("./apiMock");

async function getColorsDataSync(
  callback: (
    colorsData: Array<ColorData | undefined>
  ) => Array<string | ColorRGB | undefined>,
  sync: boolean,
  ...args: Colors[]
) {
  if (sync) {
    for (const arg of args) {
      try {
        const color = await (getColor(arg) as Promise<ColorData>);
        console.log(callback([color]));
      } catch (error) {
        console.log(`${error} ${arg}`);
        const color = undefined;
        console.log(callback([color]));
      }
    }
  } else {
    const colorsPromise: Promise<ColorData | undefined>[] = [];

    args.forEach((arg) => {
      const colorData = (getColor(arg) as Promise<ColorData>)
        .then((data) => data)
        .catch((error) => {
          console.log(`${error} ${arg}`);
          return undefined;
        });
      colorsPromise.push(colorData);
    });

    const colors = await Promise.all(colorsPromise);
    console.log(callback(colors));
  }
}

function getColorsHex(
  colorsData: Array<ColorData | undefined>
): Array<string | undefined> {
  return colorsData.map((color: ColorData | undefined) =>
    color ? color.HEX : undefined
  );
}

function getColorsRGB(
  colorsData: Array<ColorData | undefined>
): Array<ColorRGB | undefined> {
  return colorsData.map((color: ColorData | undefined) =>
    color ? color.RGB : undefined
  );
}

async function main() {
  const argColors = process.argv[2];
  const argColorFormat = process.argv[3];
  const argSync = process.argv[4];
  const argColorList = argColors.split(" ");

  let callback: (
    colorsData: Array<ColorData | undefined>
  ) => Array<string | ColorRGB | undefined>;

  if (argColorFormat === "--rgb") {
    callback = getColorsRGB;
  } else {
    callback = getColorsHex;
  }

  let sync: boolean = argSync === "--sync" ? true : false;

  await getColorsDataSync(callback, sync, ...(argColorList as Colors[]));
}

main();

/*
To run application:
ts-node src/index.ts "white bla-bla blue red" "--rgb" "--sync"
*/
