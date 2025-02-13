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
exports.StackedColumnSeriesHitTestProvider = void 0;
var pointUtil_1 = require("../../../../utils/pointUtil");
var BaseHitTestProvider_1 = require("./BaseHitTestProvider");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
/**
 * Hit-test provider for {@link StackedColumnRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
var StackedColumnSeriesHitTestProvider = /** @class */ (function (_super) {
    __extends(StackedColumnSeriesHitTestProvider, _super);
    function StackedColumnSeriesHitTestProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    StackedColumnSeriesHitTestProvider.prototype.hitTest = function (x, y) {
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
        var _b = this.parentSeries, accumulatedValues = _b.accumulatedValues, getGroupIndex = _b.getGroupIndex, getGroupsCount = _b.getGroupsCount, getColumnWidth = _b.getColumnWidth;
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, accumulatedValues, xHitCoord, yHitCoord, nearestPointIndex, 0);
        if (nearestPointIndex >= 0) {
            var groupIndex = getGroupIndex();
            var groupsCount = getGroupsCount();
            var columnWidth = getColumnWidth(xCoordinateCalculator);
            var halfWidth = columnWidth / 2;
            var coordShift = (0.5 + groupIndex - groupsCount / 2) * columnWidth;
            hitTestInfo.xValue = xCoordinateCalculator.getDataValue(hitTestInfo.xCoord + coordShift);
            var yValue = yNativeValues.get(nearestPointIndex);
            var accumValue = accumulatedValues.get(nearestPointIndex);
            var topCoord = yCoordinateCalculator.getCoordinate(accumValue);
            var bottomCoord = yCoordinateCalculator.getCoordinate(accumValue - yValue);
            var columnCenterX = hitTestInfo.xCoord + coordShift;
            hitTestInfo.isHit = (0, pointUtil_1.testIsInBounds)(xHitCoord, yHitCoord, columnCenterX - halfWidth, bottomCoord, columnCenterX + halfWidth, topCoord);
            var isCategoryAxis = xCoordinateCalculator.isCategoryCoordinateCalculator;
            var xFirstValue = isCategoryAxis ? 0 : xNativeValues.get(0);
            var xFirstCoord = xCoordinateCalculator.getCoordinate(xFirstValue);
            var xLastValue = isCategoryAxis ? xNativeValues.size() - 1 : xNativeValues.get(xNativeValues.size() - 1);
            var xLastCoord = xCoordinateCalculator.getCoordinate(xLastValue);
            hitTestInfo.isWithinDataBounds = (0, pointUtil_1.testIsInInterval)(hitTestInfo.hitTestPoint.x, xFirstCoord, xLastCoord, (columnWidth * groupsCount) / 2);
            // Hit-test on StackedColumnSeries returns Y accumulated, Y1 original
            hitTestInfo.y1Value = yNativeValues.get(nearestPointIndex);
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    /**
     * @inheritDoc
     */
    StackedColumnSeriesHitTestProvider.prototype.hitTestDataPoint = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = BaseHitTestProvider_1.BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS; }
        throw Error("hitTestDataPoint method is not supported for StackedColumnSeriesHitTestProvider");
    };
    /**
     * @inheritDoc
     */
    StackedColumnSeriesHitTestProvider.prototype.hitTestForDataPointSelectionModifier = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = BaseHitTestProvider_1.BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS; }
        return this.hitTest(x, y);
    };
    /**
     * @inheritDoc
     */
    StackedColumnSeriesHitTestProvider.prototype.hitTestXSlice = function (x, y) {
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
        var _b = this.parentSeries, accumulatedValues = _b.accumulatedValues, getGroupIndex = _b.getGroupIndex, getGroupsCount = _b.getGroupsCount, getColumnWidth = _b.getColumnWidth;
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, accumulatedValues, xHitCoord, yHitCoord, nearestPointIndex, 0);
        if (nearestPointIndex >= 0) {
            var groupIndex = getGroupIndex();
            var groupsCount = getGroupsCount();
            var columnWidth = getColumnWidth(xCoordinateCalculator);
            var halfWidth = columnWidth / 2;
            var isCategoryAxis = xCoordinateCalculator.isCategoryCoordinateCalculator;
            var xFirstValue = isCategoryAxis ? 0 : xNativeValues.get(0);
            var xFirstCoord = xCoordinateCalculator.getCoordinate(xFirstValue);
            var xLastValue = isCategoryAxis ? xNativeValues.size() - 1 : xNativeValues.get(xNativeValues.size() - 1);
            var xLastCoord = xCoordinateCalculator.getCoordinate(xLastValue);
            hitTestInfo.isWithinDataBounds = (0, pointUtil_1.testIsInInterval)(hitTestInfo.hitTestPoint.x, xFirstCoord, xLastCoord, (columnWidth * groupsCount) / 2);
            var coordShift = (0.5 + groupIndex - groupsCount / 2) * columnWidth;
            hitTestInfo.xValue = xCoordinateCalculator.getDataValue(hitTestInfo.xCoord + coordShift);
            var columnCenterX = hitTestInfo.xCoord + coordShift;
            hitTestInfo.isHit = (0, pointUtil_1.testIsInInterval)(xHitCoord, columnCenterX - halfWidth, columnCenterX + halfWidth);
            // Hit-test on StackedColumnSeries returns Y accumulated, Y1 original
            hitTestInfo.y1Value = yNativeValues.get(nearestPointIndex);
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    return StackedColumnSeriesHitTestProvider;
}(BaseHitTestProvider_1.BaseHitTestProvider));
exports.StackedColumnSeriesHitTestProvider = StackedColumnSeriesHitTestProvider;
