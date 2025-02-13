import { IDeletable } from "../../../Core/IDeletable";
import { IHoverable } from "../../../Core/IHoverable";
import { SciChartSurfaceBase } from "../SciChartSurfaceBase";
import { INotifyOnDpiChanged } from "../TextureManager/DpiHelper";
import { ECoordinateMode } from "./AnnotationBase";
/**
 * Defines the layer where {@link IAnnotation | Annotations} are drawn
 * when added to the {@link SciChartSurface.annotations} collection
 */
export declare enum EAnnotationLayer {
    /**
     * The {@link IAnnotation | Annotation} will be displayed above the chart series and grid
     * @remarks
     * This is the default value for {@link IAnnotation | Annotations}
     */
    AboveChart = "AboveChart",
    /**
     * The {@link IAnnotation | Annotation} will be displayed below the chart series and grid.
     * @remarks
     * Doesn't work with SVG (Custom) annotations.
     *
     * Use this for watermarks, e.g. showing an image or text behind the chart.
     * The Grid lines and Axis Bands will show over the annotation,
     * so consider setting {@link AxisCore.axisBandsFill} to a semi-transparent color to avoid this.
     */
    BelowChart = "BelowChart",
    /**
     * The {@link IAnnotation | Annotation} will be displayed below the chart grid lines, bands, and axes.
     * @remarks
     * Use this for custom background behind the chart.
     */
    Background = "Background"
}
/**
 * Defines the type of {@link IAnnotation | Annotation}.
 * Annotations are overlays or markers added to the {@link SciChartSurface.annotations} collection
 */
export declare enum EAnnotationType {
    /**
     * The Annotation is an {@link SvgAnnotationBase | SvgAnnotation}
     * @remarks
     * {@link SvgAnnotationBase | SvgAnnotations} are drawn using SVG where available.
     * This allows for more flexible annotations over the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript Chart},
     * such as text or other custom shapes
     * This is a base type for various internal annotations.  Do not use in Chart Builder
     */
    SVG = "SVG",
    /**
     * The Annotation is an {@link BoxAnnotation | BoxAnnotation}
     * @remarks
     * {@link BoxAnnotation | BoxAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link SvgAnnotationBase | SvgAnnotations} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    RenderContextBoxAnnotation = "RenderContextBoxAnnotation",
    /**
     * The Annotation is an {@link LineAnnotation | LineAnnotation}
     * @remarks
     * {@link LineAnnotation | BoxAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link SvgAnnotationBase | SvgAnnotations} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    RenderContextLineAnnotation = "RenderContextLineAnnotation",
    /**
     * The Annotation is an {@link HorizontalLineAnnotation | HorizontalLineAnnotation}
     * @remarks
     * {@link HorizontalLineAnnotation | HorizontalLineAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link SvgAnnotationBase | SvgAnnotations} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    RenderContextHorizontalLineAnnotation = "RenderContextHorizontalLineAnnotation",
    /**
     * The Annotation is an {@link VerticalLineAnnotation | VerticalLineAnnotation}
     * @remarks
     * {@link VerticalLineAnnotation | VerticalLineAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link SvgAnnotationBase | SvgAnnotations} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    RenderContextVerticalLineAnnotation = "RenderContextVerticalLineAnnotation",
    /**
     * The Annotation is an {@link AxisMarkerAnnotation | AxisMarkerAnnotation}
     * @remarks
     * {@link AxisMarkerAnnotation | AxisMarkerAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link SvgAnnotationBase | SvgAnnotations} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    RenderContextAxisMarkerAnnotation = "RenderContextAxisMarkerAnnotation",
    /**
     * The Annotation is an {@link NativeTextAnnotation | NativeTextAnnotation}
     * @remarks
     * {@link NativeTextAnnotation | NativeTextAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link TextAnnotation | TextAnnotation} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    RenderContextNativeTextAnnotation = "RenderContextNativeTextAnnotation",
    /**
     * The Annotation is an {@link TextAnnotation | TextAnnotation}
     * @remarks
     * {@link SvgAnnotationBase | SvgAnnotations} are drawn using SVG where available.
     * This allows for more flexible annotations over the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript Chart},
     * such as text or other custom shapes
     */
    SVGTextAnnotation = "SVGTextAnnotation",
    /**
     * The Annotation is an {@link SVGCustomAnnotation | SVGCustomAnnotation}
     * @remarks
     * {@link SvgAnnotationBase | SvgAnnotations} are drawn using SVG where available.
     * This allows for more flexible annotations over the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript Chart},
     * such as text or other custom shapes
     */
    SVGCustomAnnotation = "SVGCustomAnnotation"
}
/**
 * Defines the interface to an Annotation - a type of marker, text label, line or custom UI overlay on a 2D Cartesian {@link SciChartSurface}
 */
export interface IAnnotation extends IDeletable, INotifyOnDpiChanged, IHoverable {
    /**
     * A unique Id for the {@link IAnnotation}
     */
    readonly id: string;
    /**
     * @description annotation type. See {@link EAnnotationType} for a list of values
     */
    readonly type: EAnnotationType;
    /**
     * @description defines if the annotations is SVG annotation or RenderContext annotation
     */
    readonly isSvgAnnotation: boolean;
    /**
     * @description The layer to place the annotation on. See {@link EAnnotationLayer} for a list of values
     * @remarks applicable only to WebGL annotations
     */
    annotationLayer: EAnnotationLayer;
    /**
     * @description callback which notifies the parent {@link SciChartSurface} it's time to draw
     */
    invalidateParentCallback: () => void;
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
    xAxisId: string;
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
    yAxisId: string;
    /**
     * @description the X1 coordinate of the annotation
     * @remarks The X1 coordinate obeys {@link xCoordinateMode} which defines whether the X1 coordinate is a pixel, data-value or relative coordinate
     */
    x1: number;
    /**
     * @description the X2 coordinate of the annotation
     * @remarks The X1 coordinate obeys {@link xCoordinateMode} which defines whether the X2 coordinate is a pixel, data-value or relative coordinate
     */
    x2: number;
    /**
     * @description the Y1 coordinate of the annotation
     * @remarks The Y1 coordinate obeys {@link xCoordinateMode} which defines whether the Y1 coordinate is a pixel, data-value or relative coordinate
     */
    y1: number;
    /**
     * @description the Y2 coordinate of the annotation
     * @remarks The Y2 coordinate obeys {@link xCoordinateMode} which defines whether the Y2 coordinate is a pixel, data-value or relative coordinate
     */
    y2: number;
    /**
     * The X-Coordinate mode. See {@link ECoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link ECoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    xCoordinateMode: ECoordinateMode;
    /**
     * The Y-Coordinate mode. See {@link ECoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link ECoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    yCoordinateMode: ECoordinateMode;
    /**
     * @description if true, the annotation is editable (can be dragged and manipulated by the user)
     */
    isEditable: boolean;
    /**
     * @description if true, the annotation is hidden
     */
    isHidden: boolean;
    /**
     * @description the parent SciChartSurfaceBase for this annotation
     */
    parentSurface: SciChartSurfaceBase;
    /**
     * @description if true, the chart is vertical
     */
    isVerticalChart: boolean;
    /**
     * @description When true, the annotation is selected and resize adorners will be displayed
     */
    isSelected: boolean;
    /**
     * Sets an opacity override for the entire annotation, from 0..1
     */
    opacity: number;
    /**
     * @description Called when the annotation is attached to a parent SciChartSurface.
     */
    onAttach(scs: SciChartSurfaceBase): void;
    /**
     * @description Called when the annotation is detached from a parent SciChartSurface.
     */
    onDetach(): void;
    /**
     * Convert the object to a definition that can be serialized to JSON, or used directly with the builder api
     */
    toJSON(): any;
    /**
     * Checks if passed point on the canvas is inside annotation borders
     * @param x the X screen coordinate relative to canvas
     * @param y the Y screen coordinate relative to canvas
     */
    checkIsClickedOnAnnotation(x: number, y: number): boolean;
}
