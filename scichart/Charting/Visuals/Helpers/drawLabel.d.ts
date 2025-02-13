import { Rect } from "../../../Core/Rect";
import { EHorizontalAlignment, ELabelPlacement, EVerticalAlignment } from "../../../types/LabelPlacement";
import { IPen2D } from "../../Drawing/IPen2D";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { AxisBase2D } from "../Axis/AxisBase2D";
import { TTextStyle } from "../Axis/AxisCore";
export declare const drawModifiersAxisLabel: (currentAxis: AxisBase2D, renderContext: WebGlRenderContext2D, labelCoord: number, fill: string, stroke: string) => Rect;
/**
 * Function to draw Vertical or Horizontal Line annotations with labels
 */
export declare const drawLineAnnotation: (currentAxis: AxisBase2D, renderContext: WebGlRenderContext2D, labelPlacement: ELabelPlacement, displayValue: string, x1Coord: number, x2Coord: number, y1Coord: number, y2Coord: number, textStyle: TTextStyle, fill: string, strokePen: IPen2D, viewRect: Rect, showLabel: boolean, opacity: number, horizontalAlignment?: EHorizontalAlignment, verticalAlignment?: EVerticalAlignment) => Rect;
export declare const drawAxisMarkerAnnotation: (currentAxis: AxisBase2D, renderContext: WebGlRenderContext2D, displayValue: string, markerCoordinate: number, x1Coord: number, y1Coord: number, textStyle: TTextStyle, fill: string, opacity: number, image: HTMLImageElement, imageWidth: number, imageHeight: number) => {
    xPosition: number;
    yPosition: number;
    textureWidth: number;
    textureHeight: number;
};
/**
 * Calculates coordinates of the annotation label.
 * The coordinates are defined as an absolute position on the whole SciChartSurface.
 */
export declare const getLabelCoordinates: (currentAxis: AxisBase2D, labelPlacement: ELabelPlacement, x1Coord: number, x2Coord: number, y1Coord: number, y2Coord: number, textureHeight: number, textureWidth: number, horizontalAlignment?: EHorizontalAlignment, verticalAlignment?: EVerticalAlignment) => {
    xPosition: number;
    yPosition: number;
};
