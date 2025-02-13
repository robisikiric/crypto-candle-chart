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
exports.LeftAlignedOuterAxisLayoutStrategy = void 0;
var LayoutStrategyType_1 = require("../../types/LayoutStrategyType");
var AxisLayoutHelpers_1 = require("./AxisLayoutHelpers");
var BaseAxisLayoutStrategy_1 = require("./BaseAxisLayoutStrategy");
/**
 * The default LayoutStrategy for Left Axis
 */
var LeftAlignedOuterAxisLayoutStrategy = /** @class */ (function (_super) {
    __extends(LeftAlignedOuterAxisLayoutStrategy, _super);
    function LeftAlignedOuterAxisLayoutStrategy() {
        var _this = _super.call(this) || this;
        _this.type = LayoutStrategyType_1.ELayoutStrategyType.LeftOuter;
        _this.layoutAxisPartsStrategy = AxisLayoutHelpers_1.layoutAxisPartsLeftStrategy;
        return _this;
    }
    LeftAlignedOuterAxisLayoutStrategy.prototype.measureAxes = function (sciChartSurface, chartLayoutState, axes) {
        var _this = this;
        var _a, _b;
        var requiredSize = (_b = (_a = sciChartSurface.adjustedPadding) === null || _a === void 0 ? void 0 : _a.left) !== null && _b !== void 0 ? _b : 0;
        requiredSize += sciChartSurface.leftViewportBorder + sciChartSurface.leftCanvasBorder;
        axes.forEach(function (axis) {
            axis.measure();
            _this.updateAxisLayoutState(axis);
            requiredSize += (0, AxisLayoutHelpers_1.getVerticalAxisRequiredSize)(axis.axisLayoutState);
            _this.updateTopAndBottomChartLayoutState(chartLayoutState, axis.axisLayoutState.additionalTopSize, axis.axisLayoutState.additionalBottomSize);
        });
        chartLayoutState.leftOuterAreaSize = Math.max(chartLayoutState.leftOuterAreaSize, requiredSize);
    };
    LeftAlignedOuterAxisLayoutStrategy.prototype.layoutAxes = function (left, top, right, bottom, axes) {
        // Set axisLength to default value which is seriesViewRect.height
        axes.forEach(function (axis) {
            axis.axisLength = undefined;
            axis.offset = 0;
        });
        this.layoutAxesFromRightToLeft(left, top, right, bottom, axes);
    };
    return LeftAlignedOuterAxisLayoutStrategy;
}(BaseAxisLayoutStrategy_1.BaseAxisLayoutStrategy));
exports.LeftAlignedOuterAxisLayoutStrategy = LeftAlignedOuterAxisLayoutStrategy;
