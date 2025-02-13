import { NumberArray } from "../../types/NumberArray";
import { SCRTDoubleVector, TSciChart } from "../../types/TSciChart";
import { SeriesAnimation } from "../Visuals/RenderableSeries/Animations/SeriesAnimation";
import { BaseDataSeries, IBaseDataSeriesOptions } from "./BaseDataSeries";
import { EDataSeriesType } from "./IDataSeries";
import { IPointMetadata } from "./IPointMetadata";
/**
 * Options to pass to the {@link XyzDataSeries} constructor
 */
export interface IXyzDataSeriesOptions extends IBaseDataSeriesOptions {
    /**
     * The X-values array to pre-populate the {@link XyzDataSeries}
     */
    xValues?: NumberArray;
    /**
     * The Y-values array to pre-populate the {@link XyzDataSeries}
     */
    yValues?: NumberArray;
    /**
     * The Z-values array to pre-populate the {@link XyzDataSeries}
     */
    zValues?: NumberArray;
}
/**
 * XyzDataSeries is a DataSeries for holding X, Y, Z data in SciChart's 2D
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * The {@link XyzDataSeries} is primarily used with our {@link FastBubbleRenderableSeries | JavaScript Bubble Chart},
 * which draws a variable-sized bubble or shape at each X,Y value
 *
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
export declare class XyzDataSeries extends BaseDataSeries {
    /** @inheritDoc */
    readonly type = EDataSeriesType.Xyz;
    /**
     * Z vector with initial animation values
     */
    zInitialAnimationValues: SCRTDoubleVector;
    /**
     * Z vector with final animation values
     */
    zFinalAnimationValues: SCRTDoubleVector;
    protected zValues: SCRTDoubleVector;
    /**
     * Creates an instance of {@link XyzDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IXyzDataSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    constructor(webAssemblyContext: TSciChart, options?: IXyzDataSeriesOptions);
    /**
     * Gets a native / WebAssembly vector of Z-values in the DataSeries
     */
    getNativeZValues(): SCRTDoubleVector;
    /**
     * Appends a single X, Y, Z point to the DataSeries
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param x The X-value
     * @param y The Y-value
     * @param z The Z-value
     * @param metadata The point metadata
     */
    append(x: number, y: number, z: number, metadata?: IPointMetadata): void;
    /**
     * Appends a range of X, Y, Z points to the DataSeries
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param xValues The X-values
     * @param yValues The Y-values
     * @param zValues The Z-values
     * @param metadata The array of point metadata
     */
    appendRange(xValues: NumberArray, yValues: NumberArray, zValues: NumberArray, metadata?: IPointMetadata[]): void;
    /**
     * Updates a single Y, Z-value by X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param y The new Y value
     * @param z The new Z value
     * @param metadata The point metadata
     */
    update(index: number, y: number, z: number, metadata?: IPointMetadata): void;
    /**
     * Updates a single X, Y, Z-value by X-index. Might also need to set isSorted = false
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param x The new X value
     * @param y The new Y value
     * @param z The new Z value
     * @param metadata The point metadata
     */
    updateXyz(index: number, x: number, y: number, z: number, metadata?: IPointMetadata): void;
    /**
     * Inserts a single X,Y,Z value at the start index
     * @remarks
     * For best performance on drawing large datasets, use the {@link insertRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param x the Xvalue
     * @param y the YValue
     * @param z the ZValue
     * @param metadata The point metadata
     */
    insert(startIndex: number, x: number, y: number, z: number, metadata?: IPointMetadata): void;
    /**
     * Inserts a range of X,Y,Z values at the startIndex
     * @remarks
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param xValues the XValues
     * @param yValues the YValues
     * @param zValues the ZValues
     * @param metadata The array of point metadata
     */
    insertRange(startIndex: number, xValues: NumberArray, yValues: NumberArray, zValues: NumberArray, metadata?: IPointMetadata[]): void;
    /**
     * Removes a single X,Y,Z value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to remove at
     */
    removeAt(index: number): void;
    /**
     * Removes a range of X,Y,Z values at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
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
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     */
    clear(): void;
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    createAnimationVectors(): void;
    /** @inheritDoc */
    setInitialAnimationVectors(dataSeries?: XyzDataSeries): void;
    /** @inheritDoc */
    setFinalAnimationVectors(dataSeries?: XyzDataSeries): void;
    /** @inheritDoc */
    validateAnimationVectors(): void;
    /** @inheritDoc */
    updateAnimationProperties(progress: number, animation: SeriesAnimation): void;
    /** @inheritDoc */
    protected getOptions(excludeData?: boolean): IXyzDataSeriesOptions;
    protected reserve(size: number): void;
    private getYZValues;
}
