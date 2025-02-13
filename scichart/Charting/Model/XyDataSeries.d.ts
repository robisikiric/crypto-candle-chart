import { NumberArray } from "../../types/NumberArray";
import { TSciChart } from "../../types/TSciChart";
import { BaseDataSeries, IBaseDataSeriesOptions } from "./BaseDataSeries";
import { EDataSeriesType } from "./IDataSeries";
import { IPointMetadata } from "./IPointMetadata";
/**
 * Options to pass to the {@link XyDataSeries} constructor
 */
export interface IXyDataSeriesOptions extends IBaseDataSeriesOptions {
}
/**
 * @summary XyDataSeries is a DataSeries for holding X, Y data in SciChart's 2D
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @description
 * The XyDataSeries is primarily used with our {@link FastLineRenderableSeries | JavaScript Line Chart},
 * but can also be used by the {@link XyScatterRenderableSeries | JavaScript Scatter Chart} or
 * {@link FastMountainRenderableSeries | JavaScript Mountain/Area Chart} and {@link FastMountainRenderableSeries | JavaScript Column Chart}.
 *
 * To instantiate an {@link XyDataSeries}, use the following code:
 * ```ts
 * const xyDataSeries = new XyDataSeries(wasmContext);
 * xyDataSeries.append(1, 2); // Append a single x,y point
 * xyDataSeries.appendRange([3, 4], [3, 4]); // Append multiple x,y points (faster)
 * xyDataSeries.insert(0, 9, 10); // Insert a point at index 0
 * xyDataSeries.update(0, 11, 12); // Update a point at index 0
 * xyDataSeries.removeAt(0); // Remove a point at index 0
 * xyDataSeries.clear(); // Clear the dataseries
 * xyDataSeries.delete(); // Delete the dataseries and native (WebAssembly) memory
 * ```
 * @remarks
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
export declare class XyDataSeries extends BaseDataSeries {
    /**
     * @inheritDoc
     */
    readonly type = EDataSeriesType.Xy;
    /**
     * Creates an instance of {@link XyDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 WebAssembly rendering engine
     * @param options the {@link IXyDataSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    constructor(webAssemblyContext: TSciChart, options?: IXyDataSeriesOptions);
    /**
     * Appends a single X, Y point to the DataSeries
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param x The X-value
     * @param y The Y-value
     * @param metadata The point metadata
     */
    append(x: number, y: number, metadata?: IPointMetadata): void;
    /**
     * Appends a range of X, Y points to the DataSeries
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param xValues The X-values
     * @param yValues The Y-values
     * @param metadata The array of point metadata
     */
    appendRange(xValues: NumberArray, yValues: NumberArray, metadata?: IPointMetadata[]): void;
    /**
     * Updates a single Y-value by X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param y The new Y value
     * @param metadata The point metadata
     */
    update(index: number, y: number, metadata?: IPointMetadata): void;
    /**
     * Updates a single X, Y-value by X-index. Might also need to set isSorted = false
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index The index to update
     * @param x The new X value
     * @param y The new Y value
     * @param metadata The point metadata
     */
    updateXy(index: number, x: number, y: number, metadata?: IPointMetadata): void;
    /**
     * @summary Inserts a single X,Y value at the start index
     * @remarks
     * For best performance on drawing large datasets, use the {@link insertRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param x the X value
     * @param y the Y value
     * @param metadata The point metadata
     */
    insert(startIndex: number, x: number, y: number, metadata?: IPointMetadata): void;
    /**
     * @summary Inserts a range of X,Y values at the startIndex
     * @remarks
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param xValues the XValues
     * @param yValues the YValues
     * @param metadata The array of point metadata
     */
    insertRange(startIndex: number, xValues: NumberArray, yValues: NumberArray, metadata?: IPointMetadata[]): void;
    /**
     * Removes an X,Y value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to remove at
     */
    removeAt(index: number): void;
    /**
     * @summary Removes a range of X,Y values at the specified index
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
    protected getOptions(excludeData?: boolean): IXyDataSeriesOptions;
}
