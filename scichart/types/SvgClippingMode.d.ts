/**
 * Enumeration constants for SciChartSurface SVG Clipping mode, used for SVG annotations
 */
export declare enum ESvgClippingMode {
    /**
     * Clips to the series view rect
     */
    SeriesViewRect = "SeriesViewRect",
    /**
     * Clips to the whole sub-chart rect or to the chart rect if not applicable
     */
    SubChart = "SubChart",
    /**
     * Clips to the whole chart rect. In case of sub-charts it allows floating SVG annotations over adjacent sub-charts
     */
    Chart = "Chart"
}
