import { TSeriesDefinition } from "../../../Builder/buildSeries";
import { SeriesAnimationFiniteStateMachine } from "../../../Core/Animations/AnimationFiniteStateMachine";
import { DeletableEntity } from "../../../Core/DeletableEntity";
import { EventHandler } from "../../../Core/EventHandler";
import { NumberRange } from "../../../Core/NumberRange";
import { ESeriesType } from "../../../types/SeriesType";
import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { ELineDrawMode, WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { SeriesInfo } from "../../Model/ChartData/SeriesInfo";
import { EDataSeriesValueType, IDataChangeArgs, IDataSeries } from "../../Model/IDataSeries";
import { IPaletteProvider } from "../../Model/IPaletteProvider";
import { IPointSeries } from "../../Model/PointSeries/IPointSeries";
import { XyPointSeriesResampled } from "../../Model/PointSeries/XyPointSeriesResampled";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { ExtremeResamplerHelper } from "../../Numerics/Resamplers/ExtremeResamplerHelper";
import { EResamplingMode } from "../../Numerics/Resamplers/ResamplingMode";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { RenderPassData } from "../../Services/RenderPassData";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { AxisCore } from "../Axis/AxisCore";
import { IPointMarker } from "../PointMarkers/IPointMarker";
import { SciChartSurface } from "../SciChartSurface";
import { TDpiChangedEventArgs } from "../TextureManager/DpiHelper";
import { SeriesAnimation } from "./Animations/SeriesAnimation";
import { BaseDataLabelProvider } from "./DataLabels/BaseDataLabelProvider";
import { TPalettingState } from "./DrawingProviders/BaseSeriesDrawingProvider";
import { ISeriesDrawingProvider } from "./DrawingProviders/ISeriesDrawingProvider";
import { HitTestInfo } from "./HitTest/HitTestInfo";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
import { IRenderableSeries } from "./IRenderableSeries";
import { IRenderDataTransform } from "./RenderDataTransforms/BaseRenderDataTransform";
import { RolloverModifierRenderableSeriesProps } from "./RolloverModifier/RolloverModifierRenderableSeriesProps";
import { SeriesHoveredArgs } from "./SeriesHoveredArgs";
import { SeriesSelectedArgs } from "./SeriesSelectedArgs";
import { SeriesVisibleChangedArgs } from "./SeriesVisibleChangedArgs";
import { ShaderEffect } from "./ShaderEffect";
import { EYRangeMode } from "../../../types/YRangeMode";
import { EDataPointWidthMode } from "../../../types/DataPointWidthMode";
/**
 * @summary Defines the base class to a Render Series (or Chart Type) in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * A RenderableSeries defines how data should be rendered. e.g. as a Line Chart, Mountain Chart, Candlestick Chart etc...
 * This is independent from the {@link BaseDataSeries | DataSeries} which stores the data to render
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
export declare abstract class BaseRenderableSeries extends DeletableEntity implements IRenderableSeries {
    /** @inheritDoc */
    abstract readonly type: ESeriesType;
    /** @inheritDoc */
    readonly id: string;
    /** @inheritDoc */
    readonly isStacked: boolean;
    /** @inheritDoc */
    readonly rolloverModifierProps: RolloverModifierRenderableSeriesProps;
    /** @inheritDoc */
    readonly rolloverModifierProps1: RolloverModifierRenderableSeriesProps;
    /** @inheritDoc */
    invalidateParentCallback: () => void;
    /** @inheritDoc */
    hitTestProvider: IHitTestProvider;
    /** @inheritDoc */
    selected: EventHandler<SeriesSelectedArgs>;
    /** @inheritDoc */
    hovered: EventHandler<SeriesHoveredArgs>;
    /** @inheritDoc */
    isVisibleChanged: EventHandler<SeriesVisibleChangedArgs>;
    protected webAssemblyContext: TSciChart;
    protected dataSeriesProperty: IDataSeries;
    protected animationFSM: SeriesAnimationFiniteStateMachine;
    protected animationQueue: SeriesAnimation[];
    protected paletteProviderProperty: IPaletteProvider;
    protected dataLabelProviderProperty: BaseDataLabelProvider;
    protected renderDataTransformProperty: IRenderDataTransform;
    protected transformedRenderPassData: RenderPassData;
    protected typeMap: Map<string, string>;
    protected resamplerHelper: ExtremeResamplerHelper;
    protected pointSeries: XyPointSeriesResampled;
    protected currentRenderPassData: RenderPassData;
    protected opacityProperty: number;
    protected resamplingParams: ResamplingParams;
    private parentSurfaceProperty;
    private drawingProvidersProperty;
    private xAxisIdProperty;
    private yAxisIdProperty;
    private strokeThicknessProperty;
    private strokeProperty;
    private pointMarkerProperty;
    private drawNaNAsProperty;
    private isVisibleProperty;
    private effectProperty;
    private isDigitalLineProperty;
    private isSelectedProperty;
    private isHoveredProperty;
    private resamplingModeProperty;
    private resamplingPrecisionProperty;
    private clipToYRangeProperty;
    private yRangeModeProperty;
    /**
     * Creates an instance of the {@link BaseRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IBaseRenderableSeriesOptions} applied when constructing the series type
     */
    protected constructor(webAssemblyContext: TSciChart, options?: IBaseRenderableSeriesOptions);
    /** @inheritDoc */
    applyTheme(themeProvider: IThemeProvider): void;
    /** @inheritDoc */
    get parentSurface(): SciChartSurface;
    /** @inheritDoc */
    set parentSurface(value: SciChartSurface);
    /** @inheritDoc */
    get drawingProviders(): ISeriesDrawingProvider[];
    /** @inheritDoc */
    set drawingProviders(value: ISeriesDrawingProvider[]);
    /** @inheritDoc */
    get isSelected(): boolean;
    /** @inheritDoc */
    set isSelected(isSelected: boolean);
    /** @inheritDoc */
    get isHovered(): boolean;
    /** @inheritDoc */
    set isHovered(isHovered: boolean);
    /** @inheritDoc */
    get paletteProvider(): IPaletteProvider;
    /** @inheritDoc */
    set paletteProvider(paletteProvider: IPaletteProvider);
    /** @inheritDoc */
    get isDigitalLine(): boolean;
    /** @inheritDoc */
    set isDigitalLine(isDigitalLine: boolean);
    /** @inheritDoc */
    get isVisible(): boolean;
    /** @inheritDoc */
    set isVisible(isVisible: boolean);
    /** @inheritDoc */
    get pointMarker(): IPointMarker | undefined;
    /** @inheritDoc */
    set pointMarker(pointMarker: IPointMarker | undefined);
    /** @inheritDoc */
    get drawNaNAs(): ELineDrawMode;
    /** @inheritDoc */
    set drawNaNAs(drawNaNAs: ELineDrawMode);
    /** @inheritDoc */
    get stroke(): string;
    /** @inheritDoc */
    set stroke(htmlColorCode: string);
    /** @inheritDoc */
    get strokeThickness(): number;
    /** @inheritDoc */
    set strokeThickness(value: number);
    /** @inheritDoc */
    get opacity(): number;
    /** @inheritDoc */
    set opacity(value: number);
    /** @inheritDoc */
    get xAxisId(): string;
    /** @inheritDoc */
    set xAxisId(id: string);
    /** @inheritDoc */
    get xAxis(): AxisCore;
    /** @inheritDoc */
    get yAxis(): AxisCore;
    /** @inheritDoc */
    get yAxisId(): string;
    /** @inheritDoc */
    set yAxisId(id: string);
    /** @inheritDoc */
    get dataSeries(): IDataSeries;
    /** @inheritDoc */
    set dataSeries(dataSeries: IDataSeries);
    /** @inheritDoc */
    get enableDrawingOptimisations(): boolean;
    /**
     * Gets an optional {@link ShaderEffect} for modifying the render output of this {@link IRenderableSeries}
     * @remarks Options include {@link GlowEffect} and {@link ShadowEffect}. Apply an effect to see how it modifies rendering!
     */
    get effect(): ShaderEffect;
    /**
     * Sets an optional {@link ShaderEffect} for modifying the render output of this {@link IRenderableSeries}
     * @remarks Options include {@link GlowEffect} and {@link ShadowEffect}. Apply an effect to see how it modifies rendering!
     */
    set effect(effect: ShaderEffect);
    /** @inheritDoc */
    get resamplingMode(): EResamplingMode;
    /** @inheritDoc */
    set resamplingMode(value: EResamplingMode);
    /** @inheritDoc */
    get resamplingPrecision(): number;
    /** @inheritDoc */
    set resamplingPrecision(value: number);
    /**
     * If true, the drawing will be clipped to the visibleRange of the associated Y Axis.
     * This is only really relevant if you are using Stacked Y Axes and do not want the series to be drawn outside that axis range
     */
    get clipToYRange(): boolean;
    set clipToYRange(value: boolean);
    /** @inheritDoc */
    get yRangeMode(): EYRangeMode;
    set yRangeMode(value: EYRangeMode);
    /** @inheritDoc */
    get isSpline(): boolean;
    getResamplingParams(): ResamplingParams;
    /** @inheritDoc */
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    getXRange(): NumberRange;
    /** @inheritDoc */
    getYRange(xVisibleRange: NumberRange, isXCategoryAxis?: boolean): NumberRange;
    protected getResampledPointSeries(isXCategoryAxis?: boolean): IPointSeries;
    /** @inheritDoc */
    notifyPropertyChanged(propertyName: string): void;
    /**
     * @description Calculates data point width in pixels
     * @param xCoordCalc
     * @param widthFraction
     */
    getDataPointWidth(xCoordCalc: CoordinateCalculatorBase, widthFraction: number, widthMode?: EDataPointWidthMode): number;
    /** @inheritDoc */
    onDetach(): void;
    /** @inheritDoc */
    onAttach(scs: SciChartSurface): void;
    /** @inheritDoc */
    hasStrokePaletteProvider(): boolean;
    /** @inheritDoc */
    hasFillPaletteProvider(): boolean;
    /** @inheritDoc */
    hasPointMarkerPaletteProvider(): boolean;
    /** @inheritDoc */
    hasDataSeriesValues(): boolean;
    /** @inheritDoc */
    hasDataSeries(): boolean;
    /** @inheritDoc */
    getDataSeriesValuesCount(): number;
    /** @inheritDoc */
    getDataSeriesName(): string;
    /** @inheritDoc */
    getNativeXValues(): SCRTDoubleVector;
    /**
     * Returns the {@link IDataSeries.getNativeYValues} for the associated {@link dataSeries}
     */
    getNativeYValues(): SCRTDoubleVector;
    /** @inheritDoc */
    checkIsOutOfDataRange(xValue: number, yValue: number): boolean;
    /**
     * adds palette colors
     */
    pushPalettedColors(color: number, palettingState: TPalettingState): void;
    /** @inheritDoc */
    getSeriesInfo(hitTestInfo: HitTestInfo): SeriesInfo;
    /** @inheritDoc */
    onDpiChanged(args: TDpiChangedEventArgs): void;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): TSeriesDefinition;
    /** @inheritDoc */
    enqueueAnimation(animation: SeriesAnimation): void;
    /** @inheritDoc */
    runAnimation(animation: SeriesAnimation): void;
    /**
     * Sets a start up animation class, a child class for {@link SeriesAnimation}
     */
    set animation(value: SeriesAnimation);
    /** @inheritDoc */
    get isRunningAnimation(): boolean;
    /**
     * gets if a data animation is currently running
     */
    get isRunningDataAnimation(): boolean;
    /** @inheritDoc */
    onAnimate(timeElapsed: number): void;
    /** @inheritDoc */
    toPointSeries(rp?: ResamplingParams): IPointSeries;
    /** @inheritDoc */
    getIndicesRange(xRange: NumberRange, isCategoryData?: boolean): NumberRange;
    /** @inheritDoc */
    getCurrentRenderPassData(): RenderPassData;
    /** @inheritDoc */
    setCurrentRenderPassData(renderPassData: RenderPassData): void;
    /** @inheritDoc */
    get supportsResampling(): boolean;
    /**
     * Used internally to check if resampling is needed for the renderable series
     * @protected
     */
    needsResampling(rp: ResamplingParams): boolean;
    /** @inheritDoc */
    get dataLabelProvider(): BaseDataLabelProvider;
    /** @inheritDoc */
    set dataLabelProvider(provider: BaseDataLabelProvider);
    /** @inheritDoc */
    get renderDataTransform(): IRenderDataTransform;
    /** @inheritDoc */
    set renderDataTransform(transform: IRenderDataTransform);
    /** @inheritDoc */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    /** @inheritDoc */
    adjustAutoColor(propertyName: string, color: string): string;
    /**
     * Runs renderdataTransform to set transformedRenderPassData, usually for use with ranging.
     */
    protected updateTransformedValues(valueType?: EDataSeriesValueType): void;
    /**
     * Sets initial and end animation vectors
     * @param animation
     * @protected
     */
    protected setAnimationVectors(animation: SeriesAnimation): void;
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
    /**
     * Factory function to create a {@link IHitTestProvider | Hit Test Provider}; a class which performs hit-test
     * and checks mouse-over and nearest point.
     */
    protected abstract newHitTestProvider(): IHitTestProvider;
    /**
     * Is being called when the data for the underlying DataSeries changes
     * @protected
     */
    protected dataSeriesDataChanged(args: IDataChangeArgs): void;
    protected valueChanged(oldValue: any, newValue: any): boolean;
    protected setPaletteProvider(paletteProvider: IPaletteProvider): void;
    private invalidateParent;
    private effectPropertyChanged;
    private get canDraw();
}
/** @ignore */
export declare const getDataPointWidth: (xValues: SCRTDoubleVector, xCoordCalc: CoordinateCalculatorBase, seriesViewRectWidth: number, widthFraction: number, isCategoryAxis: boolean, wasmContext: TSciChart) => number;
/** @ignore */
export declare const getDelta: ({ pointSize, areaSize, range }: {
    pointSize: number;
    areaSize: number;
    range: NumberRange;
}) => number;
