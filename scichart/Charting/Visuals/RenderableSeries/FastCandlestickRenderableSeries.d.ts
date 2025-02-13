import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { BaseOhlcRenderableSeries, IBaseOhlcRenderableSeriesOptions } from "./BaseOhlcRenderableSeries";
/**
 * Options to pass to the {@link FastCandlestickRenderableSeries} constructor
 */
export interface ICandlestickRenderableSeriesOptions extends IBaseOhlcRenderableSeriesOptions {
    /**
     * The fill brush when the candle is up (close greater than open) as an HTML color code
     */
    brushUp?: string;
    /**
     * The fill brush when the candle is down (close less than open) as an HTML color code
     */
    brushDown?: string;
}
/**
 * Defines a JavaScript Candlestick stock-chart series in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a Candlestick series to a {@link SciChartSurface} you need to declare both the {@link FastCandlestickRenderableSeries | RenderableSeries}
 * and a {@link OhlcDataSeries | OhlcDataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new OhlcDataSeries(wasmContext);
 * dataSeries.append(dateValues, openValues, highValues, lowValues, closeValues);
 * // Create the renderableSeries
 * const ohlcSeries = new FastCandlestickRenderableSeries(wasmContext);
 * ohlcSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(ohlcSeries);
 * ```
 */
export declare class FastCandlestickRenderableSeries extends BaseOhlcRenderableSeries {
    readonly type = ESeriesType.CandlestickSeries;
    private brushUpProperty;
    private brushDownProperty;
    /**
     * Creates an instance of the {@link FastCandlestickRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@linICandlestickRenderableSeriesOptionsns} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: ICandlestickRenderableSeriesOptions);
    /**
     * @inheritDoc
     */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * Gets or sets the fill when candlestick close is greater than open, as an HTML color code
     */
    get brushUp(): string;
    /**
     * Gets or sets the fill when candlestick close is greater than open, as an HTML color code
     */
    set brushUp(htmlColorCode: string);
    /**
     * Gets or sets the fill when candlestick close is less than open, as an HTML color code
     */
    get brushDown(): string;
    /**
     * Gets or sets the fill when candlestick close is less than open, as an HTML color code
     */
    set brushDown(htmlColorCode: string);
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
    /** @inheritDoc */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
}
