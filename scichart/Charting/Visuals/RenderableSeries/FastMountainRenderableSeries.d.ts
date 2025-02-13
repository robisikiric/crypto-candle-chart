import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { BaseMountainRenderableSeries, IBaseMountainRenderableSeriesOptions } from "./BaseMountainRenderableSeries";
/**
 * Options passed to a {@link FastMountainRenderableSeries} at construction time
 */
export interface IMountainRenderableSeriesOptions extends IBaseMountainRenderableSeriesOptions {
}
/**
 * Defines a mountain/area series or JavaScript mountain chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a mountain series to a {@link SciChartSurface} you need to declare both the {@link FastMountainRenderableSeries | RenderableSeries}
 * and a {@link XyDataSeries | DataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new XyDataSeries(wasmContext);
 * dataSeries.append(1,2);
 * dataSeries.append(1,2);
 * // Create the renderableSeries
 * const mountainSeries = new FastMountainRenderableSeries(wasmContext);
 * mountainSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(mountainSeries);
 * ```
 */
export declare class FastMountainRenderableSeries extends BaseMountainRenderableSeries {
    readonly type = ESeriesType.MountainSeries;
    /**
     * Creates an instance of the {@link FastMountainRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IMountainRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: IMountainRenderableSeriesOptions);
}
