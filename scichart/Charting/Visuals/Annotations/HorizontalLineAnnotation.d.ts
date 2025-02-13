import { Rect } from "../../../Core/Rect";
import { EHorizontalAlignment, EVerticalAlignment } from "../../../types/LabelPlacement";
import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { EAnnotationType } from "./IAnnotation";
import { ILineAnnotationOptions, LineAnnotation } from "./LineAnnotation";
export interface IHVLineAnnotationOptions extends ILineAnnotationOptions {
    dragOnLine?: boolean;
    dragOnLabel?: boolean;
    horizontalAlignment?: EHorizontalAlignment;
    verticalAlignment?: EVerticalAlignment;
}
/**
 * @summary The {@link HorizontalLineAnnotation} provides an {@link AnnotationBase | Annotation} which draws a horizontal line at
 * specific y1 (or x1 for Vertical Chart) over the {@link SciChartSurface}
 * @description
 * To add a {@link HorizontalLineAnnotation} to a {@link SciChartSurface}, use the following code:
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const horizontalLineAnnotation = new HorizontalLineAnnotation( { x1: 1, y1: 3, fill: "#FF000077", stroke: "#FF0000"});
 * sciChartSurface.annotations.add(horizontalLineAnnotation);
 * ```
 * @remarks Uses the fast WebGL/WebAssembly {@link WebGL2RenderingContext} for rendering
 */
export declare class HorizontalLineAnnotation extends LineAnnotation {
    /** @inheritDoc */
    readonly type: EAnnotationType;
    dragOnLine: boolean;
    dragOnLabel: boolean;
    horizontalAlignment: EHorizontalAlignment;
    private labelRect;
    /**
     * Create an instance of a HorizontalLineAnnotation
     * @param options Optional parameters of type {@link ILineAnnotationOptions} which configure the annotation upon construction
     */
    constructor(options?: IHVLineAnnotationOptions);
    /**
     * y2 property is not supported for HorizontalLineAnnotation
     */
    get y2(): number;
    /**
     * y2 property is not supported for HorizontalLineAnnotation
     */
    set y2(y2: number);
    /**
     * x2 property is not supported for HorizontalLineAnnotation
     */
    get x2(): number;
    /**
     * x2 property is not supported for HorizontalLineAnnotation
     */
    set x2(x2: number);
    /** @inheritDoc */
    drawWithContext(renderContext: WebGlRenderContext2D, xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, viewRect: Rect): void;
    onDragStarted(args: ModifierMouseArgs): boolean;
    protected checkIsClickedOnAnnotationInternal(x: number, y: number): boolean;
    /**
     * returns axis related properties accordingly to chart configuration
     */
    private getDrawConfig;
}
