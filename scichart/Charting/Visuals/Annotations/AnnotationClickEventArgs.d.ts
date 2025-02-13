import { Point } from "../../../Core/Point";
import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
import { AnnotationBase } from "./AnnotationBase";
export declare class AnnotationClickEventArgs {
    sender: AnnotationBase;
    /** The mouse arguments for the click event */
    mouseArgs: ModifierMouseArgs;
    /** The coordinates where the click took place, relative to the top left of the annotation */
    relativeCoords: Point;
    constructor(sender: AnnotationBase, mouseArgs: ModifierMouseArgs, relativeCoords: Point);
}
