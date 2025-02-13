import { NumberArray } from "../../types/NumberArray";
import { TSciChart } from "../../types/TSciChart";
import { BaseDataSeries } from "./BaseDataSeries";
import { EDataSeriesType } from "./IDataSeries";
import { IPointMetadata } from "./IPointMetadata";
import { IXyDataSeriesOptions } from "./XyDataSeries";
/**
 * Options to pass to the {@link XyTextDataSeries} constructor
 */
export interface IXyTextDataSeriesOptions extends IXyDataSeriesOptions {
    /**
     * The text-values array to pre-populate the {@link XyTextDataSeries}
     */
    textValues?: string[];
}
export declare class XyTextDataSeries extends BaseDataSeries {
    /**
     * @inheritDoc
     */
    readonly type = EDataSeriesType.XyText;
    private textValuesProperty;
    /**
     * Creates an instance of {@link XyDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 WebAssembly rendering engine
     * @param options the {@link IXyDataSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    constructor(webAssemblyContext: TSciChart, options?: IXyTextDataSeriesOptions);
    /** The text values for this series.  Manipulate using append, insert, update etc on the XyTextDataSeries  */
    get textValues(): readonly string[];
    /** Get the text value at an index, unwrapping the fifo buffer if fifoCapacity is set */
    getTextValue(index: number): string;
    /**
     * Appends a single X, Y, Text point to the DataSeries
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param x The X-value
     * @param y The Y-value
     * @param text The text-value
     * @param metadata The point metadata
     */
    append(x: number, y: number, text: string, metadata?: IPointMetadata): void;
    /**
     * Appends a range of X, Y, Text points to the DataSeries
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param xValues The X-values
     * @param yValues The Y-values
     * @param textValues The text values
     * @param metadata The array of point metadata
     */
    appendRange(xValues: NumberArray, yValues: NumberArray, textValues: string[], metadata?: IPointMetadata[]): void;
    /**
     * Updates a single Y-value by X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param y The new Y value
     * @param text The new text value
     * @param metadata The point metadata
     */
    update(index: number, y: number, text: string, metadata?: IPointMetadata): void;
    /**
     * Updates a single X, Y, Text value, by X-index. Might also need to set isSorted = false
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index The index to update
     * @param x The new X value
     * @param y The new Y value
     * @param text The new text value
     * @param metadata The point metadata
     */
    updateXyText(index: number, x: number, y: number, text: string, metadata?: IPointMetadata): void;
    /**
     * @summary Inserts a single X,Y,Text value at the start index
     * @remarks
     * For best performance on drawing large datasets, use the {@link insertRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param x the X value
     * @param y the Y value
     * @param text The new text value
     * @param metadata The point metadata
     */
    insert(startIndex: number, x: number, y: number, text: string, metadata?: IPointMetadata): void;
    /**
     * @summary Inserts a range of X,Y values at the startIndex
     * @remarks
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param xValues the XValues
     * @param yValues the YValues
     * @param textValues The text values
     * @param metadata The array of point metadata
     */
    insertRange(startIndex: number, xValues: NumberArray, yValues: NumberArray, textValues: string[], metadata?: IPointMetadata[]): void;
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
    protected getOptions(excludeData?: boolean): IXyTextDataSeriesOptions;
}
