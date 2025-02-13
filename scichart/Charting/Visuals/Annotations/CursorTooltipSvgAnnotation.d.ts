import { CursorModifier, TCursorTooltipSvgTemplate } from "../../ChartModifiers/CursorModifier";
import { SeriesInfo } from "../../Model/ChartData/SeriesInfo";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { EAnnotationType } from "./IAnnotation";
import { ISvgAnnotationBaseOptions, SvgAnnotationBase } from "./SvgAnnotationBase";
export interface ICursorTooltipSvgAnnotationOptions extends ISvgAnnotationBaseOptions {
    title?: string;
    tooltipSvgTemplate?: TCursorTooltipSvgTemplate;
    seriesInfos?: SeriesInfo[];
    containerBackground?: string;
    textStroke?: string;
    tooltipLegendTemplate?: TCursorTooltipSvgTemplate;
    tooltipLegendOffsetX?: number;
    tooltipLegendOffsetY?: number;
    cursorModifier: CursorModifier;
    placementDivId?: string;
}
/**
 * A Tooltip Annotation which provides an SVG tooltip over the chart. Used by the {@link CursorModifier}
 */
export declare class CursorTooltipSvgAnnotation extends SvgAnnotationBase {
    /** @inheritDoc */
    readonly type = EAnnotationType.SVG;
    readonly cursorModifier: CursorModifier;
    private titleProperty;
    private tooltipSvgTemplateProperty;
    private seriesInfosProperty;
    private containerBackgroundProperty;
    private textStrokeProperty;
    private tooltipLegendTemplateProperty;
    private tooltipLegendOffsetXProperty;
    private tooltipLegendOffsetYProperty;
    private svgLegend;
    private previousMousePosition;
    private placementDivId?;
    private svgDivRoot?;
    /**
     * Creates an instance of the {@link CursorTooltipSvgAnnotation}
     * @param options
     */
    constructor(options: ICursorTooltipSvgAnnotationOptions);
    /**
     * Gets or sets seriesInfos {@link SeriesInfo} value on the tooltip
     */
    get seriesInfos(): SeriesInfo[];
    /**
     * Gets or sets seriesInfos {@link SeriesInfo} value on the tooltip
     */
    set seriesInfos(newSeriesInfos: SeriesInfo[]);
    get title(): string;
    set title(value: string);
    get tooltipSvgTemplate(): TCursorTooltipSvgTemplate;
    set tooltipSvgTemplate(value: TCursorTooltipSvgTemplate);
    get tooltipLegendTemplate(): TCursorTooltipSvgTemplate;
    set tooltipLegendTemplate(value: TCursorTooltipSvgTemplate);
    get containerBackground(): string;
    set containerBackground(value: string);
    get tooltipLegendOffsetX(): number;
    set tooltipLegendOffsetX(value: number);
    get tooltipLegendOffsetY(): number;
    set tooltipLegendOffsetY(value: number);
    get textStroke(): string;
    set textStroke(value: string);
    /**
     * @inheritDoc
     */
    update(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
    clear(): void;
    /**
     * @inheritDoc
     */
    protected create(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
    private updateTooltip;
    private updateLegendTooltip;
    private updateExternalLegendTooltip;
}
