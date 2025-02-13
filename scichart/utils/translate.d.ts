/**
 * @description Translates Canvas coordinates to coordinates for seriesViewRect
 * @param point
 */
import { AxisBase2D } from "../Charting/Visuals/Axis/AxisBase2D";
import { Point } from "../Core/Point";
import { Rect } from "../Core/Rect";
/**
 * Translates from canvas to seriesViewRect screen coordinates
 * @param point
 * @param seriesViewRect
 * @param allowValuesOutOfBounds will translate even if the point is outside of the seriesViewRect
 */
export declare const translateFromCanvasToSeriesViewRect: (point: Point, seriesViewRect: Rect, allowValuesOutOfBounds?: boolean) => Point;
/**
 * Translates from seriesViewRect to canvas screen coordinates
 * @param point
 * @param seriesViewRect
 * @param allowValuesOutOfBounds will translate even if the point is outside of the seriesViewRect
 */
export declare const translateFromSeriesViewRectToCanvas: (point: Point, seriesViewRect: Rect, allowValuesOutOfBounds?: boolean) => Point;
export declare const translateFromCanvasToSeriesViewRectX: (x: number, seriesViewRect: Rect, allowValuesOutOfBounds?: boolean) => number;
export declare const translateFromCanvasToSeriesViewRectY: (y: number, seriesViewRect: Rect, allowValuesOutOfBounds?: boolean) => number;
export declare const translateFromSeriesViewRectToCanvasX: (x: number, seriesViewRect: Rect, allowValuesOutOfBounds?: boolean) => number;
export declare const translateFromSeriesViewRectToCanvasY: (y: number, seriesViewRect: Rect, allowValuesOutOfBounds?: boolean) => number;
export declare const translateToNotScaled: (value: number) => number;
export declare const translateDataValueRectToAbsolute: (originalRect: Rect, xAxis: AxisBase2D, yAxis: AxisBase2D, seriesViewRect: Rect) => Rect;
export declare const convertToHtmlPx: (value: number) => string;
export declare const convertToRelativeHtmlSize: (value: number) => string;
export declare const fitElementToViewRect: (element: HTMLElement | SVGSVGElement, viewRect: Rect) => void;
export declare const fitSvgToViewRect: (svgElement: SVGSVGElement, viewRect: Rect) => void;
