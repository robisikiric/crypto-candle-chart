import { TDataSeriesDefinition } from "../../Builder/buildDataSeries";
import { EventHandler } from "../../Core/EventHandler";
import { NumberRange } from "../../Core/NumberRange";
import { ESearchMode } from "../../types/SearchMode";
import { SCRTDoubleVector, SCRTFloatVector, TSciChart } from "../../types/TSciChart";
import { IColorMapParams } from "../Visuals/RenderableSeries/HeatmapColorMap";
import { IDataDistributionCalculator } from "./DataDistributionCalculator/IDataDistributionCalculator";
import { EDataChangeType, EDataSeriesType, IDataChangeArgs, IDataSeries } from "./IDataSeries";
import { IMetadataGenerator, IPointMetadata } from "./IPointMetadata";
/**
 * Options to pass to the {@link BaseHeatmapDataSeries} constructor
 */
export interface IBaseHeatmapSeriesOptions {
    /**
     * A unique Id for the {@link IDataSeries}
     */
    id?: string;
    /**
     * The DataSeries name, used in legends, tooltips to identify the chart series
     */
    dataSeriesName?: string;
    /**
     * The 2-Dimensional array of cells which can be passed to populate the {@link BaseHeatmapDataSeries} at construct time
     */
    zValues?: number[][];
    /**
     * The Metadata values of type {@link IPointMetadata} to pre-populate the {@link BaseHeatmapDataSeries}
     * If a single metadata value is supplied, this will be used as a template for all data values.
     * If type AND data is specified, then the registered function should take the data and return a IPointData array.
     * If only type is specified, the registered function will be set as the metadataGenerator and used to construct new metadata for each data value.
     */
    metadata?: IPointMetadata[][] | IPointMetadata | {
        type: string;
        data?: any;
    };
    /**
     * The flag whether this Heatmap has NaN value, to display them as transparent tiles
     */
    containsNaN?: boolean;
}
/**
 * Defines the interface to a Heatmap DataSeries in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 */
export interface IHeatmapSeries extends IDataSeries {
}
/**
 * The base class for Heatmap-style DataSeries in SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseHeatmapDataSeries} to find out what Heatmap data-series are available.
 * See {@link UniformHeatmapRenderableSeries} to see the class for rendering a 2D JavaScript Heatmap Chart.
 */
export declare abstract class BaseHeatmapDataSeries implements IHeatmapSeries {
    /** @inheritDoc */
    abstract type: EDataSeriesType;
    /** @inheritDoc */
    readonly dataChanged: EventHandler<IDataChangeArgs>;
    /** @inheritDoc */
    readonly id: string;
    /** @inheritDoc */
    minXSpacing: number;
    /**
     * Gets the width of the 2-dimensional array of {@link getZValues | Z-Values} where array is ranked [width][height]
     */
    arrayWidth: number;
    /**
     * Gets the height of the 2-dimensional array of {@link getZValues | Z-Values} where array is ranked [width][height]
     */
    arrayHeight: number;
    /**
     * When true, the {@link BaseHeatmapDataSeries} has data changes and requires redrawing
     */
    protected hasDataChangesProperty: boolean;
    /**
     * The {@link TSciChart | SciChart WebAssembly Context} containing native methods and access to our underlying WebGL2 rendering engine
     */
    protected webAssemblyContext: TSciChart;
    /**
     * Gets the size of the heatmap where size = {@link arrayWidth} * {@link arrayHeight}
     */
    protected size: number;
    /**
     * A normalized {@link FloatVector} is a native / WebAssembly vector (array) of Float32 values with normalized
     * values ready for drawing in SciChart's WebGL2 Rendering Engine
     */
    protected normalizedVector: SCRTFloatVector;
    private dataSeriesNameProperty;
    private isDeleted;
    private zValuesProperty;
    private metadataProperty;
    private hasNaNsProperty;
    private lastZMin;
    private lastZMax;
    private lastFillValuesOutOfRange;
    private metadataGeneratorProperty;
    private changeCountProperty;
    /**
     * Creates an instance of {@link BaseHeatmapDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IBaseHeatmapSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    protected constructor(webAssemblyContext: TSciChart, options: IBaseHeatmapSeriesOptions);
    /** @inheritDoc */
    get isSorted(): boolean;
    /** @inheritDoc */
    set isSorted(value: boolean);
    /** @inheritDoc */
    get isEvenlySpaced(): boolean;
    /** @inheritDoc */
    set isEvenlySpaced(value: boolean);
    /** @inheritDoc */
    get containsNaN(): boolean;
    /** @inheritDoc */
    set containsNaN(value: boolean);
    /** @inheritDoc */
    get dataDistributionCalculator(): IDataDistributionCalculator;
    /** @inheritDoc */
    getNativeValue(values: SCRTDoubleVector, index: number): number;
    /**
     * Returns true if the Heatmap DataSeries has data changes.
     * This flag is set to true when notifyDataChanged is called, and reset to false after
     */
    get hasDataChanges(): boolean;
    /**
     * Gets a readonly collection of Z-values which can be read in the format zValues[y][x]
     * Note that changes or manipulation of the 2D array will not update the Heatmap. Set it back via setZValues()
     * to see changes to the chart
     */
    getZValues(): number[][];
    /**
     * Sets a 2D array of zValues. Input is in the format zValues[y][x] where Y is 0 to height and X is 0 to Width
     * @param zValues
     * @param metadata The array of arrays of point metadata
     */
    setZValues(zValues: number[][], metadata?: IPointMetadata[][]): void;
    /**
     * Gets the ZValue at the specific Y,X index where Y must be within 0-arrayHeight and X must be within 0-arrayWidth
     * @param yIndex the y-index from 0 to arrayHeight
     * @param xIndex the x-index from 0 to arrayWidth
     */
    getZValue(yIndex: number, xIndex: number): number;
    /**
     * Sets the ZValue at the specific Y,X index where Y must be within 0-arrayHeight and X must be within 0-arrayWidth
     * @param yIndex the y-index from 0 to arrayHeight
     * @param xIndex the x-index from 0 to arrayWidth
     * @param zValue the new Z-value
     * @param metadata The point metadata
     */
    setZValue(yIndex: number, xIndex: number, zValue: number, metadata?: IPointMetadata): void;
    /** @inheritDoc */
    clear(): void;
    /**
     * Gets the minimum X-value for this heatmap, which controls where it is displayed on a cartesian chart
     */
    get xMin(): number;
    /**
     * Gets the maximum X-value for this heatmap, which controls where it is displayed on a cartesian chart
     */
    get xMax(): number;
    /**
     * Gets the minimum Y-value for this heatmap, which controls where it is displayed on a cartesian chart
     */
    get yMin(): number;
    /**
     * Gets the maximum Y-value for this heatmap, which controls where it is displayed on a cartesian chart
     */
    get yMax(): number;
    /**
     * Computes the minimum Z-value for this heatmap
     * @remarks
     * Be aware for performance reasons, every call to zMin will result in a recalculation
     */
    get zMin(): number;
    /**
     * Computes the maximum Z-value for this heatmap
     * @remarks
     * Be aware for performance reasons, every call to zMax will result in a recalculation
     */
    get zMax(): number;
    /**
     * Gets the XRange for this heatmap, which controls where it is displayed on a cartesian chart
     */
    get xRange(): NumberRange;
    /**
     * Gets the YRange for this heatmap, which controls where it is displayed on a cartesian chart
     */
    get yRange(): NumberRange;
    /**
     * Computes the ZRange for this heatmap, which controls where it is displayed on a cartesian chart
     * @remarks
     * Be aware for performance reasons, every call to zRange will result in a recalculation
     */
    get zRange(): NumberRange;
    /**
     * @inheritDoc
     */
    get dataSeriesName(): string;
    /**
     * @inheritDoc
     */
    set dataSeriesName(dataSeriesName: string);
    /**
     * Gets whether this Heatmap has values to display
     */
    get hasValues(): boolean;
    /**
     * Gets/sets whether this Heatmap has NaN value, to display them as transparent tiles
     */
    set hasNaNs(value: boolean);
    /**
     * Gets/sets whether this Heatmap has NaN value, to display them as transparent tiles
     */
    get hasNaNs(): boolean;
    /**
     * Gets the number of heatmap cells
     */
    count(): number;
    /**
     * Sets a function that will be used to generate metadata for values when they are appended/inserted, if no explicit metadata is supplied.
     * @param generator
     */
    setMetadataGenerator(generator: IMetadataGenerator): void;
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * @inheritDoc
     */
    getIsDeleted(): boolean;
    /**
     * @inheritDoc
     */
    getNativeIndexes(): SCRTDoubleVector;
    /**
     * @inheritDoc
     */
    getNativeXValues(): SCRTDoubleVector;
    /**
     * @inheritDoc
     */
    getNativeYValues(): SCRTDoubleVector;
    /**
     * @inheritDoc
     */
    getWindowedYRange(xRange: NumberRange, getPositiveRange: boolean, isCategoryAxis: boolean): NumberRange;
    /**
     * Gets the X-value at the specified index.
     * @param xIndex
     */
    abstract getXValue(xIndex: number): number;
    /**
     * Gets the Y-value at the specified index.
     * @param xIndex
     */
    abstract getYValue(yIndex: number): number;
    /**
     * Notify subscribers to dataChanged that data has changed. Also sets internal flags.
     * This will trigger a redraw on a parent SciChartSurface
     */
    notifyDataChanged(changeType: EDataChangeType, xIndex?: number, yIndex?: number, name?: string): void;
    /**
     * Returns a FloatVector with normalized values based on the color map passed in
     * @param colorMap the {@link IColorMapParams} provides properties used to map heatmap Z-values into colors
     * for rendering in SciChart's {@link https://www.scichart.com/javascript-chart-features | Realtime JavaScript Charts}
     */
    getNormalizedVector(colorMap: IColorMapParams, fillValuesOutOfRange?: boolean): SCRTFloatVector;
    /**
     * Recreates the normalized vector (internally used for drawing heatmap) according to zMin and zMax values
     * @param zMin
     * @param zMax
     */
    recreateNormalizedVector(zMin: number, zMax: number, fillValuesOutOfRange?: boolean): void;
    /**
     * Gets the metadata by Y and X indexes
     * @param yIndex The Y index
     * @param xIndex The X index
     */
    getMetadataAt(yIndex: number, xIndex: number): IPointMetadata;
    /**
     * Gets the metadata matrix height
     */
    getMetadataHeight(): number;
    /**
     * Gets the metadata matrix width
     */
    getMetadataWidth(): number;
    toJSON(excludeData?: boolean): TDataSeriesDefinition;
    /**
     * Gets the range in the X-direction for this DataSeries
     */
    abstract getXRange(): NumberRange;
    /**
     * Gets the range in the Y-direction for this DataSeries
     */
    abstract getYRange(): NumberRange;
    /** @inheritDoc */
    getIndicesRange(visibleRange: NumberRange, isCategoryData: boolean, downSearchMode?: ESearchMode, upSearchMode?: ESearchMode): NumberRange;
    /** @inheritDoc */
    get changeCount(): number;
    protected getOptions(excludeData?: boolean): IBaseHeatmapSeriesOptions;
    /**
     * Computes the range in the Z-direction for this DataSeries
     * @remarks
     * Be aware for performance reasons, every call to getZRange will result in a recalculation
     * @protected
     */
    protected getZRange(): NumberRange;
    protected validateIndexes(yIndex: number, xIndex: number): void;
    protected setMetadata(metadata: IPointMetadata[][]): void;
    protected setMetadataAt(yIndex: number, xIndex: number, metadata: IPointMetadata): void;
    private fillMetadataIfUndefined;
}
