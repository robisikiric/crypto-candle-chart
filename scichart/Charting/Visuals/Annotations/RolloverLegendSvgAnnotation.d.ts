import { TRolloverLegendSvgTemplate } from "../../ChartModifiers/RolloverModifier";
import { SeriesInfo } from "../../Model/ChartData/SeriesInfo";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { EAnnotationType } from "./IAnnotation";
import { ISvgAnnotationBaseOptions, SvgAnnotationBase } from "./SvgAnnotationBase";
export interface IRolloverLegendSvgAnnotationOptions extends ISvgAnnotationBaseOptions {
    tooltipLegendTemplate?: TRolloverLegendSvgTemplate;
    tooltipLegendOffsetX?: number;
    tooltipLegendOffsetY?: number;
}
/**
 * A Rollover Legend Annotation which provides an SVG tooltip over the chart. Used by the {@link RolloverModifier}
 */
export declare class RolloverLegendSvgAnnotation extends SvgAnnotationBase {
    /** @inheritDoc */
    readonly type = EAnnotationType.SVG;
    private tooltipLegendTemplateProperty;
    private tooltipLegendOffsetXProperty;
    private tooltipLegendOffsetYProperty;
    private seriesInfosProperty;
    private svgLegend;
    /**
     * Creates an instance of the {@link RolloverLegendSvgAnnotation}
     * @param options
     */
    constructor(options?: IRolloverLegendSvgAnnotationOptions);
    /**
     * Gets or sets seriesInfos {@link SeriesInfo} value on the tooltip
     */
    get seriesInfos(): SeriesInfo[];
    /**
     * Gets or sets seriesInfos {@link SeriesInfo} value on the tooltip
     */
    set seriesInfos(newSeriesInfos: SeriesInfo[]);
    get tooltipLegendTemplate(): TRolloverLegendSvgTemplate;
    set tooltipLegendTemplate(value: TRolloverLegendSvgTemplate);
    get tooltipLegendOffsetX(): number;
    set tooltipLegendOffsetX(value: number);
    get tooltipLegendOffsetY(): number;
    set tooltipLegendOffsetY(value: number);
    /**
     * @inheritDoc
     */
    update(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
    /**
     * @inheritDoc
     */
    protected create(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
}
