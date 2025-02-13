"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fitSvgToViewRect = exports.fitElementToViewRect = exports.convertToRelativeHtmlSize = exports.convertToHtmlPx = exports.translateDataValueRectToAbsolute = exports.translateToNotScaled = exports.translateFromSeriesViewRectToCanvasY = exports.translateFromSeriesViewRectToCanvasX = exports.translateFromCanvasToSeriesViewRectY = exports.translateFromCanvasToSeriesViewRectX = exports.translateFromSeriesViewRectToCanvas = exports.translateFromCanvasToSeriesViewRect = void 0;
var DpiHelper_1 = require("../Charting/Visuals/TextureManager/DpiHelper");
var Point_1 = require("../Core/Point");
var Rect_1 = require("../Core/Rect");
/**
 * Translates from canvas to seriesViewRect screen coordinates
 * @param point
 * @param seriesViewRect
 * @param allowValuesOutOfBounds will translate even if the point is outside of the seriesViewRect
 */
var translateFromCanvasToSeriesViewRect = function (point, seriesViewRect, allowValuesOutOfBounds) {
    if (allowValuesOutOfBounds === void 0) { allowValuesOutOfBounds = false; }
    if (!seriesViewRect) {
        return undefined;
    }
    var newX = point.x - seriesViewRect.x;
    var newY = point.y - seriesViewRect.y;
    if (!allowValuesOutOfBounds) {
        if (newX < 0 || newX > seriesViewRect.width || newY < 0 || newY > seriesViewRect.height) {
            return undefined;
        }
    }
    return new Point_1.Point(newX, newY);
};
exports.translateFromCanvasToSeriesViewRect = translateFromCanvasToSeriesViewRect;
/**
 * Translates from seriesViewRect to canvas screen coordinates
 * @param point
 * @param seriesViewRect
 * @param allowValuesOutOfBounds will translate even if the point is outside of the seriesViewRect
 */
var translateFromSeriesViewRectToCanvas = function (point, seriesViewRect, allowValuesOutOfBounds) {
    if (allowValuesOutOfBounds === void 0) { allowValuesOutOfBounds = false; }
    if (!seriesViewRect) {
        return undefined;
    }
    var newX = point.x + seriesViewRect.x;
    var newY = point.y + seriesViewRect.y;
    if (!allowValuesOutOfBounds) {
        if (newX < 0 || newX > seriesViewRect.width || newY < 0 || newY > seriesViewRect.height) {
            return undefined;
        }
    }
    return new Point_1.Point(newX, newY);
};
exports.translateFromSeriesViewRectToCanvas = translateFromSeriesViewRectToCanvas;
var translateFromCanvasToSeriesViewRectX = function (x, seriesViewRect, allowValuesOutOfBounds) {
    if (allowValuesOutOfBounds === void 0) { allowValuesOutOfBounds = false; }
    if (!seriesViewRect) {
        return undefined;
    }
    var newX = x - seriesViewRect.x;
    if (!allowValuesOutOfBounds) {
        if (newX < 0 || newX > seriesViewRect.width) {
            return undefined;
        }
    }
    return newX;
};
exports.translateFromCanvasToSeriesViewRectX = translateFromCanvasToSeriesViewRectX;
var translateFromCanvasToSeriesViewRectY = function (y, seriesViewRect, allowValuesOutOfBounds) {
    if (allowValuesOutOfBounds === void 0) { allowValuesOutOfBounds = false; }
    if (!seriesViewRect) {
        return undefined;
    }
    var newY = y - seriesViewRect.y;
    if (!allowValuesOutOfBounds) {
        if (newY < 0 || newY > seriesViewRect.height) {
            return undefined;
        }
    }
    return newY;
};
exports.translateFromCanvasToSeriesViewRectY = translateFromCanvasToSeriesViewRectY;
var translateFromSeriesViewRectToCanvasX = function (x, seriesViewRect, allowValuesOutOfBounds) {
    if (allowValuesOutOfBounds === void 0) { allowValuesOutOfBounds = false; }
    if (!seriesViewRect) {
        return undefined;
    }
    var newX = x + seriesViewRect.x;
    if (!allowValuesOutOfBounds) {
        if (newX < 0 || newX > seriesViewRect.width) {
            return undefined;
        }
    }
    return newX;
};
exports.translateFromSeriesViewRectToCanvasX = translateFromSeriesViewRectToCanvasX;
var translateFromSeriesViewRectToCanvasY = function (y, seriesViewRect, allowValuesOutOfBounds) {
    if (allowValuesOutOfBounds === void 0) { allowValuesOutOfBounds = false; }
    if (!seriesViewRect) {
        return undefined;
    }
    var newY = y + seriesViewRect.y;
    if (!allowValuesOutOfBounds) {
        if (newY < 0 || newY > seriesViewRect.height) {
            return undefined;
        }
    }
    return newY;
};
exports.translateFromSeriesViewRectToCanvasY = translateFromSeriesViewRectToCanvasY;
var translateToNotScaled = function (value) { return value / DpiHelper_1.DpiHelper.PIXEL_RATIO; };
exports.translateToNotScaled = translateToNotScaled;
var translateDataValueRectToAbsolute = function (originalRect, xAxis, yAxis, seriesViewRect) {
    var x = originalRect.x, y = originalRect.y, width = originalRect.width, height = originalRect.height;
    var parentLeft = (0, exports.translateToNotScaled)(seriesViewRect.left);
    var parentTop = (0, exports.translateToNotScaled)(seriesViewRect.top);
    var xCoordCalc = xAxis.getCurrentCoordinateCalculator();
    var yCoordCalc = yAxis.getCurrentCoordinateCalculator();
    var left = xAxis.isVerticalChart ? yCoordCalc.getCoordinate(x) : xCoordCalc.getCoordinate(x);
    var top = xAxis.isVerticalChart ? xCoordCalc.getCoordinate(y) : yCoordCalc.getCoordinate(y);
    left = Math.max((0, exports.translateToNotScaled)(left), 0);
    top = Math.max((0, exports.translateToNotScaled)(top), 0);
    var x2 = xAxis.flippedCoordinates ? x - width : x + width;
    var y2 = yAxis.flippedCoordinates ? y + height : y - height;
    var bottom = (0, exports.translateToNotScaled)(xAxis.isVerticalChart ? xCoordCalc.getCoordinate(y2) : yCoordCalc.getCoordinate(y2));
    var right = (0, exports.translateToNotScaled)(xAxis.isVerticalChart ? yCoordCalc.getCoordinate(x2) : xCoordCalc.getCoordinate(x2));
    left += parentLeft;
    top += parentTop;
    right += parentLeft;
    bottom += parentTop;
    return new Rect_1.Rect(left, top, Math.abs(right - left), Math.abs(top - bottom));
};
exports.translateDataValueRectToAbsolute = translateDataValueRectToAbsolute;
var convertToHtmlPx = function (value) { return "".concat(value, "px"); };
exports.convertToHtmlPx = convertToHtmlPx;
var convertToRelativeHtmlSize = function (value) { return "".concat(value * 100, "%"); };
exports.convertToRelativeHtmlSize = convertToRelativeHtmlSize;
var fitElementToViewRect = function (element, viewRect) {
    element.style.marginLeft = "".concat(viewRect.x, "px");
    element.style.marginTop = "".concat(viewRect.y, "px");
    // Set width, height
    element.setAttribute("width", viewRect.width.toString());
    element.setAttribute("height", viewRect.height.toString());
    // Set display width, height
    element.style.width = viewRect.width + "px";
    element.style.height = viewRect.height + "px";
};
exports.fitElementToViewRect = fitElementToViewRect;
var fitSvgToViewRect = function (svgElement, viewRect) {
    (0, exports.fitElementToViewRect)(svgElement, viewRect);
    // Set scaling so annotations, tooltips etc are in right position after DPI Scaling
    svgElement.currentScale = 1;
};
exports.fitSvgToViewRect = fitSvgToViewRect;
