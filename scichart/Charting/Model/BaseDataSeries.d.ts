import { TDataSeriesDefinition } from "../../Builder/buildDataSeries";
import { DeletableEntity } from "../../Core/DeletableEntity";
import { EventHandler } from "../../Core/EventHandler";
import { NumberRange } from "../../Core/NumberRange";
import { NumberArray } from "../../types/NumberArray";
import { ESearchMode } from "../../types/SearchMode";
import { SCRTDoubleVector, TSciChart } from "../../types/TSciChart";
import { EYRangeMode } from "../../types/YRangeMode";
import { SeriesAnimation } from "../Visuals/RenderableSeries/Animations/SeriesAnimation";
import { IDataDistributionCalculator } from "./DataDistributionCalculator/IDataDistributionCalculator";
import { IDoubleVectorProvider } from "./DoubleVectorProvider";
import { EDataChangeType, EDataSeriesType, EDataSeriesValueType, IDataChangeArgs, IDataSeries } from "./IDataSeries";
import { IMetadataGenerator, IPointMetadata } from "./IPointMetadata";
/**
 * Options to pass to the {@link BaseDataSeries} constructor
 */
export interface IBaseDataSeriesOptions {
    /**
     * A unique Id for the {@link IDataSeries}
     */
    id?: string;
    /**
     * The DataSeries name, used in legends, tooltips to identify the chart series
     */
    dataSeriesName?: string;
    /**
     * When true, the Data is sorted in X.  Same as isSorted.
     * @remarks The user must specify this parameter if the data is not sorted in X
     * in order to have correct rendering. This parameter is used to choose the correct
     * algorithms for zooming, panning and ranging and ensure best performance.
     */
    dataIsSortedInX?: boolean;
    /**
     * When true, the Data is sorted in X.  Same as dataIsSortedInX.
     * @remarks The user must specify this parameter if the data is not sorted in X
     * in order to have correct rendering. This parameter is used to choose the correct
     * algorithms for zooming, panning and ranging and ensure best performance.
     */
    isSorted?: boolean;
    /**
     * When true, the Data is evenly spaced in X.
     * @remarks
     * The user must specify this flag (defaults to true) in order to choose the correct, and
     * fastest algorithms for drawing, indexing and ranging. If you experience glitches or
     * strange drawing, it may be because you have set data with uneven spacing in X but not set this flag.
     */
    dataEvenlySpacedInX?: boolean;
    /**
     * Gets or sets whether the Y data contains NaN values.
     */
    containsNaN?: boolean;
    /**
     * Set the maximum size of the dataSeries in FIFO (First In First Out) mode.  This can only be set in the constructor options.
     * If set, the dataSeries does not support insert/insertRange or remove/removeRange. Any data that is appended once the dataSeries has reached fifoCapacity will cause
     * the oldest data to be discarded.  This is much more efficient than appending and removing for achieving scrolling data.
     * Spline series and Stacked series currently do not support fifo mode.
     * To get the scrolling effect, you need to consider the behaviour of your X Axis. You can either
     *    Use a {@link CategoryAxis}
     *    Use a {@link NumericAxis} with increasing x values, and update the visibleRange (or use zoomExtents)
     */
    fifoCapacity?: number;
    /**
     * If true, data in fifo mode will not be "unwrapped" before drawing, giving ecg style sweeping mode.
     * To get the sweeping effect, you need to consider the behaviour of your X Axis. You can either
     *    Use a {@link CategoryAxis}
     *    Use a {@link NumericAxis} and make your x values an offset from the first value, eg by doing x % fifoCapcity
     */
    fifoSweeping?: boolean;
    /** In fifo sweeping mode, the number of earliest points to skip to create a gap between the latest and earliest data  */
    fifoSweepingGap?: number;
    /** Sets the starting index of data for fifo mode. */
    fifoStartIndex?: number;
    /**
     * Gets or sets the capacity of the data series.  This is the amount of memory reserved for the data. For a normal dataSeries this will grow as data is appended.
     * You can avoid memory fragmentation by creating your series with a larger capacity if you know it will grow to that.
     */
    capacity?: number;
    /**
     * The X-values array to pre-populate the {@link XyDataSeries}
     */
    xValues?: NumberArray;
    /**
     * The Y-values array to pre-populate the {@link XyDataSeries}
     */
    yValues?: NumberArray;
    /**
     * The Metadata values of type {@link IPointMetadata} to pre-populate the {@link XyDataSeries}
     * If a single metadata value is supplied, this will be used as a template for all data values.
     * If type is specified, it should refer to a registered metadataGenerator {@link IMetadataGenerator},
     * which can provide all metadata, based on the data provided, or a single object that will be used when adding data if no metadata is provided.
     */
    metadata?: IPointMetadata[] | IPointMetadata | {
        type: string;
        data?: any;
    };
}
/**
 * The base class for DataSeries in SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
export declare abstract class BaseDataSeries extends DeletableEntity implements IDataSeries {
    /** @inheritDoc */
    abstract readonly type: EDataSeriesType;
    /** @inheritDoc */
    readonly dataChanged: EventHandler<IDataChangeArgs>;
    /** @inheritDoc */
    readonly id: string;
    /** @inheritDoc */
    readonly dataDistributionCalculator: IDataDistributionCalculator;
    minXSpacing: number;
    /**
     * If set, these will be included in the serialised definition, so that it can be used with sharedData
     */
    dataIds: Record<number | string, number[]>;
    /**
     * The {@link TSciChart | SciChart WebAssembly Context} containing native methods and access to our WebGL2 Engine
     */
    readonly webAssemblyContext: TSciChart;
    /**
     * X vector with initial animation values
     */
    xInitialAnimationValues: SCRTDoubleVector;
    /**
     * Y vector with initial animation values
     */
    yInitialAnimationValues: SCRTDoubleVector;
    /**
     * X vector with final animation values
     */
    xFinalAnimationValues: SCRTDoubleVector;
    /**
     * Y vector with final animation values
     */
    yFinalAnimationValues: SCRTDoubleVector;
    protected xValues: SCRTDoubleVector;
    protected yValues: SCRTDoubleVector;
    protected indexes: SCRTDoubleVector;
    protected isDeleted: boolean;
    protected doubleVectorProvider: IDoubleVectorProvider;
    private dataSeriesNameProperty;
    private isSortedProperty;
    private containsNaNProperty;
    private isEvenlySpacedProperty;
    private metadataProperty;
    private metadataGeneratorProperty;
    private changeCountProperty;
    private fifoCapacityProperty;
    private fifoSweepingProperty;
    private fifoSweepingGapProperty;
    /**
     * Creates an instance of {@link BaseDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IBaseDataSeriesOptions} which can be passed to config the DataSeries at construct time
     */
    protected constructor(webAssemblyContext: TSciChart, options?: IBaseDataSeriesOptions);
    /** @inheritDoc */
    clear(): void;
    /**
     * Gets or sets the capacity of data-points in the DataSeries
     */
    get capacity(): number;
    /**
     * Gets or sets the capacity of data-points in the DataSeries
     */
    set capacity(value: number);
    /** @inheritDoc */
    get containsNaN(): boolean;
    /** @inheritDoc */
    set containsNaN(containsNaN: boolean);
    /** @inheritDoc */
    get isSorted(): boolean;
    /** @inheritDoc */
    set isSorted(isSorted: boolean);
    /** @inheritDoc */
    get isEvenlySpaced(): boolean;
    /** @inheritDoc */
    set isEvenlySpaced(isSorted: boolean);
    /** @inheritDoc */
    get dataSeriesName(): string;
    /** @inheritDoc */
    set dataSeriesName(dataSeriesName: string);
    /** @inheritDoc */
    count(): number;
    /** @inheritDoc */
    getIsDeleted(): boolean;
    /** @inheritDoc */
    get fifoCapacity(): number;
    /** @inheritDoc */
    get fifoStartIndex(): number;
    /** @inheritDoc */
    get fifoSweeping(): boolean;
    /** @inheritDoc */
    set fifoSweeping(enabled: boolean);
    /** @inheritDoc */
    get fifoSweepingGap(): number;
    /** @inheritDoc */
    set fifoSweepingGap(fifoSweepingGap: number);
    /** @inheritDoc */
    getNativeIndexes(): SCRTDoubleVector;
    /** @inheritDoc */
    getNativeXValues(): SCRTDoubleVector;
    /** @inheritDoc */
    getNativeValue(values: SCRTDoubleVector, index: number): number;
    /** @inheritDoc */
    getNativeYValues(): SCRTDoubleVector;
    /** @inheritDoc */
    delete(): void;
    /**
     * Call to notify subscribers of {@link dataChanged} that the data has changed and {@link SciChartSurface} needs redrawing
     */
    notifyDataChanged(changeType: EDataChangeType, index: number, count: number, name?: string): void;
    /** @inheritDoc */
    get xRange(): NumberRange;
    /** @inheritDoc */
    getXRange(dataSeriesValueType?: EDataSeriesValueType): NumberRange;
    /** @inheritDoc */
    getWindowedYRange(xRange: NumberRange, getPositiveRange: boolean, isXCategoryAxis?: boolean, dataSeriesValueType?: EDataSeriesValueType, yRangeMode?: EYRangeMode): NumberRange;
    /** @inheritDoc */
    getIndicesRange(xRange: NumberRange, isCategoryData?: boolean, downSearchMode?: ESearchMode, upSearchMode?: ESearchMode): NumberRange;
    /** @inheritDoc */
    get hasValues(): boolean;
    /**
     * Check if the series has an existing metadataGenerator
     */
    hasMetadataGenerator(): boolean;
    /**
     * Sets a function that will be used to generate metadata for values when they are appended/inserted, if no explicit metadata is supplied.
     * @param generator
     */
    setMetadataGenerator(generator: IMetadataGenerator): void;
    /**
     * Gets the metadata by index
     * @param index The X index
     */
    getMetadataAt(index: number, ignoreFifo?: boolean): IPointMetadata;
    /**
     * Gets the metadata array length
     */
    getMetadataLength(): number;
    /**
     * Check if the series has an existing metadata
     */
    get hasMetadata(): boolean;
    createAnimationVectors(): void;
    /**
     * Sets initial values for the data animation
     * @param dataSeries The {@link BaseDataSeries} to be used for initial values
     */
    setInitialAnimationVectors(dataSeries?: BaseDataSeries): void;
    /**
     * Sets final values for the data animation
     * @param dataSeries The {@link BaseDataSeries} to be used for final values
     */
    setFinalAnimationVectors(dataSeries?: BaseDataSeries): void;
    /**
     * Puts the animation values back into the dataSeries after a reverse animation
     * @param dataSeries The {@link BaseDataSeries} to be used for target values
     */
    revertAnimationVectors(dataSeries?: BaseDataSeries): void;
    /**
     * Validates the length of the animation vectors
     */
    validateAnimationVectors(): void;
    /**
     * Updates the {@link BaseDataSeries} values for the animation
     * @param progress The animation progress from 0 to 1
     * @param animation The animation
     */
    updateAnimationProperties(progress: number, animation: SeriesAnimation): void;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): TDataSeriesDefinition;
    /** @inheritDoc */
    get changeCount(): number;
    protected getOptions(excludeData?: boolean): IBaseDataSeriesOptions;
    /**
     * Finds the nearest index of the xValue passed in by performing binary or linear search on the X-Values array.
     * Returns -1 for index not found. Other negative numbers indicate an error condition
     * @param xValue the X-value to find
     * @param findMode the {@link ESearchMode} to use when searching. Defaults to {@link ESearchMode.Nearest}.
     * Mode {@link ESearchMode.Exact} will result in a slower search, other modes will result in fast binary search.
     * @return The index, or -1 if not found
     */
    findIndex(xValue: number, searchMode?: ESearchMode): number;
    protected validateIndex(index: number, message?: string): void;
    protected setMetadataAt(index: number, metadata: IPointMetadata): void;
    protected appendMetadata(metadata: IPointMetadata): void;
    protected appendMetadataRange(metadata: IPointMetadata[], length: number): void;
    protected insertMetadata(startIndex: number, metadata: IPointMetadata): void;
    protected insertMetadataRange(startIndex: number, metadata: IPointMetadata[]): void;
    protected removeMetadataAt(index: number): void;
    protected removeMetadataRange(startIndex: number, count: number): void;
    protected setMetadata(value: IPointMetadata[]): void;
    getXValues(dataSeriesValueType: EDataSeriesValueType): SCRTDoubleVector;
    protected throwIfFifo(operation: string): void;
    protected reserve(size: number): void;
    protected calculateInitialCapacity(options: IBaseDataSeriesOptions): number;
    private fillMetadataIfUndefined;
    getYValues(dataSeriesValueType: EDataSeriesValueType): SCRTDoubleVector;
}
/** @ignore */
export declare const getIndicesRange: (webAssemblyContext: TSciChart, xValues: SCRTDoubleVector, xRange: NumberRange, isSorted: boolean, downSearchMode?: ESearchMode, upSearchMode?: ESearchMode) => NumberRange;
export declare const getWindowedYRange: (webAssemblyContext: TSciChart, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, xRange: NumberRange, getPositiveRange: boolean, isXCategoryAxis: boolean, isSorted: boolean, minSearchMode?: ESearchMode, maxSearchMode?: ESearchMode) => NumberRange;
