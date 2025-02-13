import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../SciChartSurface";
import { BaseStackedMountainRenderableSeries, IBaseStackedMountainRenderableSeriesOptions } from "./BaseStackedMountainRenderableSeries";
/**
 * Options to pass to the {@link StackedMountainRenderableSeries} constructor
 */
export interface IStackedMountainRenderableSeriesOptions extends IBaseStackedMountainRenderableSeriesOptions {
}
/**
 * @summary The {@link StackedMountainRenderableSeries} allows creating JavaScript Stacked Mountain charts
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
export declare class StackedMountainRenderableSeries extends BaseStackedMountainRenderableSeries {
    readonly type: ESeriesType;
    constructor(webAssemblyContext: TSciChart, options?: IStackedMountainRenderableSeriesOptions);
}
