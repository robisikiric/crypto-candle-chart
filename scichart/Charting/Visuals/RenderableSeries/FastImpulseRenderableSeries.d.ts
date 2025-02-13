import { NumberRange } from "../../../Core/NumberRange";
import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { IDataLabelProviderOptions } from "./DataLabels/DataLabelProvider";
import { FastColumnRenderableSeries } from "./FastColumnRenderableSeries";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
/**
 * Options to pass to the {@link FastImpulseRenderableSeries} constructor
 */
export interface IImpulseRenderableSeries extends IBaseRenderableSeriesOptions {
    /**
     * The impulse fill as an HTML color code
     */
    fill?: string;
    /**
     * The impulse point size as a number value
     */
    size?: number;
    /**
     * Gets or sets the Zero-line Y, the Y-value where the column crosses zero and inverts. Default is 0
     */
    zeroLineY?: number;
    /**
     * Options to pass to the DataLabelProvider. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: IDataLabelProviderOptions;
}
/**
 * Defines a impulse-series or JavaScript impulse chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a impulse series to a {@link SciChartSurface} you need to declare both the {@link FastImpulseRenderableSeries | RenderableSeries}
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
 * const impulseSeries = new FastImpulseRenderableSeries(wasmContext);
 * impulseSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(impulseSeries);
 * ```
 */
export declare class FastImpulseRenderableSeries extends FastColumnRenderableSeries {
    /** @inheritDoc */
    readonly type = ESeriesType.ImpulseSeries;
    private impulseFillProperty;
    private impulseSizeProperty;
    private impulseDataPointWidthProperty;
    private impulseStrokeThicknessProperty;
    /**
     * Creates an instance of the {@link FastImpulseRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IImpulseRenderableSeries} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: IImpulseRenderableSeries);
    /**
     * Gets or sets the color of each impulse
     */
    get fill(): string;
    set fill(htmlColorCode: string);
    /**
     * Gets or sets the size of each impulse point
     */
    get size(): number;
    set size(sizeParam: number);
    /**
     * @inheritDoc
     */
    getXRange(): NumberRange;
    /**
     * @inheritDoc
     */
    getYRange(xVisibleRange: NumberRange, isXCategoryAxis?: boolean): NumberRange;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
    /** @inheritDoc */
    applyTheme(themeProvider: IThemeProvider): void;
    /** @inheritDoc */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    /** @inheritDoc */
    protected newHitTestProvider(): IHitTestProvider;
}
