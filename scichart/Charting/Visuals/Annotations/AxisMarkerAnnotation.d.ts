import { Point } from "../../../Core/Point";
import { Rect } from "../../../Core/Rect";
import { Thickness } from "../../../Core/Thickness";
import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { IAnnotationBaseOptions } from "./AnnotationBase";
import { EAnnotationType } from "./IAnnotation";
import { RenderContextAnnotationBase } from "./RenderContextAnnotationBase";
/**
 * Options passed to the constructor of a {@link AxisMarkerAnnotation}, used to configure it at instantiation time
 */
export interface IAxisMarkerAnnotationOptions extends IAnnotationBaseOptions {
    /**
     * Font size in pixels
     */
    fontSize?: number;
    /**
     * Font family
     */
    fontFamily?: string;
    /**
     * Font weight, e.g. bold
     */
    fontWeight?: string;
    /**
     * Font style
     */
    fontStyle?: string;
    /**
     * Text color, html code or string, e.g. #FF0000 or red
     */
    color?: string;
    padding?: Thickness;
    /**
     * The axis marker color, html code or string, e.g. #FF0000 or red
     */
    backgroundColor?: string;
    /**
     * Custom text on the label, by default the data value is displayed
     */
    formattedValue?: string;
    /**
     * Sets the image to draw for {@link AxisMarkerAnnotation},
     * if not set the default AxisMarkerAnnotation is being used
     */
    image?: HTMLImageElement;
    /**
     * Image width
     */
    imageWidth?: number;
    /**
     * Image height
     */
    imageHeight?: number;
}
/**
 * @summary The {@link AxisMarkerAnnotation} provides an {@link AnnotationBase | Annotation} which draws a marker at
 * specified value on the axis over the {@link SciChartSurface}
 * @description
 * To add a {@link AxisMarkerAnnotation} to a {@link SciChartSurface}, use the following code:
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const AxisMarkerAnnotation = new AxisMarkerAnnotation( { y1: 3, backgroundColor: "#FF000077", color: "#FF0000"});
 * sciChartSurface.annotations.add(AxisMarkerAnnotation);
 * ```
 * @remarks Uses the fast WebGL/WebAssembly {@link WebGL2RenderingContext} for rendering
 */
export declare class AxisMarkerAnnotation extends RenderContextAnnotationBase {
    /** @inheritDoc */
    readonly type: EAnnotationType;
    private fontSizeProperty?;
    private fontFamilyProperty?;
    private fontWeightProperty?;
    private fontStyleProperty?;
    private colorProperty?;
    private paddingProperty?;
    private backgroundColorProperty?;
    private formattedValueProperty?;
    private imageProperty;
    private imageWidthProperty;
    private imageHeightProperty;
    /**
     * Create an instance of a AxisMarkerAnnotation
     * @param options Optional parameters of type {@link IAxisMarkerAnnotationOptions} which configure the annotation upon construction
     */
    constructor(options?: IAxisMarkerAnnotationOptions);
    /** @inheritDoc */
    delete(): void;
    /**
     * y2 property is not supported for AxisMarkerAnnotation
     */
    get y2(): number;
    /**
     * y2 property is not supported for AxisMarkerAnnotation
     */
    set y2(y2: number);
    /**
     * x2 property is not supported for AxisMarkerAnnotation
     */
    get x2(): number;
    /**
     * x2 property is not supported for AxisMarkerAnnotation
     */
    set x2(x2: number);
    /**
     * Gets the color of the background of the {@link AxisMarkerAnnotation} as an HTML Color code
     */
    get backgroundColor(): string;
    /**
     * Sets the color of the background of the {@link AxisMarkerAnnotation} as an HTML Color code
     */
    set backgroundColor(value: string);
    /**
     * Gets the color of the {@link AxisMarkerAnnotation} as an HTML Color code
     */
    get color(): string;
    /**
     * Sets the color of the {@link AxisMarkerAnnotation} as an HTML Color code
     */
    set color(value: string);
    /**
     * Gets the fontSize of the {@link AxisMarkerAnnotation}
     */
    get fontSize(): number;
    /**
     * Sets the fontSize of the {@link AxisMarkerAnnotation}
     */
    set fontSize(value: number);
    /**
     * Gets the fontFamily of the {@link AxisMarkerAnnotation}
     */
    get fontFamily(): string;
    /**
     * Sets the fontFamily of the {@link AxisMarkerAnnotation}
     */
    set fontFamily(value: string);
    /**
     * Gets the fontWeight of the {@link AxisMarkerAnnotation}
     */
    get fontWeight(): string;
    /**
     * Sets the fontWeight of the {@link AxisMarkerAnnotation}
     */
    set fontWeight(value: string);
    /**
     * Gets the fontStyle of the {@link AxisMarkerAnnotation}
     */
    get fontStyle(): string;
    /**
     * Sets the fontStyle of the {@link AxisMarkerAnnotation}
     */
    set fontStyle(value: string);
    /**
     * Gets the padding of the {@link AxisMarkerAnnotation}
     */
    get padding(): Thickness;
    /**
     * Sets the padding of the {@link AxisMarkerAnnotation}
     */
    set padding(value: Thickness);
    /**
     * Gets the formattedValue of the {@link AxisMarkerAnnotation}
     */
    get formattedValue(): string;
    /**
     * Sets the formattedValue of the {@link AxisMarkerAnnotation}
     */
    set formattedValue(value: string);
    /**
     * Gets or sets the image to draw as an annotation {@link HTMLImageElement}
     */
    get image(): HTMLImageElement;
    /**
     * Gets or sets the image to draw as an annotation {@link HTMLImageElement}
     */
    set image(image: HTMLImageElement);
    /**
     * Gets or sets the image width
     */
    get imageWidth(): number;
    /**
     * Gets or sets the image width
     */
    set imageWidth(value: number);
    /**
     * Gets or sets the image height
     */
    get imageHeight(): number;
    /**
     * Gets or sets the image height
     */
    set imageHeight(value: number);
    /** @inheritDoc */
    drawWithContext(renderContext: WebGlRenderContext2D, xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, viewRect: Rect): void;
    onDragStarted(args: ModifierMouseArgs): boolean;
    calcDragDistance(xyValues: Point): void;
    toJSON(): {
        type: EAnnotationType;
        options: Required<Omit<IAnnotationBaseOptions, never>>;
    };
    protected checkIsClickedOnAnnotationInternal(x: number, y: number): boolean;
    protected updateAdornerInner(): void;
    svgStringAdornerTemplate(x1: number, y1: number, x2: number, y2: number): string;
    /**
     * Calculates the adorner center relative to the canvas,
     * The coordinates are not scaled
     * @private
     */
    private calculateAdornerCenter;
}
