import { NumberRange } from "../../Core/NumberRange";
import { TSciChart } from "../../types/TSciChart";
import { BaseHeatmapDataSeries, IBaseHeatmapSeriesOptions } from "./BaseHeatmapDataSeries";
import { EDataChangeType, EDataSeriesType } from "./IDataSeries";
/**
 * Options to pass to the {@link UniformHeatmapSeries} constructor
 */
export interface IUniformHeatmapSeriesOptions extends IBaseHeatmapSeriesOptions {
    /**
     * xStart defines the Start point on the {@link AxisBase2D| XAxis} where this heatmap will be drawn
     */
    xStart: number;
    /**
     * xStep defines Step on the {@link AxisBase2D| XAxis} for each cell in the heatmap
     */
    xStep: number;
    /**
     * yStart defines the Start point on the {@link AxisBase2D| YAxis} where this heatmap will be drawn
     */
    yStart: number;
    /**
     * yStep defines Step on the {@link AxisBase2D| YAxis} for each cell in the heatmap
     */
    yStep: number;
}
export declare class UniformHeatmapDataSeries extends BaseHeatmapDataSeries {
    /**
     * @inheritDoc
     */
    readonly type: EDataSeriesType;
    private xRangeProperty;
    private yRangeProperty;
    private xStartProperty;
    private xStepProperty;
    private yStartProperty;
    private yStepProperty;
    /**
     * Creates an instance of {@link UniformHeatmapDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IUniformHeatmapSeriesOptions} which must be passed to configure the series
     */
    constructor(webAssemblyContext: TSciChart, options: IUniformHeatmapSeriesOptions);
    /**
     * xStart defines the Start point on the {@link AxisBase2D| XAxis} where this heatmap will be drawn
     */
    get xStart(): number;
    /**
     * xStart defines the Start point on the {@link AxisBase2D| XAxis} where this heatmap will be drawn
     */
    set xStart(value: number);
    /**
     * xStep defines Step on the {@link AxisBase2D| XAxis} for each cell in the heatmap
     */
    get xStep(): number;
    /**
     * xStep defines Step on the {@link AxisBase2D| XAxis} for each cell in the heatmap
     */
    set xStep(value: number);
    /**
     * yStart defines the Start point on the {@link AxisBase2D| YAxis} where this heatmap will be drawn
     */
    get yStart(): number;
    /**
     * yStart defines the Start point on the {@link AxisBase2D| YAxis} where this heatmap will be drawn
     */
    set yStart(value: number);
    /**
     * yStep defines Step on the {@link AxisBase2D| YAxis} for each cell in the heatmap
     */
    get yStep(): number;
    /**
     * yStep defines Step on the {@link AxisBase2D| YAxis} for each cell in the heatmap
     */
    set yStep(value: number);
    /**
     * Gets the X-value at the specified index. This will be computed from constructor parameters xStep and xStart
     * @param xIndex
     */
    getXValue(xIndex: number): number;
    /**
     * Gets the Y-value at the specified index. This will be computed from constructor parameters yStep and yxStart
     * @param xIndex
     */
    getYValue(yIndex: number): number;
    /**
     * @inheritDoc
     */
    notifyDataChanged(updateType: EDataChangeType, data?: any): void;
    protected getOptions(excludeData?: boolean): IUniformHeatmapSeriesOptions;
    /**
     * @inheritDoc
     */
    getXRange(): NumberRange;
    /**
     * @inheritDoc
     */
    getYRange(): NumberRange;
}
