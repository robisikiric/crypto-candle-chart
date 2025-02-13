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
exports.TopAlignedOuterAxisLayoutStrategy = void 0;
var LayoutStrategyType_1 = require("../../types/LayoutStrategyType");
var AxisLayoutHelpers_1 = require("./AxisLayoutHelpers");
var BaseAxisLayoutStrategy_1 = require("./BaseAxisLayoutStrategy");
/**
 * The default LayoutStrategy for Top Axis
 */
var TopAlignedOuterAxisLayoutStrategy = /** @class */ (function (_super) {
    __extends(TopAlignedOuterAxisLayoutStrategy, _super);
    function TopAlignedOuterAxisLayoutStrategy() {
        var _this = _super.call(this) || this;
        _this.type = LayoutStrategyType_1.ELayoutStrategyType.TopOuter;
        _this.layoutAxisPartsStrategy = AxisLayoutHelpers_1.layoutAxisPartsTopStrategy;
        return _this;
    }
    TopAlignedOuterAxisLayoutStrategy.prototype.measureAxes = function (sciChartSurface, chartLayoutState, axes) {
        var _this = this;
        var _a, _b;
        var requiredSize = (_b = (_a = sciChartSurface.adjustedPadding) === null || _a === void 0 ? void 0 : _a.top) !== null && _b !== void 0 ? _b : 0;
        requiredSize += sciChartSurface.topViewportBorder + sciChartSurface.topCanvasBorder;
        axes.forEach(function (axis) {
            axis.measure();
            _this.updateAxisLayoutState(axis);
            requiredSize += (0, AxisLayoutHelpers_1.getHorizontalAxisRequiredSize)(axis.axisLayoutState);
            _this.updateLeftAndRightChartLayoutState(chartLayoutState, axis.axisLayoutState.additionalLeftSize, axis.axisLayoutState.additionalRightSize);
        });
        chartLayoutState.topOuterAreaSize = Math.max(chartLayoutState.topOuterAreaSize, requiredSize);
    };
    TopAlignedOuterAxisLayoutStrategy.prototype.layoutAxes = function (left, top, right, bottom, axes) {
        // Set axisLength to default value which is seriesViewRect.width
        axes.forEach(function (axis) {
            axis.axisLength = undefined;
            axis.offset = 0;
        });
        this.layoutAxesFromBottomToTop(left, top, right, bottom, axes);
    };
    return TopAlignedOuterAxisLayoutStrategy;
}(BaseAxisLayoutStrategy_1.BaseAxisLayoutStrategy));
exports.TopAlignedOuterAxisLayoutStrategy = TopAlignedOuterAxisLayoutStrategy;
