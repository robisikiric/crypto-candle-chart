import { IAnnotation } from "../../Charting/Visuals/Annotations/IAnnotation";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { IPointerEventsMediatorModifierOptions, PointerEventsMediatorModifier } from "./PointerEventsMediatorModifier";
/**
 * Options for the {@link AnnotationHoverModifier}.
 */
export interface IAnnotationHoverModifierOptions extends IPointerEventsMediatorModifierOptions<IAnnotation> {
}
/**
 * Enables hover detection on annotations.
 * Accepts {@link IAnnotationHoverModifierOptions}
 */
export declare class AnnotationHoverModifier extends PointerEventsMediatorModifier<IAnnotation> {
    readonly type = EChart2DModifierType.AnnotationHover;
    constructor(options?: IAnnotationHoverModifierOptions);
    getAllTargets(): IAnnotation[];
}
