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
export interface IHlcDataSeriesOptions extends IBaseDataSeriesOptions {
    /**
     * The X-values array to pre-populate the {@link HlcDataSeries}
     */
    xValues?: NumberArray;
    /**
     * The Y-values array to pre-populate the {@link HlcDataSeries}
     */
    yValues?: NumberArray;
    /**
     * The H-values array to pre-populate the {@link HlcDataSeries}
     */
    highValues?: NumberArray;
    /**
     * The L-values array to pre-populate the {@link HlcDataSeries}
     */
    lowValues?: NumberArray;
}
/**
 * HlcDataSeries is a DataSeries for holding X, Y, H, L data in SciChart's 2D
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * The HlcDataSeries is primarily used with our {@link FastErrorBarsRenderableSeries | JavaScript Error Bars Chart},
 * which draws a High-Low Bars around points
 *
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
export declare class HlcDataSeries extends BaseDataSeries {
    /** @inheritDoc */
    readonly type = EDataSeriesType.Hlc;
    /**
     * H vector with initial animation values
     */
    hInitialAnimationValues: SCRTDoubleVector;
    /**
     * H vector with final animation values
     */
    hFinalAnimationValues: SCRTDoubleVector;
    /**
     * Y1 vector with initial animation values
     */
    lInitialAnimationValues: SCRTDoubleVector;
    /**
     * Y1 vector with final animation values
     */
    lFinalAnimationValues: SCRTDoubleVector;
    protected highValues: SCRTDoubleVector;
    protected lowValues: SCRTDoubleVector;
    /**
     * Creates an instance of {@link HlcDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IHlcDataSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    constructor(webAssemblyContext: TSciChart, options?: IHlcDataSeriesOptions);
    /**
     * Gets a native / WebAssembly vector of H-values in the DataSeries
     */
    getNativeHighValues(): SCRTDoubleVector;
    /**
     * Gets a native / WebAssembly vector of L-values in the DataSeries
     */
    getNativeLowValues(): SCRTDoubleVector;
    /**
     * Appends a single X, Y, Y1 point to the DataSeries
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param x The X-value
     * @param y The Y1-value
     * @param h The H-value
     * @param l The L-value
     * @param metadata The point metadata
     */
    append(x: number, y: number, h: number, l: number, metadata?: IPointMetadata): void;
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
    appendRange(xValues: NumberArray, yValues: NumberArray, hValues: NumberArray, lValues: NumberArray, metadata?: IPointMetadata[]): void;
    /**
     * Updates a single Y, H, L-value by X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param y The new Y value
     * @param h The new H value
     * @param l The new L value
     * @param metadata The point metadata
     */
    update(index: number, y: number, h: number, l: number, metadata?: IPointMetadata): void;
    /**
     * Updates a single X, Y, H, L-value by X-index. Might also need to set isSorted = false
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param x The new X value
     * @param y The new Y value
     * @param h The new H value
     * @param l The new L value
     * @param metadata The point metadata
     */
    updateXyhl(index: number, x: number, y: number, h: number, l: number, metadata?: IPointMetadata): void;
    /**
     * Inserts a single X,Y, H, L value at the start index
     * @remarks
     * For best performance on drawing large datasets, use the {@link insertRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param x the XValue
     * @param y the YValue
     * @param h the HighValue
     * @param l the LowValue
     * @param metadata The point metadata
     */
    insert(startIndex: number, x: number, y: number, h: number, l: number, metadata?: IPointMetadata): void;
    /**
     * Inserts a range of X,Y, H, L values at the startIndex
     * @remarks
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param xValues the XValues
     * @param yValues the YValues
     * @param hValues the HValues
     * @param lValues the LValues
     * @param metadata The array of point metadata
     */
    insertRange(startIndex: number, xValues: NumberArray, yValues: NumberArray, hValues: NumberArray, lValues: NumberArray, metadata?: IPointMetadata[]): void;
    /**
     * Removes a single X,Y, H, L value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to remove at
     */
    removeAt(index: number): void;
    /**
     * Removes a range of X, Y, H, L values at the specified index
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
    getXRange(dataSeriesValueType?: EDataSeriesValueType, isHorizontalDirection?: boolean, hasHighCap?: boolean, hasLowCap?: boolean): NumberRange;
    /** @inheritDoc */
    getWindowedYRange(xRange: NumberRange, getPositiveRange: boolean, isXCategoryAxis?: boolean, dataSeriesValueType?: EDataSeriesValueType, yRangeMode?: EYRangeMode, isHorizontalDirection?: boolean, hasHighCap?: boolean, hasLowCap?: boolean): NumberRange;
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    createAnimationVectors(): void;
    /** @inheritDoc */
    setInitialAnimationVectors(dataSeries?: HlcDataSeries): void;
    /** @inheritDoc */
    setFinalAnimationVectors(dataSeries?: HlcDataSeries): void;
    /** @inheritDoc */
    validateAnimationVectors(): void;
    /** @inheritDoc */
    updateAnimationProperties(progress: number, animation: SeriesAnimation): void;
    /** @inheritDoc */
    protected getOptions(excludeData?: boolean): IHlcDataSeriesOptions;
    protected reserve(size: number): void;
    private getHlcValues;
}
