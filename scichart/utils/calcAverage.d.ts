import { SCRTDoubleVector } from "../types/TSciChart";
/**
 * @description Calculates average for DoubleVector
 * @param doubleVector
 * @param averageNum - number of values to respect for the average
 * @param index - index of the latest value to include, by default equals to length-1 of DoubleVector
 */
export declare const calcAverageForDoubleVector: (doubleVector: SCRTDoubleVector, averageNum: number, index?: number) => number;
export declare const calcAverageForArray: (ar: number[], averageNum: number, index?: number) => number;
