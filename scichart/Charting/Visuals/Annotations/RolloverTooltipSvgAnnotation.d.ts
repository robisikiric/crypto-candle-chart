import { ESeriesType } from "../../../types/SeriesType";
import { SeriesInfo } from "../../Model/ChartData/SeriesInfo";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { RolloverModifierRenderableSeriesProps } from "../RenderableSeries/RolloverModifier/RolloverModifierRenderableSeriesProps";
import { EAnnotationType } from "./IAnnotation";
import { ISvgAnnotationBaseOptions, SvgAnnotationBase } from "./SvgAnnotationBase";
export interface IRolloverTooltipSvgAnnotationOptions extends ISvgAnnotationBaseOptions {
    height?: number;
    seriesType?: ESeriesType;
    placementDivId?: string;
}
/**
 * A Tooltip Annotation which provides an SVG tooltip over the chart. Used by the {@link RolloverModifier}
 */
export declare class RolloverTooltipSvgAnnotation extends SvgAnnotationBase {
    /** @inheritDoc */
    readonly type = EAnnotationType.SVG;
    readonly tooltipProps: RolloverModifierRenderableSeriesProps;
    width: number;
    height: number;
    private svgLegend;
    private seriesInfoProperty;
    private previousMousePosition;
    private placementDivIdProperty;
    private svgDivRoot;
    /**
     * Creates an instance of the {@link RolloverTooltipSvgAnnotation}
     * @param renderableSeriesProps The {@link RolloverModifierRenderableSeriesProps | props} pass
     * @param options
     */
    constructor(renderableSeriesProps: RolloverModifierRenderableSeriesProps, options?: IRolloverTooltipSvgAnnotationOptions);
    /**
     * Gets or sets seriesInfo {@link SeriesInfo} value on the tooltip
     */
    get seriesInfo(): SeriesInfo;
    /**
     * Gets or sets seriesInfo {@link SeriesInfo} value on the tooltip
     */
    set seriesInfo(value: SeriesInfo);
    /** @inheritDoc */
    update(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
    /**
     * Updates size of the tooltip
     */
    updateSize(width: number, height: number): void;
    protected clear(): void;
    /** @inheritDoc */
    protected create(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
    private generateSvgString;
    private updateLegendTooltip;
    private updateExternalLegendTooltip;
    /**
     * Gets or sets the parent div element reference or id for the Tooltip
     */
    get placementDivId(): string;
    /**
     * Gets or sets the parent div element reference or id for the Tooltip
     */
    set placementDivId(value: string);
}
