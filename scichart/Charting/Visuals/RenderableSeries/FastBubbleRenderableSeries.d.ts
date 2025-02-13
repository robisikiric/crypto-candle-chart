import { ESeriesType } from "../../../types/SeriesType";
import { IPointMarkerPaletteProvider } from "../../Model/IPaletteProvider";
import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { IPointSeries } from "../../Model/PointSeries/IPointSeries";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
import { IBubbleSeriesDataLabelProviderOptions } from "./DataLabels/BubbleSeriesDataLabelProvider";
import { TSeriesDefinition } from "../../../Builder/buildSeries";
/**
 * Optional parameters passed to the constructor of {@link FastBubbleRenderableSeries}
 */
export interface IBubbleRenderableSeriesOptions extends IBaseRenderableSeriesOptions {
    /**
     * Options to pass to the {@link DataLabelProvider}. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: IBubbleSeriesDataLabelProviderOptions;
    /**
     * The scale value of the bubble sizes
     */
    zMultiplier?: number;
}
/**
 * Defines a bubble-series or JavaScript bubble chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a bubble series to a {@link SciChartSurface} you need to declare both the {@link FastBubbleRenderableSeries | RenderableSeries}
 * and a {@link XyzDataSeries | XyzDataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new XyzDataSeries(wasmContext);
 * dataSeries.append(1,2,3);
 * dataSeries.append(4,5,6);
 * // Create the renderableSeries
 * const bubbleSeries = new FastBubbleRenderableSeries(wasmContext);
 * bubbleSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(bubbleSeries);
 * ```
 */
export declare class FastBubbleRenderableSeries extends BaseRenderableSeries {
    /** @inheritDoc */
    readonly type = ESeriesType.BubbleSeries;
    protected zMultiplierProperty: number;
    /**
     * Creates an instance of the {@link FastBubbleRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IBubbleRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: IBubbleRenderableSeriesOptions);
    /** @inheritDoc */
    get paletteProvider(): IPointMarkerPaletteProvider;
    /** @inheritDoc */
    set paletteProvider(paletteProvider: IPointMarkerPaletteProvider);
    /**
     * Gets or sets the scale value of the bubble sizes
     */
    get zMultiplier(): number;
    /**
     * Gets or sets the scale value of the bubble sizes
     */
    set zMultiplier(value: number);
    /** @inheritDoc */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * Gets the bubble diameter in pixels for the point index, by looking up the Z-value in the
     * associated {@link XyzDataSeries}
     * @param pointIndex
     */
    getBubbleDiameter(pointIndex: number): number;
    /**
     * Returns the {@link XyyDataSeries.getNativeZValues} for the associated {@link dataSeries}
     */
    getNativeZValues(): SCRTDoubleVector;
    /** @inheritDoc */
    toPointSeries(resamplingParams?: ResamplingParams): IPointSeries;
    /** @inheritDoc */
    protected newHitTestProvider(): IHitTestProvider;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): TSeriesDefinition;
}
