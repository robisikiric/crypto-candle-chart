"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomAlignedOuterAxisLayoutStrategy = void 0;
var LayoutStrategyType_1 = require("../../types/LayoutStrategyType");
var AxisLayoutHelpers_1 = require("./AxisLayoutHelpers");
var BaseAxisLayoutStrategy_1 = require("./BaseAxisLayoutStrategy");
/**
 * The default LayoutStrategy for Bottom Axis
 */
var BottomAlignedOuterAxisLayoutStrategy = /** @class */ (function (_super) {
    __extends(BottomAlignedOuterAxisLayoutStrategy, _super);
    function BottomAlignedOuterAxisLayoutStrategy() {
        var _this = _super.call(this) || this;
        _this.type = LayoutStrategyType_1.ELayoutStrategyType.BottomOuter;
        _this.layoutAxisPartsStrategy = AxisLayoutHelpers_1.layoutAxisPartsBottomStrategy;
        return _this;
    }
    BottomAlignedOuterAxisLayoutStrategy.prototype.measureAxes = function (sciChartSurface, chartLayoutState, axes) {
        var _this = this;
        var _a, _b;
        var requiredSize = (_b = (_a = sciChartSurface.adjustedPadding) === null || _a === void 0 ? void 0 : _a.bottom) !== null && _b !== void 0 ? _b : 0;
        requiredSize += sciChartSurface.bottomViewportBorder + sciChartSurface.bottomCanvasBorder;
        axes.forEach(function (axis) {
            axis.measure();
            _this.updateAxisLayoutState(axis);
            requiredSize += (0, AxisLayoutHelpers_1.getHorizontalAxisRequiredSize)(axis.axisLayoutState);
            _this.updateLeftAndRightChartLayoutState(chartLayoutState, axis.axisLayoutState.additionalLeftSize, axis.axisLayoutState.additionalRightSize);
        });
        chartLayoutState.bottomOuterAreaSize = Math.max(chartLayoutState.bottomOuterAreaSize, requiredSize);
    };
    BottomAlignedOuterAxisLayoutStrategy.prototype.layoutAxes = function (left, top, right, bottom, axes) {
        // Set axisLength to default value which is seriesViewRect.width
        axes.forEach(function (axis) {
            axis.axisLength = undefined;
            axis.offset = 0;
        });
        this.layoutAxesFromTopToBottom(left, top, right, bottom, axes);
    };
    return BottomAlignedOuterAxisLayoutStrategy;
}(BaseAxisLayoutStrategy_1.BaseAxisLayoutStrategy));
exports.BottomAlignedOuterAxisLayoutStrategy = BottomAlignedOuterAxisLayoutStrategy;
