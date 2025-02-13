"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EResamplingMode = void 0;
var EResamplingMode;
(function (EResamplingMode) {
    /**
     * Do not use resampling when redrawing a series
     */
    EResamplingMode["None"] = "None";
    /**
     * Assumes Evenly-spaced data (TimeSeries). Resample by taking the min-max of oversampled data.
     * This results in the most visually accurate resampling, with the most performan
     */
    EResamplingMode["MinMax"] = "MinMax";
    /**
     * Assumes Evenly-spaced data (TimeSeries). Resample by taking the median point of oversampled data
     */
    EResamplingMode["Mid"] = "Mid";
    /**
     * Assumes Evenly-spaced data (TimeSeries). Resample by taking the maximum point of oversampled data
     */
    EResamplingMode["Max"] = "Max";
    /**
     * Assumes Evenly-spaced data (TimeSeries). Resample by taking the minimum point of oversampled data
     */
    EResamplingMode["Min"] = "Min";
    /**
     * Does not assume Evenly-spaced data (TimeSeries). Resample by taking the min-max of oversampled data.
     * This results in the most visually accurate resampling, with the most performant rendering
     */
    EResamplingMode["MinMaxWithUnevenSpacing"] = "MinMaxWithUnevenSpacing";
    /**
     * Auto-detect the most suitable resampling algorithm (Fastest, plus most accurate) for the type of data appended
     */
    EResamplingMode["Auto"] = "Auto";
    /**
     * EXPERIMENTAL! Assumes Evenly-spaced data (TimeSeries).
     * Resample by taking the Min, or the Max point of oversampled data. Outputs Min and Max when points in the resampling bucket span zero
     */
    EResamplingMode["MinOrMax"] = "MinOrMax";
})(EResamplingMode = exports.EResamplingMode || (exports.EResamplingMode = {}));
