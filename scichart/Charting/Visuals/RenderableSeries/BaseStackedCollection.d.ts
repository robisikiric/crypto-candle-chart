import { TSeriesDefinition } from "../../../Builder/buildSeries";
import { SeriesAnimationFiniteStateMachine } from "../../../Core/Animations/AnimationFiniteStateMachine";
import { EventHandler } from "../../../Core/EventHandler";
import { NumberRange } from "../../../Core/NumberRange";
import { ObservableArray } from "../../../Core/ObservableArray";
import { ESeriesType } from "../../../types/SeriesType";
import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { EYRangeMode } from "../../../types/YRangeMode";
import { ELineDrawMode, WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { SeriesInfo } from "../../Model/ChartData/SeriesInfo";
import { IDataSeries } from "../../Model/IDataSeries";
import { IPaletteProvider } from "../../Model/IPaletteProvider";
import { IPointSeries } from "../../Model/PointSeries/IPointSeries";
import { EResamplingMode } from "../../Numerics/Resamplers/ResamplingMode";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { RenderPassData } from "../../Services/RenderPassData";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { AxisCore } from "../Axis/AxisCore";
import { IPointMarker } from "../PointMarkers/IPointMarker";
import { SciChartSurface } from "../SciChartSurface";
import { TDpiChangedEventArgs } from "../TextureManager/DpiHelper";
import { SeriesAnimation } from "./Animations/SeriesAnimation";
import { BaseStackedRenderableSeries } from "./BaseStackedRenderableSeries";
import { BaseDataLabelProvider } from "./DataLabels/BaseDataLabelProvider";
import { TPalettingState } from "./DrawingProviders/BaseSeriesDrawingProvider";
import { ISeriesDrawingProvider } from "./DrawingProviders/ISeriesDrawingProvider";
import { HitTestInfo } from "./HitTest/HitTestInfo";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IRenderableSeries } from "./IRenderableSeries";
import { RolloverModifierRenderableSeriesProps } from "./RolloverModifier/RolloverModifierRenderableSeriesProps";
import { SeriesHoveredArgs } from "./SeriesHoveredArgs";
import { SeriesSelectedArgs } from "./SeriesSelectedArgs";
import { SeriesVisibleChangedArgs } from "./SeriesVisibleChangedArgs";
import { ShaderEffect } from "./ShaderEffect";
/**
 * Options to pass to the {@link BaseStackedCollection} constructor
 */
export interface IBaseStackedCollectionOptions {
    /**
     * When true, the series is visible and drawn
     */
    isVisible?: boolean;
    /**
     * Sets the bound {@link AxisCore | XAxis} for this {@link BaseRenderableSeries}.
     * @remarks Does a lookup search on {@link SciChartSurface.xAxes} collection by Id matching {@link xAxisId | this.xAxisId}
     */
    xAxisId?: string;
    /**
     * Sets the bound {@link AxisCore | YAxis} for this {@link BaseRenderableSeries}.
     * @remarks Does a lookup search on {@link SciChartSurface.yAxes} collection by Id matching {@link yAxisId | this.yAxisId}
     */
    yAxisId?: string;
    /**
     * Sets 100% mode. When true, the stacked group becomes a 100% stacked chart
     */
    isOneHundredPercent?: boolean;
    /** Determines whether the y range for this series should consider only the visible data (the default), or include the drawn points just outside the visible range */
    yRangeMode?: EYRangeMode;
}
/**
 * A base class for stacked collections, which are used to create stacked mountain or column chart types.
 * Concrete types are {@link StackedColumnCollection} and {@link StackedMountainCollection}
 */
export declare abstract class BaseStackedCollection<T extends BaseStackedRenderableSeries> extends ObservableArray<T> implements IRenderableSeries {
    /** @inheritDoc */
    abstract readonly type: ESeriesType;
    /** @inheritDoc */
    readonly id: string;
    /** @inheritDoc */
    readonly isStacked = true;
    /** @inheritDoc */
    readonly supportsResampling = false;
    /** @inheritDoc */
    readonly isSpline = false;
    /** @inheritDoc */
    parentSurface: SciChartSurface;
    /** @inheritDoc */
    invalidateParentCallback: () => void;
    /**
     * the accumulated values which are used to draw each column/band for {@link BaseStackedRenderableSeries}
     */
    accumulatedValues0: SCRTDoubleVector;
    /** @inheritDoc */
    enableDrawingOptimisations: boolean;
    /**
     * The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     */
    protected webAssemblyContext: TSciChart;
    protected accumulatedFinalAnimationValues0: SCRTDoubleVector;
    protected isAccumulatedVectorDirty: boolean;
    protected firstAnimationRender: boolean;
    protected animationFSM: SeriesAnimationFiniteStateMachine;
    protected dataLabelProviderProperty: BaseDataLabelProvider;
    protected currentRenderPassData: RenderPassData;
    private isVisibleProperty;
    private xAxisIdProperty;
    private yAxisIdProperty;
    private isOneHundredPercentProperty;
    private animationQueue;
    private yRangeModeProperty;
    /**
     * Creates an instance of the {@link BaseStackedCollection}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IBaseStackedCollectionOptions} to configure the series
     */
    protected constructor(webAssemblyContext: TSciChart, options?: IBaseStackedCollectionOptions);
    /** @inheritDoc */
    get isVisibleChanged(): EventHandler<SeriesVisibleChangedArgs>;
    /** @inheritDoc */
    get selected(): EventHandler<SeriesSelectedArgs>;
    /** @inheritDoc */
    get hovered(): EventHandler<SeriesHoveredArgs>;
    /** @inheritDoc */
    get isSelected(): boolean;
    /** @inheritDoc */
    set isSelected(isSelected: boolean);
    /** @inheritDoc */
    get isHovered(): boolean;
    /** @inheritDoc */
    set isHovered(isHovered: boolean);
    /** @inheritDoc */
    get isDigitalLine(): boolean;
    /** @inheritDoc */
    set isDigitalLine(isDigitalLine: boolean);
    /** @inheritDoc */
    get isVisible(): boolean;
    /** @inheritDoc */
    set isVisible(isVisible: boolean);
    /** @inheritDoc */
    get xAxis(): AxisCore;
    /** @inheritDoc */
    get xAxisId(): string;
    /**
     * @inheritDoc
     */
    set xAxisId(id: string);
    /** @inheritDoc */
    get yAxis(): AxisCore;
    /** @inheritDoc */
    get yAxisId(): string;
    /** @inheritDoc */
    set yAxisId(id: string);
    /**
     * Gets or sets 100% mode. When true, the stacked group becomes a 100% stacked chart
     */
    get isOneHundredPercent(): boolean;
    /**
     * Gets or sets 100% mode. When true, the stacked group becomes a 100% stacked chart
     */
    set isOneHundredPercent(value: boolean);
    /** @inheritDoc */
    get yRangeMode(): EYRangeMode;
    set yRangeMode(value: EYRangeMode);
    /**
     * dataSeries property is not supported for BaseStackedCollection
     */
    get dataSeries(): IDataSeries;
    /**
     * dataSeries property is not supported for BaseStackedCollection
     */
    set dataSeries(value: IDataSeries);
    /**
     * drawNaNAs property is not supported for BaseStackedCollection
     */
    get drawNaNAs(): ELineDrawMode;
    /**
     * drawNaNAs property is not supported for BaseStackedCollection
     */
    set drawNaNAs(value: ELineDrawMode);
    /**
     * drawingProviders property is not supported for BaseStackedCollection
     */
    get drawingProviders(): ISeriesDrawingProvider[];
    /**
     * drawingProviders property is not supported for BaseStackedCollection
     */
    set drawingProviders(value: ISeriesDrawingProvider[]);
    /**
     * hitTestProvider property is not supported for BaseStackedCollection
     */
    get hitTestProvider(): IHitTestProvider;
    /**
     * hitTestProvider property is not supported for BaseStackedCollection
     */
    set hitTestProvider(value: IHitTestProvider);
    /**
     * paletteProvider property is not supported for BaseStackedCollection
     */
    get paletteProvider(): IPaletteProvider;
    /**
     * paletteProvider property is not supported for BaseStackedCollection
     */
    set paletteProvider(value: IPaletteProvider);
    /**
     * pointMarker property is not supported for BaseStackedCollection
     */
    get pointMarker(): IPointMarker;
    /**
     * pointMarker property is not supported for BaseStackedCollection
     */
    set pointMarker(value: IPointMarker);
    /**
     * rolloverModifierProps property is not supported for BaseStackedCollection
     */
    get rolloverModifierProps(): RolloverModifierRenderableSeriesProps;
    /**
     * rolloverModifierProps property is not supported for BaseStackedCollection
     */
    set rolloverModifierProps(value: RolloverModifierRenderableSeriesProps);
    /**
     * stroke property is not supported for BaseStackedCollection
     */
    get stroke(): string;
    /**
     * stroke property is not supported for BaseStackedCollection
     */
    set stroke(value: string);
    /**
     * strokeThickness property is not supported for BaseStackedCollection
     */
    get strokeThickness(): number;
    /**
     * strokeThickness property is not supported for BaseStackedCollection
     */
    set strokeThickness(value: number);
    /**
     * effect property is not supported for BaseStackedCollection
     */
    get effect(): ShaderEffect;
    /**
     * effect property is not supported for BaseStackedCollection
     */
    set effect(effect: ShaderEffect);
    /**
     * opacity property is not supported for BaseStackedCollection
     */
    get opacity(): number;
    /**
     * opacity property is not supported for BaseStackedCollection
     */
    set opacity(value: number);
    /**
     * rolloverModifierProps1() is not supported for BaseStackedCollection
     */
    set rolloverModifierProps1(value: RolloverModifierRenderableSeriesProps);
    /**
     * rolloverModifierProps1() is not supported for BaseStackedCollection
     */
    get rolloverModifierProps1(): RolloverModifierRenderableSeriesProps;
    /**
     * resamplingMode property is not supported for BaseStackedCollection
     */
    get resamplingMode(): EResamplingMode;
    set resamplingMode(value: EResamplingMode);
    /**
     * resamplingPrecision property is not supported for BaseStackedCollection
     */
    get resamplingPrecision(): number;
    set resamplingPrecision(value: number);
    /**
     * Notify the collection that the accumulated values need to be recalculated
     */
    setAccumulatedValuesDirty(): void;
    /** @inheritDoc */
    getIndicesRange(xRange: NumberRange): NumberRange;
    protected get canDraw(): boolean;
    /** @inheritDoc */
    pushPalettedColors?(color: number, palettingState: TPalettingState): void;
    /** @inheritDoc */
    getSeriesInfo(hitTestInfo: HitTestInfo): SeriesInfo;
    /** @inheritDoc */
    applyTheme(themeProvider: IThemeProvider): void;
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    abstract draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /** @inheritDoc */
    notifyPropertyChanged(propertyName: string): void;
    /** @inheritDoc */
    onDpiChanged(args: TDpiChangedEventArgs): void;
    /** @inheritDoc */
    getBaseXValues(): number[];
    /** @inheritDoc */
    getDataSeriesName(): string;
    /** @inheritDoc */
    getDataSeriesValuesCount(): number;
    /** @inheritDoc */
    getNativeXValues(): SCRTDoubleVector;
    /** @inheritDoc */
    abstract getXRange(): NumberRange;
    /** @inheritDoc */
    getYRange(xVisibleRange: NumberRange, isXCategoryAxis: boolean): NumberRange;
    /** @inheritDoc */
    hasDataSeries(): boolean;
    /** @inheritDoc */
    abstract hasDataSeriesValues(): boolean;
    /** @inheritDoc */
    hasStrokePaletteProvider(): boolean;
    /** @inheritDoc */
    hasFillPaletteProvider(): boolean;
    /** @inheritDoc */
    hasPointMarkerPaletteProvider(): boolean;
    /** @inheritDoc */
    onAttach(scs: SciChartSurface): void;
    /** @inheritDoc */
    onDetach(): void;
    /**
     * Updates accumulated vectors which are used to draw {@link BaseStackedRenderableSeries}
     */
    abstract updateAccumulatedVectors(): void;
    /**
     * Gets visible renderable series array
     */
    getVisibleSeries(): T[];
    /** @inheritDoc */
    enqueueAnimation(animation: SeriesAnimation): void;
    /** @inheritDoc */
    runAnimation(animation: SeriesAnimation): void;
    /**
     * Sets a start up animation class, a child class for {@link BaseAnimation}
     */
    set animation(value: SeriesAnimation);
    /** @inheritDoc */
    get isRunningAnimation(): boolean;
    /** @inheritDoc */
    onAnimate(timeElapsed: number): void;
    /**
     * checkIsOutOfDataRange() is not supported for BaseStackedCollection
     * @param xValue
     * @param yValue
     */
    checkIsOutOfDataRange(xValue: number, yValue: number): boolean;
    /** @inheritDoc */
    toPointSeries(resamplingParams?: ResamplingParams): IPointSeries;
    /**
     * getCurrentRenderPassData method is not supported for BaseStackedCollection
     */
    getCurrentRenderPassData(): RenderPassData;
    /** @inheritDoc */
    setCurrentRenderPassData(renderPassData: RenderPassData): void;
    /** @inheritDoc */
    getResamplingParams(): ResamplingParams;
    /** @inheritDoc */
    get dataLabelProvider(): BaseDataLabelProvider;
    /** @inheritDoc */
    set dataLabelProvider(provider: BaseDataLabelProvider);
    /** @inheritDoc */
    toJSON(excludeData?: boolean): TSeriesDefinition;
    /** @inheritDoc */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    /** @inheritDoc */
    adjustAutoColor(propertyName: string, color: string): string;
    protected isAllDataSeriesSet(): boolean;
    /**
     * notifies listeners to {@link invalidateParentCallback} and redraws the {@link SciChartSurface}
     */
    protected invalidateParent(): void;
    /**
     * Gets the first series in the collection, else undefined
     */
    protected getFirstSeries(): T;
    /**
     * Gets the parent {@link SciChartSurface}
     */
    protected getParentSurface(): SciChartSurface;
    /**
     * Runs before the animation starts
     * @protected
     */
    protected beforeAnimationStart(): void;
    /**
     * Runs after the animation is complete
     * @protected
     */
    protected afterAnimationComplete(): void;
    /**
     * Internal method that runs on each animation tick
     * @param progress The current animation progress, a value from 0 to 1
     * @param animationFSM The animation finite state machine
     * @protected
     */
    protected updateAnimationProperties(progress: number, animationFSM: SeriesAnimationFiniteStateMachine): void;
    protected updateHitTestProviders(renderPassData: RenderPassData): void;
    protected isEnoughDataToDraw(): boolean;
}
