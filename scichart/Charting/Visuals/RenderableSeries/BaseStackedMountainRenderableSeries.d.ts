import { TPaletteProviderDefinition } from "../../../Builder/buildSeries";
import { TSciChart } from "../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { IPaletteProvider } from "../../Model/IPaletteProvider";
import { IPointSeries } from "../../Model/PointSeries/IPointSeries";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { RenderPassData } from "../../Services/RenderPassData";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { SciChartSurface } from "../SciChartSurface";
import { TDpiChangedEventArgs } from "../TextureManager/DpiHelper";
import { BaseStackedCollection } from "./BaseStackedCollection";
import { BaseStackedRenderableSeries, IBasedStackedRenderableSeriesOptions } from "./BaseStackedRenderableSeries";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
export interface IBaseStackedMountainRenderableSeriesOptions extends IBasedStackedRenderableSeriesOptions {
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
     * The StrokeDashArray defines the stroke or dash pattern for the Y0 line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    strokeDashArray?: number[];
    /**
     * An optional {@link IPaletteProvider} which is used to provide per data-point coloring or paletting.
     * @remarks See {@link IStrokePaletteProvider} for per data-point coloring of lines or strokes, {@link IFillPaletteProvider} for
     * per data-point coloring of fills or series bodies, and {@link IPointMarkerPaletteProvider} for per data-point coloring of
     * point-markers
     */
    paletteProvider?: IPaletteProvider | TPaletteProviderDefinition;
}
export declare abstract class BaseStackedMountainRenderableSeries extends BaseStackedRenderableSeries {
    private fillProperty;
    private strokeY1Property;
    private strokeDashArrayProperty;
    private strokeY1DashArrayProperty;
    /**
     * Creates an instance of the {@link StackedMountainRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IStackedMountainRenderableSeriesOptions} to configure the series
     */
    constructor(webAssemblyContext: TSciChart, options?: IBaseStackedMountainRenderableSeriesOptions);
    /**
     * Called internally when the {@link StackedMountainRenderableSeries} is attached to a parent {@link StackedMountainCollection}
     * @param parentCollection the parent {@link BaseStackedCollection}
     * @param getParentSurfaceFn function to get the parent {@link SciChartSurface}
     * @param notifyPropertyChangedFn function to notify property has changed
     */
    onAttachToParentCollection(parentCollection: BaseStackedCollection<BaseStackedRenderableSeries>, getParentSurfaceFn: () => SciChartSurface, notifyPropertyChangedFn: (propertyName: string) => void): void;
    /** @inheritDoc */
    onAttach(scs: SciChartSurface): void;
    /** @inheritDoc */
    onDetach(): void;
    /** @inheritDoc */
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /**
     * @inheritDoc
     */
    onDpiChanged(args: TDpiChangedEventArgs): void;
    /**
     * Gets or sets the fill brush of the mountain as an HTML color code
     */
    get fill(): string;
    /**
     * Gets or sets the fill brush of the mountain as an HTML color code
     */
    set fill(fill: string);
    /**
     * Gets or sets the stroke color the Y1 values in the data-series.
     * See associated {@link XyyDataSeries} for further information
     *  @remarks This property is set internally to the value of a previous StackedMountainSeries.
     */
    get strokeY1(): string;
    /**
     * Gets or sets the stroke color the Y1 values in the data-series.
     * See associated {@link XyyDataSeries} for further information
     *  @remarks This property is set internally to the value of a previous StackedMountainSeries.
     */
    set strokeY1(strokeY1: string);
    /**
     * Gets or sets the fill color for when Y1 is less than Y as an HTML Color code
     */
    get fillY1(): string;
    /**
     * Gets or sets the fill color for when Y1 is less than Y as an HTML Color code
     */
    set fillY1(fillY1: string);
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the Y0 line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    get strokeDashArray(): number[];
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the Y0 line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    set strokeDashArray(strokeDashArray: number[]);
    /**
     * The strokeY1DashArray defines the stroke or dash pattern for the Y1 line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     * @remarks This property is set internally to the value of a previous StackedMountainSeries.
     */
    get strokeY1DashArray(): number[];
    /**
     * The strokeY1DashArray defines the stroke or dash pattern for the Y1 line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     * @remarks This property is set internally to the value of a previous StackedMountainSeries.
     */
    set strokeY1DashArray(strokeY1DashArray: number[]);
    /**
     * Gets the RenderPassData instance used for this render pass
     */
    getCurrentRenderPassData(): RenderPassData;
    toJSON(excludeData?: boolean): import("../../../Builder/buildSeries").TSeriesDefinition;
    /** @inheritDoc */
    toPointSeries(resamplingParams?: ResamplingParams): IPointSeries;
    /** @inheritDoc */
    hasStrokePaletteProvider(): boolean;
    /** @inheritDoc */
    hasFillPaletteProvider(): boolean;
    /** @inheritDoc */
    hasPointMarkerPaletteProvider(): boolean;
    /** @inheritDoc */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    /** @inheritDoc */
    protected newHitTestProvider(): IHitTestProvider;
}
