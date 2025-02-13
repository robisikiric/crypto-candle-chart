import { TSciChart3D } from "../../../types/TSciChart3D";
import { BaseRenderableSeries3D, IBaseRenderableSeries3DOptions } from "./BaseRenderableSeries3D";
import { ESeriesType3D } from "./ESeriesType";
export interface IPointLineRenderableSeries3DOptions extends IBaseRenderableSeries3DOptions {
    /**
     * The strokethickness of the 3D line series in world units. Set a strokeThickness of 0 to hide the line
     */
    strokeThickness?: number;
    /**
     * When true, creates a polyline, else each pair of points in {@link XyzDataSeries3D} will be connected with a line with a break before the next pair. Default true
     */
    isLineStrip?: boolean;
    /**
     * When true, the line will be anti-aliased. Default true
     */
    isAntiAliased?: boolean;
}
/**
 * Defines a 3D poine-line series or 3D line chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * To add a 3D line series to a {@link SciChart3DSurface} you need to declare both the {@link PointLineRenderableSeries3D}
 * and a {@link XyzDataSeries3D}. Simplified code sample below:
 *
 * ```ts
 * const sciChart3DSurface: SciChart3DSurface;
 * const wasmContext: TSciChart3D;
 * // Create and fill the dataseries
 * const dataSeries = new XyzDataSeries3D(wasmContext);
 * dataSeries.append(1,2,3);
 * dataSeries.append(3,4,5);
 * // Create the renderableSeries
 * const lineSeries3D = new PointLineRenderableSeries3D(wasmContext);
 * lineSeries3D.dataSeries = dataSeries;
 * lineSeries3D.pointMarker = new SpherePointMarker3D(wasmContext, {
 *     size: 3,
 *     fill: "#FF0000"
 * });
 * // append to the SciChartSurface
 * sciChart3DSurface.renderableSeries.add(lineSeries3D);
 * ```
 */
export declare class PointLineRenderableSeries3D extends BaseRenderableSeries3D {
    /**
     * @inheritDoc
     */
    readonly type: ESeriesType3D;
    private strokeThicknessProperty;
    private isLineStripProperty;
    private isAntiAliasedProperty;
    /**
     * Creates an instance of a {@link PointLineRenderableSeries3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IBaseRenderableSeries3DOptions} to configure the series
     */
    constructor(webAssemblyContext: TSciChart3D, options?: IPointLineRenderableSeries3DOptions);
    get strokeThickness(): number;
    set strokeThickness(value: number);
    get isLineStrip(): boolean;
    set isLineStrip(value: boolean);
    get isAntiAliased(): boolean;
    set isAntiAliased(value: boolean);
}
