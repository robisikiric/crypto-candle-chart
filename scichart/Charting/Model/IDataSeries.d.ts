import { TDataSeriesDefinition } from "../../Builder/buildDataSeries";
import { EventHandler } from "../../Core/EventHandler";
import { IDeletable } from "../../Core/IDeletable";
import { NumberRange } from "../../Core/NumberRange";
import { ESearchMode } from "../../types/SearchMode";
import { SCRTDoubleVector } from "../../types/TSciChart";
import { EYRangeMode } from "../../types/YRangeMode";
import { IDataDistributionCalculator } from "./DataDistributionCalculator/IDataDistributionCalculator";
/**
 * Defines {@link BaseDataSeries | DataSeries} types available within SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 */
export declare enum EDataSeriesType {
    /**
     * Defines an {@link XyDataSeries}
     */
    Xy = "Xy",
    /**
     * Defines an {@link XyyDataSeries}, with two Y-points for every X-Value
     */
    Xyy = "Xyy",
    /**
     * Defines an {@link XyzDataSeries}
     */
    Xyz = "Xyz",
    /**
     * Defines an {@link OhlcDataSeries} for
     * {@link https://www.scichart.com/javascript-chart-features | JavaScript Stock Charts} or
     * financial charts
     */
    Ohlc = "Ohlc",
    /**
     * Defines a {@link UniformHeatmapDataSeries | DataSeries}
     */
    HeatmapUniform = "UniformHeatmap",
    /**
     * Defines a {@link UniformHeatmapDataSeries | DataSeries}
     */
    HeatmapNonUniform = "NonUniformHeatmap",
    /**
     * Defines a {@link HlcDataSeries}
     */
    Hlc = "Hlc",
    /**
     * Defines a {@link XyTextDataSeries}
     */
    XyText = "XyText"
}
export declare enum EDataChangeType {
    Append = 0,
    Insert = 1,
    Update = 2,
    Remove = 3,
    Clear = 4,
    Property = 5
}
/**
 * Defines what values to use when dealing with an {@link IDataSeries}
 * For example, when getWindowedYRange() is called we can use Default values, which are xValues and yValues
 * or if an animation is running we can use InitialAnimationValues or FinalAnimationValues
 */
export declare enum EDataSeriesValueType {
    Default = "Default",
    InitialAnimationValues = "InitialAnimationValues",
    FinalAnimationValues = "FinalAnimationValues"
}
export interface IDataChangeArgs {
    changeType: EDataChangeType;
    index?: number;
    yIndex?: number;
    count?: number;
    name?: string;
}
/**
 * Defines the interface to a DataSeries in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
export interface IDataSeries extends IDeletable {
    /**
     * A unique Id for the {@link IDataSeries}
     */
    readonly id: string;
    /**
     * Gets the {@link EDataSeriesType} type of the DataSeries
     */
    readonly type: EDataSeriesType;
    /**
     *  Gets the change count for this data series. Allows to indentify when data series was changed
     */
    readonly changeCount: number;
    /**
     * Gets the {@link IDataDistributionCalculator} instance for this DataSeries. Used when resampling data to determine the correct algorithm
     */
    readonly dataDistributionCalculator: IDataDistributionCalculator;
    /**
     * An {@link EventHandler} which is raised when the data changes.
     * @Remarks
     * To subscribe to dataChanged, use the following code:
     *
     * ```ts
     * const dataSeries = new XyDataSeries(wasmContext);
     * const callback = () => {
     *    // Data has changed
     * };
     * dataSeries.dataChanged.subscribe(callback);
     * ```
     *
     * To unsubscribe from dataChanged, use the following code:
     *
     * ```ts
     * const dataSeries = new XyDataSeries(wasmContext);
     * dataSeries.dataChanged.unsubscribe(callback);
     * ```
     */
    dataChanged: EventHandler<IDataChangeArgs>;
    /**
     * Gets the range in the X-direction for this DataSeries
     */
    xRange: NumberRange;
    /**
     * When true, the DataSeries has values, else it is empty
     */
    hasValues: boolean;
    minXSpacing: number;
    /**
     * Gets the DataSeries name. This is used in legend controls and tooltips to identify the series
     */
    dataSeriesName: string;
    /**
     * Gets or sets whether the X-values are sorted ascending or not.
     * See remarks at {@link IDataSeries.isSorted} for further information
     * @remarks
     * The user must specify this flag (defaults to true) in order to choose the correct, and
     * fastest algorithms for drawing, indexing and ranging. If you experience glitches or
     * strange drawing, it may be because you have set unsorted data but not set this flag.
     */
    isSorted: boolean;
    /**
     * Gets or sets whether the X-values are evenly spaced or not.
     * See remarks at {@link IDataSeries.isEvenlySpaced} for further information
     * @remarks
     * The user must specify this flag (defaults to true) in order to choose the correct, and
     * fastest algorithms for drawing, indexing and ranging. If you experience glitches or
     * strange drawing, it may be because you have set data with uneven spacing in X but not set this flag.
     */
    isEvenlySpaced: boolean;
    /**
     * Gets or sets whether the Y data contains NaN values.
     * Set containsNaN = false for the performance optimization when the series has no NaNs
     */
    containsNaN: boolean;
    /**
     * Gets the maximum size of the dataSeries in FIFO (First In First Out) mode.  This can only be set in the constructor options.
     * If set, the dataSeries supports only append, appendRange, update and clear. Any data that is appended once the dataSeries has reached fifoCapacity will cause
     * the oldest data to be discarded.  This is a much more efficient than appending and removing for achieving scrolling data.
     * Spline series and Stacked series currently do not support fifo mode.
     * To get the scrolling effect, you need to consider the behaviour of your X Axis. You can either
     *    Use a {@link CategoryAxis}
     *    Use a {@link NumericAxis} with increasing x values, and update the visibleRange (or use zoomExtents)
     */
    fifoCapacity?: number;
    /**
     * Internal only - Get the starting offset when in fifo mode
     */
    fifoStartIndex?: number;
    /**
     * If true, data in fifo mode will not be "unwrapped" before drawing, giving ecg style sweeping mode.
     * To get the sweeping effect, you need to consider the behaviour of your X Axis. You can either
     *    Use a {@link CategoryAxis}
     *    Use a {@link NumericAxis} and make your x values an offset from the first value, eg by doing x % fifoCapcity
     */
    fifoSweeping?: boolean;
    /** In fifo sweeping mode, the number of earliest points to skip to create a gap between the latest and earliest data  */
    fifoSweepingGap?: number;
    /**
     * Gets the count of data-points in the DataSeries
     */
    count(): number;
    /**
     * Gets a native / WebAssembly Vector of Indexes in the DataSeries
     */
    getNativeIndexes(): SCRTDoubleVector;
    /**
     * Gets a native / WebAssembly vector of X-values in the DataSeries
     */
    getNativeXValues(): SCRTDoubleVector;
    /**
     * Gets a native / WebAssembly vector of Y-values in the DataSeries
     */
    getNativeYValues(): SCRTDoubleVector;
    /**
     * Get the value from a native vector , potentially accounting for fifo sweeping.
     */
    getNativeValue(values: SCRTDoubleVector, index: number): number;
    /**
     * Clear all values from the DataSeries
     */
    clear(): void;
    /**
     * Returns true if this DataSeries has been deleted and native memory destroyed
     */
    getIsDeleted(): boolean;
    /**
     * Gets the range in the X-direction for this DataSeries
     * @param dataSeriesValueType The data series values to use {@link EDataSeriesValueType}
     */
    getXRange(dataSeriesValueType?: EDataSeriesValueType): NumberRange;
    /**
     * Gets the Y-range of the data within the specified X-Range: a 'windowed'
     * Y-range used for zooming into series on the {@link SciChartSurface}
     * @param xRange The {@link AxisCore.visibleRange | XAxis.visibleRange}
     * @param getPositiveRange When true, return the positive part of the Y-range only
     * @param isCategoryAxis When true, treat the XAxis as a {@link CategoryAxis} -
     * an axis type which measures by x-index not x-value
     * @param dataSeriesValueType The data series values to use {@link EDataSeriesValueType}
     */
    getWindowedYRange(xRange: NumberRange, getPositiveRange: boolean, isCategoryAxis: boolean, dataSeriesValueType?: EDataSeriesValueType, yRangeMode?: EYRangeMode): NumberRange;
    /**
     * Convert the object to a definition that can be serialized to JSON, or used directly with the builder api
     * @param excludeData if set true, data values will not be included in the json.
     */
    toJSON(excludeData?: boolean): TDataSeriesDefinition;
    /**
     * Gets the integer indices of the XValues array that are currently in the VisibleRange passed in, and an undefined range otherwise.
     * @param visibleRange The VisibleRange to get the indices range
     * @param isCategoryData If True the renderable series uses {@link CategoryAxis}
     * @param downSearchMode Specifies the search mode used to look for the index of visibleRange.Min
     * @param upSearchMode Specifies the search mode used to look for the index of visibleRange.Max
     * @returns numberRange The indices to the X-Data that are currently in range.
     */
    getIndicesRange(visibleRange: NumberRange, isCategoryData?: boolean, downSearchMode?: ESearchMode, upSearchMode?: ESearchMode): NumberRange;
}
