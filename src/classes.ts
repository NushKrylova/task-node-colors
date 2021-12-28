import { Colors } from "./types";

class Color {
	name: string;
	constructor(name: Colors) {
		this.name = name
	}
}

export class Green extends Color {
	constructor() {
		super(Colors.green);
	}
}

export class Blue extends Color {
	constructor() {
		super(Colors.blue);
	}
}

export class Red extends Color {
	constructor() {
		super(Colors.red);
	}
}
