import { ColorData, Colors } from "./types";
const { getColor } = require("./apiMock");

function getColorsData(...args: Colors[]) {
  const colors: Promise<ColorData | undefined>[] = [];

  args.forEach((arg) => {
    const colorData = (getColor(arg) as Promise<ColorData>)
      .then((data) => data)
      .catch((error) => {
        console.log(`${error} ${arg}`);
        return undefined;
      });
    colors.push(colorData);
  });

  return Promise.all(colors);
}

function getColorsHex(colorsData: Array<ColorData | undefined>) {
  return colorsData.map((color: ColorData | undefined) =>
    color ? color.HEX : undefined
  );
}

function getColorsRGB(colorsData: Array<ColorData | undefined>) {
  return colorsData.map((color: ColorData | undefined) =>
    color ? color.RGB : undefined
  );
}

async function main() {
  const argColors = process.argv[2];
  const argColorFormat = process.argv[3];
  const argColorList = argColors.split(" ");

  const colorsResults = await getColorsData(...(argColorList as Colors[]));

  if (argColorFormat === "--rgb") {
    console.log(getColorsRGB(colorsResults));
  } else if (argColorFormat === "--hex") {
    console.log(getColorsHex(colorsResults));
  } else {
    console.log(
      "Error: Invalid color format, expected values are '--rgb' or '--hex'"
    );
  }
}

main();

/*
To run application:
ts-node src/index.ts "white bla-bla blue red" "--rgb"
*/
