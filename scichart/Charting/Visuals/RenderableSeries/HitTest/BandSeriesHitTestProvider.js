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
exports.BandSeriesHitTestProvider = void 0;
var BaseHitTestProvider_1 = require("./BaseHitTestProvider");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
/**
 * Hit-test provider for {@link BaseBandRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
var BandSeriesHitTestProvider = /** @class */ (function (_super) {
    __extends(BandSeriesHitTestProvider, _super);
    function BandSeriesHitTestProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    BandSeriesHitTestProvider.prototype.hitTest = function (x, y) {
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
        var nearestPointIndex = hitTestHelpers_1.hitTestHelpers.getNearestXPoint(this.webAssemblyContext, xCoordinateCalculator, dataSeries, xHitCoord, dataSeries.dataDistributionCalculator.isSortedAscending);
        var xNativeValues = dataSeries.getNativeXValues();
        var yNativeValues = dataSeries.getNativeYValues();
        var y1NativeValues = dataSeries.getNativeY1Values();
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearestPointIndex, 0);
        if (dataSeries.dataDistributionCalculator.isSortedAscending && nearestPointIndex >= 0) {
            hitTestInfo.y1Value = y1NativeValues.get(nearestPointIndex);
            hitTestInfo.y1Coord = yCoordinateCalculator.getCoordinate(hitTestInfo.y1Value);
            var hitRes = hitTestHelpers_1.hitTestHelpers.testIsHitForBand(this.parentSeries.isDigitalLine, xCoordinateCalculator, yCoordinateCalculator, dataSeries.getNativeXValues(), function (index) { return yNativeValues.get(index); }, function (index) { return y1NativeValues.get(index); }, nearestPointIndex, xHitCoord, yHitCoord, dataSeries);
            hitTestInfo.isHit = hitRes.isHit;
            hitTestInfo.point2dataSeriesIndex = hitRes.secondPointIndex;
            if (hitRes.secondPointIndex !== undefined) {
                hitTestInfo.point2xValue = xNativeValues.get(hitRes.secondPointIndex);
                hitTestInfo.point2xCoord = xCoordinateCalculator.getCoordinate(hitTestInfo.point2xValue);
                hitTestInfo.point2yValue = yNativeValues.get(hitRes.secondPointIndex);
                hitTestInfo.point2yCoord = yCoordinateCalculator.getCoordinate(hitTestInfo.point2yValue);
                hitTestInfo.point2y1Value = y1NativeValues.get(hitRes.secondPointIndex);
                hitTestInfo.point2y1Coord = yCoordinateCalculator.getCoordinate(hitTestInfo.point2y1Value);
                hitTestInfo.point2metadata = dataSeries.getMetadataAt(hitRes.secondPointIndex);
            }
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    /**
     * @inheritDoc
     */
    BandSeriesHitTestProvider.prototype.hitTestDataPoint = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = BaseHitTestProvider_1.BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS; }
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
        var _b = hitTestHelpers_1.hitTestHelpers.getNearestXyyPoint(this.webAssemblyContext, xCoordinateCalculator, yCoordinateCalculator, dataSeries, xHitCoord, yHitCoord, hitTestRadius), nearestPointIndex = _b.nearestPointIndex, distance = _b.distance;
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, dataSeries.getNativeXValues(), dataSeries.getNativeYValues(), xHitCoord, yHitCoord, nearestPointIndex, hitTestRadius, distance);
        if (nearestPointIndex >= 0) {
            hitTestInfo.y1Value = dataSeries.getNativeY1Values().get(nearestPointIndex);
            hitTestInfo.y1Coord = yCoordinateCalculator.getCoordinate(hitTestInfo.y1Value);
            hitTestInfo.isHit =
                hitTestHelpers_1.hitTestHelpers.testIsHitForPoint(xCoordinateCalculator, yCoordinateCalculator, dataSeries.getNativeXValues(), dataSeries.getNativeYValues(), nearestPointIndex, xHitCoord, yHitCoord, hitTestRadius, dataSeries) ||
                    hitTestHelpers_1.hitTestHelpers.testIsHitForPoint(xCoordinateCalculator, yCoordinateCalculator, dataSeries.getNativeXValues(), dataSeries.getNativeY1Values(), nearestPointIndex, xHitCoord, yHitCoord, hitTestRadius, dataSeries);
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    /**
     * @inheritDoc
     */
    BandSeriesHitTestProvider.prototype.hitTestXSlice = function (x, y) {
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
        var nearestPointIndex = hitTestHelpers_1.hitTestHelpers.getNearestXPoint(this.webAssemblyContext, xCoordinateCalculator, dataSeries, xHitCoord, dataSeries.dataDistributionCalculator.isSortedAscending);
        var xNativeValues = dataSeries.getNativeXValues();
        var yNativeValues = dataSeries.getNativeYValues();
        var y1NativeValues = dataSeries.getNativeY1Values();
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearestPointIndex, 0);
        if (nearestPointIndex >= 0) {
            hitTestInfo.isHit = hitTestInfo.isWithinDataBounds;
            hitTestInfo.y1Value = y1NativeValues.get(nearestPointIndex);
            hitTestInfo.y1Coord = yCoordinateCalculator.getCoordinate(hitTestInfo.y1Value);
        }
        else {
            hitTestInfo.isHit = false;
        }
        if (dataSeries.dataDistributionCalculator.isSortedAscending && nearestPointIndex >= 0) {
            var dataSeriesCount = xNativeValues.size();
            var nearestXCoord = xCoordinateCalculator.getCoordinate(xCoordinateCalculator.isCategoryCoordinateCalculator
                ? nearestPointIndex
                : xNativeValues.get(nearestPointIndex));
            if (!(nearestPointIndex === dataSeriesCount - 1 &&
                (xCoordinateCalculator.hasFlippedCoordinates
                    ? xHitCoord >= nearestXCoord
                    : xHitCoord <= nearestXCoord)) &&
                !(nearestPointIndex === 0 &&
                    (xCoordinateCalculator.hasFlippedCoordinates
                        ? xHitCoord <= nearestXCoord
                        : xHitCoord >= nearestXCoord))) {
                var hitRes = hitTestHelpers_1.hitTestHelpers.testIsHitForLine(xCoordinateCalculator, yCoordinateCalculator, xNativeValues, yNativeValues, nearestPointIndex, xHitCoord, yHitCoord, 0, dataSeries);
                hitTestInfo.point2dataSeriesIndex = hitRes.secondPointIndex;
                if (hitRes.secondPointIndex !== undefined) {
                    hitTestInfo.point2xValue = xNativeValues.get(hitRes.secondPointIndex);
                    hitTestInfo.point2xCoord = xCoordinateCalculator.getCoordinate(hitTestInfo.point2xValue);
                    hitTestInfo.point2yValue = yNativeValues.get(hitRes.secondPointIndex);
                    hitTestInfo.point2yCoord = yCoordinateCalculator.getCoordinate(hitTestInfo.point2yValue);
                    hitTestInfo.point2y1Value = y1NativeValues.get(hitRes.secondPointIndex);
                    hitTestInfo.point2y1Coord = yCoordinateCalculator.getCoordinate(hitTestInfo.point2y1Value);
                    hitTestInfo.point2metadata = dataSeries.getMetadataAt(hitRes.secondPointIndex);
                }
            }
        }
        return hitTestInfo;
    };
    return BandSeriesHitTestProvider;
}(BaseHitTestProvider_1.BaseHitTestProvider));
exports.BandSeriesHitTestProvider = BandSeriesHitTestProvider;
