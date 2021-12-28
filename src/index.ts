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

async function main() {
  const argInputs = process.argv.slice(2);
  const colorsResults = await getColorsData(...(argInputs as Colors[]));

  const hexColors = colorsResults.map((color: ColorData | undefined) =>
    color ? color.HEX : undefined
  );

  console.log(hexColors);
}

main();

/*
To run application:
ts-node src/index.ts "white" "bla-bla" "blue" "red"
*/
