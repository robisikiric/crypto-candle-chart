import { Point } from "../../../Core/Point";
import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { CustomAnnotation, ICustomAnnotationOptions } from "./CustomAnnotation";
/**
 * Function signature for the SVG builder function
 */
export declare type SvgStringTemplate = (x1: number, y1: number, x2: number, y2: number) => string;
/**
 * Optional parameters passed to an {@link OverviewCustomResizableAnnotation} during construction
 */
export interface ICustomResizableAnnotationOptions extends ICustomAnnotationOptions {
    /**
     * minimum width of the annotation
     */
    minWidth?: number;
    /**
     * minimum height of the annotation
     */
    minHeight?: number;
    /**
     * SVG template to apply when the annotation is selected
     */
    adornerSvgStringTemplate?: SvgStringTemplate;
}
/**
 * A OverviewCustomResizableAnnotation presents SVG information over the chart at specific {@link X1}, {@link Y1}, {@link X2}, {@link Y2} coordinates.
 * @remarks The annotation can be moved or resized up to the limits set by minWidth/minHeight properties and axis visible range
 */
export declare class OverviewCustomResizableAnnotation extends CustomAnnotation {
    private adornerSvgStringTemplateProperty;
    private minWidthProperty;
    private minHeightProperty;
    constructor(options?: ICustomResizableAnnotationOptions);
    /**
     * Gets or sets the minimum width of the annotation
     */
    set minWidth(value: number);
    /**
     * Gets or sets the minimum width of the annotation
     */
    get minWidth(): number;
    /**
     * Gets or sets the minimum width of the annotation
     */
    set minHeight(value: number);
    /**
     * Gets or sets the minimum width of the annotation
     */
    get minHeight(): number;
    /**
     * Gets or sets the SVG template of the annotation adorner
     */
    set adornerSvgStringTemplate(value: SvgStringTemplate);
    /**
     * Gets or sets the SVG template of the annotation adorner
     */
    get adornerSvgStringTemplate(): SvgStringTemplate;
    /**
     * Updates the annotation position and size while maintaining limits set by minWidth and minHeight
     * @param coordinates an object with the coordinates - {x1, x2, y1, y2}
     */
    setCoordinates(coordinates: {
        x1?: number;
        x2?: number;
        y1?: number;
        y2?: number;
    }): void;
    /**
     * Calculates current dragging point. Defines logic of grip points placement
     * @param args {@link ModifierMouseArgs}
     */
    onDragStarted(args: ModifierMouseArgs): boolean;
    /**
     * Updates the annotation position, with the {@link CoordinateCalculatorBase | Coordinate Calculators} passed in
     * @param xCalc The XAxis {@link CoordinateCalculatorBase | CoordinateCalculator} applied to this annotation
     * @param yCalc The YAxis {@link CoordinateCalculatorBase | CoordinateCalculator} applied to this annotation
     * @param xCoordSvgTrans X-coordinate translation which is needed to use SVG canvas having the whole chart size
     * @param yCoordSvgTrans Y-coordinate translation which is needed to use SVG canvas having the whole chart size
     */
    update(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
    /**
     * Handles the dragging event. Updates the coordinates after dragging or resizing
     * @param xyValues {@link Point}
     */
    calcDragDistance(xyValues: Point): void;
    /**
     * @inheritDoc
     */
    protected create(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase, xCoordSvgTrans: number, yCoordSvgTrans: number): void;
    /**
     * Creates or updates an adorner for the annotation
     */
    protected updateAdornerInner(): void;
    protected checkIsClickedOnAnnotationInternal(x: number, y: number): boolean;
    private adjustLeftSideToLimits;
    private adjustRightSideToLimits;
    private adjustTopSideToLimits;
    private adjustBottomSideToLimits;
}
