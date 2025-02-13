import { Point } from "../../../Core/Point";
import { Rect } from "../../../Core/Rect";
import { EHorizontalAnchorPoint, EVerticalAnchorPoint } from "../../../types/AnchorPoint";
import { EMultiLineAlignment } from "../../../types/TextPosition";
import { TSRTextBounds } from "../../../types/TSciChart";
import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { SciChartSurface } from "../SciChartSurface";
import { TDpiChangedEventArgs } from "../TextureManager/DpiHelper";
import { IAnnotationBaseOptions } from "./AnnotationBase";
import { EAnnotationType } from "./IAnnotation";
import { RenderContextAnnotationBase } from "./RenderContextAnnotationBase";
export declare enum EWrapTo {
    ViewRect = "ViewRect",
    Annotation = "Annotation"
}
/**
 * Options passed to the constructor of a {@link NativeTextAnnotation}, used to configure it at instantiation time
 */
export interface INativeTextAnnotationOptions extends IAnnotationBaseOptions {
    /**
     * The color for the {@link NativeTextAnnotation}
     */
    textColor?: string;
    /**
     * The fontSize for the {@link NativeTextAnnotation}
     */
    fontSize?: number;
    /**
     * The fontFamily for the {@link NativeTextAnnotation}
     */
    fontFamily?: string;
    /**
     * The rotation for the {@link NativeTextAnnotation} in degrees
     */
    rotation?: number;
    /**
     * The text for the {@link NativeTextAnnotation}
     */
    text?: string;
    /**
     * Sets vertical anchor point
     */
    verticalAnchorPoint?: EVerticalAnchorPoint;
    /**
     * Sets horizontal anchor point
     */
    horizontalAnchorPoint?: EHorizontalAnchorPoint;
    /** Sets the horizontal alignment mode for multiline text */
    multiLineAlignment?: EMultiLineAlignment;
    /** Sets the text wrapping mode.  A pure number will be treated as a pixel width. Default is undefined meaning no wrap*/
    wrapTo?: number | EWrapTo;
    /**
     * The spacing between lines.  Default 3
     * If a whole number then treated as pixels.  If between 0 and 1 then treated as a fraction of line height
     */
    lineSpacing?: number;
    /**
     * The scale factor for the font.  Default 1
     * This changes the size of the text without needing to create a new font with a different size
     */
    scale?: number;
    /** Set true to make the font scale when the annotation is resized.  Must set x2 as well.  Cannot be used with wrapTo  */
    scaleOnResize?: boolean;
}
/**
 * @summary The {@link NativeTextAnnotation} provides an {@link AnnotationBase | Annotation} which draws a text at
 * specific x1 y1 over the {@link SciChartSurface}
 * @description
 * To add a {@link NativeTextAnnotation} to a {@link SciChartSurface}, use the following code:
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const textAnnotation = new NativeTextAnnotation( { x1: 1, y1: 3, color: "#FF000077", text: "Hello SciChart"});
 * sciChartSurface.annotations.add(textAnnotation);
 * ```
 * @remarks Uses the fast WebGL/WebAssembly {@link WebGL2RenderingContext} for rendering
 */
export declare class NativeTextAnnotation extends RenderContextAnnotationBase {
    /** @inheritDoc */
    readonly type: EAnnotationType;
    /** Set true to make the font scale when the annotation is resized.  Must set x2 as well.  Cannot be used with wrapTo */
    scaleOnResize: boolean;
    protected fontSizeProperty?: number;
    protected fontFamilyProperty?: string;
    protected textColorProperty: string;
    protected rotationProperty: number;
    protected textProperty: string;
    protected verticalAnchorPointProperty: EVerticalAnchorPoint;
    protected horizontalAnchorPointProperty: EHorizontalAnchorPoint;
    protected multiLineAlignmentProperty?: EMultiLineAlignment;
    protected wrapToProperty?: number | EWrapTo;
    protected lineSpacingProperty?: number;
    protected scaleProperty?: number;
    private initialWidth;
    /**
     * Create an instance of a NativeTextAnnotation
     * @param options Optional parameters of type {@link INativeTextAnnotationOptions} which configure the annotation upon construction
     */
    constructor(options?: INativeTextAnnotationOptions);
    /**
     * Gets the color for the {@link NativeTextAnnotation}
     */
    get textColor(): string;
    /**
     * Sets the color for the {@link NativeTextAnnotation}
     */
    set textColor(value: string);
    /**
     * Gets the fontSize for the {@link NativeTextAnnotation}
     */
    get fontSize(): number;
    /**
     * Sets the fontSize for the {@link NativeTextAnnotation}
     */
    set fontSize(value: number);
    /**
     * Gets the fontSize for the {@link NativeTextAnnotation}
     */
    get fontFamily(): string;
    /**
     * Sets the fontSize for the {@link NativeTextAnnotation}
     */
    set fontFamily(value: string);
    /**
     * Gets the rotation for the {@link NativeTextAnnotation}
     */
    get rotation(): number;
    /**
     * Sets the labelPlacement for the {@link NativeTextAnnotation}
     */
    set rotation(value: number);
    /**
     * Gets the text for the {@link NativeTextAnnotation}
     */
    get text(): string;
    /**
     * Sets the text for the {@link NativeTextAnnotation}
     */
    set text(value: string);
    /**
     * Gets or sets vertical anchor point
     */
    get verticalAnchorPoint(): EVerticalAnchorPoint;
    /**
     * Gets or sets vertical anchor point
     */
    set verticalAnchorPoint(value: EVerticalAnchorPoint);
    /**
     * Gets or sets horizontal anchor point
     */
    get horizontalAnchorPoint(): EHorizontalAnchorPoint;
    /**
     * Gets or sets horizontal anchor point
     */
    set horizontalAnchorPoint(value: EHorizontalAnchorPoint);
    /**
     * Gets or sets the horizontal alignment mode for multiline text
     */
    get multiLineAlignment(): EMultiLineAlignment;
    /**
     * Gets or sets the horizontal alignment mode for multiline text
     */
    set multiLineAlignment(value: EMultiLineAlignment);
    /**
     * Gets or sets the text wrapping mode.  A pure number will be treated as a pixel width.  Default is undefined meaning no wrap
     */
    get wrapTo(): number | EWrapTo;
    /**
     * Gets or sets the text wrapping mode.  A pure number will be treated as a pixel width.  Default is undefined meaning no wrap
     */
    set wrapTo(value: number | EWrapTo);
    /**
     * The spacing between lines.  Default 3
     * If a whole number then treated as pixels.  If between 0 and 1 then treated as a fraction of line height
     */
    get lineSpacing(): number;
    /**
     * The spacing between lines.  Default 3
     * If a whole number then treated as pixels.  If between 0 and 1 then treated as a fraction of line height
     */
    set lineSpacing(value: number);
    /**
     * The scale factor for the font.  Default 1
     * This changes the size of the text without needing to create a new font with a different size
     */
    get scale(): number;
    /**
     * The scale factor for the font.  Default 1
     * This changes the size of the text without needing to create a new font with a different size
     */
    set scale(value: number);
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    onAttach(scs: SciChartSurface): void;
    /** Calculate the center point for a rotation */
    getRotationCenter(x: number, y: number, bounds: TSRTextBounds): Point;
    /** @inheritDoc */
    drawWithContext(renderContext: WebGlRenderContext2D, xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, viewRect: Rect): void;
    onDragStarted(args: ModifierMouseArgs): boolean;
    calcDragDistance(xyValues: Point): void;
    /**
     * @instance
     */
    onDpiChanged(args: TDpiChangedEventArgs): void;
    toJSON(): {
        type: EAnnotationType;
        options: Required<Omit<IAnnotationBaseOptions, never>>;
    };
    protected checkIsClickedOnAnnotationInternal(x: number, y: number): boolean;
    protected updateAdornerInner(): void;
    svgStringAdornerTemplate(x1: number, y1: number, x2: number, y2: number): string;
}
