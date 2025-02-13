import { TSeriesDefinition } from "../../../Builder/buildSeries";
import { EventHandler } from "../../../Core/EventHandler";
import { IDeletable } from "../../../Core/IDeletable";
import { NumberRange } from "../../../Core/NumberRange";
import { ESeriesType } from "../../../types/SeriesType";
import { SCRTDoubleVector } from "../../../types/TSciChart";
import { ELineDrawMode, WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { SeriesInfo } from "../../Model/ChartData/SeriesInfo";
import { IDataSeries } from "../../Model/IDataSeries";
import { IPaletteProvider } from "../../Model/IPaletteProvider";
import { IPointSeries } from "../../Model/PointSeries/IPointSeries";
import { EResamplingMode } from "../../Numerics/Resamplers/ResamplingMode";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { RenderPassData } from "../../Services/RenderPassData";
import { IThemeable } from "../../Themes/IThemeable";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { AxisCore } from "../Axis/AxisCore";
import { IPointMarker } from "../PointMarkers/IPointMarker";
import { SciChartSurface } from "../SciChartSurface";
import { INotifyOnDpiChanged } from "../TextureManager/DpiHelper";
import { SeriesAnimation } from "./Animations/SeriesAnimation";
import { TPalettingState } from "./DrawingProviders/BaseSeriesDrawingProvider";
import { ISeriesDrawingProvider } from "./DrawingProviders/ISeriesDrawingProvider";
import { HitTestInfo } from "./HitTest/HitTestInfo";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { RolloverModifierRenderableSeriesProps } from "./RolloverModifier/RolloverModifierRenderableSeriesProps";
import { SeriesHoveredArgs } from "./SeriesHoveredArgs";
import { SeriesSelectedArgs } from "./SeriesSelectedArgs";
import { SeriesVisibleChangedArgs } from "./SeriesVisibleChangedArgs";
import { BaseDataLabelProvider } from "./DataLabels/BaseDataLabelProvider";
import { EYRangeMode } from "../../../types/YRangeMode";
/**
 * @summary Defines the interface to a Render Series (or Chart Type) in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * A RenderableSeries defines how data should be rendered. e.g. as a Line Chart, Mountain Chart, Candlestick Chart etc...
 * This is independent from the {@link BaseDataSeries | DataSeries} which stores the data to render
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
export interface IRenderableSeries extends IDeletable, IThemeable, INotifyOnDpiChanged {
    /**
     * A unique Id for the {@link IRenderableSeries}
     */
    readonly id: string;
    /**
     * Returns the type of the series. See {@link ESeriesType} for a list of values
     */
    readonly type: ESeriesType;
    /**
     * Returns true if the series is a stacked series or not
     */
    readonly isStacked: boolean;
    /**
     * Returns true if the series supports resampling
     */
    readonly supportsResampling: boolean;
    /**
     * Returns true if the series uses spline interpolation
     */
    readonly isSpline: boolean;
    /**
     * Gets or sets {@link RolloverModifierRenderableSeriesProps} for {@link RolloverModifier} tooltips
     */
    readonly rolloverModifierProps: RolloverModifierRenderableSeriesProps;
    /**
     * Gets or sets {@link RolloverModifierRenderableSeriesProps} for {@link RolloverModifier} tooltips
     * Is being used for Y1 tooltips for {@link FastBandRenderableSeries}
     */
    readonly rolloverModifierProps1: RolloverModifierRenderableSeriesProps;
    /**
     * Gets the bound {@link AxisCore | XAxis} for this {@link BaseRenderableSeries}.
     * @remarks Does a lookup search on {@link SciChartSurface.xAxes} collection by Id matching {@link xAxisId | this.xAxisId}
     */
    readonly xAxis: AxisCore;
    /**
     * Gets the bound {@link AxisCore | YAxis} for this {@link BaseRenderableSeries}.
     * @remarks Does a lookup search on {@link SciChartSurface.yAxes} collection by Id matching {@link yAxisId | this.yAxisId}
     */
    readonly yAxis: AxisCore;
    /**
     * The parent {@link SciChartSurface} that this RenderableSeries is attached to
     */
    parentSurface: SciChartSurface;
    /**
     * The {@link IDataSeries | DataSeries} which provides a datasource for this {@link IRenderableSeries} to draw
     */
    dataSeries: IDataSeries;
    /**
     * A Stroke for lines, outlines and edges of this RenderableSeries
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077``` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    stroke: string;
    /**
     * The Stroke Thickness for lines, outlines and edges of this RenderableSeries
     */
    strokeThickness: number;
    /**
     * An Opacity factor of the Series that controls its semi-transparency level,
     * where value 1 means the Series is opaque; 0 - transparent.
     */
    opacity: number;
    /**
     * @summary The current XAxis Id that this {@link IRenderableSeries} is bound to
     * @description By default all series will draw on the first X,Y axis pair in SciChart.
     * If you want this to change, you must add a second axis to your {@link SciChartSurface} and link the {@link BaseRenderableSeries} by Axis Id.
     *
     * For example:
     * ```ts
     * const sciChartSurface: SciChartSurface;
     * const primaryXAxis = new NumericAxis(wasmContext); // Has Id = AxisCore.DEFAULT_AXIS_ID
     * const primaryYAxis = new NumericAxis(wasmContext); // Has Id = AxisCore.DEFAULT_AXIS_ID
     *
     * const secondaryXAxis = new NumericAxis(wasmContext); // For subsequent X,Y axis set an Id
     * secondaryXAxis.id = "SecondaryXAxis";
     * const secondaryYAxis = new NumericAxis(wasmContext);
     * secondaryYAxis.id = "SecondaryYAxis";
     *
     * // Add all Axis to the chart
     * sciChartSurface.xAxes.add(primaryXAxis);
     * sciChartSurface.yAxes.add(primaryYAxis);
     * sciChartSurface.xAxes.add(secondaryXAxis);
     * sciChartSurface.yAxes.add(secondaryYAxis);
     *
     * // Add a series on the default axis
     * const renderSeries = new FastLineRenderableSeries(wasmContext); // xAxisId, yAxisId Defaults to AxisCore.DEFAULT_AXIS_ID
     * sciChartSurface.renderableSeries.add(renderSeries);
     *
     * // Add a series on the specific axis
     * const renderSeries2 = new FastLineRenderableSeries(wasmContext);
     * renderSeries2.xAxisId = "SecondaryXAxis";
     * renderSeries2.yAxisId = "SecondaryYAxis";
     * sciChartSurface.renderableSeries.add(renderSeries2);
     * ```
     * @remarks The default value is set to {@link AxisCore.DEFAULT_AXIS_ID}.
     */
    xAxisId: string;
    /**
     * @summary The current YAxis Id that this {@link IRenderableSeries} is bound to
     * @description By default all series will draw on the first X,Y axis pair in SciChart.
     * If you want this to change, you must add a second axis to your {@link SciChartSurface} and link the {@link BaseRenderableSeries} by Axis Id.
     *
     * For example:
     * ```ts
     * const sciChartSurface: SciChartSurface;
     * const primaryXAxis = new NumericAxis(wasmContext); // Has Id = AxisCore.DEFAULT_AXIS_ID
     * const primaryYAxis = new NumericAxis(wasmContext); // Has Id = AxisCore.DEFAULT_AXIS_ID
     *
     * const secondaryXAxis = new NumericAxis(wasmContext); // For subsequent X,Y axis set an Id
     * secondaryXAxis.id = "SecondaryXAxis";
     * const secondaryYAxis = new NumericAxis(wasmContext);
     * secondaryYAxis.id = "SecondaryYAxis";
     *
     * // Add all Axis to the chart
     * sciChartSurface.xAxes.add(primaryXAxis);
     * sciChartSurface.yAxes.add(primaryYAxis);
     * sciChartSurface.xAxes.add(secondaryXAxis);
     * sciChartSurface.yAxes.add(secondaryYAxis);
     *
     * // Add a series on the default axis
     * const renderSeries = new FastLineRenderableSeries(wasmContext); // xAxisId, yAxisId Defaults to AxisCore.DEFAULT_AXIS_ID
     * sciChartSurface.renderableSeries.add(renderSeries);
     *
     * // Add a series on the specific axis
     * const renderSeries2 = new FastLineRenderableSeries(wasmContext);
     * renderSeries2.xAxisId = "SecondaryXAxis";
     * renderSeries2.yAxisId = "SecondaryYAxis";
     * sciChartSurface.renderableSeries.add(renderSeries2);
     * ```
     * @remarks The default value is set to {@link AxisCore.DEFAULT_AXIS_ID}.
     */
    yAxisId: string;
    /**
     * Gets a list of {@link ISeriesDrawingProvider | Series Drawing Providers}, which perform specific drawing operations in the series
     */
    drawingProviders: ISeriesDrawingProvider[];
    /**
     * Gets the current {@link IHitTestProvider}, used to call methods {@link IHitTestProvider.hitTest}, {@link IHitTestProvider.hitTestXSlice}
     * and {@link IHitTestProvider.hitTestDataPoint} and provide info about the series data-points at mouse or touch locations
     */
    hitTestProvider: IHitTestProvider;
    /**
     * When true, the series is visible and drawn
     */
    isVisible: boolean;
    /**
     * When true, if this series draws a line, the line will be a digital (step) line
     */
    isDigitalLine: boolean;
    /**
     * A callback which tells the parent {@link SciChartSurface} that it must be redrawn, e.g. when a property changes
     */
    invalidateParentCallback: () => void;
    /**
     * A {@link IPointMarker | Point Marker} which is used to draw an optional point-marker at each data-point. Applicable to some series types only
     */
    pointMarker: IPointMarker | undefined;
    /**
     * How to treat NAN (Not a number) values in the input {@link dataSeries}. See {@link ELineDrawMode} for a list of values.
     */
    drawNaNAs: ELineDrawMode;
    /**
     * An optional {@link IPaletteProvider} which is used to provide per data-point coloring or paletting.
     * @remarks See {@link IStrokePaletteProvider} for per data-point coloring of lines or strokes, {@link IFillPaletteProvider} for
     * per data-point coloring of fills or series bodies, and {@link IPointMarkerPaletteProvider} for per data-point coloring of
     * point-markers
     */
    paletteProvider: IPaletteProvider;
    /**
     * Gets or sets whether the Series is selected. Setting programmatically will trigger selection logic
     */
    isSelected: boolean;
    /**
     * A selected EventHandler. This event fires whenever the {@link IRenderableSeries | Series} is selected or deselected.
     * @remarks See {@link EventHandler} for how to subscribe
     */
    readonly selected: EventHandler<SeriesSelectedArgs>;
    /**
     * Gets or sets whether the Series is hovered by a mouse or pointer device. Setting programmatically will trigger hovered logic
     */
    isHovered: boolean;
    /**
     * A hovered EventHandler. This event fires whenever the {@link IRenderableSeries | Series} is hovered or unhovered by a mouse or pointer.
     * @remarks See {@link EventHandler} for how to subscribe
     */
    readonly hovered: EventHandler<SeriesHoveredArgs>;
    /**
     * An isVisible changed EventHandler. This event fires whenever the {@link IRenderableSeries | Series} isVisible changes.
     * @remarks See {@link EventHandler} for how to subscribe
     */
    readonly isVisibleChanged: EventHandler<SeriesVisibleChangedArgs>;
    /**
     * gets if the animation is currently running
     */
    isRunningAnimation: boolean;
    /**
     * Readonly. When true, resampling modes are enabled for faster drawing performance.
     */
    enableDrawingOptimisations: boolean;
    /**
     * Gets or sets the {@link EResamplingMode} used when drawing this series.
     * Default value is Auto.
     * To disable resampling for this series set mode = None.
     * Also see {@link resamplingPrecision} which specifies the precision applied when resampling.
     * To globally enable/disable resampling for debug purposes set {@link SciChartDefaults.debugDisableResampling}
     */
    resamplingMode: EResamplingMode;
    /**
     * Gets or sets the resampling precision for this series.
     *
     * Default value is 0.0.
     * Value of 1.0 means double precision: the resampler outputs 2x the number of points.
     * Value of 2.0 means quadruple precision: the resampler outputs 4x the number of points.
     *
     * If experiencing visual artefacts, try setting the precision to 1.0 or 2.0. This will come at a minor performance
     * cost of around 20% for large datasets.
     */
    resamplingPrecision: number;
    /**
     * Gets or sets the {@link BaseDataLabelProvider} used for creating and drawing per-point text
     */
    dataLabelProvider: BaseDataLabelProvider;
    /** Determines whether the y range for this series should consider only the visible data (the default), or include the drawn points just outside the visible range */
    yRangeMode: EYRangeMode;
    /**
     * Called when the {@link BaseRenderableSeries} must be drawn
     * @param renderContext The {@link WebGL2RenderingContext} with methods for drawing on the WebGL Canvas via our WebAssembly Rendering Engine
     * @param renderPassData The {@link RenderPassData} containing data about the current rendering pass
     */
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /**
     * Gets the X-Range of the series. Override in derived classes to provide series specific implementations
     */
    getXRange(): NumberRange;
    /**
     * Gets the Y-Range of the series for the current X-Range. Override in derived classes to provide series specific implementations
     * @param xVisibleRange The {@link AxisCore.visibleRange} for the current bound XAxis
     * @param isXCategoryAxis Whether the current bound {@link AxisBase2D | XAxis} is a Category axis
     */
    getYRange(xVisibleRange: NumberRange, isXCategoryAxis: boolean): NumberRange;
    /**
     * Called when the {@link BaseRenderableSeries} is attached to a parent {@link SciChartSurface}
     * @param scs the {@link SciChartSurface} that this series has been attached to
     */
    onAttach(scs: SciChartSurface): void;
    /**
     * Called when the {@link BaseRenderableSeries} is detached from a {@link SciChartSurface}
     */
    onDetach(): void;
    /**
     * @inheritDoc
     */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * Returns true if the {@link BaseRenderableSeries} has an {@link IStrokePaletteProvider}
     */
    hasStrokePaletteProvider(): boolean;
    /**
     * Returns true if the {@link BaseRenderableSeries} has an {@link IFillPaletteProvider }
     */
    hasFillPaletteProvider(): boolean;
    /**
     * Returns true if the {@link BaseRenderableSeries} has an {@link IPointMarkerPaletteProvider}
     */
    hasPointMarkerPaletteProvider(): boolean;
    /**
     * Returns true if the {@link BaseRenderableSeries} has a {@link dataSeries} and {@link IDataSeries.hasValues} is true
     */
    hasDataSeriesValues(): boolean;
    /**
     * Returns true if the {@link BaseRenderableSeries} has a {@link dataSeries}
     */
    hasDataSeries(): boolean;
    /**
     * Returns {@link IDataSeries.count} for the linked {@link dataSeries}
     */
    getDataSeriesValuesCount(): number;
    /**
     * Returns the associated {@link IDataSeries.dataSeriesName}
     */
    getDataSeriesName(): string;
    /**
     * Returns the {@link IDataSeries.getNativeXValues} for the associated {@link dataSeries}
     */
    getNativeXValues(): SCRTDoubleVector;
    /**
     * Checks is the point is out of the data range. For sorted data only. Is used to hide tooltips for {@link RolloverModifier}
     * @param xValue The X value of the point
     * @param yValue The Y value of the point
     */
    checkIsOutOfDataRange(xValue: number, yValue: number): boolean;
    /**
     * @param color The color for palette
     * @param palettingState
     */
    pushPalettedColors?(color: number, palettingState: TPalettingState): void;
    /**
     * Get a SeiesInfo object for this series based on the given hitTest
     * @param hitTestInfo
     */
    getSeriesInfo(hitTestInfo: HitTestInfo): SeriesInfo;
    /**
     * Is called for each render
     * @param timeElapsed
     */
    onAnimate(timeElapsed: number): void;
    /**
     * Add the animation into the queue
     */
    enqueueAnimation(animation: SeriesAnimation): void;
    /**
     * Cancel all previous animations and run the current one
     */
    runAnimation(animation: SeriesAnimation): void;
    /**
     * Convert the object to a definition that can be serialized to JSON, or used directly with the builder api
     * @param excludeData if set true, data values will not be included in the json.
     */
    toJSON(excludeData?: boolean): TSeriesDefinition;
    /**
     * Returns a dataset for drawing on the viewport
     * @param resamplingParams The resampling parameters
     */
    toPointSeries(resamplingParams?: ResamplingParams): IPointSeries;
    /**
     * Returns the indices range of data points in xRange of the associated {@link IDataSeries}
     * @param xRange The X-Axis Range currently in view
     * @param isCategoryData If True the renderable series uses {@link CategoryAxis}
     */
    getIndicesRange(xRange: NumberRange, isCategoryData?: boolean): NumberRange;
    /**
     * Gets the RenderPassData instance used for this render pass
     */
    getCurrentRenderPassData(): RenderPassData;
    /**
     * Sets the RenderPassData instance used for this render pass
     */
    setCurrentRenderPassData(renderPassData: RenderPassData): void;
    /**
     * Resolve colors marked AUTO_COLOR using the theme's strokePalette and fillPalette
     * To do custom adjustments to the resolved colors, override the adjustAutoColor method
     */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    /** Replace this to do custom adjustments to the auto color for a particular property */
    adjustAutoColor(propertyName: string, color: string): string;
    /** Gets the ResamplingParams for this render.  This will be undefined until needsResampling is called. */
    getResamplingParams(): ResamplingParams;
}
