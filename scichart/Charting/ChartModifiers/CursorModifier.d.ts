import { IIncludeSeries } from "../../Core/IIncludeSeries";
import { Point } from "../../Core/Point";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { EMousePosition } from "../../types/MousePosition";
import { SeriesInfo } from "../Model/ChartData/SeriesInfo";
import { IThemeProvider } from "../Themes/IThemeProvider";
import { CursorTooltipSvgAnnotation } from "../Visuals/Annotations/CursorTooltipSvgAnnotation";
import { LineAnnotation } from "../Visuals/Annotations/LineAnnotation";
import { HitTestInfo } from "../Visuals/RenderableSeries/HitTest/HitTestInfo";
import { IRenderableSeries } from "../Visuals/RenderableSeries/IRenderableSeries";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
export declare type TCursorTooltipSvgTemplate = (seriesInfos: SeriesInfo[], svgAnnotation: CursorTooltipSvgAnnotation) => string;
export declare type TCursorTooltipDataTemplate = (seriesInfos: SeriesInfo[], tooltipTitle: string) => string[];
/**
 * Optional parameters used to configure a {@link CursorModifier} at construct time
 */
export interface ICursorModifierOptions extends IChartModifierBaseOptions {
    /**
     * Set a function which generates the svg for the entire tooltip. Note that the repositioning of the tooltip to keep it within the chart is normally done in this function.
     * To retain this functionality in your own template function, include the following:
     * ```ts
     *   // valuesWithLabels is the result of the tooltipDataTemplate function, which is the text content of the tooltip as an array of strings
     *   const { width, height } = calcTooltipSize(valuesWithLabels);
     *   // this calculates and sets svgAnnotation.xCoordShift and svgAnnotation.yCoordShift.  Do not set x1 or y1 at this point.
     *   adjustTooltipPosition(width, height, svgAnnotation);
     * ```
     */
    tooltipSvgTemplate?: TCursorTooltipSvgTemplate | string;
    /** Sets the crosshair stroke color as an HTML Color code */
    crosshairStroke?: string;
    /**
     * Sets the crosshair line strokethickness
     */
    crosshairStrokeThickness?: number;
    /** Sets the crosshair line dash array */
    crosshairStrokeDashArray?: number[];
    /** Sets the tooltip container background color as an HTML Color code */
    tooltipContainerBackground?: string;
    /** Sets the tooltip text color as an HTML Color code */
    tooltipTextStroke?: string;
    /** Sets the tooltip shadow color as an HTML Color code */
    tooltipShadow?: string;
    /** Sets whether we should display the tooltip. Default is false */
    showTooltip?: boolean;
    /** Sets whether we should display axis labels. Default is true */
    showAxisLabels?: boolean;
    /** Sets both axis label text color as an HTML Color code */
    axisLabelStroke?: string;
    /** Sets both axis label fill as an HTML Color code. */
    axisLabelFill?: string;
    /** Sets the xAxis label text color as an HTML Color code */
    xAxisLabelStroke?: string;
    /** Sets the xAxis label fill as an HTML Color code. */
    xAxisLabelFill?: string;
    /** Sets the yAxis label text color as an HTML Color code */
    yAxisLabelStroke?: string;
    /** Sets the yAxis label fill as an HTML Color code. */
    yAxisLabelFill?: string;
    /** Sets the template for the legend */
    tooltipLegendTemplate?: TCursorTooltipSvgTemplate | string;
    /** Sets the legend X offset */
    tooltipLegendOffsetX?: number;
    /** Sets the legend Y offset */
    tooltipLegendOffsetY?: number;
    /** Sets the tooltipDataTemplate, which allows to customize content for the tooltip */
    tooltipDataTemplate?: TCursorTooltipDataTemplate | string;
    /** Sets the parent div element reference or id for the Tooltip */
    placementDivId?: string;
    /** Sets whether we should display the X Line. Default is true */
    showXLine?: boolean;
    /** Sets whether we should display the Y Line. Default is true */
    showYLine?: boolean;
    /**
     * If this is set greater than the default of zero, the toolip will only show values for points in this radius, rather than all points on the vertical line
     */
    hitTestRadius?: number;
}
/**
 * The CursorModifier provides tooltip and cursor behavior on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the CursorModifier to a {@link SciChartSurface} and add tooltip behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new CursorModifier());
 * ```
 */
export declare class CursorModifier extends ChartModifierBase2D implements IIncludeSeries {
    readonly type = EChart2DModifierType.Cursor;
    /**
     * Get or set a function which generates the svg for the entire tooltip. Note that the repositioning of the tooltip to keep it within the chart is normally done in this function.
     * To retain this functionality in your own template function, include the following:
     * ```ts
     *   // valuesWithLabels is the result of the tooltipDataTemplate function, which is the text content of the tooltip as an array of strings
     *   const { width, height } = calcTooltipSize(valuesWithLabels);
     *   // this calculates and sets svgAnnotation.xCoordShift and svgAnnotation.yCoordShift.  Do not set x1 or y1 at this point.
     *   adjustTooltipPosition(width, height, svgAnnotation);
     * ```
     */
    tooltipSvgTemplate?: TCursorTooltipSvgTemplate;
    /**
     * Gets or sets the crosshair line strokethickness
     */
    crosshairStrokeThickness: number;
    /**
     * Gets or sets the crosshair line dash array
     */
    crosshairStrokeDashArray: number[];
    /**
     * Gets or sets the tooltip container background color as an HTML Color code
     */
    tooltipContainerBackground: string;
    /**
     * Gets or sets the tooltip text color as an HTML Color code
     */
    tooltipTextStroke: string;
    /**
     * Gets or sets whether we should display the tooltip. Default is false
     */
    showTooltip: boolean;
    /**
     * Gets or sets both axis label text color as an HTML Color code
     */
    axisLabelStroke: string;
    /**
     * Gets or sets both axis label fill as an HTML Color code.
     */
    axisLabelFill: string;
    /**
     * Gets or sets the xAxis label text color as an HTML Color code
     */
    xAxisLabelStroke: string | undefined;
    /**
     * Gets or sets the xAxis label fill as an HTML Color code.
     */
    xAxisLabelFill: string | undefined;
    /**
     * Gets or sets the xAxis label text color as an HTML Color code
     */
    yAxisLabelStroke: string | undefined;
    /**
     * Gets or sets the yAxis label fill as an HTML Color code.
     */
    yAxisLabelFill: string | undefined;
    /**
     * Gets or sets the template for the legend
     */
    tooltipLegendTemplate?: TCursorTooltipSvgTemplate;
    /**
     * Gets or sets the legend X offset
     */
    tooltipLegendOffsetX: number;
    /**
     * Gets or sets the legend Y offset
     */
    tooltipLegendOffsetY: number;
    /**
     * If this is set greater than the default of zero, the toolip will only show values for points in this radius, rather than all points on the vertical line
     */
    hitTestRadius: number;
    protected xLineAnnotation: LineAnnotation | undefined;
    protected yLineAnnotation: LineAnnotation | undefined;
    protected tooltipAnnotation: CursorTooltipSvgAnnotation | undefined;
    protected mousePosition: EMousePosition;
    protected crosshairStrokeProperty: string;
    protected tooltipShadowProperty: string;
    protected tooltipDataTemplateProperty?: TCursorTooltipDataTemplate | undefined;
    protected includedSeriesMap: Map<IRenderableSeries, boolean>;
    protected placementDivIdProperty: string | undefined;
    protected showXLineProperty: boolean;
    protected showYLineProperty: boolean;
    protected showAxisLabelsProperty: boolean;
    /**
     * Creates an instance of the CursorModifier
     *
     * If number of renderable series is more then 10 and showTooltip enabled consider passing {@link TCursorTooltipDataTemplate} or {@link TCursorTooltipSvgTemplate} to reduce the output for the tooltip
     *
     * @param options Optional parameters {@link ICursorModifierOptions} used to configure the modifier
     */
    constructor(options?: ICursorModifierOptions);
    /**
     * @inheritDoc
     */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * @inheritDoc
     */
    onAttach(): void;
    /**
     * @inheritDoc
     */
    onDetach(): void;
    /**
     * @inheritDoc
     */
    onAttachSeries(rs: IRenderableSeries): void;
    /**
     * @inheritDoc
     */
    onDetachSeries(rs: IRenderableSeries): void;
    /**
     * @inheritDoc
     */
    modifierMouseMove(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    modifierMouseLeave(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    onParentSurfaceRendered(): void;
    /**
     * Gets or sets the crosshair line Stroke color as an HTML Color code
     */
    get crosshairStroke(): string;
    /**
     * Gets or sets the crosshair line Stroke color as an HTML Color code
     */
    set crosshairStroke(value: string);
    /**
     * Gets or sets the tooltip shadow color as an HTML Color code
     */
    get tooltipShadow(): string;
    /**
     * Gets or sets the tooltip shadow color as an HTML Color code
     */
    set tooltipShadow(value: string);
    /**
     *  Gets or sets whether we should display the X Line. Default is true
     */
    get showXLine(): boolean;
    /**
     *  Gets or sets whether we should display the X Line. Default is true
     */
    set showXLine(value: boolean);
    /**
     *  Gets or sets whether we should display the Y Line. Default is true
     */
    get showYLine(): boolean;
    /**
     *  Gets or sets whether we should display the Y Line. Default is true
     */
    set showYLine(value: boolean);
    /**
     *  Gets or sets whether we should display the Axis Labels. Default is true
     */
    get showAxisLabels(): boolean;
    /**
     *  Gets or sets whether we should display the Axis Labels. Default is true
     */
    set showAxisLabels(value: boolean);
    /**
     * Gets or sets the parent div element reference or id for the Tooltip
     */
    get placementDivId(): string;
    /**
     * Gets or sets the parent div element reference or id for the Tooltip
     */
    set placementDivId(value: string);
    /**
     * @inheritDoc
     */
    includeSeries(series: IRenderableSeries, isIncluded: boolean): void;
    /**
     * @inheritDoc
     */
    getIncludedRenderableSeries(): IRenderableSeries[];
    /**
     * Gets or sets the tooltipDataTemplate, which allows to customize content for the tooltip
     */
    get tooltipDataTemplate(): TCursorTooltipDataTemplate;
    set tooltipDataTemplate(value: TCursorTooltipDataTemplate);
    /**
     * Override hitTestRenderableSeries and add a custom logic here
     * @param rs
     * @param mousePoint
     */
    hitTestRenderableSeries(rs: IRenderableSeries, mousePoint: Point): HitTestInfo;
    /**
     * Returns current mouse position
     */
    getMousePosition(): EMousePosition;
    /** @inheritDoc */
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBaseOptions, never>>;
    };
    protected notifyPropertyChanged(propertyName: string): void;
    protected getSeriesInfos(): SeriesInfo[];
    protected update(): void;
    protected newLineAnnotation(axisLabelFill: string, axisLabelStroke: string): LineAnnotation;
    /**
     * Test if the series is included or excluded, by default it is included
     * @param series
     * @private
     */
    protected testIsIncludedSeries(series: IRenderableSeries): boolean;
    protected isVerticalChart(): boolean;
}
/** Calculate the width and height of the tooltip based on the content array */
export declare const calcTooltipSize: (valuesWithLabels: string[], fontSize?: number) => {
    width: number;
    height: number;
};
/** Relocate the tooltip so that it is always within the seriesViewRect */
export declare const adjustTooltipPosition: (width: number, height: number, svgAnnotation: CursorTooltipSvgAnnotation) => void;
