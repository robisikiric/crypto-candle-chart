import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { BaseBandRenderableSeries, IBaseBandRenderableSeriesOptions } from "./BaseBandRenderableSeries";
/**
 * Optional parameters passed to the constructor of {@link FastBandRenderableSeries}
 */
export interface IBandRenderableSeriesOptions extends IBaseBandRenderableSeriesOptions {
}
/**
 * Defines a JavaScript Band-series or High-Low polygon fill chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a line series to a {@link SciChartSurface} you need to declare both the {@link FastBandRenderableSeries | RenderableSeries}
 * and a {@link XyyDataSeries | DataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new XyyDataSeries(wasmContext);
 * dataSeries.append(1,2,3);
 * dataSeries.append(2,3,4);
 * // Create the renderableSeries
 * const bandSeries = new FastBandRenderableSeries(wasmContext);
 * bandSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(bandSeries);
 * ```
 */
export declare class FastBandRenderableSeries extends BaseBandRenderableSeries {
    readonly type = ESeriesType.BandSeries;
    /**
     * Creates an instance of the {@link FastBandRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IBandRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: IBandRenderableSeriesOptions);
}
