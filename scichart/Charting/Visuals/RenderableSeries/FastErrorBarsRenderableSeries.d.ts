import { NumberRange } from "../../../Core/NumberRange";
import { EDataPointWidthMode } from "../../../types/DataPointWidthMode";
import { EErrorDirection } from "../../../types/ErrorDirection";
import { EErrorMode } from "../../../types/ErrorMode";
import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { IPaletteProvider } from "../../Model/IPaletteProvider";
import { IHlcPointSeries } from "../../Model/PointSeries/IPointSeries";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { AxisCore } from "../Axis/AxisCore";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
/**
 * Options to pass to the {@link FastErrorBarsRenderableSeries} constructor
 */
export interface IFastErrorBarsRenderableSeriesOptions extends IBaseRenderableSeriesOptions {
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    strokeDashArray?: number[];
    /**
     * The width of error bar caps.
     * By default the value is treated as relative, valid values range from 0.0 - 1.0.
     * To specify if the value should be treated as relative, absolute, or based on range use {@link dataPointWidthMode}
     */
    dataPointWidth?: number;
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    dataPointWidthMode?: EDataPointWidthMode;
    /**
     * Gets or sets the errorMode of Error Bars. Available values are {@link EErrorMode}
     */
    errorMode?: EErrorMode;
    /**
     * The errorDirection of Error Bars. Available values are {@link EErrorDirection}
     */
    errorDirection?: EErrorDirection;
    /**
     * The flag defining whether Error Bars should be drawn with whiskers
     * @remarks enabled by default
     */
    drawWhiskers?: boolean;
    /**
     * TThe flag defining whether Error Bars should be drawn with a connector
     * @remarks enabled by default
     */
    drawConnector?: boolean;
}
/**
 * Defines an Error Bars Series or Error Bars chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a line series to a {@link SciChartSurface} you need to declare both the {@link FastErrorBarsRenderableSeries | RenderableSeries}
 * and a {@link HlcDataSeries | DataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new HlcDataSeries(wasmContext);
 * dataSeries.append(1, 2, 0,4, 0.5);
 * dataSeries.append(2, 3, 0,2, 0.3);
 * // Create the renderableSeries
 * const errorSeries = new FastErrorBarsRenderableSeries(wasmContext);
 * errorSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(errorSeries);
 * ```
 */
export declare class FastErrorBarsRenderableSeries extends BaseRenderableSeries {
    readonly type = ESeriesType.ErrorBarsSeries;
    private dataPointWidthProperty;
    private dataPointWidthModeProperty;
    private errorModeProperty;
    private errorDirectionProperty;
    private strokeDashArrayProperty;
    private drawWhiskersProperty;
    private drawConnectorProperty;
    /**
     * Creates an instance of the {@link FastErrorBarsRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IFastErrorBarsRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: IFastErrorBarsRenderableSeriesOptions);
    /** @inheritDoc */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    get strokeDashArray(): number[];
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    set strokeDashArray(strokeDashArray: number[]);
    /**
     * Gets or sets whether Error Bars should be drawn with whiskers
     * @remarks enabled by default
     */
    get drawWhiskers(): boolean;
    /**
     * Gets or sets whether Error Bars should be drawn with whiskers
     * @remarks enabled by default
     */
    set drawWhiskers(value: boolean);
    /**
     * Gets or sets whether Error Bars should be drawn with a connector
     * @remarks enabled by default
     */
    get drawConnector(): boolean;
    /**
     * Gets or sets whether Error Bars should be drawn with a connector
     * @remarks enabled by default
     */
    set drawConnector(value: boolean);
    /**
     * Gets or sets the paletteProvider of Renderable Series
     * @remarks paletteProvider is not supported by {@link FastErrorBarsRenderableSeries}
     */
    get paletteProvider(): IPaletteProvider;
    set paletteProvider(paletteProvider: IPaletteProvider);
    /**
     * Gets or sets the width of error bar caps.
     * By default the value is treated as relative, valid values range from 0.0 - 1.0.
     * @remarks
     * To specify if the value should be treated as relative or absolute use {@link errorType}
     */
    get dataPointWidth(): number;
    /**
     * Gets or sets the width of error bar caps.
     * By default the value is treated as relative, valid values range from 0.0 - 1.0.
     * @remarks
     * To specify if the value should be treated as relative or absolute use {@link dataPointWidthMode}
     */
    set dataPointWidth(value: number);
    /**
     * Gets or sets the errorMode of Error Bars. Available values are {@link EErrorMode}
     */
    get errorMode(): EErrorMode;
    /**
     * Gets or sets the errorMode of Error Bars. Available values are {@link EErrorMode}
     */
    set errorMode(value: EErrorMode);
    /**
     * Gets or sets the errorDirection of Error Bars. Available values are {@link EErrorDirection}
     */
    get errorDirection(): EErrorDirection;
    /**
     * Gets or sets the errorDirection of Error Bars. Available values are {@link EErrorDirection}
     */
    set errorDirection(value: EErrorDirection);
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    get dataPointWidthMode(): EDataPointWidthMode;
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    set dataPointWidthMode(value: EDataPointWidthMode);
    delete(): void;
    /**
     *  @inheritDoc
     */
    getDataPointWidth(coordCalc: CoordinateCalculatorBase, widthFraction: number, widthMode?: EDataPointWidthMode): number;
    /**
     * @inheritDoc
     */
    getXRange(): NumberRange;
    /** @inheritDoc */
    getYRange(xVisibleRange: NumberRange, isXCategoryAxis?: boolean): NumberRange;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
    /** @inheritDoc */
    toPointSeries(rp?: ResamplingParams): IHlcPointSeries;
    /**
     * @inheritDoc
     */
    protected newHitTestProvider(): IHitTestProvider;
    protected adjustRangeByDataPointWidth(range: NumberRange, axis: AxisCore): NumberRange;
}
/** @ignore */
export declare const adjustRangeByStrokeThickness: (range: NumberRange, strokeThickness: number, areaSize?: number) => NumberRange;
