import { TSeriesDefinition } from "../../../Builder/buildSeries";
import { NumberRange } from "../../../Core/NumberRange";
import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { RenderPassData } from "../../Services/RenderPassData";
import { SciChartSurface } from "../SciChartSurface";
import { BaseStackedCollection, IBaseStackedCollectionOptions } from "./BaseStackedCollection";
import { StackedColumnRenderableSeries } from "./StackedColumnRenderableSeries";
import { StackedCollectionDataLabelProvider } from "./DataLabels/StackedCollectionDataLabelProvider";
import { EDataPointWidthMode } from "../../../types/DataPointWidthMode";
/**
 * Options to pass to the {@link StackedColumnCollection} constructor
 */
export interface IStackedColumnCollectionOptions extends IBaseStackedCollectionOptions {
    /**
     * Sets a value used to calculate the width of columns.
     * By default the value is treated as relative, valid values range from 0.0 - 1.0.
     * For grouped columns, this is the width of the group, not the columns within the group.
     * To specify if the value should be treated as relative, absolute, or based on range use {@link dataPointWidthMode}
     */
    dataPointWidth?: number;
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    dataPointWidthMode?: EDataPointWidthMode;
    /**
     * the Zero-line Y, the Y-value where the mountain crosses zero and inverts. Default is 0
     */
    zeroLineY?: number;
    /**
     * The spacing between columns in pixels
     */
    spacing?: number;
    /**
     * Options to pass to the DataLabelProvider. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: StackedCollectionDataLabelProvider;
}
/**
 * @summary A {@link StackedColumnCollection} allows grouping multiple {@link StackedColumnRenderableSeries}
 * to create a JavaScript Stacked Column, 100 Stacked Column or Stacked Bar chart
 * @description
 * Multiple {@link StackedColumnRenderableSeries} are required to create a stacked column chart type in SciChart.
 * These are grouped with a {@link StackedColumnCollection}, which implements {@link IRenderableSeries} and may be added
 * directly to a {@link SciChartSurface.renderableSeries} collection.
 *
 * Code sample below for stacking above and below (vertical stacking)
 * ```ts
 * const stackedColumn0 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn0.stackedGroupId = "group one"; // Same group ID means stack vertically
 * const stackedColumn1 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn1.stackedGroupId = "group one"; // Same group ID means stack vertically
 * const stackedColumn2 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn2.stackedGroupId = "group one"; // Same group ID means stack vertically
 * const stackedColumnCollection = new StackedColumnCollection(wasmContext);
 * stackedColumnCollection.add(stackedColumn0, stackedColumn1, stackedColumn2);
 *
 * sciChartSurface.renderableSeries.add(stackedColumnCollection);
 * ````
 *
 *  Code sample below for stacking side by side (horizontal stacking)
 * ```ts
 * const stackedColumn0 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn0.stackedGroupId = "group one"; // Different group ID means stack horizontally
 * const stackedColumn1 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn1.stackedGroupId = "group two"; // Different group ID means stack horizontally
 * const stackedColumn2 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn2.stackedGroupId = "group three"; // Different group ID means stack horizontally
 * const stackedColumnCollection = new StackedColumnCollection(wasmContext);
 * stackedColumnCollection.add(stackedColumn0, stackedColumn1, stackedColumn2);
 *
 * sciChartSurface.renderableSeries.add(stackedColumnCollection);
 * ````
 * @remarks This type implements {@link IRenderableSeries} but it is not a renderable series, instead it wraps multiple
 * {@link StackedColumnRenderableSeries} to create a stacked column chart
 */
export declare class StackedColumnCollection extends BaseStackedCollection<StackedColumnRenderableSeries> {
    readonly type = ESeriesType.StackedColumnCollection;
    private seriesGroups;
    private nativeDrawingProvider;
    private dataPointWidthProperty;
    private dataPointWidthModeProperty;
    private zeroLineYProperty;
    private spacingProperty;
    /**
     * Creates an instance of the {@link StackedColumnCollection}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IStackedColumnCollectionOptions} to configure the series
     */
    constructor(webAssemblyContext: TSciChart, options?: IStackedColumnCollectionOptions);
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    updateAccumulatedVectors(): void;
    /** @inheritDoc */
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /** @inheritDoc */
    getXRange(): NumberRange;
    /** @inheritDoc */
    getYRange(xVisibleRange: NumberRange, isXCategoryAxis: boolean): NumberRange;
    /** @inheritDoc */
    onAttach(scs: SciChartSurface): void;
    /** @inheritDoc */
    notifyPropertyChanged(propertyName: string): void;
    /** @inheritDoc */
    hasDataSeriesValues(): boolean;
    /**
     * Called internally - gets the column width in pixels
     * @param xCoordinateCalculator The current XAxis {@link CoordinateCalculatorBase}
     */
    getColumnWidth(xCoordinateCalculator: CoordinateCalculatorBase): number;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): TSeriesDefinition;
    /**
     * Gets or sets the Datapoint width, as a fraction of available space from 0.0 - 1.0
     */
    get dataPointWidth(): number;
    /**
     * Gets or sets the Datapoint width, as a fraction of available space from 0.0 - 1.0
     */
    set dataPointWidth(dataPointWidth: number);
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    get dataPointWidthMode(): EDataPointWidthMode;
    /**
     * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
     */
    set dataPointWidthMode(value: EDataPointWidthMode);
    /**
     * Gets or sets the Zero-line Y, the Y-value where the mountain crosses zero and inverts. Default is 0
     */
    get zeroLineY(): number;
    /**
     * Gets or sets the Zero-line Y, the Y-value where the mountain crosses zero and inverts. Default is 0
     */
    set zeroLineY(zeroLineY: number);
    /**
     * Gets the spacing between columns in pixels
     */
    get spacing(): number;
    /**
     * Sets the spacing between columns in pixels
     */
    set spacing(spacing: number);
    private detachChildSeries;
    private attachChildSeries;
    private checkXValuesCorrect;
    private setDataLabelProviderProperties;
    /**
     * @param numberOfElements - number of element expected is used for performance to reserve memory
     */
    private clearAccumulatedVectors;
    private getLastVisibleSeries;
    /**
     * @description Group series by stackedGroupId
     */
    private updateGroups;
    private getGroupsCount;
}
