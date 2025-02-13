"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabelCoordinates = exports.drawAxisMarkerAnnotation = exports.drawLineAnnotation = exports.drawModifiersAxisLabel = void 0;
var Rect_1 = require("../../../Core/Rect");
var AxisAlignment_1 = require("../../../types/AxisAlignment");
var LabelPlacement_1 = require("../../../types/LabelPlacement");
var drawModifiersAxisLabel = function (currentAxis, renderContext, labelCoord, fill, stroke) {
    if (!currentAxis.isVisible) {
        return undefined;
    }
    var formattedDataValue = getLabelValue(currentAxis, labelCoord);
    var textStyle = __assign(__assign({}, currentAxis.dpiAdjustedLabelStyle), { color: stroke });
    return currentAxis.axisRenderer.drawModifiersAxisLabel(renderContext, formattedDataValue, labelCoord, currentAxis.axisAlignment, textStyle, fill);
};
exports.drawModifiersAxisLabel = drawModifiersAxisLabel;
/**
 * Function to draw Vertical or Horizontal Line annotations with labels
 */
var drawLineAnnotation = function (currentAxis, renderContext, labelPlacement, displayValue, x1Coord, x2Coord, y1Coord, y2Coord, textStyle, fill, strokePen, viewRect, showLabel, opacity, horizontalAlignment, verticalAlignment) {
    var nativeContext = renderContext.getNativeContext();
    var axisAlignment = currentAxis.axisAlignment;
    var displayVertically = (axisAlignment === AxisAlignment_1.EAxisAlignment.Top || axisAlignment === AxisAlignment_1.EAxisAlignment.Bottom) &&
        ![LabelPlacement_1.ELabelPlacement.Top, LabelPlacement_1.ELabelPlacement.Bottom, LabelPlacement_1.ELabelPlacement.Auto, LabelPlacement_1.ELabelPlacement.Axis].includes(labelPlacement);
    var displayMirrored = [LabelPlacement_1.ELabelPlacement.Right, LabelPlacement_1.ELabelPlacement.TopRight, LabelPlacement_1.ELabelPlacement.BottomRight].includes(labelPlacement);
    var annotationCoord = axisAlignment === AxisAlignment_1.EAxisAlignment.Top || axisAlignment === AxisAlignment_1.EAxisAlignment.Bottom ? x1Coord : y1Coord;
    var text = displayValue || getLabelValue(currentAxis, annotationCoord);
    var isLabelOnAxis = labelPlacement === LabelPlacement_1.ELabelPlacement.Auto || labelPlacement === LabelPlacement_1.ELabelPlacement.Axis;
    var labelBackgroundColor = isLabelOnAxis ? fill : null;
    var labelTextStyle = isLabelOnAxis ? textStyle : __assign(__assign({}, textStyle), { color: fill });
    var labelHeight = 0;
    var labelWidth = 0;
    var labelRect;
    var _a = getLineCoordinates(x1Coord, y1Coord, x2Coord, y2Coord, labelHeight, labelWidth, labelPlacement, currentAxis), x1LineCoord = _a.x1LineCoord, y1LineCoord = _a.y1LineCoord, x2LineCoord = _a.x2LineCoord, y2LineCoord = _a.y2LineCoord;
    if (strokePen) {
        renderContext.drawLine(x1LineCoord, y1LineCoord, x2LineCoord, y2LineCoord, strokePen, viewRect);
    }
    if (showLabel) {
        var _b = currentAxis.axisRenderer.createAnnotationLabelTexture(text, labelTextStyle, labelBackgroundColor, displayVertically, displayMirrored, opacity), bitmapTexture = _b.bitmapTexture, textureHeight = _b.textureHeight, textureWidth = _b.textureWidth;
        var _c = (0, exports.getLabelCoordinates)(currentAxis, labelPlacement, x1Coord, x2Coord, y1Coord, y2Coord, textureHeight, textureWidth, horizontalAlignment, verticalAlignment), xPosition = _c.xPosition, yPosition = _c.yPosition;
        labelHeight = textureHeight;
        labelWidth = textureWidth;
        labelRect = new Rect_1.Rect(xPosition, yPosition, textureWidth, textureHeight);
        nativeContext.DrawTexture(bitmapTexture, Math.round(xPosition), Math.round(yPosition), textureWidth, textureHeight);
        bitmapTexture.delete();
    }
    return labelRect;
};
exports.drawLineAnnotation = drawLineAnnotation;
var drawAxisMarkerAnnotation = function (currentAxis, renderContext, displayValue, markerCoordinate, x1Coord, y1Coord, textStyle, fill, opacity, image, imageWidth, imageHeight) {
    var nativeContext = renderContext.getNativeContext();
    var axisAlignment = currentAxis.axisAlignment;
    var text = displayValue || getLabelValue(currentAxis, markerCoordinate);
    var _a = image
        ? currentAxis.axisRenderer.createAxisMarkerFromImage(image, imageWidth, imageHeight)
        : currentAxis.axisRenderer.createAxisMarker(axisAlignment, text, textStyle, fill, opacity), bitmapTexture = _a.bitmapTexture, textureHeight = _a.textureHeight, textureWidth = _a.textureWidth;
    var _b = (0, exports.getLabelCoordinates)(currentAxis, LabelPlacement_1.ELabelPlacement.Axis, x1Coord, x1Coord, y1Coord, y1Coord, textureHeight, textureWidth), xPosition = _b.xPosition, yPosition = _b.yPosition;
    if (bitmapTexture) {
        nativeContext.DrawTexture(bitmapTexture, Math.round(xPosition), Math.round(yPosition), textureWidth, textureHeight);
        bitmapTexture.delete();
    }
    return { xPosition: xPosition, yPosition: yPosition, textureWidth: textureWidth, textureHeight: textureHeight };
};
exports.drawAxisMarkerAnnotation = drawAxisMarkerAnnotation;
/**
 * Calculates coordinates of the annotation label.
 * The coordinates are defined as an absolute position on the whole SciChartSurface.
 */
var getLabelCoordinates = function (currentAxis, labelPlacement, x1Coord, x2Coord, y1Coord, y2Coord, textureHeight, textureWidth, horizontalAlignment, verticalAlignment) {
    var axisAlignment = currentAxis.axisAlignment, seriesViewRect = currentAxis.parentSurface.seriesViewRect, axisViewRect = currentAxis.viewRect;
    var xPosition = 0;
    var yPosition = 0;
    var centerVertically = function () {
        switch (axisAlignment) {
            case AxisAlignment_1.EAxisAlignment.Right:
            case AxisAlignment_1.EAxisAlignment.Left:
                yPosition = seriesViewRect.top + y1Coord - textureHeight / 2;
                break;
            case AxisAlignment_1.EAxisAlignment.Top:
                yPosition = seriesViewRect.top + y2Coord / 2 - textureHeight / 2;
                break;
            case AxisAlignment_1.EAxisAlignment.Bottom:
                yPosition = seriesViewRect.top + y1Coord + (y2Coord - y1Coord) / 2 - textureHeight / 2;
                break;
        }
    };
    var centerHorizontally = function () {
        switch (axisAlignment) {
            case AxisAlignment_1.EAxisAlignment.Right:
                xPosition = seriesViewRect.left + x2Coord + (x1Coord - x2Coord) / 2 - textureWidth / 2;
                break;
            case AxisAlignment_1.EAxisAlignment.Left:
                xPosition = seriesViewRect.left + x2Coord / 2 - textureWidth / 2;
                break;
            case AxisAlignment_1.EAxisAlignment.Top:
            case AxisAlignment_1.EAxisAlignment.Bottom:
                xPosition = seriesViewRect.left + x2Coord - textureWidth / 2;
                break;
        }
    };
    var alignRight = function () {
        switch (axisAlignment) {
            case AxisAlignment_1.EAxisAlignment.Right:
                xPosition = seriesViewRect.left + x1Coord - textureWidth;
                break;
            case AxisAlignment_1.EAxisAlignment.Left:
                xPosition = seriesViewRect.left + x2Coord - textureWidth;
                break;
            case AxisAlignment_1.EAxisAlignment.Top:
            case AxisAlignment_1.EAxisAlignment.Bottom:
                xPosition = seriesViewRect.left + x1Coord;
                break;
        }
    };
    var alignLeft = function () {
        switch (axisAlignment) {
            case AxisAlignment_1.EAxisAlignment.Right:
                xPosition = seriesViewRect.left + x2Coord;
                break;
            case AxisAlignment_1.EAxisAlignment.Left:
                xPosition = seriesViewRect.left;
                break;
            case AxisAlignment_1.EAxisAlignment.Top:
            case AxisAlignment_1.EAxisAlignment.Bottom:
                xPosition = seriesViewRect.left + x1Coord - textureWidth;
                break;
        }
    };
    var alignTop = function () {
        switch (axisAlignment) {
            case AxisAlignment_1.EAxisAlignment.Right:
            case AxisAlignment_1.EAxisAlignment.Left:
                yPosition = seriesViewRect.top + y1Coord - textureHeight;
                break;
            case AxisAlignment_1.EAxisAlignment.Top:
                yPosition = seriesViewRect.top;
                break;
            case AxisAlignment_1.EAxisAlignment.Bottom:
                yPosition = seriesViewRect.top + y2Coord;
                break;
        }
    };
    var alignBottom = function () {
        switch (axisAlignment) {
            case AxisAlignment_1.EAxisAlignment.Right:
            case AxisAlignment_1.EAxisAlignment.Left:
                yPosition = seriesViewRect.top + y1Coord;
                break;
            case AxisAlignment_1.EAxisAlignment.Top:
                yPosition = seriesViewRect.top + y2Coord - textureHeight;
                break;
            case AxisAlignment_1.EAxisAlignment.Bottom:
                yPosition = seriesViewRect.top + y1Coord - textureHeight;
                break;
        }
    };
    var alignOnAxis = function () {
        switch (axisAlignment) {
            case AxisAlignment_1.EAxisAlignment.Right:
                centerVertically();
                if (horizontalAlignment === LabelPlacement_1.EHorizontalAlignment.Left) {
                    xPosition = seriesViewRect.left;
                }
                else {
                    xPosition =
                        axisViewRect.width < textureWidth
                            ? (xPosition = axisViewRect.right - textureWidth)
                            : axisViewRect.left;
                }
                break;
            case AxisAlignment_1.EAxisAlignment.Left:
                centerVertically();
                if (horizontalAlignment === LabelPlacement_1.EHorizontalAlignment.Right) {
                    xPosition = seriesViewRect.left + seriesViewRect.width - textureWidth;
                }
                else {
                    xPosition =
                        axisViewRect.width < textureWidth
                            ? (xPosition = axisViewRect.left)
                            : axisViewRect.right - textureWidth;
                }
                break;
            case AxisAlignment_1.EAxisAlignment.Top:
                if (verticalAlignment === LabelPlacement_1.EVerticalAlignment.Bottom) {
                    yPosition = seriesViewRect.top + seriesViewRect.height - textureHeight;
                }
                else {
                    yPosition =
                        axisViewRect.height < textureHeight ? axisViewRect.top : axisViewRect.bottom - textureHeight;
                }
                centerHorizontally();
                break;
            case AxisAlignment_1.EAxisAlignment.Bottom:
                if (verticalAlignment === LabelPlacement_1.EVerticalAlignment.Top) {
                    yPosition = seriesViewRect.top;
                }
                else {
                    yPosition =
                        axisViewRect.height < textureHeight ? axisViewRect.bottom - textureHeight : axisViewRect.top;
                }
                centerHorizontally();
                break;
        }
    };
    switch (labelPlacement) {
        case LabelPlacement_1.ELabelPlacement.Right:
            centerVertically();
            alignRight();
            break;
        case LabelPlacement_1.ELabelPlacement.TopRight:
            alignTop();
            alignRight();
            break;
        case LabelPlacement_1.ELabelPlacement.BottomRight:
            alignBottom();
            alignRight();
            break;
        case LabelPlacement_1.ELabelPlacement.Bottom:
            alignBottom();
            centerHorizontally();
            break;
        case LabelPlacement_1.ELabelPlacement.Left:
            centerVertically();
            alignLeft();
            break;
        case LabelPlacement_1.ELabelPlacement.TopLeft:
            alignTop();
            alignLeft();
            break;
        case LabelPlacement_1.ELabelPlacement.BottomLeft:
            alignBottom();
            alignLeft();
            break;
        case LabelPlacement_1.ELabelPlacement.Top:
            alignTop();
            centerHorizontally();
            break;
        case LabelPlacement_1.ELabelPlacement.Axis:
        case LabelPlacement_1.ELabelPlacement.Auto:
            alignOnAxis();
            break;
        default:
            throw Error("Unexpected LabelPlacement " + labelPlacement);
    }
    // prevent label from overflowing axes
    if (labelPlacement !== LabelPlacement_1.ELabelPlacement.Auto && labelPlacement !== LabelPlacement_1.ELabelPlacement.Axis) {
        if (yPosition < seriesViewRect.top) {
            yPosition = seriesViewRect.top;
        }
        if (yPosition + textureHeight > seriesViewRect.bottom) {
            yPosition = seriesViewRect.bottom - textureHeight;
        }
        if (xPosition < seriesViewRect.left) {
            xPosition = seriesViewRect.left;
        }
        if (xPosition + textureWidth > seriesViewRect.right) {
            xPosition = seriesViewRect.right - textureWidth;
        }
    }
    return { xPosition: xPosition, yPosition: yPosition };
};
exports.getLabelCoordinates = getLabelCoordinates;
/**
 * Calculates annotation line coordinates accordingly to axis alignment and label placement.
 * Returns coordinates relative to seriesViewRect.
 */
var getLineCoordinates = function (x1Coord, y1Coord, x2Coord, y2Coord, labelHeight, labelWidth, labelPlacement, currentAxis) {
    var axisAlignment = currentAxis.axisAlignment, seriesViewRect = currentAxis.parentSurface.seriesViewRect, axisViewRect = currentAxis.viewRect;
    var x1LineCoord = x1Coord;
    var y1LineCoord = y1Coord;
    var x2LineCoord = x2Coord;
    var y2LineCoord = y2Coord;
    switch (labelPlacement) {
        case LabelPlacement_1.ELabelPlacement.Right:
            switch (axisAlignment) {
                case AxisAlignment_1.EAxisAlignment.Right:
                    x1LineCoord = Math.abs(x1Coord - x2Coord) < labelWidth ? x2LineCoord : x1Coord - labelWidth;
                    break;
                case AxisAlignment_1.EAxisAlignment.Left:
                    x2LineCoord =
                        x2Coord > seriesViewRect.width ? seriesViewRect.width - labelWidth : x2Coord - labelWidth;
                    break;
            }
            break;
        case LabelPlacement_1.ELabelPlacement.Bottom:
            switch (axisAlignment) {
                case AxisAlignment_1.EAxisAlignment.Top:
                    y2LineCoord =
                        y2Coord > seriesViewRect.height ? seriesViewRect.height - labelHeight : y2Coord - labelHeight;
                    break;
                case AxisAlignment_1.EAxisAlignment.Bottom:
                    y1LineCoord = Math.abs(y1Coord - y2Coord) < labelHeight ? y2LineCoord : y1Coord - labelHeight;
                    break;
            }
            break;
        case LabelPlacement_1.ELabelPlacement.Left:
            switch (axisAlignment) {
                case AxisAlignment_1.EAxisAlignment.Right:
                    x2LineCoord = x2Coord < 0 ? labelWidth : x2Coord + labelWidth;
                    break;
                case AxisAlignment_1.EAxisAlignment.Left:
                    x1LineCoord = Math.abs(x1Coord - x2Coord) < labelWidth ? x2LineCoord : x1Coord + labelWidth;
                    break;
            }
            break;
        case LabelPlacement_1.ELabelPlacement.Top:
            switch (axisAlignment) {
                case AxisAlignment_1.EAxisAlignment.Top:
                    y1LineCoord = Math.abs(y1Coord - y2Coord) < labelHeight ? y2LineCoord : y1Coord + labelHeight;
                    break;
                case AxisAlignment_1.EAxisAlignment.Bottom:
                    y2LineCoord = y2Coord < 0 ? labelHeight : y2Coord + labelHeight;
                    break;
            }
            break;
        case LabelPlacement_1.ELabelPlacement.Auto:
        case LabelPlacement_1.ELabelPlacement.Axis:
            switch (axisAlignment) {
                case AxisAlignment_1.EAxisAlignment.Right:
                    x1LineCoord =
                        axisViewRect.width < labelWidth
                            ? seriesViewRect.width + axisViewRect.width - labelWidth
                            : seriesViewRect.width;
                    if (x2LineCoord > x1LineCoord) {
                        x2LineCoord = x1LineCoord;
                    }
                    break;
                case AxisAlignment_1.EAxisAlignment.Left:
                    x1LineCoord = axisViewRect.width < labelWidth ? labelWidth - axisViewRect.width : 0;
                    if (x2LineCoord < x1LineCoord) {
                        x2LineCoord = x1LineCoord;
                    }
                    break;
                case AxisAlignment_1.EAxisAlignment.Top:
                    y1LineCoord = axisViewRect.height < labelHeight ? labelHeight - axisViewRect.height : 0;
                    if (y2LineCoord < y1LineCoord) {
                        y2LineCoord = y1LineCoord;
                    }
                    break;
                case AxisAlignment_1.EAxisAlignment.Bottom:
                    y1LineCoord =
                        axisViewRect.height < labelHeight ? axisViewRect.bottom - labelHeight : seriesViewRect.bottom;
                    if (y2LineCoord > y1LineCoord) {
                        y2LineCoord = y1LineCoord;
                    }
                    break;
            }
            break;
    }
    return {
        x1LineCoord: x1LineCoord,
        y1LineCoord: y1LineCoord,
        x2LineCoord: x2LineCoord,
        y2LineCoord: y2LineCoord
    };
};
var getLabelValue = function (currentAxis, labelCoord) {
    var dataValue;
    var coordCalc = currentAxis.getCurrentCoordinateCalculator();
    if (currentAxis.isCategoryAxis) {
        var index = coordCalc.getDataValue(labelCoord);
        dataValue = coordCalc.transformIndexToData(index);
    }
    else {
        dataValue = coordCalc.getDataValue(labelCoord);
    }
    return currentAxis.labelProvider.formatCursorLabel(dataValue);
};
