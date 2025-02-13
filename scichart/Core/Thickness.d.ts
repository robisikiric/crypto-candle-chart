export declare class Thickness {
    /**
     * Creates a Thickness (margin or padding) from string, e.g. "25 50 75 100". Order is top, right, bottom left. Same as in Css
     * @param str
     */
    static fromString(str: string): Thickness;
    /**
     * Creates a Thickness (margin or padding) from a single value, e.g. 10, would return a thickness with top, right, bottom left = 10
     * @param value
     */
    static fromNumber(value: number): Thickness;
    /**
     * Gets or sets the left amount
     */
    left: number;
    /**
     * Gets or sets the right amount
     */
    right: number;
    /**
     * Gets or sets the top amount
     */
    top: number;
    /**
     * Gets or sets the bottom amount
     */
    bottom: number;
    /**
     * Creates an instance of a Thickness object, with top, right, bottom and left
     * @param top
     * @param right
     * @param bottom
     * @param left
     */
    constructor(top: number, right: number, bottom: number, left: number);
    /**
     * Returns whether two {@link Thickness} instances are equal or not
     * @example
     * const t1 = new Thickness(4,4,4,4);
     * const t2 = new Thickness.fromNumber(4);
     * console.log(Thickness.areEqual(t1, t2)); // True
     */
    static areEqual(first: Thickness, second: Thickness): boolean;
    /**
     * Returns the max of each side of 2 components in a new {@link Thickness} object
     * @param first
     * @param second
     * @example
     * const t1 = new Thickness(1,2,3,4);
     * const t2 = new Thickness(4,3,2,1);
     * console.log(Thickness.mergeMax(t1, t2));
     * // Thickness { top: 4, right: 3, bottom: 3, left: 4 }
     */
    static mergeMax(first: Thickness, second: Thickness): Thickness;
}
