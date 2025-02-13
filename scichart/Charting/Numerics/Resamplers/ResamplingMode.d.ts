export declare enum EResamplingMode {
    /**
     * Do not use resampling when redrawing a series
     */
    None = "None",
    /**
     * Assumes Evenly-spaced data (TimeSeries). Resample by taking the min-max of oversampled data.
     * This results in the most visually accurate resampling, with the most performan
     */
    MinMax = "MinMax",
    /**
     * Assumes Evenly-spaced data (TimeSeries). Resample by taking the median point of oversampled data
     */
    Mid = "Mid",
    /**
     * Assumes Evenly-spaced data (TimeSeries). Resample by taking the maximum point of oversampled data
     */
    Max = "Max",
    /**
     * Assumes Evenly-spaced data (TimeSeries). Resample by taking the minimum point of oversampled data
     */
    Min = "Min",
    /**
     * Does not assume Evenly-spaced data (TimeSeries). Resample by taking the min-max of oversampled data.
     * This results in the most visually accurate resampling, with the most performant rendering
     */
    MinMaxWithUnevenSpacing = "MinMaxWithUnevenSpacing",
    /**
     * Auto-detect the most suitable resampling algorithm (Fastest, plus most accurate) for the type of data appended
     */
    Auto = "Auto",
    /**
     * EXPERIMENTAL! Assumes Evenly-spaced data (TimeSeries).
     * Resample by taking the Min, or the Max point of oversampled data. Outputs Min and Max when points in the resampling bucket span zero
     */
    MinOrMax = "MinOrMax"
}
