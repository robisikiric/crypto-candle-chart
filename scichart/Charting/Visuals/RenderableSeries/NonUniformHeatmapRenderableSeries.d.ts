import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { NonUniformHeatmapDataSeries } from "../../Model/NonUniformHeatmapDataSeries";
import { BaseHeatmapRenderableSeries } from "./BaseHeatmapRenderableSeries";
import { IHeatmapRenderableSeriesOptions } from "./BaseHeatmapRenderableSeries";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
/**
 * Optional parameters passed to {@link NonUniformHeatmapRenderableSeries} constructor
 */
export interface INonUniformHeatmapRenderableSeriesOptions extends IHeatmapRenderableSeriesOptions {
    /**
     * The {@link NonUniformHeatmapDataSeries} instance containing 2-dimensional heatmap data
     */
    dataSeries?: NonUniformHeatmapDataSeries;
}
/**
 * @summary A JavaScript Heatmap chart type rendering a 2-dimensional array of data as color values between X,Y bounds in
 * SciChart's High Performance Real-time {@link https://www.scichart.com/javascript-chart-features | JavaScript Chart Library}
 * @description
 * Heatmaps are 2-dimensional arrays of data, rendered as a color-map on the chart. The {@link NonUniformHeatmapRenderableSeries}
 * assumes the cells are equal size, and spaced along the X,Y axis according to properties on the {@link NonUniformHeatmapDataSeries}.
 *
 * For a code sample how to initialize a non-uniform heatmap, see below
 *
 * ```ts
 * // Create a 2D array with heat values
 * const zValues = [
 *     [0, 2, 3.4],
 *     [5, 3, 4],
 *     [3, 1.5, -1],
 * ];
 * // Define offsets of the heatmap cells
 * const xCellOffsets = [0, 10, 25, 40];
 * const yCellOffsets = [100, 200, 300, 400];
 *
 * // Create a UniformHeatmapDataSeries passing in zValues
 * const heatmapDataSeries = new NonUniformHeatmapDataSeries(wasmContext, xCellOffsets, yCellOffsets, zValues);
 *
 * // Create a Heatmap RenderableSeries with the color map. ColorMap.minimum/maximum defines the values in
 * // HeatmapDataSeries which correspond to gradient stops at 0..1
 * const heatmapSeries = new NonUniformHeatmapRenderableSeries(wasmContext, {
 *     dataSeries: heatmapDataSeries,
 *     colorMap: new HeatmapColorMap({
 *         minimum: 0,
 *         maximum: 200,
 *         gradientStops: [
 *             { offset: 0, color: "#00008B" },
 *             { offset: 0.2, color: "#6495ED" },
 *             { offset: 0.4, color: "#006400" },
 *             { offset: 0.6, color: "#7FFF00" },
 *             { offset: 0.8, color: "#FFFF00" },
 *             { offset: 1.0, color: "#FF0000" }
 *         ]
 *     })
 * });
 *
 * // Add heatmap to the chart
 * sciChartSurface.renderableSeries.add(heatmapSeries);
 * ```
 */
export declare class NonUniformHeatmapRenderableSeries extends BaseHeatmapRenderableSeries {
    readonly type: ESeriesType;
    /**
     * Creates an instance of the {@link NonUniformHeatmapRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IHeatmapRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: INonUniformHeatmapRenderableSeriesOptions);
    /**
     * @inheritDoc
     */
    protected newHitTestProvider(): IHitTestProvider;
}
