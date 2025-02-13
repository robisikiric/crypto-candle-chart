"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderPassData = void 0;
/**
 * @summary RenderPassData contains properties which are passed to {@link BaseRenderableSeries} at the time of drawing
 */
var RenderPassData = /** @class */ (function () {
    /**
     * Creates an instance of RenderPassData
     * @param indexRange The min and max index to data-range currently visible on the {@link SciChartSurface}
     * @param getxCoordinateCalculator A function to get the XAxis {@link CoordinateCalculatorBase | Coordinate Calculator},
     * used to transform between pixel and data-coordinates
     * @param getyCoordinateCalculator A function to get the YAxis {@link CoordinateCalculatorBase | Coordinate Calculator},
     * used to transform between pixel and data-coordinates
     * @param isVerticalChart A flag indicating if the chart is currently vertically arranged (XAxis on the left, YAxis on the top/bottom)
     * @param pointSeries The point series
     * @param resamplingHash The resampling hash value, used for caching
     */
    function RenderPassData(indexRange, getxCoordinateCalculator, getyCoordinateCalculator, isVerticalChart, pointSeries, resamplingHash) {
        this.indexRange = indexRange;
        this.getxCoordinateCalculator = getxCoordinateCalculator;
        this.getyCoordinateCalculator = getyCoordinateCalculator;
        this.isVerticalChart = isVerticalChart;
        this.pointSeries = pointSeries;
        this.resamplingHash = resamplingHash;
    }
    Object.defineProperty(RenderPassData.prototype, "xCoordinateCalculator", {
        /**
         * Get the XAxis {@link CoordinateCalculatorBase | Coordinate Calculator},
         * used to transform between pixel and data-coordinates
         */
        get: function () {
            return this.getxCoordinateCalculator();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RenderPassData.prototype, "yCoordinateCalculator", {
        /**
         * Get the YAxis {@link CoordinateCalculatorBase | Coordinate Calculator},
         * used to transform between pixel and data-coordinates
         */
        get: function () {
            return this.getyCoordinateCalculator();
        },
        enumerable: false,
        configurable: true
    });
    return RenderPassData;
}());
exports.RenderPassData = RenderPassData;
