import { NumberRange } from "../../../Core/NumberRange";
import { SCRTDoubleVector } from "../../../types/TSciChart";
import { TSciChart3D } from "../../../types/TSciChart3D";
import { BaseDataSeries3D, EDataSeriesType3D, IBaseDataSeries3DOptions } from "./BaseDataSeries3D";
import { IPointMetadata3D } from "./IPointMetadata3D";
/**
 * Optional parameters passed to the constructor of {@link XyzDataSeries3D}
 */
export interface IXyzDataSeries3DOptions extends IBaseDataSeries3DOptions {
    /**
     * The optional initial X-values array
     */
    xValues?: number[];
    /**
     * The optional initial Y-values array
     */
    yValues?: number[];
    /**
     * The optional initial Z-values array
     */
    zValues?: number[];
    /**
     * The optional {@link IPointMetadata3D | Metadata} array
     */
    metadata?: IPointMetadata3D[];
}
/**
 * {@link XyzDataSeries3D} is a DataSeries for holding X, Y, Z data in SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * The {@link XyzDataSeries3D} is primarily used with our {@link ScatterRenderableSeries3D | JavaScript Scatter & Bubble Chart},
 * which draws a variable-sized bubble or shape at each X,Y,Z value
 *
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries3D | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries3D} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries3D} to find out what 3D JavaScript Chart types are available.
 */
export declare class XyzDataSeries3D extends BaseDataSeries3D {
    readonly type: EDataSeriesType3D;
    protected xValues: SCRTDoubleVector;
    protected yValues: SCRTDoubleVector;
    protected zValues: SCRTDoubleVector;
    protected metadata: IPointMetadata3D[];
    /**
     * Creates an instance of {@link XyzDataSeries3D}
     * @param webAssemblyContext the {@link TSciChart3D | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IXyzDataSeries3DOptions} which can be passed to configure the DataSeries at construct time
     */
    constructor(webAssemblyContext: TSciChart3D, options?: IXyzDataSeries3DOptions);
    /**
     * Gets a native / WebAssembly vector of X-values in the DataSeries
     */
    getNativeXValues(): SCRTDoubleVector;
    /**
     * Gets a native / WebAssembly vector of Y-values in the DataSeries
     */
    getNativeYValues(): SCRTDoubleVector;
    /**
     * Gets a native / WebAssembly vector of Z-values in the DataSeries
     */
    getNativeZValues(): SCRTDoubleVector;
    /**
     * Gets a native / WebAssembly vector of {@link IPointMetadata3D | Metadata values} in the DataSeries
     */
    getMetadataValues(): IPointMetadata3D[];
    /**
     * @inheritDoc
     */
    get xRange(): NumberRange;
    /**
     * @inheritDoc
     */
    get yRange(): NumberRange;
    /**
     * @inheritDoc
     */
    get zRange(): NumberRange;
    /**
     * Appends a single X, Y, Z point to the {@link XyzDataSeries3D}
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param x The X-value
     * @param y The Y-value
     * @param z The Z-value
     * @param metadata An optional {@link IPointMetadata3D} value
     */
    append(x: number, y: number, z: number, metadata?: IPointMetadata3D): void;
    /**
     * Appends a range of X, Y, Z points to the {@link XyzDataSeries3D}
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param xValues The X-values
     * @param yValues The Y-values
     * @param zValues The Z-values
     * @param metadatas Optional {@link IPointMetadata3D} values
     */
    appendRange(xValues: number[], yValues: number[], zValues: number[], metadatas?: IPointMetadata3D[]): void;
    /**
     * Updates a single X, Y, Z-value by index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param index the index to update
     * @param x The new X value
     * @param y The new Y value
     * @param z The new Z value
     */
    update(index: number, x: number, y: number, z: number, metadata?: IPointMetadata3D): void;
    /**
     * Inserts a single X,Y,Z value at the start index
     * @remarks
     * For best performance on drawing large datasets, use the {@link insertRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param startIndex the index to insert at
     * @param x the Xvalue
     * @param y the YValue
     * @param z the ZValue
     * @param metadata Optional metadata value
     */
    insert(startIndex: number, x: number, y: number, z: number, metadata?: IPointMetadata3D): void;
    /**
     * Inserts a range of X,Y,Z values at the startIndex
     * @remarks
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param startIndex the index to insert at
     * @param xValues the XValues
     * @param yValues the YValues
     * @param zValues the ZValues
     * @param metadatas Optional metadata values to insert
     */
    insertRange(startIndex: number, xValues: number[], yValues: number[], zValues: number[], metadatas?: IPointMetadata3D[]): void;
    /**
     * Removes a single X,Y,Z value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param index the index to remove at
     */
    removeAt(index: number): void;
    /**
     * Removes a range of X,Y,Z values at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param startIndex the start index to remove at
     * @param count the number of points to remove
     */
    removeRange(startIndex: number, count: number): void;
    /**
     * Clears the entire DataSeries.
     * @remarks
     * Note this does not free memory, WebAssembly/Native memory is released by calling {@link delete}, after which the
     * DataSeries is no longer usable.
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     */
    clear(): void;
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * Gets the count of data-points in the DataSeries
     */
    count(): number;
}
