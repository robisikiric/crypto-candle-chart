import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { BaseLineRenderableSeries, IBaseLineRenderableSeriesOptions } from "./BaseLineRenderableSeries";
export interface IFastLineRenderableSeriesOptions extends IBaseLineRenderableSeriesOptions {
}
/**
 * Defines a line-series or line chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a line series to a {@link SciChartSurface} you need to declare both the {@link FastLineRenderableSeries | RenderableSeries}
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
 * const lineSeries = new FastLineRenderableSeries(wasmContext);
 * lineSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(lineSeries);
 * ```
 */
export declare class FastLineRenderableSeries extends BaseLineRenderableSeries {
    readonly type = ESeriesType.LineSeries;
    /**
     * Creates an instance of the {@link FastLineRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IFastLineRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: IFastLineRenderableSeriesOptions);
    delete(): void;
}
