import { TAnimationDefinition, TDataLabelProviderDefinition, TSeriesDefinition } from "../../../Builder/buildSeries";
import { SeriesAnimationFiniteStateMachine } from "../../../Core/Animations/AnimationFiniteStateMachine";
import { ESeriesType } from "../../../types/SeriesType";
import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { SeriesInfo } from "../../Model/ChartData/SeriesInfo";
import { IDataSeries } from "../../Model/IDataSeries";
import { IPointSeries } from "../../Model/PointSeries/IPointSeries";
import { EResamplingMode } from "../../Numerics/Resamplers/ResamplingMode";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { RenderPassData } from "../../Services/RenderPassData";
import { AxisCore } from "../Axis/AxisCore";
import { SciChartSurface } from "../SciChartSurface";
import { SeriesAnimation } from "./Animations/SeriesAnimation";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { BaseStackedCollection } from "./BaseStackedCollection";
import { BaseDataLabelProvider } from "./DataLabels/BaseDataLabelProvider";
import { HitTestInfo } from "./HitTest/HitTestInfo";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { TSeriesHoverChangedCallback, TSeriesSelectionChangedCallback, TSeriesVisibleChangedCallback } from "./IBaseRenderableSeriesOptions";
import { RolloverModifierRenderableSeriesProps } from "./RolloverModifier/RolloverModifierRenderableSeriesProps";
/**
 * Options to pass to the {@link BasedStackedRenderableSeries} constructor
 */
export interface IBasedStackedRenderableSeriesOptions {
    /**
     * A unique Id for the {@link IRenderableSeries}
     */
    id?: string;
    /**
     * The {@link IDataSeries | DataSeries} which provides a datasource for this {@link IRenderableSeries} to draw
     */
    dataSeries?: IDataSeries;
    /**
     * An Opacity factor of the Series that controls its semi-transparency level,
     * where value 1 means the Series is opaque; 0 - transparent.
     */
    opacity?: number;
    /**
     * Optional callback function when isVisible changed. Also see {@link IRenderableSeries.isVisibleChanged} event handler
     */
    onIsVisibleChanged?: TSeriesVisibleChangedCallback | string;
    /**
     * Optional callback function when selected changed. Also see {@link IRenderableSeries.selected} event handler
     */
    onSelectedChanged?: TSeriesSelectionChangedCallback | string;
    /**
     * Optional callback function when hovered changed. Also see {@link IRenderableSeries.hovered} event handler
     */
    onHoveredChanged?: TSeriesHoverChangedCallback | string;
    /**
     * An animation that runs on the start, child class to {@link SeriesAnimation}
     */
    animation?: SeriesAnimation | TAnimationDefinition;
    /**
     * A {@link DataLabelProvider} used for creating and drawing per-point text.
     */
    dataLabelProvider?: BaseDataLabelProvider | TDataLabelProviderDefinition;
}
/**
 * Base class for stacked mountain, column series in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * See derived types {@link StackedMountainRenderableSeries} and {@link StackedColumnRenderableSeries} for
 * details on how to implement stacked column and mountain charts in SciChart
 */
export declare abstract class BaseStackedRenderableSeries extends BaseRenderableSeries {
    /** @inheritDoc */
    abstract readonly type: ESeriesType;
    /** @inheritDoc */
    readonly id: string;
    /** @inheritDoc */
    readonly isStacked: boolean;
    readonly rolloverModifierProps: RolloverModifierRenderableSeriesProps;
    hitTestProvider: IHitTestProvider;
    /**
     * the accumulated values which are used to draw each column/band for {@link BaseStackedRenderableSeries}
     */
    accumulatedValues: SCRTDoubleVector;
    protected accumulatedFinalAnimationValues: SCRTDoubleVector;
    protected webAssemblyContext: TSciChart;
    protected parentCollection: BaseStackedCollection<BaseStackedRenderableSeries>;
    protected notifyParentPropertyChangedFn: (propertyName: string) => void;
    protected getParentSurfaceFn: () => SciChartSurface;
    protected dataLabelProviderProperty: BaseDataLabelProvider;
    protected typeMap: Map<string, string>;
    private opacityOriginalValue;
    /**
     * Creates an instance of a {@link BaseStackedRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     */
    protected constructor(webAssemblyContext: TSciChart, options?: IBasedStackedRenderableSeriesOptions);
    protected dataSeriesDataChanged(): void;
    /** @inheritdoc */
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * Called when the {@link BaseStackedRenderableSeries} is detached from its parent {@link BaseStackedCollection}
     */
    onDetachFromParentCollection(): void;
    /**
     * @inheritDoc
     */
    notifyPropertyChanged(propertyName: string): void;
    /** @inheritDoc */
    checkIsOutOfDataRange(xValue: number, yValue: number): boolean;
    /**
     * getBaseXValues() is not supported for BaseStackedRenderableSeries
     */
    getBaseXValues(): number[];
    /**
     * hasStrokePaletteProvider() is not supported for BaseStackedRenderableSeries
     */
    hasStrokePaletteProvider(): boolean;
    /**
     * hasPointMarkerPaletteProvider() is not supported for BaseStackedRenderableSeries
     */
    hasPointMarkerPaletteProvider(): boolean;
    /**
     * hasFillPaletteProvider() is not supported for BaseStackedRenderableSeries
     */
    hasFillPaletteProvider(): boolean;
    /**
     * onAttach() is not supported for BaseStackedRenderableSeries
     */
    onAttach(scs: SciChartSurface): void;
    /**
     * onDetach() is not supported for BaseStackedRenderableSeries
     */
    onDetach(): void;
    /**
     * resamplingMode property is not supported for BaseStackedRenderableSeries
     */
    get resamplingMode(): EResamplingMode;
    set resamplingMode(value: EResamplingMode);
    /**
     * resamplingPrecision property is not supported for BaseStackedRenderableSeries
     */
    get resamplingPrecision(): number;
    set resamplingPrecision(value: number);
    /** @inheritDoc */
    get dataLabelProvider(): BaseDataLabelProvider;
    /** @inheritDoc */
    set dataLabelProvider(provider: BaseDataLabelProvider);
    /**
     * @inheritDoc
     */
    get parentSurface(): SciChartSurface;
    /**
     * set parentSurface property is not supported for BaseStackedRenderableSeries
     */
    set parentSurface(value: SciChartSurface);
    /** @inheritDoc */
    get xAxis(): AxisCore;
    /** @inheritDoc */
    get yAxis(): AxisCore;
    /**
     * Runs before the animation starts
     * @protected
     */
    beforeAnimationStart(): void;
    /**
     * Runs after the animation is complete
     * @protected
     */
    afterAnimationComplete(): void;
    /**
     * Internal method that runs on each animation tick
     * @param progress The current animation progress, a value from 0 to 1
     * @param animationFSM The animation finite state machine
     * @protected
     */
    updateAnimationProperties(progress: number, animationFSM: SeriesAnimationFiniteStateMachine): void;
    /** @inheritDoc */
    getSeriesInfo(hitTestInfo: HitTestInfo): SeriesInfo;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): TSeriesDefinition;
    /**
     * toPointSeries method is not supported for BaseStackedRenderableSeries
     * @param resamplingParams
     */
    toPointSeries(resamplingParams?: ResamplingParams): IPointSeries;
    /**
     * getCurrentRenderPassData method is not supported for BaseStackedRenderableSeries
     */
    getCurrentRenderPassData(): RenderPassData;
    /**
     * xAxisId property is not supported for BaseStackedRenderableSeries,
     * instead set on the {@link StackedColumnCollection} or {@link StackedMountainCollection}
     */
    get xAxisId(): string;
    /**
     * xAxisId property is not supported for BaseStackedRenderableSeries,
     * instead set on the {@link StackedColumnCollection} or {@link StackedMountainCollection}
     */
    set xAxisId(value: string);
    /**
     * yAxisId property is not supported for BaseStackedRenderableSeries,
     * instead set on the {@link StackedColumnCollection} or {@link StackedMountainCollection}
     */
    get yAxisId(): string;
    /**
     * yAxisId property is not supported for BaseStackedRenderableSeries,
     * instead set on the {@link StackedColumnCollection} or {@link StackedMountainCollection}
     */
    set yAxisId(value: string);
}
