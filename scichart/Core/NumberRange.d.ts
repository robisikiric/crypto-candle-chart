/**
 * Defines a number range with numeric min, max
 */
export declare class NumberRange {
    readonly min: number;
    readonly max: number;
    constructor(min?: number, max?: number);
    /**
     * Returns a new {@link NumberRange} which is the union of two ranges
     * @remarks
     * E.g. if current range is [1,2] and input is [2,3] the result range will be [1,3]
     * @param range
     * @returns the new union range
     */
    union(range: NumberRange): NumberRange;
    /**
     * Clips a range to a min, max value
     * @remarks
     * E.g. if the current range is [1,5] and input is [2,6] then result will be [2,5]
     * @param range
     * @returns The new clipped range
     */
    clip(range: NumberRange): NumberRange;
    /**
     * Grows a range by a min and max factor
     * @remarks
     * If the current range is [5,10] and the input range is [0.1, 0.1] the current range will be
     * grown by 10%, so [4.5, 10.5]
     * @param range The grow factor
     */
    growBy(range: NumberRange): NumberRange;
    growByLog(range: NumberRange, logBase: number): NumberRange;
    /**
     * Returns true if the range is defined (is a real number, not NaN, not infinite, and not undefined)
     */
    isDefined(): boolean;
    /**
     * Returns true if the range equals another by value
     * @param other
     */
    equals(other: NumberRange): boolean;
    /**
     * Returns a string representation of a {@link NumberRange} for easy debugging
     */
    toString(): string;
    /**
     * Returns a difference between max and min
     */
    get diff(): number;
    /**
     * Returns true if the range min === range max
     */
    isZero(): boolean;
    static areEqual(range1: NumberRange, range2: NumberRange): boolean;
    /**
     * Turns a { min, max } object into a {@link NumberRange}, most helpful for JSON deserialization
    */
    static hydrate(range: NumberRange | {
        min: number;
        max: number;
    }): NumberRange;
}
