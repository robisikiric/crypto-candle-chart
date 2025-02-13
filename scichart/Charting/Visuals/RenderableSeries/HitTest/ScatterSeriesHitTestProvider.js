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
exports.ScatterSeriesHitTestProvider = void 0;
var pointUtil_1 = require("../../../../utils/pointUtil");
var BaseHitTestProvider_1 = require("./BaseHitTestProvider");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
/**
 * Hit-test provider for {@link XyScatterRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
var ScatterSeriesHitTestProvider = /** @class */ (function (_super) {
    __extends(ScatterSeriesHitTestProvider, _super);
    function ScatterSeriesHitTestProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    ScatterSeriesHitTestProvider.prototype.hitTest = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = 0; }
        var hitTestPoint = this.getTranslatedHitTestPoint(x, y);
        if (!hitTestPoint) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var _a = this.currentRenderPassData, xCoordinateCalculator = _a.xCoordinateCalculator, yCoordinateCalculator = _a.yCoordinateCalculator, isVerticalChart = _a.isVerticalChart;
        var xHitCoord = isVerticalChart ? hitTestPoint.y : hitTestPoint.x;
        var yHitCoord = isVerticalChart ? hitTestPoint.x : hitTestPoint.y;
        var dataSeries = this.parentSeries.dataSeries;
        if (!dataSeries) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var nearest = hitTestHelpers_1.hitTestHelpers.getNearestXyPoint(this.webAssemblyContext, xCoordinateCalculator, yCoordinateCalculator, dataSeries, xHitCoord, yHitCoord, hitTestRadius);
        var xNativeValues = dataSeries.getNativeXValues();
        var yNativeValues = dataSeries.getNativeYValues();
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearest.nearestPointIndex, hitTestRadius);
        if (nearest.nearestPointIndex >= 0) {
            var _b = this.parentSeries.pointMarker, width = _b.width, height = _b.height;
            var isCategoryAxis = xCoordinateCalculator.isCategoryCoordinateCalculator;
            var xFirstValue = isCategoryAxis ? 0 : xNativeValues.get(0);
            var xFirstCoord = xCoordinateCalculator.getCoordinate(xFirstValue);
            var xLastValue = isCategoryAxis ? xNativeValues.size() - 1 : xNativeValues.get(xNativeValues.size() - 1);
            var xLastCoord = xCoordinateCalculator.getCoordinate(xLastValue);
            hitTestInfo.isWithinDataBounds = (0, pointUtil_1.testIsInInterval)(xHitCoord, xFirstCoord, xLastCoord, width / 2);
            hitTestInfo.isHit = (0, pointUtil_1.testIsInBounds)(xHitCoord, yHitCoord, hitTestInfo.xCoord - width / 2 - hitTestRadius, hitTestInfo.yCoord + height / 2 + hitTestRadius, hitTestInfo.xCoord + width / 2 + hitTestRadius, hitTestInfo.yCoord - height / 2 - hitTestRadius);
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    /**
     * @inheritDoc
     */
    ScatterSeriesHitTestProvider.prototype.hitTestXSlice = function (x, y) {
        var hitTestPoint = this.getTranslatedHitTestPoint(x, y);
        if (!hitTestPoint) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var _a = this.currentRenderPassData, xCoordinateCalculator = _a.xCoordinateCalculator, yCoordinateCalculator = _a.yCoordinateCalculator, isVerticalChart = _a.isVerticalChart;
        var xHitCoord = isVerticalChart ? hitTestPoint.y : hitTestPoint.x;
        var yHitCoord = isVerticalChart ? hitTestPoint.x : hitTestPoint.y;
        var dataSeries = this.parentSeries.dataSeries;
        if (!dataSeries) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var xNativeValues = dataSeries.getNativeXValues();
        var yNativeValues = dataSeries.getNativeYValues();
        var nearestPointIndex = hitTestHelpers_1.hitTestHelpers.getNearestXPoint(this.webAssemblyContext, xCoordinateCalculator, dataSeries, xHitCoord, dataSeries.dataDistributionCalculator.isSortedAscending);
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearestPointIndex, 0);
        if (nearestPointIndex >= 0) {
            var width = this.parentSeries.pointMarker.width;
            var isCategoryAxis = xCoordinateCalculator.isCategoryCoordinateCalculator;
            var xFirstCoord = void 0;
            var xLastCoord = void 0;
            if (dataSeries.dataDistributionCalculator.isSortedAscending) {
                var xFirstValue = isCategoryAxis ? 0 : xNativeValues.get(0);
                xFirstCoord = xCoordinateCalculator.getCoordinate(xFirstValue);
                var xLastValue = isCategoryAxis
                    ? xNativeValues.size() - 1
                    : xNativeValues.get(xNativeValues.size() - 1);
                xLastCoord = xCoordinateCalculator.getCoordinate(xLastValue);
            }
            else {
                var xRange = dataSeries.getXRange();
                xFirstCoord = xCoordinateCalculator.getCoordinate(xRange.min);
                xLastCoord = xCoordinateCalculator.getCoordinate(xRange.max);
            }
            hitTestInfo.isWithinDataBounds = (0, pointUtil_1.testIsInInterval)(xHitCoord, xFirstCoord, xLastCoord, width / 2);
            hitTestInfo.isHit = hitTestInfo.isWithinDataBounds;
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    return ScatterSeriesHitTestProvider;
}(BaseHitTestProvider_1.BaseHitTestProvider));
exports.ScatterSeriesHitTestProvider = ScatterSeriesHitTestProvider;
