import { Point } from "../../../Core/Point";
import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
import { AnnotationBase } from "./AnnotationBase";
export declare class AnnotationHoverEventArgs {
    sender: AnnotationBase;
    /** The mouse arguments for the click event */
    mouseArgs: ModifierMouseArgs;
    /** The property defining if it is the hover out event */
    isHovered: boolean;
    constructor(options: {
        sender: AnnotationBase;
        mouseArgs: ModifierMouseArgs;
        isHovered: boolean;
    });
    getRelativeCoordinates(): Point;
}
