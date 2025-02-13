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
exports.ErrorSeriesHitTestProvider = void 0;
var ErrorDirection_1 = require("../../../../types/ErrorDirection");
var ErrorMode_1 = require("../../../../types/ErrorMode");
var pointUtil_1 = require("../../../../utils/pointUtil");
var BaseHitTestProvider_1 = require("./BaseHitTestProvider");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
/**
 * Hit-test provider for {@link FastColumnRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
var ErrorSeriesHitTestProvider = /** @class */ (function (_super) {
    __extends(ErrorSeriesHitTestProvider, _super);
    function ErrorSeriesHitTestProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    ErrorSeriesHitTestProvider.prototype.hitTest = function (x, y) {
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
        // TODO handle horizontal direction
        var nearestPointIndex = hitTestHelpers_1.hitTestHelpers.getNearestXPoint(this.webAssemblyContext, xCoordinateCalculator, dataSeries, xHitCoord, dataSeries.dataDistributionCalculator.isSortedAscending);
        var xNativeValues = dataSeries.getNativeXValues();
        var yNativeValues = dataSeries.getNativeYValues();
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearestPointIndex, 0);
        if (nearestPointIndex >= 0) {
            var res = hitTestHelpers_1.hitTestHelpers.testIsHitForErrorBars(xCoordinateCalculator, yCoordinateCalculator, this.parentSeries, xNativeValues, yNativeValues, nearestPointIndex, xHitCoord, yHitCoord);
            hitTestInfo.isHit = res.isHit;
            hitTestInfo.highValue = res.highValue;
            hitTestInfo.lowValue = res.lowValue;
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    /**
     * @inheritDoc
     */
    ErrorSeriesHitTestProvider.prototype.hitTestForDataPointSelectionModifier = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = BaseHitTestProvider_1.BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS; }
        return this.hitTest(x, y);
    };
    /**
     * @inheritDoc
     */
    ErrorSeriesHitTestProvider.prototype.hitTestXSlice = function (x, y) {
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
        var lowNativeValues = dataSeries.getNativeLowValues();
        var highNativeValues = dataSeries.getNativeHighValues();
        var nearestPointIndex = hitTestHelpers_1.hitTestHelpers.getNearestXPoint(this.webAssemblyContext, xCoordinateCalculator, dataSeries, xHitCoord, dataSeries.dataDistributionCalculator.isSortedAscending);
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearestPointIndex, 0);
        var isCategoryAxis = xCoordinateCalculator.isCategoryCoordinateCalculator;
        if (nearestPointIndex >= 0) {
            var isVerticalDirection = this.parentSeries.errorDirection === ErrorDirection_1.EErrorDirection.Vertical;
            hitTestInfo.highValue = highNativeValues.get(nearestPointIndex);
            hitTestInfo.lowValue = lowNativeValues.get(nearestPointIndex);
            var hasLowCap = this.parentSeries.errorMode !== ErrorMode_1.EErrorMode.High;
            var hasHighCap = this.parentSeries.errorMode !== ErrorMode_1.EErrorMode.Low;
            var xFirstValue = void 0;
            var xLastValue = void 0;
            if (isVerticalDirection) {
                xFirstValue = isCategoryAxis ? 0 : xNativeValues.get(0);
                xLastValue = isCategoryAxis ? xNativeValues.size() - 1 : xNativeValues.get(xNativeValues.size() - 1);
            }
            else {
                xFirstValue = hasLowCap ? lowNativeValues.get(0) : xNativeValues.get(0);
                xLastValue = hasHighCap
                    ? highNativeValues.get(xNativeValues.size() - 1)
                    : xNativeValues.get(xNativeValues.size() - 1);
            }
            var dataPointWidthPx = this.parentSeries.getDataPointWidth(isVerticalDirection ? xCoordinateCalculator : yCoordinateCalculator, this.parentSeries.dataPointWidth, this.parentSeries.dataPointWidthMode);
            var halfRange = dataPointWidthPx / 2;
            var xCoord = xCoordinateCalculator.getCoordinate(hitTestInfo.hitTestPointValues.x);
            var xFirstCoord = xCoordinateCalculator.getCoordinate(xFirstValue);
            var xLastCoord = xCoordinateCalculator.getCoordinate(xLastValue);
            hitTestInfo.isWithinDataBounds = (0, pointUtil_1.testIsInInterval)(xCoord, xFirstCoord - halfRange, xLastCoord + halfRange);
            hitTestInfo.isHit = hitTestInfo.isWithinDataBounds;
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    return ErrorSeriesHitTestProvider;
}(BaseHitTestProvider_1.BaseHitTestProvider));
exports.ErrorSeriesHitTestProvider = ErrorSeriesHitTestProvider;
