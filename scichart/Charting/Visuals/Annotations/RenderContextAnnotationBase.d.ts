import { Rect } from "../../../Core/Rect";
import { IRenderContext2D } from "../../Drawing/IRenderContext2D";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { SciChartSurface } from "../SciChartSurface";
import { AnnotationBase, IAnnotationBaseOptions } from "./AnnotationBase";
/**
 * The Base class for an {@link AnnotationBase | Annotation} which draws using SciChart's built-in WebGL2
 * WebAssembly {@link WebGL2RenderingContext | RenderContext}, enabling fast drawing at expense of
 * having lots of customisation like the {@link SvgAnnotationBase} provides.
 */
export declare abstract class RenderContextAnnotationBase extends AnnotationBase {
    /** @inheritDoc */
    readonly isSvgAnnotation: boolean;
    /**
     * Creates an instance of the RenderContextAnnotationBase
     * @param options optional parameters of type {@link IAnnotationBaseOptions} which configure the annotation at construction time
     */
    protected constructor(options?: IAnnotationBaseOptions);
    /** @inheritDoc */
    get parentSurface(): SciChartSurface;
    /** @inheritDoc */
    set parentSurface(parentSurface: SciChartSurface);
    /**
     * @description draws the annotation with RenderContext.
     * May be overriden in derived classes for fast drawing direct on render surface
     * @param renderContext
     * @param xCalc the X Axis Coordinate Calculator for the current draw operation
     * @param yCalc the Y Axis Coordinate Calculator for the current draw operation
     * @param viewRect the series viewRect, used for translate and clipping
     */
    abstract drawWithContext(renderContext: IRenderContext2D, xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, viewRect: Rect): void;
}
