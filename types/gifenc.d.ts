declare module "gifenc" {
  export function GIFEncoder(): {
    writeFrame: (index: Uint8Array, width: number, height: number, options: { palette: number[][]; delay: number; transparent?: boolean; transparentIndex?: number }) => void;
    finish: () => void;
    bytes: () => Uint8Array;
  };
  export function quantize(rgba: Uint8ClampedArray, maxColors: number, options?: { format?: "rgb" | "rgba"; oneBitAlpha?: boolean }): number[][];
  export function applyPalette(rgba: Uint8ClampedArray, palette: number[][], options?: { format?: "rgb" | "rgba" }): Uint8Array;
}
