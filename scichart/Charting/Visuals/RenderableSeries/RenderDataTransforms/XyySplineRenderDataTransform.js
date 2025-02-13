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
exports.XyySplineRenderDataTransform = void 0;
var NumberRange_1 = require("../../../../Core/NumberRange");
var XyyPointSeriesResampled_1 = require("../../../Model/PointSeries/XyyPointSeriesResampled");
var BaseRenderDataTransform_1 = require("./BaseRenderDataTransform");
var XyySplineRenderDataTransform = /** @class */ (function (_super) {
    __extends(XyySplineRenderDataTransform, _super);
    function XyySplineRenderDataTransform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.interpolationPoints = 10;
        _this.warnOnSplineFailure = true;
        _this.useForYRange = true;
        return _this;
    }
    XyySplineRenderDataTransform.prototype.createPointSeries = function () {
        return new XyyPointSeriesResampled_1.XyyPointSeriesResampled(this.wasmContext, new NumberRange_1.NumberRange(0, 0));
    };
    XyySplineRenderDataTransform.prototype.runTransformInternal = function (renderPassData) {
        var xValues = this.parentSeries.xAxis.isCategoryAxis
            ? renderPassData.pointSeries.indexes
            : renderPassData.pointSeries.xValues;
        var yValues = renderPassData.pointSeries.yValues;
        var y1Values = renderPassData.pointSeries.y1Values;
        var initialSize = xValues.size();
        if (initialSize == 0) {
            // Nothing to do
            return renderPassData.pointSeries;
        }
        var containsNaN = this.parentSeries.dataSeries.dataDistributionCalculator.containsNaN;
        this.wasmContext.SCRTSplineHelperCubicSpline(xValues, yValues, this.pointSeries.xValues, this.pointSeries.yValues, initialSize, this.interpolationPoints, containsNaN);
        if (!containsNaN && isNaN(this.pointSeries.yValues.get(0))) {
            if (this.warnOnSplineFailure) {
                console.warn("Could not calculate spline values.  X data may contain duplicates.  Falling back to original values.\n    To disable this warning set warnOnSplineFailure = false.");
            }
            return renderPassData.pointSeries;
        }
        else {
            this.wasmContext.SCRTSplineHelperCubicSpline(xValues, y1Values, this.pointSeries.xValues, this.pointSeries.y1Values, initialSize, this.interpolationPoints, containsNaN);
            return this.pointSeries;
        }
    };
    return XyySplineRenderDataTransform;
}(BaseRenderDataTransform_1.BaseRenderDataTransform));
exports.XyySplineRenderDataTransform = XyySplineRenderDataTransform;
