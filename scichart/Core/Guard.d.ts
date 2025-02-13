import { NumberArray } from "../types/NumberArray";
/**
 * Type used by {@link Guard.arraysSameLengthArr}
 */
declare type TElement = {
    arg: NumberArray | any[];
    name: string;
};
/**
 * Guard class for sanity-checking (null checking, check if property is true, check arrays same length etc...)
 */
export declare class Guard {
    /**
     * Asserts the argument is not null
     * @param arg The argument
     * @param name The argument name
     * @throws Error - an error when the argument is null or undefined
     */
    static notNull(arg: any, name: string): void;
    /**
     * Asserts a parameter is true
     * @param value
     * @param message The message to show if not true
     * @throws Error - an error when the parameter is false
     */
    static isTrue(value: boolean, message: string): void;
    /**
     * Asserts two arrays are not null (undefined) and are the same legnth
     * @param arg The first array
     * @param name1 The first array parameter name
     * @param arg2 The second array
     * @param name2 The second array parameter name
     * @throws Error - an error when the arrays are not the same length
     */
    static arraysSameLength(arg: NumberArray | any[], name1: string, arg2: NumberArray | any[], name2: string): void;
    /**
     * Asserts multiple arrays are not null (undefined) and are the same legnth
     * @param args The array of arrays
     * @throws Error - an error when the arrays are not the same length
     */
    static arraysSameLengthArr(args?: TElement[]): void;
    /**
     * Asserts a numeric argument is a real number: not null (undefined), not NaN and not infinite
     * @param d
     * @param name
     */
    static argumentIsRealNumber(d: number, name: string): void;
    /**
     * Asserts a numeric argument is a real number: not null (undefined), not NaN and not infinite
     * @param d
     * @param name
     */
    static argumentIsRealInteger(d: number, name: string): void;
}
export {};
