import { TSRVector4 } from "../types/TSciChart3D";
import { TArgb } from "./parseColor";
/**
 * Converts a color in TArgb format to TSRVector4 (RGBA -> x,y,z,w) for use in 3D Engine
 * @param color
 * @param tsrColor
 */
export declare const updateTsrVector4: (color: TArgb, tsrColor: TSRVector4) => void;
export declare const fromTsrVector4: (tsrColor: TSRVector4) => TArgb;
