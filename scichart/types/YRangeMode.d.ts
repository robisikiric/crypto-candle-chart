/**
 * Enumeration constants to define how getWindowedYRange should behave
 */
export declare enum EYRangeMode {
    /** Y Range will be calculated based on the visible points. (Default).  In some cases lines to points outside the range may escape the axis  */
    Visible = "Visible",
    /** Y Range will include the points either side of the visible set.
     * The series is guaranteed to be drawn within the axis bounds, but the range could be affected by extreme points just outside */
    Drawn = "Drawn"
}
