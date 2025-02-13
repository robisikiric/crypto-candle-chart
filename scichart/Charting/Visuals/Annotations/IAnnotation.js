"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAnnotationType = exports.EAnnotationLayer = void 0;
/**
 * Defines the layer where {@link IAnnotation | Annotations} are drawn
 * when added to the {@link SciChartSurface.annotations} collection
 */
var EAnnotationLayer;
(function (EAnnotationLayer) {
    /**
     * The {@link IAnnotation | Annotation} will be displayed above the chart series and grid
     * @remarks
     * This is the default value for {@link IAnnotation | Annotations}
     */
    EAnnotationLayer["AboveChart"] = "AboveChart";
    /**
     * The {@link IAnnotation | Annotation} will be displayed below the chart series and grid.
     * @remarks
     * Doesn't work with SVG (Custom) annotations.
     *
     * Use this for watermarks, e.g. showing an image or text behind the chart.
     * The Grid lines and Axis Bands will show over the annotation,
     * so consider setting {@link AxisCore.axisBandsFill} to a semi-transparent color to avoid this.
     */
    EAnnotationLayer["BelowChart"] = "BelowChart";
    /**
     * The {@link IAnnotation | Annotation} will be displayed below the chart grid lines, bands, and axes.
     * @remarks
     * Use this for custom background behind the chart.
     */
    EAnnotationLayer["Background"] = "Background";
})(EAnnotationLayer = exports.EAnnotationLayer || (exports.EAnnotationLayer = {}));
/**
 * Defines the type of {@link IAnnotation | Annotation}.
 * Annotations are overlays or markers added to the {@link SciChartSurface.annotations} collection
 */
var EAnnotationType;
(function (EAnnotationType) {
    /**
     * The Annotation is an {@link SvgAnnotationBase | SvgAnnotation}
     * @remarks
     * {@link SvgAnnotationBase | SvgAnnotations} are drawn using SVG where available.
     * This allows for more flexible annotations over the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript Chart},
     * such as text or other custom shapes
     * This is a base type for various internal annotations.  Do not use in Chart Builder
     */
    EAnnotationType["SVG"] = "SVG";
    /**
     * The Annotation is an {@link BoxAnnotation | BoxAnnotation}
     * @remarks
     * {@link BoxAnnotation | BoxAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link SvgAnnotationBase | SvgAnnotations} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    EAnnotationType["RenderContextBoxAnnotation"] = "RenderContextBoxAnnotation";
    /**
     * The Annotation is an {@link LineAnnotation | LineAnnotation}
     * @remarks
     * {@link LineAnnotation | BoxAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link SvgAnnotationBase | SvgAnnotations} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    EAnnotationType["RenderContextLineAnnotation"] = "RenderContextLineAnnotation";
    /**
     * The Annotation is an {@link HorizontalLineAnnotation | HorizontalLineAnnotation}
     * @remarks
     * {@link HorizontalLineAnnotation | HorizontalLineAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link SvgAnnotationBase | SvgAnnotations} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    EAnnotationType["RenderContextHorizontalLineAnnotation"] = "RenderContextHorizontalLineAnnotation";
    /**
     * The Annotation is an {@link VerticalLineAnnotation | VerticalLineAnnotation}
     * @remarks
     * {@link VerticalLineAnnotation | VerticalLineAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link SvgAnnotationBase | SvgAnnotations} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    EAnnotationType["RenderContextVerticalLineAnnotation"] = "RenderContextVerticalLineAnnotation";
    /**
     * The Annotation is an {@link AxisMarkerAnnotation | AxisMarkerAnnotation}
     * @remarks
     * {@link AxisMarkerAnnotation | AxisMarkerAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link SvgAnnotationBase | SvgAnnotations} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    EAnnotationType["RenderContextAxisMarkerAnnotation"] = "RenderContextAxisMarkerAnnotation";
    /**
     * The Annotation is an {@link NativeTextAnnotation | NativeTextAnnotation}
     * @remarks
     * {@link NativeTextAnnotation | NativeTextAnnotation} * are drawn on the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript chart} using WebGL2 where available.
     * They differ from {@link TextAnnotation | TextAnnotation} which use slower,
     * but more flexible SVG to draw annotations on the chart
     */
    EAnnotationType["RenderContextNativeTextAnnotation"] = "RenderContextNativeTextAnnotation";
    /**
     * The Annotation is an {@link TextAnnotation | TextAnnotation}
     * @remarks
     * {@link SvgAnnotationBase | SvgAnnotations} are drawn using SVG where available.
     * This allows for more flexible annotations over the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript Chart},
     * such as text or other custom shapes
     */
    EAnnotationType["SVGTextAnnotation"] = "SVGTextAnnotation";
    /**
     * The Annotation is an {@link SVGCustomAnnotation | SVGCustomAnnotation}
     * @remarks
     * {@link SvgAnnotationBase | SvgAnnotations} are drawn using SVG where available.
     * This allows for more flexible annotations over the
     * {@link https://www.scichart.com/javascript-chart-features | Javascript Chart},
     * such as text or other custom shapes
     */
    EAnnotationType["SVGCustomAnnotation"] = "SVGCustomAnnotation";
})(EAnnotationType = exports.EAnnotationType || (exports.EAnnotationType = {}));
