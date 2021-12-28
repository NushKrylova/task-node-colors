import { ColorData, Colors } from "./types";

import { getColor } from './apiMock';

import { Green, Blue, Red } from './classes';

async function getColors(green: string, blue: string, red: string, order: string[], callback: (colors: Promise<ColorData>[]) => void) {
	const colors: Promise<ColorData>[] = [];
	if (green === 'true') {
		const greenDetails = new Green();
		colors[order.indexOf(greenDetails.name)] = getColor(greenDetails.name) as Promise<ColorData>;
	}
	if (blue === 'true') {
		const blueDetails = new Blue()
		colors[order.indexOf(blueDetails.name)] = getColor(blueDetails.name) as Promise<ColorData>;
	}
	if (red === 'true') {
		const redDetails = new Red();
		colors[order.indexOf(redDetails.name)] = getColor(redDetails.name) as Promise<ColorData>;
	}
	callback(colors);
	return colors;
}

function colors() {
	console.log("DEBUG: ", process.argv)
	let green = process.argv[2];;
	let blue = process.argv[3]
	let red = process.argv[4];
	const colorOrder = process.argv[5]
	getColors(green, blue, red, JSON.parse(colorOrder), async function (colors) {
		const colorsResults = await Promise.all(colors)
		// console.log(colors)
		var hexColors: Array<string | undefined> = []
		colorsResults.forEach(color => color ? hexColors.push(color.HEX) : null)
		console.log(hexColors);
	});
}

colors()

/*
To run application:
ts-node src/index.ts true false true '["green","blue", "red"]'
*/
