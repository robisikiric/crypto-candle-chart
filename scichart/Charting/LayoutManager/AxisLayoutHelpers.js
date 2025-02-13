"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testLayoutManager = exports.getCoordinateWithCoordinateMode = exports.getValueWithCoordinateMode = exports.updateTopAndBottomChartLayoutState = exports.updateLeftAndRightChartLayoutState = exports.getVerticalAxisRequiredSize = exports.getHorizontalAxisRequiredSize = exports.layoutAxisPartsBottomStrategy = exports.layoutAxisPartsTopStrategy = exports.layoutAxisPartsRightStrategy = exports.layoutAxisPartsLeftStrategy = exports.layoutAxisParts = exports.updateAxisLayoutState = void 0;
var Guard_1 = require("../../Core/Guard");
var Rect_1 = require("../../Core/Rect");
var EInnerAxisPlacementCoordinateMode_1 = require("./EInnerAxisPlacementCoordinateMode");
function updateAxisLayoutState(axis) {
    var axisRenderer = axis.axisRenderer, axisTitleRenderer = axis.axisTitleRenderer, axisLayoutState = axis.axisLayoutState, isHorizontalAxis = axis.isHorizontalAxis, axisBorder = axis.axisBorder;
    axisLayoutState.clear();
    axisLayoutState.axisSize = isHorizontalAxis
        ? axisRenderer.desiredHeight + axisTitleRenderer.desiredHeight
        : axisRenderer.desiredWidth + axisTitleRenderer.desiredWidth;
    axisLayoutState.additionalBottomSize = axisBorder.borderBottom;
    axisLayoutState.additionalTopSize = axisBorder.borderTop;
    axisLayoutState.additionalRightSize = axisBorder.borderRight;
    axisLayoutState.additionalLeftSize = axisBorder.borderLeft;
}
exports.updateAxisLayoutState = updateAxisLayoutState;
function layoutAxisParts(axis, layoutFunc) {
    var isHorizontalAxis = axis.isHorizontalAxis, viewRect = axis.viewRect, axisRenderer = axis.axisRenderer, axisTitleRenderer = axis.axisTitleRenderer, axisBorder = axis.axisBorder;
    var axisRendererWidth = isHorizontalAxis ? viewRect.width : axisRenderer.desiredWidth;
    var axisRendererHeight = isHorizontalAxis ? axisRenderer.desiredHeight : viewRect.height;
    var axisTitleRendererWidth = axisTitleRenderer.desiredWidth;
    var axisTitleRendererHeight = axisTitleRenderer.desiredHeight;
    // layout with appropriate strategy
    var _a = layoutFunc(axisRendererWidth, axisRendererHeight, axisTitleRendererWidth, axisTitleRendererHeight, viewRect, axisBorder), axisRendererViewRect = _a.axisRendererViewRect, axisTitleRendererViewRect = _a.axisTitleRendererViewRect;
    axisRenderer.layout(axisRendererViewRect);
    axisTitleRenderer.layout(axisTitleRendererViewRect);
}
exports.layoutAxisParts = layoutAxisParts;
function layoutAxisPartsLeftStrategy(axisRendererWidth, axisRendererHeight, axisTitleRendererWidth, axisTitleRendererHeight, containerBounds) {
    return {
        axisTitleRendererViewRect: Rect_1.Rect.createWithCoords(containerBounds.left, containerBounds.top, containerBounds.left + axisTitleRendererWidth, containerBounds.bottom),
        axisRendererViewRect: Rect_1.Rect.createWithCoords(containerBounds.left + axisTitleRendererWidth, containerBounds.top, containerBounds.right, containerBounds.bottom)
    };
}
exports.layoutAxisPartsLeftStrategy = layoutAxisPartsLeftStrategy;
function layoutAxisPartsRightStrategy(axisRendererWidth, axisRendererHeight, axisTitleRendererWidth, axisTitleRendererHeight, containerBounds) {
    return {
        axisRendererViewRect: Rect_1.Rect.createWithCoords(containerBounds.left, containerBounds.top, containerBounds.left + axisRendererWidth, containerBounds.bottom),
        axisTitleRendererViewRect: Rect_1.Rect.createWithCoords(containerBounds.left + axisRendererWidth, containerBounds.top, containerBounds.right, containerBounds.bottom)
    };
}
exports.layoutAxisPartsRightStrategy = layoutAxisPartsRightStrategy;
function layoutAxisPartsTopStrategy(axisRendererWidth, axisRendererHeight, axisTitleRendererWidth, axisTitleRendererHeight, containerBounds) {
    return {
        axisTitleRendererViewRect: Rect_1.Rect.createWithCoords(containerBounds.left, containerBounds.top, containerBounds.right, containerBounds.top + axisTitleRendererHeight),
        axisRendererViewRect: Rect_1.Rect.createWithCoords(containerBounds.left, containerBounds.top + axisTitleRendererHeight, containerBounds.right, containerBounds.bottom)
    };
}
exports.layoutAxisPartsTopStrategy = layoutAxisPartsTopStrategy;
function layoutAxisPartsBottomStrategy(axisRendererWidth, axisRendererHeight, axisTitleRendererWidth, axisTitleRendererHeight, containerBounds) {
    return {
        axisRendererViewRect: Rect_1.Rect.createWithCoords(containerBounds.left, containerBounds.top, containerBounds.right, containerBounds.top + axisRendererHeight),
        axisTitleRendererViewRect: Rect_1.Rect.createWithCoords(containerBounds.left, containerBounds.top + axisRendererHeight, containerBounds.right, containerBounds.bottom)
    };
}
exports.layoutAxisPartsBottomStrategy = layoutAxisPartsBottomStrategy;
function getHorizontalAxisRequiredSize(axisLayoutState) {
    return axisLayoutState.axisSize + axisLayoutState.additionalTopSize + axisLayoutState.additionalBottomSize;
}
exports.getHorizontalAxisRequiredSize = getHorizontalAxisRequiredSize;
function getVerticalAxisRequiredSize(axisLayoutState) {
    return axisLayoutState.axisSize + axisLayoutState.additionalLeftSize + axisLayoutState.additionalRightSize;
}
exports.getVerticalAxisRequiredSize = getVerticalAxisRequiredSize;
function updateLeftAndRightChartLayoutState(chartLayoutState, additionalLeftSize, additionalRightSize) {
    if (additionalLeftSize === void 0) { additionalLeftSize = 0; }
    if (additionalRightSize === void 0) { additionalRightSize = 0; }
    chartLayoutState.leftOuterAreaSize = Math.max(chartLayoutState.leftOuterAreaSize, additionalLeftSize);
    chartLayoutState.rightOuterAreaSize = Math.max(chartLayoutState.rightOuterAreaSize, additionalRightSize);
}
exports.updateLeftAndRightChartLayoutState = updateLeftAndRightChartLayoutState;
function updateTopAndBottomChartLayoutState(chartLayoutState, additionalTopSize, additionalBottomSize) {
    if (additionalTopSize === void 0) { additionalTopSize = 0; }
    if (additionalBottomSize === void 0) { additionalBottomSize = 0; }
    chartLayoutState.topOuterAreaSize = Math.max(chartLayoutState.topOuterAreaSize, additionalTopSize);
    chartLayoutState.bottomOuterAreaSize = Math.max(chartLayoutState.bottomOuterAreaSize, additionalBottomSize);
}
exports.updateTopAndBottomChartLayoutState = updateTopAndBottomChartLayoutState;
/**
 * Converts a pixel coordinate back to a value
 * @param value - coordinate or dataValue to convert
 * @param calculator the {@link CoordinateCalculatorBase} which will do the transformation
 * @param coordinateMode the {@link ECoordinateMode} to apply
 * @returns the data-value or value
 */
var getValueWithCoordinateMode = function (value, calculator, coordinateMode) {
    switch (coordinateMode) {
        case EInnerAxisPlacementCoordinateMode_1.EInnerAxisPlacementCoordinateMode.Pixel: {
            return calculator.getDataValue(value);
        }
        case EInnerAxisPlacementCoordinateMode_1.EInnerAxisPlacementCoordinateMode.DataValue: {
            return value;
        }
        // Case relative: 0.0 = left and 1.0 = right % on the viewport
        case EInnerAxisPlacementCoordinateMode_1.EInnerAxisPlacementCoordinateMode.Relative: {
            return (calculator.visibleMax - calculator.visibleMin) * value + calculator.visibleMin;
        }
        default: {
            throw new Error("CoordinateMode ".concat(coordinateMode, " is not supported"));
        }
    }
};
exports.getValueWithCoordinateMode = getValueWithCoordinateMode;
/**
 * Converts a value into a pixel coordinate accordingly to the coordinate mode
 * @param value - the value to convert
 * @param calculator the {@link CoordinateCalculatorBase} which will do the transformation
 * @param coordinateMode the {@link ECoordinateMode} to apply
 * @returns the pixel coordinate
 */
var getCoordinateWithCoordinateMode = function (value, calculator, coordinateMode) {
    Guard_1.Guard.notNull(coordinateMode, "coordinateMode");
    Guard_1.Guard.notNull(calculator, "calculator");
    switch (coordinateMode) {
        case EInnerAxisPlacementCoordinateMode_1.EInnerAxisPlacementCoordinateMode.Pixel: {
            // Value is 20.0 means pixel = 20.0
            return value;
        }
        case EInnerAxisPlacementCoordinateMode_1.EInnerAxisPlacementCoordinateMode.DataValue: {
            // Value is 20.0 must be converted from data-value to coordinate using Axis api
            return calculator.getCoordinate(value);
        }
        case EInnerAxisPlacementCoordinateMode_1.EInnerAxisPlacementCoordinateMode.Relative: {
            // Value is 0.5 means 50% of the viewport size
            return value * calculator.viewportDimension;
        }
        default: {
            throw new Error("CoordinateMode ".concat(coordinateMode, " is not supported"));
        }
    }
};
exports.getCoordinateWithCoordinateMode = getCoordinateWithCoordinateMode;
exports.testLayoutManager = {
    updateAxisLayoutState: updateAxisLayoutState,
    layoutAxisPartsLeftStrategy: layoutAxisPartsLeftStrategy,
    layoutAxisPartsRightStrategy: layoutAxisPartsRightStrategy,
    layoutAxisPartsTopStrategy: layoutAxisPartsTopStrategy,
    layoutAxisPartsBottomStrategy: layoutAxisPartsBottomStrategy
};
