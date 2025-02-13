"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EInnerAxisPlacementCoordinateMode = void 0;
/**
 * Defines the CoordinateMode for axisPosition of CenteredAxisLayoutStrategy
 */
var EInnerAxisPlacementCoordinateMode;
(function (EInnerAxisPlacementCoordinateMode) {
    /**
     * The coordinate is a data-value,
     * corresponding to the value on the {@link AxisBase2D | Axis} or in the
     * {@link IRenderableSeries.dataSeries | DataSeries}
     */
    EInnerAxisPlacementCoordinateMode[EInnerAxisPlacementCoordinateMode["DataValue"] = 0] = "DataValue";
    /**
     * The coordinate is a pixel coordinate,
     * corresponding to the distance from the top-left of the
     * {@link SciChartSurface}
     */
    EInnerAxisPlacementCoordinateMode[EInnerAxisPlacementCoordinateMode["Pixel"] = 1] = "Pixel";
    /**
     * The coordinate is relative,
     * where 0.0 corresponds to the left (or top) of the {@link SciChartSurface}
     * and 1.0 corresponds to the right (or bottom) of the {@link SciChartSurface}
     */
    EInnerAxisPlacementCoordinateMode[EInnerAxisPlacementCoordinateMode["Relative"] = 2] = "Relative";
})(EInnerAxisPlacementCoordinateMode = exports.EInnerAxisPlacementCoordinateMode || (exports.EInnerAxisPlacementCoordinateMode = {}));
