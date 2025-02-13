import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { SciChartSurface } from "../SciChartSurface";
import { TDpiChangedEventArgs } from "../TextureManager/DpiHelper";
import { BaseStackedCollection } from "./BaseStackedCollection";
import { BaseStackedRenderableSeries, IBasedStackedRenderableSeriesOptions } from "./BaseStackedRenderableSeries";
import { ISeriesDrawingProvider } from "./DrawingProviders/ISeriesDrawingProvider";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { ShaderEffect } from "./ShaderEffect";
import { IStackedColumnSeriesDataLabelProviderOptions } from "./DataLabels/StackedColumnSeriesDataLabelProvider";
/**
 * Options to pass to the {@link StackedColumnRenderableSeries} constructor
 */
export interface IStackedColumnRenderableSeriesOptions extends IBasedStackedRenderableSeriesOptions {
    /**
     * The column fill as an HTML color code
     */
    fill?: string;
    /**
     * The column stroke as an HTML color code
     */
    stroke?: string;
    /**
     * The column strokeThickness
     */
    strokeThickness?: number;
    /**
     * The column spacing in pixels
     */
    spacing?: number;
    /**
     * Sets the Stacked Group ID
     * @description
     * The Stacked Group Id is used to group {@link StackedColumnRenderableSeries} inside a {@link StackedColumnCollection}
     * into vertical or horizontal stacked groups.
     *
     * For a normal stacked column chart (stacks vertically), set {@link StackedColumnRenderableSeries.stackedGroupId} inside a
     * {@link StackedColumnCollection} to the SAME value
     *
     * For a column chart (stacked side by side), set {@link StackedColumnRenderableSeries.stackedGroupId} inside a
     * {@link StackedColumnCollection} to DIFFERENT values
     */
    stackedGroupId?: string;
    /**
     * Options to pass to the DataLabelProvider. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: IStackedColumnSeriesDataLabelProviderOptions;
}
/**
 * @summary The {@link StackedColumnRenderableSeries} allows creating JavaScript Stacked Column charts, and 100% Stacked Column Charts
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
    
 * sciChartSurface.renderableSeries.add(stackedColumnCollection);
 * ````
 * @remarks
 * Do not add the {@link StackedColumnRenderableSeries} directly to {@link SciChartSurface.renderableSeries} array, instead,
 * use a {@link StackedColumnCollection} to group / stack the columns.
 */
export declare class StackedColumnRenderableSeries extends BaseStackedRenderableSeries {
    readonly type = ESeriesType.StackedColumnSeries;
    private getColumnWidthFn;
    private fillProperty;
    private spacingProperty;
    private stackedGroupIdProperty;
    private strokePenCache;
    private fillBrushCache;
    private groupIndex;
    private groupsCount;
    private isOneHundredPercent;
    /**
     * Creates an instance of the {@link StackedColumnRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IStackedColumnRenderableSeriesOptions} to configure the series
     */
    constructor(webAssemblyContext: TSciChart, options?: IStackedColumnRenderableSeriesOptions);
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * Called internally when the {@link StackedColumnRenderableSeries} is attached to a parent {@link StackedColumnCollection}
     * @param parentCollection the parent {@link BaseStackedCollection}
     * @param getParentSurfaceFn function to get the parent {@link SciChartSurface}
     * @param notifyPropertyChangedFn function to notify property has changed
     * @param getColumnWidthFn function to get the column width
     */
    onAttachToParentCollection(parentCollection: BaseStackedCollection<BaseStackedRenderableSeries>, getParentSurfaceFn: () => SciChartSurface, notifyPropertyChangedFn: (propertyName: string) => void, getColumnWidthFn: (xCoordinateCalculator: CoordinateCalculatorBase) => number): void;
    /**
     * Gets the fill brush of the column as an HTML color code
     */
    getFillBrush(): import("../../../types/TSciChart").SCRTBrush;
    /**
     * Gets the stroke of the column as an HTML color code
     */
    getStrokePen(): import("../../../types/TSciChart").SCRTPen;
    getGroupIndex(): number;
    setGroupIndex(value: number): void;
    getGroupsCount(): number;
    setGroupsCount(value: number): void;
    /**
     * Called internally - gets the column width in pixels
     * @param xCoordinateCalculator The current XAxis {@link CoordinateCalculatorBase}
     */
    getColumnWidth(xCoordinateCalculator: CoordinateCalculatorBase): number;
    /**
     * @inheritDoc
     */
    onDpiChanged(args: TDpiChangedEventArgs): void;
    /**
     * @inheritDoc
     */
    notifyPropertyChanged(propertyName: string): void;
    /**
     * Gets or sets the Fill of the column chart as an HTML color code
     */
    get fill(): string;
    /**
     * Gets or sets the Fill of the column chart as an HTML color code
     */
    set fill(fill: string);
    /**
     * drawingProviders property is not supported for StackedColumnRenderableSeries
     * instead set on the {@link StackedColumnCollection}
     */
    get drawingProviders(): ISeriesDrawingProvider[];
    /**
     * drawingProviders property is not supported for StackedColumnRenderableSeries,
     * instead set on the {@link StackedColumnCollection}
     */
    set drawingProviders(value: ISeriesDrawingProvider[]);
    /**
     * effect property is not supported for StackedColumnRenderableSeries,
     * instead set on the {@link StackedColumnCollection}
     */
    get effect(): ShaderEffect;
    /**
     * effect property is not supported for StackedColumnRenderableSeries,
     * instead set on the {@link StackedColumnCollection}
     */
    set effect(effect: ShaderEffect);
    get spacing(): number;
    set spacing(value: number);
    /**
     * Gets or sets the Stacked Group ID
     * @description
     * The Stacked Group Id is used to group {@link StackedColumnRenderableSeries} inside a {@link StackedColumnCollection}
     * into vertical or horizontal stacked groups.
     *
     * For a normal stacked column chart (stacks vertically), set {@link StackedColumnRenderableSeries.stackedGroupId} inside a
     * {@link StackedColumnCollection} to the SAME value
     *
     * For a column chart (stacked side by side), set {@link StackedColumnRenderableSeries.stackedGroupId} inside a
     * {@link StackedColumnCollection} to DIFFERENT values
     */
    get stackedGroupId(): string;
    /**
     * Gets or sets the Stacked Group ID
     * @description
     * The Stacked Group Id is used to group {@link StackedColumnRenderableSeries} inside a {@link StackedColumnCollection}
     * into vertical or horizontal stacked groups.
     *
     * For a normal stacked column chart (stacks vertically), set {@link StackedColumnRenderableSeries.stackedGroupId} inside a
     * {@link StackedColumnCollection} to the SAME value
     *
     * For a column chart (stacked side by side), set {@link StackedColumnRenderableSeries.stackedGroupId} inside a
     * {@link StackedColumnCollection} to DIFFERENT values
     */
    set stackedGroupId(value: string);
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
    /** @inheritDoc */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    /** @inheritDoc */
    protected newHitTestProvider(): IHitTestProvider;
}
