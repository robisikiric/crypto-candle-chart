import { ENumericFormat, IEngineeringPrefix } from "../types/NumericFormat";
/**
 * @description Formats value always to have 2 decimal digits, e.g. 12.45, 14.20, 17.00
 * @param value
 */
export declare const formatNumber2Digits: (value: number) => string;
export declare const numericHashCode: (hash: number, value: number) => number;
export declare const formatNumber: (dataValue: number, numericFormat: ENumericFormat, precision: number, engineeringPrefix?: IEngineeringPrefix) => string;
export declare const toSuperScript: (value: number) => string;
export declare const toScientific: (value: number, precision: number, logarithmicBase: number) => string;
export declare const toEngineering: (value: number, largePrefixes?: string[], smallPrefixes?: string[]) => string;
export declare const checkIsNaN: (value: number) => boolean;
