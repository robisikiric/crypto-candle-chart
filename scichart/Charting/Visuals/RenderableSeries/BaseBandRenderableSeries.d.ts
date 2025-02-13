import { GradientParams } from "../../../Core/GradientParams";
import { NumberRange } from "../../../Core/NumberRange";
import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { IXyyPointSeries } from "../../Model/PointSeries/IPointSeries";
import { XyyPointSeriesResampled } from "../../Model/PointSeries/XyyPointSeriesResampled";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { IBandSeriesDataLabelProviderOptions } from "./DataLabels/BandSeriesDataLabelProvider";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
/**
 * Optional parameters passed to the constructor of {@link BaseBandRenderableSeries}
 */
export interface IBaseBandRenderableSeriesOptions extends IBaseRenderableSeriesOptions {
    /**
     * Gets or sets the stroke color the Y1 values in the data-series.
     * See associated {@link XyyDataSeries} for further information
     */
    strokeY1?: string;
    /**
     * Gets or sets the fill color for when Y is less than Y1 as an HTML Color code
     */
    fill?: string;
    /**
     * Gets or sets the fill color for when Y1 is less than Y as an HTML Color code
     */
    fillY1?: string;
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the Y0 line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    strokeDashArray?: number[];
    /**
     * The StrokeY1DashArray defines the stroke or dash pattern for the Y1 line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    strokeY1DashArray?: number[];
    /**
     * Gets or sets the fill as a gradient brush
     */
    fillLinearGradient?: GradientParams;
    /**
     * Gets or sets the Y1 fill as a gradient brush
     */
    fillLinearGradientY1?: GradientParams;
    /**
     * Options to pass to the {@link DataLabelProvider}. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: IBandSeriesDataLabelProviderOptions;
}
export declare abstract class BaseBandRenderableSeries extends BaseRenderableSeries {
    protected pointSeries: XyyPointSeriesResampled;
    private fillY1Property;
    private strokeY1Property;
    private fillProperty;
    private strokeDashArrayProperty;
    private strokeY1DashArrayProperty;
    private fillLinearGradientProperty;
    private fillLinearGradientY1Property;
    private xyyTempPointSeries;
    constructor(webAssemblyContext: TSciChart, options?: IBaseBandRenderableSeriesOptions);
    /**
     * @inheritDoc
     */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * Gets or sets the fill color for when Y is less than Y1 as an HTML Color code
     */
    get fill(): string;
    /**
     * Gets or sets the fill color for when Y is less than Y1 as an HTML Color code
     */
    set fill(fill: string);
    /**
     * Gets or sets the stroke color the Y1 values in the data-series.
     * See associated {@link XyyDataSeries} for further information
     */
    get strokeY1(): string;
    /**
     * Gets or sets the stroke color the Y1 values in the data-series.
     * See associated {@link XyyDataSeries} for further information
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
     */
    get strokeY1DashArray(): number[];
    /**
     * The strokeY1DashArray defines the stroke or dash pattern for the Y1 line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    set strokeY1DashArray(strokeY1DashArray: number[]);
    /**
     * Gets or sets the fill as a gradient brush
     */
    get fillLinearGradient(): GradientParams;
    /**
     * Gets or sets the fill as a gradient brush
     */
    set fillLinearGradient(gradientBrushParams: GradientParams);
    /**
     * Gets or sets the fill as a gradient brush
     */
    get fillLinearGradientY1(): GradientParams;
    /**
     * Gets or sets the fill as a gradient brush
     */
    set fillLinearGradientY1(gradientBrushParams: GradientParams);
    /**
     * Returns the {@link XyyDataSeries.getNativeY1Values} for the associated {@link dataSeries}
     */
    getNativeY1Values(): SCRTDoubleVector;
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    toPointSeries(rp?: ResamplingParams): IXyyPointSeries;
    /** @inheritDoc */
    getYRange(xVisibleRange: NumberRange, isXCategoryAxis?: boolean): NumberRange;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
    /** @inheritDoc */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    /** @inheritDoc */
    protected newHitTestProvider(): IHitTestProvider;
}
