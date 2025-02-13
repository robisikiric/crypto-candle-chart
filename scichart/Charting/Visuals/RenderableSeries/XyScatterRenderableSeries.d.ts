import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { IDataLabelProviderOptions } from "./DataLabels/DataLabelProvider";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
/**
 * Optional parameters passed to the constructor of {@link XyScatterRenderableSeries}
 */
export interface IXyScatterRenderableSeriesOptions extends IBaseRenderableSeriesOptions {
    /**
     * Options to pass to the DataLabelProvider. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: IDataLabelProviderOptions;
}
/**
 * Defines a scatter-series or scatter chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a scatter series to a {@link SciChartSurface} you need to declare both the {@link XyScatterRenderableSeries | RenderableSeries}
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
 * const scatterSeries = new XyScatterRenderableSeries(wasmContext);
 * scatterSeries.dataSeries = dataSeries;
 * scatterSeries.pointMarker = new EllipsePointMarker(wasmContext, {
 *     width: 9,
 *     height: 9,
 *     fill: "#FF0000",
 *     stroke: "#0000FF",
 *     strokeThickness: 1
 * });
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(scatterSeries);
 * ```
 */
export declare class XyScatterRenderableSeries extends BaseRenderableSeries {
    readonly type = ESeriesType.ScatterSeries;
    private scatterOpacityProperty;
    /**
     * Creates an instance of the {@link XyScatterRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IBaseRenderableSeriesOptions} to configure the series
     */
    constructor(webAssemblyContext: TSciChart, options?: IXyScatterRenderableSeriesOptions);
    /** @inheritDoc */
    needsResampling(rp: ResamplingParams): boolean;
    /** @inheritDoc */
    protected newHitTestProvider(): IHitTestProvider;
    /** @inheritDoc */
    get opacity(): number;
    /** @inheritDoc */
    set opacity(value: number);
}
