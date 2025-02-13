import { IAxisMarkerAnnotationOptions } from "../Charting/Visuals/Annotations/AxisMarkerAnnotation";
import { IBoxAnnotationOptions } from "../Charting/Visuals/Annotations/BoxAnnotation";
import { ICustomAnnotationOptions } from "../Charting/Visuals/Annotations/CustomAnnotation";
import { EAnnotationType } from "../Charting/Visuals/Annotations/IAnnotation";
import { ILineAnnotationOptions } from "../Charting/Visuals/Annotations/LineAnnotation";
import { INativeTextAnnotationOptions } from "../Charting/Visuals/Annotations/NativeTextAnnotation";
import { ITextAnnotationOptions } from "../Charting/Visuals/Annotations/TextAnnotation";
/** Definition of an annotation, comprising a {@link EAnnotationType} and the relevant options  */
export declare type TAnnotationDefinition = {
    type: EAnnotationType.RenderContextAxisMarkerAnnotation;
    options?: IAxisMarkerAnnotationOptions;
} | {
    type: EAnnotationType.RenderContextBoxAnnotation;
    options?: IBoxAnnotationOptions;
} | {
    type: EAnnotationType.RenderContextHorizontalLineAnnotation;
    options?: ILineAnnotationOptions;
} | {
    type: EAnnotationType.RenderContextLineAnnotation;
    options?: ILineAnnotationOptions;
} | {
    type: EAnnotationType.RenderContextVerticalLineAnnotation;
    options?: ILineAnnotationOptions;
} | {
    type: EAnnotationType.SVGTextAnnotation;
    options?: ITextAnnotationOptions;
} | {
    type: EAnnotationType.SVGCustomAnnotation;
    options?: ICustomAnnotationOptions;
} | {
    type: EAnnotationType.RenderContextNativeTextAnnotation;
    options?: INativeTextAnnotationOptions;
};
/**
 * Build one or more annotations from a definition that can be pure data.
 * @param definition One or an array of {@link TAnnotationDefinition}
 * @returns An array of annotations
 */
export declare const buildAnnotations: (definition: TAnnotationDefinition | TAnnotationDefinition[]) => any[];
