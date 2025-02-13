import { Rect } from "../../../Core/Rect";
import { EVerticalAlignment } from "../../../types/LabelPlacement";
import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { IHVLineAnnotationOptions } from "./HorizontalLineAnnotation";
import { EAnnotationType } from "./IAnnotation";
import { LineAnnotation } from "./LineAnnotation";
/**
 * @summary The {@link VerticalLineAnnotation} provides an {@link AnnotationBase | Annotation} which draws a vertical line at
 * specific x1 (or y1 for Vertical Chart) over the {@link SciChartSurface}
 * @description
 * To add a {@link VerticalLineAnnotation} to a {@link SciChartSurface}, use the following code:
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const verticalLineAnnotation = new VerticalLineAnnotation( { x1: 1, y1: 3 fill: "#FF000077", stroke: "#FF0000"});
 * sciChartSurface.annotations.add(verticalLineAnnotation);
 * ```
 * @remarks Uses the fast WebGL/WebAssembly {@link WebGL2RenderingContext} for rendering
 */
export declare class VerticalLineAnnotation extends LineAnnotation {
    /** @inheritDoc */
    readonly type: EAnnotationType;
    dragOnLine: boolean;
    dragOnLabel: boolean;
    verticalAlignment: EVerticalAlignment;
    private labelRect;
    /**
     * Create an instance of a LineAnnotation
     * @param options Optional parameters of type {@link ILineAnnotationOptions} which configure the annotation upon construction
     */
    constructor(options?: IHVLineAnnotationOptions);
    /**
     * y2 property is not supported for VerticalLineAnnotation
     */
    get y2(): number;
    /**
     * y2 property is not supported for VerticalLineAnnotation
     */
    set y2(y2: number);
    /**
     * x2 property is not supported for VerticalLineAnnotation
     */
    get x2(): number;
    /**
     * x2 property is not supported for VerticalLineAnnotation
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
