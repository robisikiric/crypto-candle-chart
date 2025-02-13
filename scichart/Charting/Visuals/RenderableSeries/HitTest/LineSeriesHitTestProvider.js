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
exports.LineSeriesHitTestProvider = void 0;
var pointUtil_1 = require("../../../../utils/pointUtil");
var BaseHitTestProvider_1 = require("./BaseHitTestProvider");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
/**
 * Hit-test provider for {@link BaseLineRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
var LineSeriesHitTestProvider = /** @class */ (function (_super) {
    __extends(LineSeriesHitTestProvider, _super);
    function LineSeriesHitTestProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    LineSeriesHitTestProvider.prototype.hitTest = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = BaseHitTestProvider_1.BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS; }
        var hitTestPoint = this.getTranslatedHitTestPoint(x, y);
        if (!hitTestPoint) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var isVerticalChart = this.currentRenderPassData.isVerticalChart;
        var xHitCoord = isVerticalChart ? hitTestPoint.y : hitTestPoint.x;
        var yHitCoord = isVerticalChart ? hitTestPoint.x : hitTestPoint.y;
        var isSortedData = this.parentSeries.dataSeries.dataDistributionCalculator.isSortedAscending;
        if (isSortedData) {
            return this.hitTestSorted(xHitCoord, yHitCoord, hitTestRadius);
        }
        else {
            return this.hitTestUnsorted(xHitCoord, yHitCoord, hitTestRadius);
        }
    };
    LineSeriesHitTestProvider.prototype.hitTestSorted = function (xHitCoord, yHitCoord, hitTestRadius) {
        var _a = this.currentRenderPassData, xCoordinateCalculator = _a.xCoordinateCalculator, yCoordinateCalculator = _a.yCoordinateCalculator, isVerticalChart = _a.isVerticalChart;
        var dataSeries = this.parentSeries.dataSeries;
        if (!dataSeries) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var nearestPointIndex = hitTestHelpers_1.hitTestHelpers.getNearestXPoint(this.webAssemblyContext, xCoordinateCalculator, dataSeries, xHitCoord, dataSeries.dataDistributionCalculator.isSortedAscending);
        var xNativeValues = dataSeries.getNativeXValues();
        var yNativeValues = dataSeries.getNativeYValues();
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearestPointIndex, hitTestRadius, undefined);
        if (nearestPointIndex >= 0) {
            var dataSeriesCount = xNativeValues.size();
            var nearestXCoord = xCoordinateCalculator.getCoordinate(xCoordinateCalculator.isCategoryCoordinateCalculator
                ? nearestPointIndex
                : xNativeValues.get(nearestPointIndex));
            if ((nearestPointIndex === dataSeriesCount - 1 &&
                (xCoordinateCalculator.hasFlippedCoordinates
                    ? xHitCoord >= nearestXCoord
                    : xHitCoord <= nearestXCoord)) ||
                (nearestPointIndex === 0 &&
                    (xCoordinateCalculator.hasFlippedCoordinates
                        ? xHitCoord <= nearestXCoord
                        : xHitCoord >= nearestXCoord))) {
                hitTestInfo.isHit = hitTestHelpers_1.hitTestHelpers.testIsHitForPoint(xCoordinateCalculator, yCoordinateCalculator, xNativeValues, yNativeValues, nearestPointIndex, xHitCoord, yHitCoord, hitTestRadius, dataSeries);
            }
            else {
                var hitRes = hitTestHelpers_1.hitTestHelpers.testIsHitForLine(xCoordinateCalculator, yCoordinateCalculator, xNativeValues, yNativeValues, nearestPointIndex, xHitCoord, yHitCoord, hitTestRadius, dataSeries);
                hitTestInfo.isHit = hitRes.isHit;
                hitTestInfo.point2dataSeriesIndex = hitRes.secondPointIndex;
                hitTestInfo.point2xValue = xNativeValues.get(hitRes.secondPointIndex);
                hitTestInfo.point2xCoord = xCoordinateCalculator.getCoordinate(hitTestInfo.point2xValue);
                hitTestInfo.point2yValue = yNativeValues.get(hitRes.secondPointIndex);
                hitTestInfo.point2yCoord = yCoordinateCalculator.getCoordinate(hitTestInfo.point2yValue);
                hitTestInfo.point2metadata = dataSeries.getMetadataAt(hitRes.secondPointIndex);
            }
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    LineSeriesHitTestProvider.prototype.hitTestUnsorted = function (xHitCoord, yHitCoord, hitTestRadius) {
        var _a = this.currentRenderPassData, xCoordinateCalculator = _a.xCoordinateCalculator, yCoordinateCalculator = _a.yCoordinateCalculator, isVerticalChart = _a.isVerticalChart;
        var dataSeries = this.parentSeries.dataSeries;
        if (!dataSeries) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var nearest = hitTestHelpers_1.hitTestHelpers.getNearestXyPoint(this.webAssemblyContext, xCoordinateCalculator, yCoordinateCalculator, dataSeries, xHitCoord, yHitCoord, hitTestRadius);
        var xNativeValues = dataSeries.getNativeXValues();
        var yNativeValues = dataSeries.getNativeYValues();
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearest.nearestPointIndex, hitTestRadius, nearest.distance);
        if (nearest.nearestPointIndex >= 0) {
            var dataSeriesCount = xNativeValues.size();
            var minX = Number.MAX_VALUE;
            var maxX = Number.MIN_VALUE;
            var minY = Number.MAX_VALUE;
            var maxY = Number.MIN_VALUE;
            for (var i = 0; i < dataSeriesCount; i++) {
                var x = xNativeValues.get(i);
                var y = yNativeValues.get(i);
                minX = x < minX ? x : minX;
                maxX = x > maxX ? x : maxX;
                minY = y < minY ? y : minY;
                maxY = y > maxY ? y : maxY;
            }
            hitTestInfo.isWithinDataBounds =
                minX <= hitTestInfo.hitTestPointValues.x &&
                    hitTestInfo.hitTestPointValues.x <= maxX &&
                    minY <= hitTestInfo.hitTestPointValues.y &&
                    hitTestInfo.hitTestPointValues.y <= maxY;
            // Test for the point
            var distance = (0, pointUtil_1.calcDistance)(xHitCoord, yHitCoord, hitTestInfo.xCoord, hitTestInfo.yCoord);
            if (distance < hitTestRadius) {
                hitTestInfo.isHit = true;
                return hitTestInfo;
            }
            // Test for lines
            var minDistance = Number.MAX_VALUE;
            var minDistanceIndex = -1;
            for (var i = 0; i < dataSeriesCount - 1; i++) {
                var x1Value = xNativeValues.get(i);
                var y1Value = yNativeValues.get(i);
                var x2Value = xNativeValues.get(i + 1);
                var y2Value = yNativeValues.get(i + 1);
                var x1Coord = xCoordinateCalculator.getCoordinate(x1Value);
                var y1Coord = yCoordinateCalculator.getCoordinate(y1Value);
                var x2Coord = xCoordinateCalculator.getCoordinate(x2Value);
                var y2Coord = yCoordinateCalculator.getCoordinate(y2Value);
                var lineSegmentLength = (0, pointUtil_1.calcDistance)(x1Coord, y1Coord, x2Coord, y2Coord);
                var distanceToPoint1 = (0, pointUtil_1.calcDistance)(x1Coord, y1Coord, xHitCoord, yHitCoord);
                var distanceToPoint2 = (0, pointUtil_1.calcDistance)(x2Coord, y2Coord, xHitCoord, yHitCoord);
                if (distanceToPoint1 <= lineSegmentLength + hitTestRadius &&
                    distanceToPoint2 <= lineSegmentLength + hitTestRadius) {
                    var distanceToLine = (0, pointUtil_1.calcDistanceFromLine)(xHitCoord, yHitCoord, x1Coord, y1Coord, x2Coord, y2Coord);
                    if (distanceToLine <= minDistance) {
                        minDistance = distanceToLine;
                        minDistanceIndex = i;
                    }
                }
            }
            if (minDistanceIndex !== -1) {
                hitTestInfo.dataSeriesIndex = minDistanceIndex;
                hitTestInfo.xValue = xNativeValues.get(minDistanceIndex);
                hitTestInfo.xCoord = xCoordinateCalculator.getCoordinate(hitTestInfo.xValue);
                hitTestInfo.yValue = yNativeValues.get(minDistanceIndex);
                hitTestInfo.yCoord = yCoordinateCalculator.getCoordinate(hitTestInfo.yValue);
                hitTestInfo.point2dataSeriesIndex = minDistanceIndex + 1;
                hitTestInfo.point2xValue = xNativeValues.get(minDistanceIndex + 1);
                hitTestInfo.point2xCoord = xCoordinateCalculator.getCoordinate(hitTestInfo.point2xValue);
                hitTestInfo.point2yValue = yNativeValues.get(minDistanceIndex + 1);
                hitTestInfo.point2yCoord = yCoordinateCalculator.getCoordinate(hitTestInfo.point2yValue);
                hitTestInfo.isHit = minDistance <= hitTestRadius;
                hitTestInfo.point2metadata = dataSeries.getMetadataAt(minDistanceIndex + 1);
                return hitTestInfo;
            }
        }
        hitTestInfo.isHit = false;
        return hitTestInfo;
    };
    return LineSeriesHitTestProvider;
}(BaseHitTestProvider_1.BaseHitTestProvider));
exports.LineSeriesHitTestProvider = LineSeriesHitTestProvider;
