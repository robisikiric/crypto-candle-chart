import { DeletableEntity } from "../../../Core/DeletableEntity";
import { EventHandler } from "../../../Core/EventHandler";
import { IHoverOptions } from "../../../Core/IHoverable";
import { Point } from "../../../Core/Point";
import { EXyDirection } from "../../../types/XyDirection";
import { ModifierMouseArgs } from "../../ChartModifiers/ModifierMouseArgs";
import { CoordinateCalculatorBase } from "../../Numerics/CoordinateCalculators/CoordinateCalculatorBase";
import { SciChartSurfaceBase } from "../SciChartSurfaceBase";
import { TDpiChangedEventArgs } from "../TextureManager/DpiHelper";
import { AnnotationClickEventArgs } from "./AnnotationClickEventArgs";
import { AnnotationDragDeltaEventArgs } from "./AnnotationDragDeltaEventArgs";
import { AnnotationHoverEventArgs } from "./AnnotationHoverEventArgs";
import { IAdornerProvider } from "./IAdornerProvider";
import { EAnnotationLayer, EAnnotationType, IAnnotation } from "./IAnnotation";
/**
 * Defines possible parts of an annotation which could be interacted with a cursor to do dragging or resizing
 */
export declare enum EDraggingGripPoint {
    /** x1,y1 */
    x1y1 = "x1y1",
    /** x2,y1 */
    x2y2 = "x2y2",
    /** x1,y2 */
    x2y1 = "x2y1",
    /** x2,y2 */
    x1y2 = "x1y2",
    Body = "Body"
}
/**
 * Options passed to the constructor of an {@link AnnotationBase}, used to configure it at instantiation time
 */
export interface IAnnotationBaseOptions {
    /**
     * A unique Id for the {@link IAnnotation}
     */
    id?: string;
    /**
     * @description The layer to place the annotation on. See {@link EAnnotationLayer} for a list of values
     * @remarks applicable only to WebGL annotations
     */
    annotationLayer?: EAnnotationLayer;
    /**
     * @description if true, the annotation is hidden
     */
    isHidden?: boolean;
    /**
     * @description set annotation resize direction
     */
    resizeDirections?: EXyDirection;
    /**
     * @description if true, the annotation is editable (can be dragged and manipulated by the user)
     */
    isEditable?: boolean;
    /**
     * @description the X1 coordinate of the annotation
     * @remarks The X1 coordinate obeys {@link xCoordinateMode} which defines whether the X1 coordinate is a pixel, data-value or relative coordinate
     */
    x1?: number;
    /**
     * @description the X2 coordinate of the annotation
     * @remarks The X1 coordinate obeys {@link xCoordinateMode} which defines whether the X2 coordinate is a pixel, data-value or relative coordinate
     */
    x2?: number;
    /**
     * @description the Y1 coordinate of the annotation
     * @remarks The Y1 coordinate obeys {@link xCoordinateMode} which defines whether the Y1 coordinate is a pixel, data-value or relative coordinate
     */
    y1?: number;
    /**
     * @description the Y2 coordinate of the annotation
     * @remarks The Y2 coordinate obeys {@link xCoordinateMode} which defines whether the Y2 coordinate is a pixel, data-value or relative coordinate
     */
    y2?: number;
    /**
     * @summary The current XAxis Id that this {@link IAnnotation} is bound to
     * @description By default all Annotations will draw on the first X,Y axis pair in SciChart.
     * If you want this to change, you must add a second axis to your {@link SciChartSurface} and link the {@link IAnnotation} by Axis Id.
     *
     * For example:
     * ```ts
     * const sciChartSurface: SciChartSurface;
     * const primaryXAxis = new NumericAxis(wasmContext); // Has Id = AxisCore.DEFAULT_AXIS_ID
     * const primaryYAxis = new NumericAxis(wasmContext); // Has Id = AxisCore.DEFAULT_AXIS_ID
     *
     * const secondaryXAxis = new NumericAxis(wasmContext); // For subsequent X,Y axis set an Id
     * secondaryXAxis.id = "SecondaryXAxis";
     * const secondaryYAxis = new NumericAxis(wasmContext);
     * secondaryYAxis.id = "SecondaryYAxis";
     *
     * // Add all Axis to the chart
     * sciChartSurface.xAxes.add(primaryXAxis);
     * sciChartSurface.yAxes.add(primaryYAxis);
     * sciChartSurface.xAxes.add(secondaryXAxis);
     * sciChartSurface.yAxes.add(secondaryYAxis);
     *
     * // Add an Annotation on the default axis
     * const annotation = new LineAnnotation(wasmContext); // xAxisId, yAxisId Defaults to AxisCore.DEFAULT_AXIS_ID
     * sciChartSurface.renderableSeries.add(annotation);
     *
     * // Add an Annotation on the specific axis
     * const annotation2 = new LineAnnotation(wasmContext);
     * annotation2.xAxisId = "SecondaryXAxis";
     * annotation2.yAxisId = "SecondaryYAxis";
     * sciChartSurface.renderableSeries.add(annotation2);
     * ```
     * @remarks The default value is set to {@link AxisCore.DEFAULT_AXIS_ID}.
     */
    xAxisId?: string;
    /**
     * The X-Coordinate mode. See {@link ECoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link ECoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    xCoordinateMode?: ECoordinateMode;
    /**
     * @summary The current YAxis Id that this {@link IAnnotation} is bound to
     * @description By default all Annotations will draw on the first X,Y axis pair in SciChart.
     * If you want this to change, you must add a second axis to your {@link SciChartSurface} and link the {@link IAnnotation} by Axis Id.
     *
     * For example:
     * ```ts
     * const sciChartSurface: SciChartSurface;
     * const primaryXAxis = new NumericAxis(wasmContext); // Has Id = AxisCore.DEFAULT_AXIS_ID
     * const primaryYAxis = new NumericAxis(wasmContext); // Has Id = AxisCore.DEFAULT_AXIS_ID
     *
     * const secondaryXAxis = new NumericAxis(wasmContext); // For subsequent X,Y axis set an Id
     * secondaryXAxis.id = "SecondaryXAxis";
     * const secondaryYAxis = new NumericAxis(wasmContext);
     * secondaryYAxis.id = "SecondaryYAxis";
     *
     * // Add all Axis to the chart
     * sciChartSurface.xAxes.add(primaryXAxis);
     * sciChartSurface.yAxes.add(primaryYAxis);
     * sciChartSurface.xAxes.add(secondaryXAxis);
     * sciChartSurface.yAxes.add(secondaryYAxis);
     *
     * // Add an Annotation on the default axis
     * const annotation = new LineAnnotation(wasmContext); // xAxisId, yAxisId Defaults to AxisCore.DEFAULT_AXIS_ID
     * sciChartSurface.renderableSeries.add(annotation);
     *
     * // Add an Annotation on the specific axis
     * const annotation2 = new LineAnnotation(wasmContext);
     * annotation2.xAxisId = "SecondaryXAxis";
     * annotation2.yAxisId = "SecondaryYAxis";
     * sciChartSurface.renderableSeries.add(annotation2);
     * ```
     * @remarks The default value is set to {@link AxisCore.DEFAULT_AXIS_ID}.
     */
    yAxisId?: string;
    /**
     * The Y-Coordinate mode. See {@link ECoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link ECoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    yCoordinateMode?: ECoordinateMode;
    /**
     * When true, the annotation is in the selected state
     */
    isSelected?: boolean;
    /**
     * Sets an opacity override for the entire annotation, from 0..1
     */
    opacity?: number;
    /**
     * Callback function called when drag has started. Only applicable if {@link isEditable} is true
     */
    onDragStarted?: (() => void) | string;
    /**
     * Callback function called when drag has ended. Only applicable if {@link isEditable} is true
     */
    onDragEnded?: (() => void) | string;
    /**
     * Callback function called when drag operation is in progress. Only applicable if {@link isEditable} is true
     */
    onDrag?: ((args: AnnotationDragDeltaEventArgs) => void) | string;
    /**
     * Callback function called when the annotation is clicked.  Fires even for non Editable annotations
     */
    onClick?: ((args: AnnotationClickEventArgs) => void) | string;
    /**
     * Callback function called when the annotation is hovered. Fires even for non Editable annotations
     */
    onHover?: ((args: AnnotationHoverEventArgs) => void) | string;
    /** The stroke color for the adorner drag handle */
    annotationsGripsStroke?: string;
    /** The fill color for the adorner drag handle */
    annotationsGripsFill?: string;
    /** The radius of the adorner drag handle */
    annotationsGripsRadius?: number;
    /** The stroke color for the adorner selection box */
    selectionBoxStroke?: string;
    /** How much bigger the selection box is than the bounding box of the annotation, in pixels */
    selectionBoxDelta?: number;
    /** The thickness of the selection box line */
    selectionBoxThickness?: number;
    /** The dragPoints that should be enabled for this annotation */
    dragPoints?: readonly EDraggingGripPoint[];
}
/**
 * Defines the CoordinateMode for {@link AnnotationBase | Annotations} within SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 */
export declare enum ECoordinateMode {
    /**
     * The {@link AnnotationBase.x1 | Annotation.x1}, {@link AnnotationBase.x2 | x2},
     * {@link AnnotationBase.y1 | y1}, {@link AnnotationBase.y2 | y2} coordinate is a data-value,
     * corresponding to the value on the {@link AxisBase2D | Axis} or in the
     * {@link IRenderableSeries.dataSeries | DataSeries}
     */
    DataValue = "DataValue",
    /**
     * The {@link AnnotationBase.x1 | Annotation.x1}, {@link AnnotationBase.x2 | x2},
     * {@link AnnotationBase.y1 | y1}, {@link AnnotationBase.y2 | y2} coordinate is a pixel coordinate,
     * corresponding to the distance from the top-left of the
     * {@link SciChartSurface}
     */
    Pixel = "Pixel",
    /**
     * The {@link AnnotationBase.x1 | Annotation.x1}, {@link AnnotationBase.x2 | x2},
     * {@link AnnotationBase.y1 | y1}, {@link AnnotationBase.y2 | y2} coordinate is relative,
     * where 0.0 corresponds to the left (or top) of the {@link SciChartSurface}
     * and 1.0 corresponds to the right (or bottom) of the {@link SciChartSurface}
     */
    Relative = "Relative"
}
/**
 * Defines the base class to an Annotation - a type of marker, text label, line or custom UI overlay on a 2D Cartesian {@link SciChartSurface}
 */
export declare abstract class AnnotationBase extends DeletableEntity implements IAnnotation, IAdornerProvider {
    dragStarted: EventHandler<void>;
    dragEnded: EventHandler<void>;
    dragDelta: EventHandler<AnnotationDragDeltaEventArgs>;
    showWarning: boolean;
    /** @inheritDoc */
    readonly id: string;
    /** @inheritDoc */
    abstract readonly type: EAnnotationType;
    /** @inheritDoc */
    readonly isSvgAnnotation: boolean;
    /** @inheritDoc */
    invalidateParentCallback: () => void;
    selectedChanged: EventHandler<boolean>;
    clicked: EventHandler<AnnotationClickEventArgs>;
    hovered: EventHandler<AnnotationHoverEventArgs>;
    protected adornerDraggingPointProperty: EDraggingGripPoint;
    protected svgAdorner: SVGElement;
    protected prevIsSelected: boolean;
    /** the annotation absolute coordinates */
    protected annotationBorders: {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };
    protected prevValue: {
        x: number;
        y: number;
    };
    protected typeMap: Map<string, string>;
    protected isHiddenProperty: boolean;
    protected annotationsGripsStrokeProperty: string;
    protected annotationsGripsFillProperty: string;
    protected annotationsGripsRadiusProperty: number;
    protected selectionBoxStrokeProperty: string;
    protected selectionBoxDeltaProperty: number;
    protected selectionBoxThicknessProperty: number;
    protected dragPointsProperty: readonly EDraggingGripPoint[];
    protected parentSurfaceProperty: SciChartSurfaceBase;
    private opacityProperty;
    private annotationLayerProperty;
    private isEditableProperty;
    private x1Property;
    private x2Property;
    private y1Property;
    private y2Property;
    private xAxisIdProperty;
    private yAxisIdProperty;
    private xCoordinateModeProperty;
    private yCoordinateModeProperty;
    private isSelectedProperty;
    private isHoveredProperty;
    private resizeDirectionsProperty;
    private svgAdornerRootProperty;
    protected invalidateState: {
        isHidden: boolean;
        x1: number;
        y1: number;
    };
    /** @inheritDoc */
    get annotationLayer(): EAnnotationLayer;
    /** @inheritDoc */
    set annotationLayer(annotationCanvas: EAnnotationLayer);
    /**
     * Gets or sets current {@link EDraggingGripPoint}
     */
    get adornerDraggingPoint(): EDraggingGripPoint;
    /**
     * Gets or sets current {@link EDraggingGripPoint}
     */
    set adornerDraggingPoint(value: EDraggingGripPoint);
    /** @inheritDoc */
    get parentSurface(): SciChartSurfaceBase;
    /** @inheritDoc */
    set parentSurface(parentSurface: SciChartSurfaceBase);
    /** @inheritDoc */
    get isEditable(): boolean;
    /** @inheritDoc */
    set isEditable(isEditable: boolean);
    /** @inheritDoc */
    get isHidden(): boolean;
    /** @inheritDoc */
    set isHidden(isHidden: boolean);
    /** @inheritDoc */
    get xCoordinateMode(): ECoordinateMode;
    /** @inheritDoc */
    set xCoordinateMode(xCoordinateMode: ECoordinateMode);
    /** @inheritDoc */
    get yCoordinateMode(): ECoordinateMode;
    /** @inheritDoc */
    set yCoordinateMode(yCoordinateMode: ECoordinateMode);
    /** @inheritDoc */
    get x1(): number;
    /** @inheritDoc */
    set x1(x1: number);
    /** @inheritDoc */
    get x2(): number;
    /** @inheritDoc */
    set x2(x2: number);
    /** @inheritDoc */
    get y1(): number;
    /** @inheritDoc */
    set y1(y1: number);
    /** @inheritDoc */
    get y2(): number;
    /** @inheritDoc */
    set y2(y2: number);
    /** @inheritDoc */
    get xAxisId(): string;
    /** @inheritDoc */
    set xAxisId(xAxisId: string);
    /** @inheritDoc */
    get yAxisId(): string;
    /** @inheritDoc */
    set yAxisId(yAxisId: string);
    /** @inheritDoc */
    get isVerticalChart(): boolean;
    /** @inheritDoc */
    set resizeDirections(value: EXyDirection);
    /** @inheritDoc */
    get resizeDirections(): EXyDirection;
    /** @inheritDoc */
    set isSelected(value: boolean);
    /** @inheritDoc */
    get isSelected(): boolean;
    /** @inheritDoc */
    get isHovered(): boolean;
    /** @inheritDoc */
    set isHovered(value: boolean);
    /** @inheritDoc */
    get annotationsGripsStroke(): string;
    /** @inheritDoc */
    set annotationsGripsStroke(color: string);
    /** @inheritDoc */
    get annotationsGripsFill(): string;
    /** @inheritDoc */
    set annotationsGripsFill(color: string);
    /** @inheritDoc */
    get annotationsGripsRadius(): number;
    /** @inheritDoc */
    set annotationsGripsRadius(radius: number);
    /** @inheritDoc */
    get selectionBoxStroke(): string;
    /** @inheritDoc */
    set selectionBoxStroke(color: string);
    /** @inheritDoc */
    get selectionBoxDelta(): number;
    /** @inheritDoc */
    set selectionBoxDelta(delta: number);
    /** @inheritDoc */
    get selectionBoxThickness(): number;
    /** @inheritDoc */
    set selectionBoxThickness(delta: number);
    get isDraggingStarted(): boolean;
    /** @inheritDoc */
    get opacity(): number;
    /** @inheritDoc */
    set opacity(opacity: number);
    protected get svgAdornerRoot(): SVGSVGElement;
    /**
     * Creates an instance of the Annotation
     * @param options optional parameters of type {@link IAnnotationBaseOptions} used to configure the annotation at construct time
     */
    protected constructor(options?: IAnnotationBaseOptions);
    /** @inheritDoc */
    onAttach(scs: SciChartSurfaceBase): void;
    /** @inheritDoc */
    onDetach(): void;
    /** Get the dragging points that should be enabled for this annotation */
    get dragPoints(): readonly EDraggingGripPoint[];
    /** Set the dragging points that should be enabled for this annotation */
    set dragPoints(dragPoints: readonly EDraggingGripPoint[]);
    /** @inheritDoc */
    abstract delete(): void;
    /** Calculates if the annotation is hovered with the specified args*/
    checkIsWithinBounds(args: ModifierMouseArgs): boolean;
    /** Sends hover/leave action to the annotation */
    hover(options: IHoverOptions): void;
    /** Called internally. Send a click to the annotation if the point is in bounds, raising the clicked event and optionally selecting the annotation. */
    click(args: ModifierMouseArgs, selectOnClick: boolean): boolean;
    /** Called internally. Select the annotation if the point is in bounds.  Does not raise the clicked event */
    clickToSelect(args: ModifierMouseArgs): boolean;
    calcDragDistance(xyPoint: Point): void;
    onDragStarted(args: ModifierMouseArgs): boolean;
    checkIsClickedOnAnnotation(x: number, y: number): boolean;
    onDragAdorner(args: ModifierMouseArgs): void;
    onDragEnded(): void;
    /**
     * @inheritDoc
     */
    onDpiChanged(args: TDpiChangedEventArgs): void;
    /** Internal use. Captures the state of isHidden,x1,y1 and prevents invalidateParent being called on change to these properties */
    suspendInvalidate(): void;
    /** Internal use. If isHidden,x1,y1 have change since suspendInvalidate was called, call invalidateParent */
    resumeInvalidate(): void;
    toJSON(): {
        type: EAnnotationType;
        options: Required<Omit<IAnnotationBaseOptions, never>>;
    };
    /**
     * Returns annotationBorders
     * @param ordered flag to return x and y values in ascending order, where x1 <= x2 and y1 <= y2
     */
    getAnnotationBorders(ordered?: boolean, applyDelta?: boolean): {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };
    /**
     * Returns annotation borders for the {@link AdornerLayer} which has the size of the whole canvas
     * @param ordered flag to return x and y values in ascending order
     */
    getAdornerAnnotationBorders(ordered?: boolean, applyDelta?: boolean): {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };
    /** Get svg for the adorner grip handles for standard annotations */
    getAnnotationGripSvg(x: number, y: number): string;
    /** Override this to disable drag behaviour for certain dragging points */
    canDragPoint(dragPoint: EDraggingGripPoint): boolean;
    /**
     * Gets the svg string for the adorner for standard annotations.  Called by updateAdornerInner.
     * Coordinates passed in are the top left and bottom right of the bounding box.
     * To get the bounding coordinates in their original order call this.getAdornerAnnotationBorders(false, true);
     */
    svgStringAdornerTemplate(x1: number, y1: number, x2: number, y2: number): string;
    /**
     * Updates adorner layer for the annotation
     * @protected
     */
    protected abstract updateAdornerInner(): void;
    /**
     * @summary Notifies subscribers of {@link AnnotationBase.propertyChanged} that a property has changed and the chart requires redrawing
     * @description SciChart provides fully reactive components, changing any property or changing data will cause the {@link AnnotationBase} to
     * redraw where necessary. This method notifies subscribers of the {@link AnnotationBase.propertyChanged} {@link EventHandler}
     * that a property has changed.
     * @param propertyName The name of the property which has changed
     */
    protected notifyPropertyChanged(propertyName: string): void;
    /**
     * Converts a value (e.g. from {@link x1}, {@link x2}, {@link y1} or {@link y2}) into a pixel coordinate
     * @param value - the value to convert
     * @param calculator the {@link CoordinateCalculatorBase} which will do the transformation
     * @param coordinateMode the {@link ECoordinateMode} to apply
     * @returns the pixel coordinate
     */
    protected getCoordinate(value: number, calculator: CoordinateCalculatorBase, coordinateMode: ECoordinateMode): number;
    /**
     * Returns the pixel X1 coordinate
     * @param xCalc the X {@link CoordinateCalculatorBase} which will do the transformation
     * @param yCalc the Y {@link CoordinateCalculatorBase} which will do the transformation
     * @returns the pixel X1 coordinate
     */
    protected getX1Coordinate(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase): number;
    /**
     * Returns the pixel X2 coordinate
     * @param xCalc the X {@link CoordinateCalculatorBase} which will do the transformation
     * @param yCalc the Y {@link CoordinateCalculatorBase} which will do the transformation
     * @returns the pixel X2 coordinate
     */
    protected getX2Coordinate(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase): number;
    /**
     * Returns the pixel Y1 coordinate
     * @param xCalc the X {@link CoordinateCalculatorBase} which will do the transformation
     * @param yCalc the Y {@link CoordinateCalculatorBase} which will do the transformation
     * @returns the pixel Y1 coordinate
     */
    protected getY1Coordinate(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase): number;
    /**
     * Returns the pixel Y2 coordinate
     * @param xCalc the X {@link CoordinateCalculatorBase} which will do the transformation
     * @param yCalc the Y {@link CoordinateCalculatorBase} which will do the transformation
     * @returns the pixel Y2 coordinate
     */
    protected getY2Coordinate(xCalc: CoordinateCalculatorBase, yCalc: CoordinateCalculatorBase): number;
    /**
     * Converts a pixel coordinate back to a value
     * @param value - coordinate or dataValue to convert
     * @param calculator the {@link CoordinateCalculatorBase} which will do the transformation
     * @param coordinateMode the {@link ECoordinateMode} to apply
     * @returns the data-value or value
     */
    protected getValue(value: number, calculator: CoordinateCalculatorBase, coordinateMode: ECoordinateMode): number;
    protected checkIsClickedOnAnnotationInternal(x: number, y: number): boolean;
    protected deleteAdorner(): void;
    /**
     * Transforms an absolute coordinates point to the corresponding value point.
     * The value point has x and y converted accordingly to the the coordinate modes {@link xCoordinateMode} and {@link yCoordinateMode}
     * @param point
     * @param translateToSeriesViewRect defines if the coordinates should be projected from the Canvas to SeriesViewRect
     * @returns a point with coordinates  {@link ECoordinateMode}
     */
    protected getValuesFromCoordinates(point: Point, translateToSeriesViewRect: boolean): Point;
    protected getXYCoordinatesFromValues(xyDataPoint: Point): Point;
    /**
     * Converts an absolute coordinate to a value which could be in form of DataValue, Pixel, or Relative coordinate
     * @param value - an absolute coordinate to convert
     * @param calculator the {@link CoordinateCalculatorBase} which will do the transformation
     * @param coordinateMode the expected {@link ECoordinateMode} of the converted point
     * @returns the data-value, pixel, or relative value accordingly to the coordinateMode
     */
    protected convertFromCoordinate(value: number, calculator: CoordinateCalculatorBase, coordinateMode: ECoordinateMode): number;
    /**
     *  Calculates coordinates in pixels of the specified Point.
     *  Uses the {@link xCoordinateMode} (or {@link yCoordinateMode} for vertical chart)
     * @param point
     */
    protected getAbsoluteCoordinates(point: Point): Point;
    /**
     *  Calculates coordinates in pixels of the specified Point.
     *  Uses the {@link xCoordinateMode} (or {@link yCoordinateMode} for vertical chart)
     * @param value
     */
    protected getAbsoluteHorizontalCoordinate(value: number): number;
    /**
     *  Calculates coordinate in pixels of the specified value in the vertical dimension.
     *  Uses the {@link yCoordinateMode} (or {@link xCoordinateMode} for vertical chart)
     * @param value
     */
    protected getAbsoluteVerticalCoordinate(value: number): number;
    /**
     * Sets annotationBorders
     * For renderContext annotations it is scaled and for SVG annotations it is not
     * For example if we have a macbook with retina display and canvas.width = 1600px, canvas.height = 1200px,
     * canvas.style.width = 800px, canvas.style.height = 600px
     * If we have {@link BoxAnnotation} (renderContext) which takes 50% width and height, located in the left-top corner
     * it should have annotationBorders as follows x1 = 0, x2 = 800, y1 = 0, y2 = 600
     * But if we have {@link CustomAnnotation} (SVG) which takes 50% width and height, located in the left-top corner
     * it should have annotationBorders as follows x1 = 0, x2 = 400, y1 = 0, y2 = 300
     * @protected
     */
    protected setAnnotationBorders(x1: number, x2: number, y1: number, y2: number): void;
}
