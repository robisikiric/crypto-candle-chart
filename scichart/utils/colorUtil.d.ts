import { TLinearColorMap } from "../types/TLinearColorMap";
/**
 * Linearly interpolates between two colors based on the ratio passed in. E.g. Ratio = 0.0f returns From color,
 * ratio = 1.0f returns To Color. Ratio = 0.5f returns a mix of the two.
 * Works only for numbers not more than 24 bit
 * @param from the start color, for example 0xff0000
 * @param to the end color, for example 0x00ff00
 * @param ratio the value between 0 and 1
 * @constructor
 */
export declare function uintArgbColorLerp24bit(from: number, to: number, ratio: number): number;
/**
 * Linearly interpolates between two colors based on the ratio passed in. E.g. Ratio = 0.0f returns From color,
 * ratio = 1.0f returns To Color. Ratio = 0.5f returns a mix of the two
 * Works for 32 bit colors
 * @param from the start color, for example 0x0000ffff (format ARGB)
 * @param to the end color, for example 0xffffffff
 * @param ratio the value between 0 and 1
 * @constructor
 */
export declare function uintArgbColorLerp(from: number, to: number, ratio: number): number;
/**
 * Linearly interpolates a data-value in a TLinearColorMap, which specifies Gradient Stops, Data Minimum
 * and Maximum and color stepping mode
 * @param colorMap
 * @param dataValue
 * @constructor
 */
export declare function linearColorMapLerp(colorMap: TLinearColorMap, dataValue: number): number;
export declare function uintArgbColorToAbgr(argbColor: number): number;
export declare function uintArgbColorMultiplyOpacity(argbColor: number, opacity: number): number;
export declare function uintArgbColorOverrideOpacity(argbColor: number, opacity: number): number;
export declare function uintArgbColorIsTransparent(argbColor: number): boolean;
/**
 * Applies the given opacity to an html color code or name, returning an html color code.
 * @param color
 * @param opacity
 * @returns
 */
export declare function applyOpacityToHtmlColor(color: string, opacity: number): string;
