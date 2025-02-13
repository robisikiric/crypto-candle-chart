import { DeletableEntity } from "../../../Core/DeletableEntity";
import { IDeletable } from "../../../Core/IDeletable";
import { SCRTColorVertex, SCRTFontKey, SCRTRectVertex, TSciChart, TSRTextBounds, TSRVector4, VectorColorVertex, VectorRectVertex } from "../../../types/TSciChart";
import { TSciChart3D } from "../../../types/TSciChart3D";
import { TTextStyle } from "../Axis/AxisCore";
export declare class FontKey extends DeletableEntity implements IDeletable {
    readonly firstLoadTime: number;
    readonly nativeKey: SCRTFontKey;
    constructor(nativeKey: SCRTFontKey);
    delete(): void;
}
export declare const deleteCache: (wasmContext: TSciChart | TSciChart3D) => void;
export declare const freeCache: (wasmContext: TSciChart) => IDeletable;
/**
 * Returns an empty vector of Rectangles
 * @param wasmContext
 * @param maxSize
 * @returns
 */
export declare const getVectorRectVertex: (wasmContext: TSciChart, maxSize?: number) => VectorRectVertex;
export declare const getVectorColorVertex: (wasmContext: TSciChart, maxSize?: number) => VectorColorVertex;
export declare const getVertex: (wasmContext: TSciChart, x: number, y: number, colour?: number) => SCRTColorVertex;
export declare const getTextBounds: (wasmContext: TSciChart | TSciChart3D) => TSRTextBounds;
export declare const getNativeRect: (wasmContext: TSciChart, xTopLeft: number, yTopLeft: number, xBottomRight: number, yBottomRight: number) => SCRTRectVertex;
export declare const getVector4: (wasmContext: TSciChart | TSciChart3D, x: number, y: number, z: number, w: number) => TSRVector4;
/**
 * get a fontKey required to aquire a native font
 * @param webAssemblyContext
 * @param labelStyle
 * @param transformed set true to get an alternative instance of the font which can be used multiple times while transformations are in effect,
 * without disrupting global font rendering
 * @returns
 */
export declare const getFontKey: (webAssemblyContext: TSciChart | TSciChart3D, labelStyle: TTextStyle, advanced?: boolean, transformed?: boolean) => SCRTFontKey;
export declare const getAllFontKeys: (webAssemblyContext: TSciChart | TSciChart3D) => SCRTFontKey[];
