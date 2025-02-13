import { TSciChart3D } from "../../../types/TSciChart3D";
import { BaseMeshPointMarker3D } from "../PointMarkers/BaseMeshPointMarker3D";
import { RenderPassInfo3D } from "../Primitives/RenderPassInfo3D";
import { BaseRenderableSeries3D, IBaseRenderableSeries3DOptions } from "./BaseRenderableSeries3D";
import { ESeriesType3D } from "./ESeriesType";
export interface ColumnRenderableSeries3DOptions extends IBaseRenderableSeries3DOptions {
    /**
     * A point marker {@link BaseMeshPointMarker3D |3D Point Marker} which is used to draw columns at each Xyz data-point.
     */
    pointMarker?: BaseMeshPointMarker3D;
    /**
     * Sets the data point width in X direction in Data Space.
     */
    dataPointWidthX?: number;
    /**
     * Sets the data point width in Z direction in Data Space.
     */
    dataPointWidthZ?: number;
    /**
     * Sets flag to do coloring per data-point using metadata vertexColor
     */
    useMetadataColors?: boolean;
    /**
     * Sets the column fill as an HTML Color Code.  This will override the pointMarker fill if set.
     */
    fill?: string;
}
/**
 * Defines a 3D column-series in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * To add a column 3D series to a {@link SciChart3DSurface} you need to declare both the {@link ColumnRenderableSeries3D}
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
 * const columnSeries = new ColumnRenderableSeries3D(wasmContext);
 * columnSeries .dataSeries = dataSeries;
 * columnSeries .pointMarker = new SpherePointMarker3D(wasmContext, {
 *     size: 3,
 *     fill: "#FF0000"
 * });
 * // append to the SciChartSurface
 * sciChart3DSurface.renderableSeries.add(columnSeries );
 * ```
 */
export declare class ColumnRenderableSeries3D extends BaseRenderableSeries3D {
    /** @inheritDoc */
    readonly type: ESeriesType3D;
    protected pointMarkerProperty: BaseMeshPointMarker3D;
    private dataPointWidthXProperty;
    private dataPointWidthZProperty;
    private useMetadataColorsProperty;
    private fillProperty;
    /**
     * Creates an instance of a {@link ColumnRenderableSeries3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link ColumnRenderableSeries3DOptions} to configure the series
     */
    constructor(webAssemblyContext: TSciChart3D, options?: ColumnRenderableSeries3DOptions);
    /** @inheritDoc */
    get pointMarker(): BaseMeshPointMarker3D;
    /** @inheritDoc */
    set pointMarker(pointMarker: BaseMeshPointMarker3D);
    /**
     * Gets or sets the column fill as an HTML Color Code.  This will override the pointMarker fill if set.
     */
    get fill(): string;
    /**
     * Gets or sets the column fill as an HTML Color Code.  This will override the pointMarker fill if set.
     */
    set fill(fill: string);
    /**
     * Gets or sets the data point width in X direction in Data Space
     */
    get dataPointWidthX(): number;
    set dataPointWidthX(value: number);
    /**
     * Gets or sets the data point width in Z direction in Data Space
     */
    get dataPointWidthZ(): number;
    set dataPointWidthZ(value: number);
    /**
     * Gets or sets flag to do coloring per data-point using metadata vertexColor
     */
    get useMetadataColors(): boolean;
    set useMetadataColors(value: boolean);
    /** Calculate the dataPointWidth in pixels. */
    getDataPointWidth(rpd: RenderPassInfo3D, dataPointWidthX: number, dataPointWidthZ: number): number;
}
