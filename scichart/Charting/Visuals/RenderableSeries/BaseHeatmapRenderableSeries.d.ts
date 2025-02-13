import { PropertyChangedEventArgs } from "../../../Core/PropertyChangedEventArgs";
import { TSciChart } from "../../../types/TSciChart";
import { BaseHeatmapDataSeries } from "../../Model/BaseHeatmapDataSeries";
import { IPointSeries } from "../../Model/PointSeries/IPointSeries";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { LabelProvider } from "../Axis/LabelProvider/LabelProvider";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { IHeatmapDataLabelProviderOptions } from "./DataLabels/HeatMapDataLabelProvider";
import { HeatmapColorMap, IHeatmapColorMapOptions } from "./HeatmapColorMap";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
/**
 * Optional parameters passed to {@link BaseHeatmapRenderableSeries} constructor
 */
export interface IHeatmapRenderableSeriesOptions extends IBaseRenderableSeriesOptions {
    /**
     * The {@link HeatmapColorMap} instance, which maps heatmap z-values to colors
     * or an {@link IHeatmapColorMapOptions} object which will be used to build a HeatmapColorMap
     */
    colorMap?: HeatmapColorMap | IHeatmapColorMapOptions;
    /**
     * The {@link BaseHeatmapDataSeries} instance containing 2-dimensional heatmap data
     */
    dataSeries?: BaseHeatmapDataSeries;
    /**
     * The flag whether to make the heatmap linearly interpolated or smoothed between cells. Default false
     */
    useLinearTextureFiltering?: boolean;
    /**
     * The flag whether to fill cells with edge color if its value is outside of {@link colorMap.minimum} to {@link colorMap.maximum} range
     */
    fillValuesOutOfRange?: boolean;
    /**
     * Options to pass to the DataLabelProvider. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: IHeatmapDataLabelProviderOptions;
}
/** @ignore */
export declare const COLOR_MAP_PREFIX = "colorMap.";
/**
 * @summary A JavaScript Heatmap chart type rendering a 2-dimensional array of data as color values between X,Y bounds in
 * SciChart's High Performance Real-time {@link https://www.scichart.com/javascript-chart-features | JavaScript Chart Library}
 * @description
 * Heatmaps are 2-dimensional arrays of data, rendered as a color-map on the chart. The {@link UniformHeatmapRenderableSeries}
 * assumes the cells are equal size, and spaced along the X,Y axis according to properties on the {@link UniformHeatmapDataSeries}.
 *
 * For a code sample how to initialize a uniform heatmap, see below
 *
 * ```ts
 * // Create an empty 2D array using the helper function zeroArray2D
 * const zValues: number[][] = zeroArray2D([height, width]);
 * // todo: fill the zValues 2d array with values
 *
 * // Create a UniformHeatmapDataSeries passing in zValues
 * const heatmapDataSeries = new UniformHeatmapDataSeries(wasmContext, 0, 1, 0, 1, zValues);
 *
 * // Create a Heatmap RenderableSeries with the color map. ColorMap.minimum/maximum defines the values in
 * // HeatmapDataSeries which correspond to gradient stops at 0..1
 * const heatmapSeries = new UniformHeatmapRenderableSeries(wasmContext, {
 *        dataSeries: heatmapDataSeries,
 *        colorMap: new HeatmapColorMap({
 *            minimum: 0,
 *           maximum: 200,
 *           gradientStops: [
 *               { offset: 0, color: "#00008B" },
 *               { offset: 0.2, color: "#6495ED" },
 *               { offset: 0.4, color: "#006400" },
 *               { offset: 0.6, color: "#7FFF00" },
 *               { offset: 0.8, color: "#FFFF00" },
 *               { offset: 1.0, color: "#FF0000" }
 *           ]
 *       })
 *   });
 *
 * // Add heatmap to the chart
 * sciChartSurface.renderableSeries.add(heatmapSeries);
 * ```
 */
export declare abstract class BaseHeatmapRenderableSeries extends BaseRenderableSeries {
    private colorMapProperty;
    private useLinearTextureFilteringProperty;
    private fillValuesOutOfRangeProperty;
    private zLabelProviderProperty;
    /**
     * Creates an instance of the {@link UniformHeatmapRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IHeatmapRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: IHeatmapRenderableSeriesOptions);
    /**
     * Gets or sets the {@link HeatmapColorMap}, which maps heatmap z-values to colors
     */
    get colorMap(): HeatmapColorMap;
    /**
     * Gets or sets the {@link HeatmapColorMap}, which maps heatmap z-values to colors
     */
    set colorMap(colorMap: HeatmapColorMap);
    /**
     * Gets or sets whether to make the heatmap linearly interpolated or smoothed between cells
     */
    get useLinearTextureFiltering(): boolean;
    /**
     * Gets or sets whether to make the heatmap linearly interpolated or smoothed between cells
     */
    set useLinearTextureFiltering(value: boolean);
    /** @inheritDoc */
    checkIsOutOfDataRange(xValue: number, yValue: number): boolean;
    get zLabelProvider(): LabelProvider;
    set zLabelProvider(labelProvider: LabelProvider);
    /**
     * Gets or sets whether to fill cells with edge color if its value is outside of {@link colorMap.minimum} to {@link colorMap.maximum} range
     */
    get fillValuesOutOfRange(): boolean;
    /**
     * Gets or sets whether to fill cells with edge color if its value is outside of {@link colorMap.minimum} to {@link colorMap.maximum} range
     */
    set fillValuesOutOfRange(value: boolean);
    /** @inheritDoc */
    toPointSeries(resamplingParams?: ResamplingParams): IPointSeries;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
    delete(): void;
    /**
     * Called when a property changes on {@link HeatmapColorMap}, and notifies the parent {@link SciChartSurface}
     * that a redraw is required.
     * @param args
     */
    protected colorMapPropertyChanged(args: PropertyChangedEventArgs): void;
}
