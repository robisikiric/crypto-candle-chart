/**
 * List of values for Autorange behaviour on Axis in SciChart
 */
export declare enum EAutoRange {
    /**
     * (Default mode) AutoRange once on startup, after that, the user must specify {@link AxisCore.visibleRange}
     * or call {@link SciChartSurface.zoomExtents}
     */
    Once = "Once",
    /**
     * Autorange Always when the data changes
     */
    Always = "Always",
    /**
     * Never autorange (full manual mode)
     */
    Never = "Never"
}
