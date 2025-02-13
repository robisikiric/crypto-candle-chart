"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EDataSeriesValueType = exports.EDataChangeType = exports.EDataSeriesType = void 0;
/**
 * Defines {@link BaseDataSeries | DataSeries} types available within SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 */
var EDataSeriesType;
(function (EDataSeriesType) {
    /**
     * Defines an {@link XyDataSeries}
     */
    EDataSeriesType["Xy"] = "Xy";
    /**
     * Defines an {@link XyyDataSeries}, with two Y-points for every X-Value
     */
    EDataSeriesType["Xyy"] = "Xyy";
    /**
     * Defines an {@link XyzDataSeries}
     */
    EDataSeriesType["Xyz"] = "Xyz";
    /**
     * Defines an {@link OhlcDataSeries} for
     * {@link https://www.scichart.com/javascript-chart-features | JavaScript Stock Charts} or
     * financial charts
     */
    EDataSeriesType["Ohlc"] = "Ohlc";
    /**
     * Defines a {@link UniformHeatmapDataSeries | DataSeries}
     */
    EDataSeriesType["HeatmapUniform"] = "UniformHeatmap";
    /**
     * Defines a {@link UniformHeatmapDataSeries | DataSeries}
     */
    EDataSeriesType["HeatmapNonUniform"] = "NonUniformHeatmap";
    /**
     * Defines a {@link HlcDataSeries}
     */
    EDataSeriesType["Hlc"] = "Hlc";
    /**
     * Defines a {@link XyTextDataSeries}
     */
    EDataSeriesType["XyText"] = "XyText";
})(EDataSeriesType = exports.EDataSeriesType || (exports.EDataSeriesType = {}));
var EDataChangeType;
(function (EDataChangeType) {
    EDataChangeType[EDataChangeType["Append"] = 0] = "Append";
    EDataChangeType[EDataChangeType["Insert"] = 1] = "Insert";
    EDataChangeType[EDataChangeType["Update"] = 2] = "Update";
    EDataChangeType[EDataChangeType["Remove"] = 3] = "Remove";
    EDataChangeType[EDataChangeType["Clear"] = 4] = "Clear";
    EDataChangeType[EDataChangeType["Property"] = 5] = "Property";
})(EDataChangeType = exports.EDataChangeType || (exports.EDataChangeType = {}));
/**
 * Defines what values to use when dealing with an {@link IDataSeries}
 * For example, when getWindowedYRange() is called we can use Default values, which are xValues and yValues
 * or if an animation is running we can use InitialAnimationValues or FinalAnimationValues
 */
var EDataSeriesValueType;
(function (EDataSeriesValueType) {
    EDataSeriesValueType["Default"] = "Default";
    EDataSeriesValueType["InitialAnimationValues"] = "InitialAnimationValues";
    EDataSeriesValueType["FinalAnimationValues"] = "FinalAnimationValues";
})(EDataSeriesValueType = exports.EDataSeriesValueType || (exports.EDataSeriesValueType = {}));
