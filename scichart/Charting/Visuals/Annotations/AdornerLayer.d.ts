import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
import { SciChartSurface } from "../SciChartSurface";
import { AnnotationBase } from "./AnnotationBase";
import { IAnnotation } from "./IAnnotation";
export declare class AdornerLayer {
    parentSurface: SciChartSurface;
    private selectedAnnotationProperty;
    constructor(scs: SciChartSurface);
    selectAnnotation(args: ModifierMouseArgs): boolean;
    deselectAnnotation(annotation: IAnnotation): void;
    get selectedAnnotation(): AnnotationBase;
    set selectedAnnotation(value: AnnotationBase);
    get isAnnotationSelected(): boolean;
}
