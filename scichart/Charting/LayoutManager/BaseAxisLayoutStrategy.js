"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAxisLayoutStrategy = void 0;
var Rect_1 = require("../../Core/Rect");
var AxisLayoutHelpers_1 = require("./AxisLayoutHelpers");
/**
 * The Base Axis Layout Strategy
 */
var BaseAxisLayoutStrategy = /** @class */ (function () {
    function BaseAxisLayoutStrategy() {
        this.isStacked = false;
    }
    BaseAxisLayoutStrategy.prototype.toJSON = function () {
        return { type: this.type };
    };
    BaseAxisLayoutStrategy.prototype.updateAxisLayoutState = function (axis) {
        (0, AxisLayoutHelpers_1.updateAxisLayoutState)(axis);
    };
    BaseAxisLayoutStrategy.prototype.updateLeftAndRightChartLayoutState = function (chartLayoutState, additionalLeftSize, additionalRightSize) {
        (0, AxisLayoutHelpers_1.updateLeftAndRightChartLayoutState)(chartLayoutState, additionalLeftSize, additionalRightSize);
    };
    BaseAxisLayoutStrategy.prototype.updateTopAndBottomChartLayoutState = function (chartLayoutState, additionalTopSize, additionalBottomSize) {
        (0, AxisLayoutHelpers_1.updateTopAndBottomChartLayoutState)(chartLayoutState, additionalTopSize, additionalBottomSize);
    };
    BaseAxisLayoutStrategy.prototype.layoutAxesFromBottomToTop = function (left, top, right, bottom, axes) {
        var _this = this;
        var bottomOffset = bottom;
        axes.forEach(function (axis) {
            var _a = axis.axisLayoutState, axisSize = _a.axisSize, additionalTopSize = _a.additionalTopSize, additionalBottomSize = _a.additionalBottomSize;
            var topOffset = bottomOffset - axisSize - additionalBottomSize - additionalTopSize;
            axis.viewRect = Rect_1.Rect.createWithCoords(left, topOffset + additionalTopSize, right, bottomOffset - additionalBottomSize);
            bottomOffset = topOffset;
            (0, AxisLayoutHelpers_1.layoutAxisParts)(axis, _this.layoutAxisPartsStrategy);
        });
    };
    BaseAxisLayoutStrategy.prototype.layoutAxesFromTopToBottom = function (left, top, right, bottom, axes) {
        var _this = this;
        var topOffset = top;
        axes.forEach(function (axis) {
            var _a = axis.axisLayoutState, axisSize = _a.axisSize, additionalTopSize = _a.additionalTopSize, additionalBottomSize = _a.additionalBottomSize;
            var bottomOffset = topOffset + axisSize + additionalBottomSize + additionalTopSize;
            axis.viewRect = Rect_1.Rect.createWithCoords(left, topOffset + additionalTopSize, right, bottomOffset - additionalBottomSize);
            topOffset = bottomOffset;
            (0, AxisLayoutHelpers_1.layoutAxisParts)(axis, _this.layoutAxisPartsStrategy);
        });
    };
    BaseAxisLayoutStrategy.prototype.layoutAxesFromLeftToRight = function (left, top, right, bottom, axes) {
        var _this = this;
        var leftOffset = left;
        axes.forEach(function (axis) {
            var _a = axis.axisLayoutState, axisSize = _a.axisSize, additionalLeftSize = _a.additionalLeftSize, additionalRightSize = _a.additionalRightSize;
            var rightOffset = leftOffset + axisSize + additionalLeftSize + additionalRightSize;
            axis.viewRect = Rect_1.Rect.createWithCoords(leftOffset + additionalLeftSize, top, rightOffset - additionalRightSize, bottom);
            leftOffset = rightOffset;
            (0, AxisLayoutHelpers_1.layoutAxisParts)(axis, _this.layoutAxisPartsStrategy);
        });
    };
    BaseAxisLayoutStrategy.prototype.layoutAxesFromRightToLeft = function (left, top, right, bottom, axes) {
        var _this = this;
        var rightOffset = right;
        axes.forEach(function (axis) {
            var _a = axis.axisLayoutState, axisSize = _a.axisSize, additionalLeftSize = _a.additionalLeftSize, additionalRightSize = _a.additionalRightSize;
            var leftOffset = rightOffset - axisSize - additionalLeftSize - additionalRightSize;
            axis.viewRect = Rect_1.Rect.createWithCoords(leftOffset + additionalLeftSize, top, rightOffset - additionalRightSize, bottom);
            rightOffset = leftOffset;
            (0, AxisLayoutHelpers_1.layoutAxisParts)(axis, _this.layoutAxisPartsStrategy);
        });
    };
    BaseAxisLayoutStrategy.prototype.calculateTotalAxisHeight = function (axis, totalAxisAreaHeight) {
        return (parseSize(axis.stackedAxisLength, totalAxisAreaHeight) +
            axis.axisLayoutState.additionalBottomSize +
            axis.axisLayoutState.additionalTopSize);
    };
    BaseAxisLayoutStrategy.prototype.calculateTotalAxisWidth = function (axis, totalAxisAreaHeight) {
        return (parseSize(axis.stackedAxisLength, totalAxisAreaHeight) +
            axis.axisLayoutState.additionalRightSize +
            axis.axisLayoutState.additionalLeftSize);
    };
    return BaseAxisLayoutStrategy;
}());
exports.BaseAxisLayoutStrategy = BaseAxisLayoutStrategy;
var parseSize = function (value, containerSize) {
    if (typeof value === "number") {
        if (value < 0) {
            throw new Error("stackedAxisLength must be a positive value!");
        }
        return value;
    }
    if (value.includes("%")) {
        return parsePc(value, containerSize);
    }
    var parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
        return parsedValue;
    }
    throw new Error("stackedAxisLength must be a number or a percentage");
};
var parsePc = function (value, containerSize) {
    var parsedPercentageValue = parseFloat(value);
    if (parsedPercentageValue < 0 || parsedPercentageValue > 100) {
        throw new Error("stackedAxisLength percentage must be from 0 to 100");
    }
    return Math.round((containerSize * parsedPercentageValue) / 10) / 10;
};
