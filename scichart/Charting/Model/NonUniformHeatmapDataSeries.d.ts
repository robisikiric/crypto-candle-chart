import { NumberRange } from "../../Core/NumberRange";
import { ESearchMode } from "../../types/SearchMode";
import { SCRTDoubleVector, TSciChart } from "../../types/TSciChart";
import { BaseHeatmapDataSeries, IBaseHeatmapSeriesOptions } from "./BaseHeatmapDataSeries";
import { EDataChangeType, EDataSeriesType } from "./IDataSeries";
export declare type TCellSizeMapper = (index: number) => number;
/**
 * Options to pass to the {@link NonUniformHeatmapSeries} constructor
 */
export interface INonUniformHeatmapSeriesOptions extends IBaseHeatmapSeriesOptions {
    /**
     * xCellOffsets defines cell X offsets on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
     * Can be an array of numbers or a mapping function {@link TCellSizeMapper}
     * @remarks mapping function would not be preserved by chart serialization
     */
    xCellOffsets: number[] | TCellSizeMapper;
    /**
     * yCellOffsets defines cell Y offsets on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
     * Can be an array of numbers or a mapping function {@link TCellSizeMapper}
     * @remarks mapping function would not be preserved by chart serialization
     */
    yCellOffsets: number[] | TCellSizeMapper;
}
export declare class NonUniformHeatmapDataSeries extends BaseHeatmapDataSeries {
    /**
     * @inheritDoc
     */
    readonly type: EDataSeriesType;
    private xRangeProperty;
    private yRangeProperty;
    private xCellSizesProperty;
    private yCellSizesProperty;
    private xCellOffsetsProperty;
    private yCellOffsetsProperty;
    private nativeYOffsetsProperty;
    private nativeXOffsetsProperty;
    private xCellOffsetsGeneratorFunction;
    private yCellOffsetsGeneratorFunction;
    /**
     * Creates an instance of {@link UniformHeatmapDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IUniformHeatmapSeriesOptions} which must be passed to configure the series
     */
    constructor(webAssemblyContext: TSciChart, options: INonUniformHeatmapSeriesOptions);
    /**
     * Gets or sets cell X sizes on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
     * Can be an array of numbers or a mapping function {@link TCellSizeMapper}
     */
    get xCellSizes(): number[];
    /**
     * Gets or sets cell Y sizes on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
     * Can be an array of numbers or a mapping function {@link TCellSizeMapper}
     */
    get yCellSizes(): number[];
    /**
     * Gets X cell offsets on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
     */
    get xCellOffsets(): number[];
    /**
     * Gets Y cell offsets on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
     */
    get yCellOffsets(): number[];
    /**
     * Gets X cell offsets as native vector on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
     */
    get nativeXCellOffsets(): SCRTDoubleVector;
    /**
     * Gets X cell offsets as native vector on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
     */
    get nativeYCellOffsets(): SCRTDoubleVector;
    /**
     * Gets the X-value at the specified index. This will be computed from constructor parameters xCellOffsets and xStart
     * @param xIndex
     */
    getXValue(xIndex: number): number;
    /**
     * Gets the Y-value at the specified index. This will be computed from constructor parameters yCellOffsets and yxStart
     * @param xIndex
     */
    getYValue(yIndex: number): number;
    /**
     * @inheritDoc
     */
    notifyDataChanged(updateType: EDataChangeType, data?: any): void;
    /**
     * @inheritDoc
     */
    getXRange(): NumberRange;
    /**
     * @inheritDoc
     */
    getYRange(): NumberRange;
    getXIndicesRange(visibleRange: NumberRange, isCategoryData: boolean, downSearchMode?: ESearchMode, upSearchMode?: ESearchMode): NumberRange;
    getYIndicesRange(visibleRange: NumberRange, isCategoryData: boolean, downSearchMode?: ESearchMode, upSearchMode?: ESearchMode): NumberRange;
    delete(): void;
    protected getOptions(excludeData?: boolean): INonUniformHeatmapSeriesOptions;
    /**
     * @param cellOffsets
     * @returns an array with cell sizes to heatmap size ratios
     */
    protected mapCellSizes(zValuesDimensionSize: number, mapping: TCellSizeMapper): number[];
    /**
     * @param cellOffsets
     * @returns an array with cell sizes to heatmap size ratios
     */
    protected calculateCellSizes(cellOffsets: number[]): number[];
}
