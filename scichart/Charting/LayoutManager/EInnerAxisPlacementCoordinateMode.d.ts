/**
 * Defines the CoordinateMode for axisPosition of CenteredAxisLayoutStrategy
 */
export declare enum EInnerAxisPlacementCoordinateMode {
    /**
     * The coordinate is a data-value,
     * corresponding to the value on the {@link AxisBase2D | Axis} or in the
     * {@link IRenderableSeries.dataSeries | DataSeries}
     */
    DataValue = 0,
    /**
     * The coordinate is a pixel coordinate,
     * corresponding to the distance from the top-left of the
     * {@link SciChartSurface}
     */
    Pixel = 1,
    /**
     * The coordinate is relative,
     * where 0.0 corresponds to the left (or top) of the {@link SciChartSurface}
     * and 1.0 corresponds to the right (or bottom) of the {@link SciChartSurface}
     */
    Relative = 2
}
