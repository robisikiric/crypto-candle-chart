import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { BaseOhlcRenderableSeries, IBaseOhlcRenderableSeriesOptions } from "./BaseOhlcRenderableSeries";
export interface IOhlcRenderableSeriesOptions extends IBaseOhlcRenderableSeriesOptions {
}
/**
 * Defines a JavaScript OHLC stock-chart series in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add an OHLC series to a {@link SciChartSurface} you need to declare both the {@link FastOhlcRenderableSeries | RenderableSeries}
 * and a {@link OhlcDataSeries | OhlcDataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new OhlcDataSeries(wasmContext);
 * dataSeries.append(dateValues, openValues, highValues, lowValues, closeValues);
 * // Create the renderableSeries
 * const ohlcSeries = new FastOhlcRenderableSeries(wasmContext);
 * ohlcSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(ohlcSeries);
 * ```
 */
export declare class FastOhlcRenderableSeries extends BaseOhlcRenderableSeries {
    readonly type = ESeriesType.OhlcSeries;
    /**
     * Creates an instance of the {@link FastOhlcRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IOhlcRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: IOhlcRenderableSeriesOptions);
}
