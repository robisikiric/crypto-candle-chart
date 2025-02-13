import { CoordinateCalculatorBase } from "../../../Charting/Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { EAnnotationType } from "../../../Charting/Visuals/Annotations/IAnnotation";
import { ISvgAnnotationBaseOptions, SvgAnnotationBase } from "../../../Charting/Visuals/Annotations/SvgAnnotationBase";
import { SeriesInfo3D } from "../RenderableSeries/SeriesInfo3D";
export declare type TTooltip3DSvgTemplate = (seriesInfo: SeriesInfo3D, svgAnnotation: TooltipSvgAnnotation3D) => string;
export declare type TTooltip3DDataTemplate = (seriesInfo: SeriesInfo3D, svgAnnotation: TooltipSvgAnnotation3D) => string[];
export interface ITooltipSvgAnnotation3DOptions extends ISvgAnnotationBaseOptions {
    title?: string;
    tooltipSvgTemplate?: TTooltip3DSvgTemplate;
    containerBackground?: string;
    textStroke?: string;
    tooltipLegendTemplate?: TTooltip3DSvgTemplate;
    tooltipLegendOffsetX?: number;
    tooltipLegendOffsetY?: number;
    placementDivId?: string;
    tooltipDataTemplate?: TTooltip3DDataTemplate;
}
/**
 * A Tooltip Annotation which provides an SVG tooltip over the chart. Used by the {@link TooltipModifier3D}
 */
export declare class TooltipSvgAnnotation3D extends SvgAnnotationBase {
    /** @inheritDoc */
    readonly type = EAnnotationType.SVG;
    private titleProperty;
    private tooltipSvgTemplateProperty;
    private seriesInfoProperty;
    private containerBackgroundProperty;
    private textStrokeProperty;
    private tooltipLegendTemplateProperty;
    private tooltipLegendOffsetXProperty;
    private tooltipLegendOffsetYProperty;
    private tooltipDataTemplateProperty;
    private svgLegend;
    private isDirty;
    private placementDivIdProperty?;
    private svgDivRoot?;
    /**
     * Creates an instance of the {@link CursorTooltipSvgAnnotation}
     * @param options
     */
    constructor(options: ITooltipSvgAnnotation3DOptions);
    /**
     * Gets or sets seriesInfos {@link SeriesInfo} value on the tooltip
     */
    get seriesInfo(): SeriesInfo3D;
    /**
     * Gets or sets seriesInfos {@link SeriesInfo} value on the tooltip
     */
    set seriesInfo(newSeriesInfo: SeriesInfo3D);
    get title(): string;
    set title(value: string);
    get tooltipSvgTemplate(): TTooltip3DSvgTemplate;
    set tooltipSvgTemplate(value: TTooltip3DSvgTemplate);
    get tooltipLegendTemplate(): TTooltip3DSvgTemplate;
    set tooltipLegendTemplate(value: TTooltip3DSvgTemplate);
    get tooltipDataTemplate(): TTooltip3DDataTemplate;
    set tooltipDataTemplate(value: TTooltip3DDataTemplate);
    get containerBackground(): string;
    set containerBackground(value: string);
    get tooltipLegendOffsetX(): number;
    set tooltipLegendOffsetX(value: number);
    get tooltipLegendOffsetY(): number;
    set tooltipLegendOffsetY(value: number);
    get textStroke(): string;
    set textStroke(value: string);
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
    update(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
    /** @inheritDoc */
    delete(): void;
    protected notifyPropertyChanged(propertyName: string): void;
    /**
     * @inheritDoc
     */
    protected create(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
    private updateTooltip;
    private updateLegendTooltip;
    private updateExternalLegendTooltip;
}
