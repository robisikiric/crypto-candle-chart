import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { RolloverModifierRenderableSeriesProps } from "../RenderableSeries/RolloverModifier/RolloverModifierRenderableSeriesProps";
import { EAnnotationType } from "./IAnnotation";
import { SvgAnnotationBase } from "./SvgAnnotationBase";
export declare class RolloverMarkerSvgAnnotation extends SvgAnnotationBase {
    /** @inheritDoc */
    readonly type = EAnnotationType.SVG;
    private tooltipProps;
    private previousMousePosition;
    private currentColor;
    constructor(renderableSeriesProps: RolloverModifierRenderableSeriesProps);
    /** @inheritDoc */
    update(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
    /** @inheritDoc */
    protected create(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
}
