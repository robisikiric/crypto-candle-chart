/**
 * Defines enumeration constants for mode of dataPointWidth on Column, Candle and ErrorBar series
 */
export declare enum EDataPointWidthMode {
    /**
     * Interprets Data Point Width as an absolute pixel value
     */
    Absolute = "Absolute",
    /**
     * Interprets Data Point Width as a relative to the full width which is axis length / number of columns.
     * This assumes that there are no gaps in the data.  If you are plotting sparse columns on a NumericAxis, consider Range mode
     */
    Relative = "Relative",
    /**
     * Interprets Data Point Width as the x data range per column.  This is useful if you are plotting sparse columns on a NumericAxis
     */
    Range = "Range"
}
