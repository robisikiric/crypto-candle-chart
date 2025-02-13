/**
 * Enumeration constants to define the type of {@link AxisCore | Axis}
 */
export declare enum EAxisType {
    /**
     * The Axis is a Category Axis. X-values are measured based on index, not data-value
     */
    CategoryAxis = "CategoryAxis",
    /**
     * The Axis is a Numeric value Axis. X-Values are measured based on value, not index
     */
    NumericAxis = "NumericAxis",
    /**
     * The Axis is a Logarithmic Numeric value Axis. X/Y Values are measured based on logN(value)
     */
    LogarithmicAxis = "LogarithmicAxis",
    /**
     * The Axis is a 3D Chart Numeric value Axis. X-Values are measured based on value, not index
     */
    NumericAxis3D = "NumericAxis3D",
    /**
     * The Axis is a Date / Time value Axis. X-Values are measured based on value, not index
     */
    DateTimeNumericAxis = "DateTimeNumericAxis"
}
