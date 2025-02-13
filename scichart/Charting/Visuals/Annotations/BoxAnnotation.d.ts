import { Point } from "../../../Core/Point";
import { Rect } from "../../../Core/Rect";
import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
import { IRenderContext2D } from "../../Drawing/IRenderContext2D";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { SciChartSurface } from "../SciChartSurface";
import { TDpiChangedEventArgs } from "../TextureManager/DpiHelper";
import { IAnnotationBaseOptions } from "./AnnotationBase";
import { EAnnotationType } from "./IAnnotation";
import { RenderContextAnnotationBase } from "./RenderContextAnnotationBase";
/**
 * Options passed to the constructor of a {@link BoxAnnotation}, used to configure it at instantiation time
 */
export interface IBoxAnnotationOptions extends IAnnotationBaseOptions {
    /**
     * The stroke for the outline of the {@link BoxAnnotation}
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    stroke?: string;
    /**
     * The strokeThickness for the outline of the {@link BoxAnnotation}
     */
    strokeThickness?: number;
    /**
     * The fill for the {@link BoxAnnotation}
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    fill?: string;
}
/**
 * @summary The {@link BoxAnnotation} provides an {@link AnnotationBase | Annotation} which draws a rectangle or box over the {@link SciChartSurface}
 * @description
 * To add a {@link BoxAnnotation} to a {@link SciChartSurface}, use the following code:
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const boxAnnotation = new BoxAnnotation( { x1: 1, x2: 2, y1: 3, y2: 4, fill: "#FF000077", stroke: "#FF0000"});
 * sciChartSurface.annotations.add(boxAnnotation);
 * ```
 * @remarks Uses the fast WebGL/WebAssembly {@link WebGL2RenderingContext} for rendering
 */
export declare class BoxAnnotation extends RenderContextAnnotationBase {
    /** @inheritDoc */
    readonly type = EAnnotationType.RenderContextBoxAnnotation;
    private strokeThicknessProperty;
    private strokeProperty;
    private fillProperty;
    private nativeDrawingProvider;
    private strokePenCache;
    private fillBrushCache;
    /**
     * Create an instance of a BoxAnnotation
     * @param options Optional parameters of type {@link IBoxAnnotationOptions} which configure the annotation upon construction
     */
    constructor(options?: IBoxAnnotationOptions);
    /**
     * Gets stroke for the outline of the {@link BoxAnnotation}
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    get stroke(): string;
    /**
     * Sets the stroke for the outline of the {@link BoxAnnotation}
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    set stroke(htmlColorCode: string);
    /**
     * Gets the strokeThickness for the outline of the {@link BoxAnnotation}
     */
    get strokeThickness(): number;
    /**
     * Sets the strokeThickness for the outline of the {@link BoxAnnotation}
     */
    set strokeThickness(value: number);
    /**
     * Gets the fill for the {@link BoxAnnotation}
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    get fill(): string;
    /**
     * Sets the fill for the {@link BoxAnnotation}
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    set fill(htmlColorCode: string);
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    drawWithContext(renderContext: IRenderContext2D, xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, viewRect: Rect): void;
    /** @inheritDoc */
    onAttach(scs: SciChartSurface): void;
    onDragStarted(args: ModifierMouseArgs): boolean;
    calcDragDistance(xyValues: Point): void;
    onDpiChanged(args: TDpiChangedEventArgs): void;
    toJSON(): {
        type: EAnnotationType;
        options: Required<Omit<IAnnotationBaseOptions, never>>;
    };
    protected checkIsClickedOnAnnotationInternal(x: number, y: number): boolean;
    protected notifyPropertyChanged(propertyName: string): void;
    protected updateAdornerInner(): void;
    svgStringAdornerTemplate(x1: number, y1: number, x2: number, y2: number): string;
    private drawWithProvider;
}
