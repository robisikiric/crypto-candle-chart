import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../SciChartSurface";
import { IStackedMountainRenderableSeriesOptions, StackedMountainRenderableSeries } from "./StackedMountainRenderableSeries";
/**
 * Options to pass to the {@link StackedMountainRenderableSeries} constructor
 */
export interface ISmoothStackedMountainRenderableSeriesOptions extends IStackedMountainRenderableSeriesOptions {
    /** The number of points to add between each data point.  Default 20
     * These are Not uniformly distributed, but clutered around the data points to give smoother curves
     */
    interpolationPoints?: number;
    /** A scale factor for the tightness of the curves. Valid values 0 to 1.  Lower = tighter curves  */
    curvature?: number;
}
/**
 * @summary The {@link SmoothStackedMountainRenderableSeries} allows creating JavaScript Smoothed Stacked Mountain charts
 * @description
 * Multiple {@link StackedMountainRenderableSeries} are required to create a stacked mountain chart type in SciChart.
 * These are grouped with a {@link StackedMountainCollection}, which implements {@link IRenderableSeries} and may be added
 * directly to a {@link SciChartSurface.renderableSeries} collection.
 *
 * Code sample below for creating a stacked mountain chart
 * ```ts
 * const stackedMountain0 = new StackedMountainRenderableSeries(wasmContext);
 * // .. configure mountain 1, including set dataSeries
 * const stackedMountain1 = new StackedMountainRenderableSeries(wasmContext);
 * // .. configure mountain 2, including set dataSeries
 * const stackedMountain2 = new StackedMountainRenderableSeries(wasmContext);
 * // .. configure mountain 3, including set dataSeries
 * const stackedMountainCollection = new StackedMountainCollection(wasmContext);
 * stackedMountainCollection.add(stackedMountain0, stackedMountain1, stackedMountain2);
 *
 * sciChartSurface.renderableSeries.add(stackedMountainCollection);
 * ````
 * @remarks
 * Do not add the {@link StackedMountainRenderableSeries} directly to {@link SciChartSurface.renderableSeries} array, instead,
 * use a {@link StackedMountainCollection} to group / stack the mountains.
 */
export declare class SmoothStackedMountainRenderableSeries extends StackedMountainRenderableSeries {
    readonly type: ESeriesType;
    constructor(webAssemblyContext: TSciChart, options?: ISmoothStackedMountainRenderableSeriesOptions);
}
