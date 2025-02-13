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
exports.LeftAlignedInnerAxisLayoutStrategy = void 0;
var LayoutStrategyType_1 = require("../../types/LayoutStrategyType");
var AxisLayoutHelpers_1 = require("./AxisLayoutHelpers");
var BaseCenteredAxisLayoutStrategy_1 = require("./BaseCenteredAxisLayoutStrategy");
/**
 * The default LayoutStrategy for Left Inner Axis
 */
var LeftAlignedInnerAxisLayoutStrategy = /** @class */ (function (_super) {
    __extends(LeftAlignedInnerAxisLayoutStrategy, _super);
    function LeftAlignedInnerAxisLayoutStrategy(options) {
        var _this = _super.call(this, options) || this;
        _this.type = LayoutStrategyType_1.ELayoutStrategyType.LeftInner;
        _this.layoutAxisPartsStrategy = AxisLayoutHelpers_1.layoutAxisPartsRightStrategy;
        return _this;
    }
    LeftAlignedInnerAxisLayoutStrategy.prototype.measureAxes = function (sciChartSurface, chartLayoutState, axes) {
        var _this = this;
        this.sciChartSurface = sciChartSurface;
        var requiredSize = 0;
        axes.forEach(function (axis) {
            axis.measure();
            _this.updateAxisLayoutState(axis);
            requiredSize += (0, AxisLayoutHelpers_1.getVerticalAxisRequiredSize)(axis.axisLayoutState);
        });
        chartLayoutState.leftInnerAreaSize = Math.max(chartLayoutState.leftInnerAreaSize, requiredSize);
    };
    LeftAlignedInnerAxisLayoutStrategy.prototype.layoutAxes = function (left, top, right, bottom, axes) {
        // Set axisLength to default value which is seriesViewRect.height
        axes.forEach(function (axis) {
            axis.axisLength = undefined;
            axis.offset = 0;
        });
        if (axes.length === 0) {
            return;
        }
        var leftCoord = left;
        // calculate custom axis position
        if (this.axisPosition !== undefined) {
            var horizontalAxis = this.sciChartSurface.getXAxisById(this.orthogonalAxisId) ||
                this.sciChartSurface.getYAxisById(this.orthogonalAxisId);
            if (!horizontalAxis || !horizontalAxis.isHorizontalAxis) {
                throw new Error("orthogonalAxisId should be a valid id of horizontal axis on the surface!");
            }
            var coordinateCalculator = horizontalAxis.getCurrentCoordinateCalculator();
            var absoluteAxisPosition = (0, AxisLayoutHelpers_1.getCoordinateWithCoordinateMode)(this.axisPosition, coordinateCalculator, this.coordinateMode);
            var offset = horizontalAxis.parentSurface.seriesViewRect.left;
            leftCoord = absoluteAxisPosition + offset;
        }
        this.layoutAxesFromLeftToRight(leftCoord, top, right, bottom, axes);
    };
    return LeftAlignedInnerAxisLayoutStrategy;
}(BaseCenteredAxisLayoutStrategy_1.BaseCenteredAxisLayoutStrategy));
exports.LeftAlignedInnerAxisLayoutStrategy = LeftAlignedInnerAxisLayoutStrategy;
