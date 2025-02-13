import { TNativeTextStyle } from "../types/TextStyle";
import { SCRTFont, TSciChart, TSRTextBounds } from "../types/TSciChart";
/**
 * Wrap a string by adding newline characters, splitting on spaces and wrapping to a maximum size
 */
export declare const wrapNativeText: (text: string, maxWidth: number, font: SCRTFont, textBounds: TSRTextBounds) => string;
export declare const getNativeTextSize: (text: string, nativeFont: SCRTFont, textStyle: TNativeTextStyle, webAssemblyContext: TSciChart, rotation?: number) => {
    textHeight: number;
    textWidth: number;
    nativeLineSpacing: number;
    deltaX: number;
    deltaY: number;
};
