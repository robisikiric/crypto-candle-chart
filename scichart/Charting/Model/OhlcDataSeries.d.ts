import { NumberRange } from "../../Core/NumberRange";
import { NumberArray } from "../../types/NumberArray";
import { SCRTDoubleVector, TSciChart } from "../../types/TSciChart";
import { EYRangeMode } from "../../types/YRangeMode";
import { SeriesAnimation } from "../Visuals/RenderableSeries/Animations/SeriesAnimation";
import { BaseDataSeries, IBaseDataSeriesOptions } from "./BaseDataSeries";
import { EDataSeriesType, EDataSeriesValueType } from "./IDataSeries";
import { IPointMetadata } from "./IPointMetadata";
/**
 * Options to pass to the {@link OhlcDataSeries} constructor
 */
export interface IOhlcDataSeriesOptions extends IBaseDataSeriesOptions {
    /**
     * The X-values array to pre-populate the {@link OhlcDataSeries}
     */
    xValues?: NumberArray;
    /**
     * The Open-values array to pre-populate the {@link OhlcDataSeries}
     */
    openValues?: NumberArray;
    /**
     * The High-values array to pre-populate the {@link OhlcDataSeries}
     */
    highValues?: NumberArray;
    /**
     * The Low-values array to pre-populate the {@link OhlcDataSeries}
     */
    lowValues?: NumberArray;
    /**
     * The Close-values array to pre-populate the {@link OhlcDataSeries}
     */
    closeValues?: NumberArray;
}
/**
 * OhlcDataSeries is a DataSeries for holding Open, High, Low, Close data in SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Stock Charts}
 * @remarks
 * The OhlcDataSeries is primarily used with the {@link FastCandlestickRenderableSeries | JavaScript Candlestick Chart}
 * but can also be used with our {@link FastOhlcRenderableSeries | JavaScript Ohlc Chart},
 * used for drawing {@link https://www.scichart.com/javascript-chart-features | JavaScript Stock Charts} and Candlestick or OHLC charts.
 *
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
export declare class OhlcDataSeries extends BaseDataSeries {
    /** @inheritDoc */
    readonly type = EDataSeriesType.Ohlc;
    /**
     * Open vector with initial animation values
     */
    openInitialAnimationValues: SCRTDoubleVector;
    /**
     * Open vector with final animation values
     */
    openFinalAnimationValues: SCRTDoubleVector;
    /**
     * High vector with initial animation values
     */
    highInitialAnimationValues: SCRTDoubleVector;
    /**
     * High vector with final animation values
     */
    highFinalAnimationValues: SCRTDoubleVector;
    /**
     * Low vector with initial animation values
     */
    lowInitialAnimationValues: SCRTDoubleVector;
    /**
     * Low vector with final animation values
     */
    lowFinalAnimationValues: SCRTDoubleVector;
    private openValues;
    private highValues;
    private lowValues;
    /**
     * Creates an instance of {@link OhlcDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IOhlcDataSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    constructor(webAssemblyContext: TSciChart, options?: IOhlcDataSeriesOptions);
    /**
     * Gets a native / WebAssembly vector of Open-values in the DataSeries
     */
    getNativeOpenValues(): SCRTDoubleVector;
    /**
     * Gets a native / WebAssembly vector of High-values in the DataSeries
     */
    getNativeHighValues(): SCRTDoubleVector;
    /**
     * Gets a native / WebAssembly vector of Low-values in the DataSeries
     */
    getNativeLowValues(): SCRTDoubleVector;
    /**
     * Gets a native / WebAssembly vector of Close-values in the DataSeries
     */
    getNativeCloseValues(): SCRTDoubleVector;
    /**
     * Appends a single X (Date), Open, High, Low, Close point to the DataSeries
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     * X-value is a Date, encoded as a Unix Timestamp.
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param x X-value is a Date, encoded as a Unix Timestamp.
     * @param open The Open value for this OHLC bar
     * @param high The High value for this OHLC bar
     * @param low The Low value for this OHLC bar
     * @param close The Close value for this OHLC bar
     * @param metadata The point metadata
     */
    append(x: number, open: number, high: number, low: number, close: number, metadata?: IPointMetadata): void;
    /**
     * Appends arrays of X (Date), Open, High, Low, Close point to the DataSeries
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     * X-value is a Date, encoded as a Unix Timestamp.
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param xValues X-values are Dates, encoded as a Unix Timestamp.
     * @param openValues The Open values for this OHLC bar
     * @param highValues The High values for this OHLC bar
     * @param lowValues The Low values for this OHLC bar
     * @param closeValues The Close value sfor this OHLC bar
     * @param metadata The array of point metadata
     */
    appendRange(xValues: NumberArray, openValues: NumberArray, highValues: NumberArray, lowValues: NumberArray, closeValues: NumberArray, metadata?: IPointMetadata[]): void;
    /**
     * Updates a single Open, High, Low, Close value by X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param open The new Open value
     * @param high The new High value
     * @param low The new Low value
     * @param close The new Close value
     * @param metadata The point metadata
     */
    update(index: number, open: number, high: number, low: number, close: number, metadata?: IPointMetadata): void;
    /**
     * Updates a single X, Open, High, Low, Close value by X-index. Might also need to set isSorted = false
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param x The new X value
     * @param open The new Open value
     * @param high The new High value
     * @param low The new Low value
     * @param close The new Close value
     * @param metadata The point metadata
     */
    updateXohlc(index: number, x: number, open: number, high: number, low: number, close: number, metadata?: IPointMetadata): void;
    /**
     * Inserts a single Date, Open, High, Low, Close value at the X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param x the X-value (date) encoded as a Unix Timestamp
     * @param open The Open value
     * @param high The High value
     * @param low The Low value
     * @param close The Close value
     * @param metadata The point metadata
     */
    insert(startIndex: number, x: number, open: number, high: number, low: number, close: number, metadata?: IPointMetadata): void;
    /**
     * Inserts a range of Date, Open, High, Low, Close value at the X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param xValues the X-values (dates) encoded as a Unix Timestamp
     * @param openValues The Open values
     * @param highValues The High values
     * @param lowValues The Low values
     * @param closeValues The Close values
     * @param metadata The array of point metadata
     */
    insertRange(startIndex: number, xValues: NumberArray, openValues: NumberArray, highValues: NumberArray, lowValues: NumberArray, closeValues: NumberArray, metadata?: IPointMetadata[]): void;
    /**
     * Removes a Date,Open,High,Low,Close value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to remove at
     */
    removeAt(index: number): void;
    /**
     * Removes a range of Date,Open,High,Low,Close values at the specified index
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
    getWindowedYRange(xRange: NumberRange, getPositiveRange: boolean, isXCategoryAxis?: boolean, dataSeriesValueType?: EDataSeriesValueType, yRangeMode?: EYRangeMode): NumberRange;
    /** @inheritDoc */
    createAnimationVectors(): void;
    /** @inheritDoc */
    setInitialAnimationVectors(dataSeries?: OhlcDataSeries): void;
    /** @inheritDoc */
    setFinalAnimationVectors(dataSeries?: OhlcDataSeries): void;
    /** @inheritDoc */
    validateAnimationVectors(): void;
    /** @inheritDoc */
    updateAnimationProperties(progress: number, animation: SeriesAnimation): void;
    /** @inheritDoc */
    protected getOptions(excludeData?: boolean): IOhlcDataSeriesOptions;
    protected reserve(size: number): void;
    private getOHLCValues;
}
export declare function getOHLCYRange(indicesRange: NumberRange, openValues: SCRTDoubleVector, highValues: SCRTDoubleVector, lowValues: SCRTDoubleVector, closeValues: SCRTDoubleVector): NumberRange;
