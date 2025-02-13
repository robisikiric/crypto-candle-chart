import { Thickness } from "../Core/Thickness";
import { EMultiLineAlignment } from "./TextPosition";
/**
 * A type class to contain information about data label styles
 * @remarks
 * - Set the fontFamily as a string to set the font
 * - Set the fontSize as you would in HTML/CSS
 * - Set the color as an HTML Color code to define the color
 */
export declare type TDataLabelStyle = {
    fontSize?: number;
    fontFamily?: string;
    padding?: Thickness;
    multiLineAlignment?: EMultiLineAlignment;
    lineSpacing?: number;
};
