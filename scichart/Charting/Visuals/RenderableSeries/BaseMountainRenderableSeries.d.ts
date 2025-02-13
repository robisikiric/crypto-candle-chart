import { GradientParams } from "../../../Core/GradientParams";
import { TSciChart } from "../../../types/TSciChart";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { IDataLabelProviderOptions } from "./DataLabels/DataLabelProvider";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
/**
 * Options passed to a {@link BaseMountainRenderableSeries} at construction time
 */
export interface IBaseMountainRenderableSeriesOptions extends IBaseRenderableSeriesOptions {
    /**
     * Gets or sets the fill color as an HTML Color code
     */
    fill?: string;
    /**
     * Gets or sets the Zero-line Y, the Y-value where the mountain crosses zero and inverts. Default is 0
     */
    zeroLineY?: number;
    /**
     * Gets or sets the fill as a gradient brush
     */
    fillLinearGradient?: GradientParams;
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    strokeDashArray?: number[];
    /**
     * Options to pass to the DataLabelProvider. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: IDataLabelProviderOptions;
}
export declare abstract class BaseMountainRenderableSeries extends BaseRenderableSeries {
    private zeroLineYProperty;
    private fillProperty;
    private fillLinearGradientProperty;
    private strokeDashArrayProperty;
    constructor(webAssemblyContext: TSciChart, options?: IBaseMountainRenderableSeriesOptions);
    /**
     * @inheritDoc
     */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * Gets or sets the fill color as an HTML Color code
     */
    get fill(): string;
    /**
     * Gets or sets the fill color as an HTML Color code
     */
    set fill(htmlColorCode: string);
    /**
     * Gets or sets the Zero-line Y, the Y-value where the mountain crosses zero and inverts. Default is 0
     */
    get zeroLineY(): number;
    /**
     * Gets or sets the Zero-line Y, the Y-value where the mountain crosses zero and inverts. Default is 0
     */
    set zeroLineY(zeroLineY: number);
    /**
     * Gets or sets the fill as a gradient brush
     */
    get fillLinearGradient(): GradientParams;
    /**
     * Gets or sets the fill as a gradient brush
     */
    set fillLinearGradient(gradientBrushParams: GradientParams);
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    get strokeDashArray(): number[];
    /**
     * The StrokeDashArray defines the stroke or dash pattern for the line.
     * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
     */
    set strokeDashArray(strokeDashArray: number[]);
    /** @inheritDoc */
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
    /** @inheritDoc */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    /**
     * @inheritDoc
     */
    protected newHitTestProvider(): IHitTestProvider;
}
