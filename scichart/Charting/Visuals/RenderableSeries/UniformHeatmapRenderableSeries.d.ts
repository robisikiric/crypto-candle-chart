import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { BaseHeatmapRenderableSeries, IHeatmapRenderableSeriesOptions } from "./BaseHeatmapRenderableSeries";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
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
export declare class UniformHeatmapRenderableSeries extends BaseHeatmapRenderableSeries {
    readonly type: ESeriesType;
    /**
     * Creates an instance of the {@link UniformHeatmapRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IHeatmapRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: IHeatmapRenderableSeriesOptions);
    /**
     * @inheritDoc
     */
    protected newHitTestProvider(): IHitTestProvider;
}
