import { GradientParams } from "../../../Core/GradientParams";
import { NumberRange } from "../../../Core/NumberRange";
import { EDataPointWidthMode } from "../../../types/DataPointWidthMode";
import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { IColumnSeriesDataLabelProviderOptions } from "./DataLabels/ColumnSeriesDataLabelProvider";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
/**
 * Options to pass to the {@link FastColumnRenderableSeries} constructor
 */
export interface IColumnRenderableSeriesOptions extends IBaseRenderableSeriesOptions {
    /**
     * The column fill as an HTML color code
     */
    fill?: string;
    /**
     * Sets a value used to calculate the width of columns.
     * By default the value is treated as relative, valid values range from 0.0 - 1.0.
     * To specify if the value should be treated as relative, absolute, or based on range use {@link dataPointWidthMode}
     */
    dataPointWidth?: number;
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    dataPointWidthMode?: EDataPointWidthMode;
    /**
     * Gets or sets the Zero-line Y, the Y-value where the column crosses zero and inverts. Default is 0
     */
    zeroLineY?: number;
    /**
     * Gets or sets the fill as a gradient brush
     */
    fillLinearGradient?: GradientParams;
    /**
     * Radius of top corners for rounded columns
     */
    cornerRadius?: number;
    /**
     * Options to pass to the DataLabelProvider. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: IColumnSeriesDataLabelProviderOptions;
}
/**
 * Defines a column-series or JavaScript column chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a column series to a {@link SciChartSurface} you need to declare both the {@link FastColumnRenderableSeries | RenderableSeries}
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
 * const columnSeries = new FastColumnRenderableSeries(wasmContext);
 * columnSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(columnSeries);
 * ```
 */
export declare class FastColumnRenderableSeries extends BaseRenderableSeries {
    /** @inheritDoc */
    readonly type: ESeriesType;
    private fillProperty;
    private zeroLineYProperty;
    private dataPointWidthProperty;
    private dataPointWidthModeProperty;
    private cornerRadiusProperty;
    private fillLinearGradientProperty;
    /**
     * Creates an instance of the {@link FastColumnRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IColumnRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: IColumnRenderableSeriesOptions);
    applyTheme(themeProvider: IThemeProvider): void;
    get fill(): string;
    set fill(htmlColorCode: string);
    /**
     * Gets or sets the fill as a gradient brush
     */
    get fillLinearGradient(): GradientParams;
    /**
     * Gets or sets the fill as a gradient brush
     */
    set fillLinearGradient(gradientBrushParams: GradientParams);
    /**
     * Gets or sets the Zero-line Y, the Y-value for the base of the columns. Default is 0
     */
    get zeroLineY(): number;
    /**
     * Gets or sets the Zero-line Y, the Y-value for the base of the columns. Default is 0
     */
    set zeroLineY(zeroLineY: number);
    /**
     * Gets or sets a value used to calculate the width of columns, depending on the dataPointWidthMode.
     * With the default dataPointWidthMode: EDataPointWidthMode.Relative, dataPointWidth is a fraction of available space per column. Valid values range from 0.0 - 1.0
     */
    get dataPointWidth(): number;
    /**
     * Gets or sets a value used to calculate the width of columns, depending on the dataPointWidthMode.
     * With the default dataPointWidthMode: EDataPointWidthMode.Relative, dataPointWidth is a fraction of available space per column. Valid values range from 0.0 - 1.0
     */
    set dataPointWidth(dataPointWidth: number);
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    get dataPointWidthMode(): EDataPointWidthMode;
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    set dataPointWidthMode(value: EDataPointWidthMode);
    /**
     * Gets or sets the corner radius, to give the columns rounded corners. Default is 0
     */
    get cornerRadius(): number;
    /**
     * Gets or sets the corner radius, to give the columns rounded corners. Default is 0
     */
    set cornerRadius(cornerRadius: number);
    /**
     * @inheritDoc
     */
    getXRange(): NumberRange;
    /**
     * @inheritDoc
     */
    getYRange(xVisibleRange: NumberRange, isXCategoryAxis?: boolean): NumberRange;
    /** @inheritDoc */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
    /** @inheritDoc */
    protected newHitTestProvider(): IHitTestProvider;
}
export declare const getXRange: (range: NumberRange, count: number, widthFraction: number) => NumberRange;
