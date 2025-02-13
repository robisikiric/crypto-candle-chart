import { NumberRange } from "../../Core/NumberRange";
import { NumberArray } from "../../types/NumberArray";
import { SCRTDoubleVector, TSciChart } from "../../types/TSciChart";
import { EYRangeMode } from "../../types/YRangeMode";
import { SeriesAnimation } from "../Visuals/RenderableSeries/Animations/SeriesAnimation";
import { BaseDataSeries, IBaseDataSeriesOptions } from "./BaseDataSeries";
import { EDataSeriesType, EDataSeriesValueType } from "./IDataSeries";
import { IPointMetadata } from "./IPointMetadata";
/**
 * Options to pass to the {@link XyDataSeries} constructor
 */
export interface IXyyDataSeriesOptions extends IBaseDataSeriesOptions {
    /**
     * The X-values array to pre-populate the {@link XyyDataSeries}
     */
    xValues?: NumberArray;
    /**
     * The Y1-values array to pre-populate the {@link XyyDataSeries}
     */
    yValues?: NumberArray;
    /**
     * The Y2-values array to pre-populate the {@link XyyDataSeries}
     */
    y1Values?: NumberArray;
}
/**
 * XyyDataSeries is a DataSeries for holding X, Y1, Y2 data in SciChart's 2D
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * The XyyDataSeries is primarily used with our {@link FastBandRenderableSeries | JavaScript Band Chart},
 * which draws a High-Low fill between two lines, where the fill changes color depending on whether line Y2 > Y1
 *
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
export declare class XyyDataSeries extends BaseDataSeries {
    /** @inheritDoc */
    readonly type = EDataSeriesType.Xyy;
    /**
     * Y1 vector with initial animation values
     */
    y1InitialAnimationValues: SCRTDoubleVector;
    /**
     * Y1 vector with final animation values
     */
    y1FinalAnimationValues: SCRTDoubleVector;
    protected y1Values: SCRTDoubleVector;
    /**
     * Creates an instance of {@link XyyDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IXyyDataSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    constructor(webAssemblyContext: TSciChart, options?: IXyyDataSeriesOptions);
    /**
     * Gets a native / WebAssembly vector of Y2-values in the DataSeries
     */
    getNativeY1Values(): SCRTDoubleVector;
    /**
     * Appends a single X, Y, Y1 point to the DataSeries
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param x The X-value
     * @param y The Y1-value
     * @param y1 The Y2-value
     * @param metadata The point metadata
     */
    append(x: number, y: number, y1: number, metadata?: IPointMetadata): void;
    /**
     * Appends a range of X, Y, Y1 points to the DataSeries
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param xValues The X-values
     * @param yValues The Y-values
     * @param y1Values The Y1-values
     * @param metadata The array of point metadata
     */
    appendRange(xValues: NumberArray, yValues: NumberArray, y1Values: NumberArray, metadata?: IPointMetadata[]): void;
    /**
     * Updates a single Y, Y1-value by X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param y The new Y value
     * @param y1 The new Y1 value
     * @param metadata The point metadata
     */
    update(index: number, y: number, y1: number, metadata?: IPointMetadata): void;
    /**
     * Updates a single X, Y, Y1-value by X-index. Might also need to set isSorted = false
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param x The new X value
     * @param y The new Y value
     * @param y1 The new Y1 value
     * @param metadata The point metadata
     */
    updateXyy1(index: number, x: number, y: number, y1: number, metadata?: IPointMetadata): void;
    /**
     * Inserts a single X,Y1,Y2 value at the start index
     * @remarks
     * For best performance on drawing large datasets, use the {@link insertRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param x the Xvalue
     * @param y the Y1Value
     * @param y1 the Y2Value
     * @param metadata The point metadata
     */
    insert(startIndex: number, x: number, y: number, y1: number, metadata?: IPointMetadata): void;
    /**
     * Inserts a ragne of X,Y1,Y2 values at the startIndex
     * @remarks
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param xValues the XValues
     * @param yValues the YValues
     * @param y1Values the Y1Values
     * @param metadata The array of point metadata
     */
    insertRange(startIndex: number, xValues: NumberArray, yValues: NumberArray, y1Values: NumberArray, metadata?: IPointMetadata[]): void;
    /**
     * Removes a single X,Y1,Y2 value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to remove at
     */
    removeAt(index: number): void;
    /**
     * Removes a range of X,Y1,Y2 values at the specified index
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
    getWindowedYRange(xRange: NumberRange, getPositiveRange: boolean, isXCategoryAxis?: boolean, dataSeriesValueType?: EDataSeriesValueType, yRangeMode?: EYRangeMode): NumberRange;
    /** @inheritDoc */
    delete(): void;
    createAnimationVectors(): void;
    /** @inheritDoc */
    setInitialAnimationVectors(dataSeries?: XyyDataSeries): void;
    /** @inheritDoc */
    setFinalAnimationVectors(dataSeries?: XyyDataSeries): void;
    /** @inheritDoc */
    validateAnimationVectors(): void;
    /** @inheritDoc */
    updateAnimationProperties(progress: number, animation: SeriesAnimation): void;
    /** @inheritDoc */
    protected getOptions(excludeData?: boolean): IBaseDataSeriesOptions;
    protected reserve(size: number): void;
    private getYY1Values;
}
export declare function getYyYRange(webAssemblyContext: TSciChart, indicesRange: NumberRange, yValues: SCRTDoubleVector, y1Values: SCRTDoubleVector): NumberRange;
