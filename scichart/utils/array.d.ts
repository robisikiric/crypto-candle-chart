import { NumberArray } from "../types/NumberArray";
export declare function getUniqueValues(array: string[]): string[];
export declare function countUnique(iterable: string[]): number;
export declare const areArraysEqual: (leftArray: number[], rightArray: number[]) => boolean;
export declare function arrayRemove<T>(array: T[], item: T): T[];
/**
 * returns true if the array is sorted
 * @param arr The array
 * @param ascending If True checks for sorted ascending, if False for descending
 */
export declare function isArraySorted(arr: NumberArray, ascending?: boolean): boolean;
/**
 * Helper method for generating an array of a given length, where the values are the indicies
 * An optional multiplier and map function can be applied.
 * @param length
 * @param multiplier
 * @param map
 * @returns
 */
export declare function makeIncArray(length: number, multiplier?: number, map?: (n: number, index?: number) => number): number[];
/**
 * Helper function to append an array to a target array, treating the target as a circular buffer
 * @param source
 * @param target
 * @param fifoCapacity
 * @param startIndex
 */
export declare function appendRangeFifo(source: any[], target: any[], fifoCapacity: number, startIndex: number): void;
