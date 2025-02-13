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
exports.BottomAlignedInnerAxisLayoutStrategy = void 0;
var LayoutStrategyType_1 = require("../../types/LayoutStrategyType");
var AxisLayoutHelpers_1 = require("./AxisLayoutHelpers");
var BaseCenteredAxisLayoutStrategy_1 = require("./BaseCenteredAxisLayoutStrategy");
/**
 * The default LayoutStrategy for Bottom Inner Axis
 */
var BottomAlignedInnerAxisLayoutStrategy = /** @class */ (function (_super) {
    __extends(BottomAlignedInnerAxisLayoutStrategy, _super);
    function BottomAlignedInnerAxisLayoutStrategy(options) {
        var _this = _super.call(this, options) || this;
        _this.type = LayoutStrategyType_1.ELayoutStrategyType.BottomInner;
        _this.layoutAxisPartsStrategy = AxisLayoutHelpers_1.layoutAxisPartsTopStrategy;
        return _this;
    }
    BottomAlignedInnerAxisLayoutStrategy.prototype.measureAxes = function (sciChartSurface, chartLayoutState, axes) {
        var _this = this;
        this.sciChartSurface = sciChartSurface;
        var requiredSize = 0;
        axes.forEach(function (axis) {
            axis.measure();
            _this.updateAxisLayoutState(axis);
            requiredSize += (0, AxisLayoutHelpers_1.getHorizontalAxisRequiredSize)(axis.axisLayoutState);
        });
        chartLayoutState.bottomInnerAreaSize = Math.max(chartLayoutState.bottomInnerAreaSize, requiredSize);
    };
    BottomAlignedInnerAxisLayoutStrategy.prototype.layoutAxes = function (left, top, right, bottom, axes) {
        // Set axisLength to default value which is seriesViewRect.width
        axes.forEach(function (axis) {
            axis.axisLength = undefined;
            axis.offset = 0;
        });
        if (axes.length === 0) {
            return;
        }
        var bottomCoord = bottom;
        // calculate custom axis position
        if (this.axisPosition !== undefined) {
            var verticalAxis = this.sciChartSurface.getYAxisById(this.orthogonalAxisId) ||
                this.sciChartSurface.getXAxisById(this.orthogonalAxisId);
            if (!verticalAxis || verticalAxis.isHorizontalAxis) {
                throw new Error("orthogonalAxisId should be a valid id of vertical axis on the surface!");
            }
            var coordinateCalculator = verticalAxis.getCurrentCoordinateCalculator();
            var absoluteAxisPosition = (0, AxisLayoutHelpers_1.getCoordinateWithCoordinateMode)(this.axisPosition, coordinateCalculator, this.coordinateMode);
            var offset = verticalAxis.viewRect.top;
            bottomCoord = absoluteAxisPosition + offset;
        }
        this.layoutAxesFromBottomToTop(left, top, right, bottomCoord, axes);
    };
    return BottomAlignedInnerAxisLayoutStrategy;
}(BaseCenteredAxisLayoutStrategy_1.BaseCenteredAxisLayoutStrategy));
exports.BottomAlignedInnerAxisLayoutStrategy = BottomAlignedInnerAxisLayoutStrategy;
