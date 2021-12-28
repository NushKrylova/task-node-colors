export enum Colors {
  green = "green",
  blue = "blue",
  red = "red",
  white = "white",
  black = "black",
}

export type ColorData = {
  name: string;
  HEX: string;
  RGB: { R: number; G: number; B: number };
};
