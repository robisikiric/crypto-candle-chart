import { Point } from "../../../Core/Point";
import { Rect } from "../../../Core/Rect";
import { ELabelPlacement } from "../../../types/LabelPlacement";
import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
import { Pen2DCache } from "../../Drawing/Pen2DCache";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { SciChartSurface } from "../SciChartSurface";
import { TDpiChangedEventArgs } from "../TextureManager/DpiHelper";
import { IAnnotationBaseOptions } from "./AnnotationBase";
import { EAnnotationType } from "./IAnnotation";
import { RenderContextAnnotationBase } from "./RenderContextAnnotationBase";
/**
 * Options passed to the constructor of a {@link LineAnnotation}, used to configure it at instantiation time
 */
export interface ILineAnnotationOptions extends IAnnotationBaseOptions {
    /**
     * The stroke for the {@link LineAnnotation}
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    stroke?: string;
    /**
     * The strokeThickness for the {@link LineAnnotation}
     */
    strokeThickness?: number;
    /**
     * The strokeDashArray for the {@link LineAnnotation}
     */
    strokeDashArray?: number[];
    /**
     * The showLabel for the {@link LineAnnotation}
     */
    showLabel?: boolean;
    /**
     * The axisLabelStroke for the {@link LineAnnotation}
     */
    axisLabelStroke?: string;
    /**
     * The axisLabelFill for the {@link LineAnnotation}
     */
    axisLabelFill?: string;
    /**
     * The axisLabelFill for the {@link LineAnnotation}
     */
    axisFontSize?: number;
    /**
     * The axisLabelFill for the {@link LineAnnotation}
     */
    axisFontFamily?: string;
    /**
     * The labelPlacement for the {@link LineAnnotation}
     */
    labelPlacement?: ELabelPlacement;
    /**
     * The labelValue for the {@link LineAnnotation}
     */
    labelValue?: string;
}
/**
 * @summary The {@link LineAnnotation} provides an {@link AnnotationBase | Annotation} which draws a line at
 * specific x1x2 y1y2 over the {@link SciChartSurface}
 * @description
 * To add a {@link LineAnnotation} to a {@link SciChartSurface}, use the following code:
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const lineAnnotation = new LineAnnotation( { x1: 1, x2: 2, y1: 3, y2: 4, fill: "#FF000077", stroke: "#FF0000"});
 * sciChartSurface.annotations.add(lineAnnotation);
 * ```
 * @remarks Uses the fast WebGL/WebAssembly {@link WebGL2RenderingContext} for rendering
 */
export declare class LineAnnotation extends RenderContextAnnotationBase {
    /** @inheritDoc */
    readonly type: EAnnotationType;
    protected strokePenCache: Pen2DCache;
    protected axisFontSizeProperty?: number;
    protected axisFontFamilyProperty?: string;
    private strokeThicknessProperty;
    private strokeDashArrayProperty;
    private strokeProperty;
    private showLabelProperty;
    private axisLabelStrokeProperty;
    private axisLabelFillProperty;
    private labelPlacementProperty;
    private labelValueProperty;
    /**
     * Create an instance of a LineAnnotation
     * @param options Optional parameters of type {@link ILineAnnotationOptions} which configure the annotation upon construction
     */
    constructor(options?: ILineAnnotationOptions);
    /**
     * Gets the stroke for the {@link LineAnnotation}
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    get stroke(): string;
    /**
     * Sets the stroke for the {@link LineAnnotation}
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    set stroke(htmlColorCode: string);
    /**
     * Gets the strokeThickness for the {@link LineAnnotation}
     */
    get strokeThickness(): number;
    /**
     * Sets the strokeThickness for the {@link LineAnnotation}
     */
    set strokeThickness(value: number);
    /**
     * Gets the strokeDashArray for the {@link LineAnnotation}
     */
    get strokeDashArray(): number[];
    /**
     * Sets the strokeDashArray for the {@link LineAnnotation}
     */
    set strokeDashArray(value: number[]);
    /**
     * Gets the showLabel for the {@link LineAnnotation}
     */
    get showLabel(): boolean;
    /**
     * Sets the showLabel for the {@link LineAnnotation}
     */
    set showLabel(value: boolean);
    /**
     * Gets the axisLabelStroke for the {@link LineAnnotation}
     */
    get axisLabelStroke(): string;
    /**
     * Sets the axisLabelStroke for the {@link LineAnnotation}
     */
    set axisLabelStroke(value: string);
    /**
     * Gets the axisLabelFill for the {@link LineAnnotation}
     */
    get axisLabelFill(): string;
    /**
     * Sets the axisLabelFill for the {@link LineAnnotation}
     */
    set axisLabelFill(value: string);
    /**
     * Gets the axisFontSize for the {@link LineAnnotation}
     */
    get axisFontSize(): number;
    /**
     * Sets the axisFontSize for the {@link LineAnnotation}
     */
    set axisFontSize(value: number);
    /**
     * Gets the axisFontSize for the {@link LineAnnotation}
     */
    get axisFontFamily(): string;
    /**
     * Sets the axisFontSize for the {@link LineAnnotation}
     */
    set axisFontFamily(value: string);
    /**
     * Gets the labelPlacement for the {@link LineAnnotation}
     */
    get labelPlacement(): ELabelPlacement;
    /**
     * Sets the labelPlacement for the {@link LineAnnotation}
     */
    set labelPlacement(value: ELabelPlacement);
    /**
     * Gets the labelValue for the {@link LineAnnotation}
     */
    get labelValue(): string;
    /**
     * Sets the labelValue for the {@link LineAnnotation}
     */
    set labelValue(value: string);
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    onAttach(scs: SciChartSurface): void;
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
    protected notifyPropertyChanged(propertyName: string): void;
    protected updateAdornerInner(): void;
    svgStringAdornerTemplate(x1: number, y1: number, x2: number, y2: number): string;
}
