export enum Color {
  green = "green",
  blue = "blue",
  red = "red",
  white = "white",
  black = "black",
}

export type ColorData = {
  name: string;
  HEX: string;
  RGB: ColorRGB;
};

export type ColorRGB = {
  R: number;
  G: number;
  B: number;
};
