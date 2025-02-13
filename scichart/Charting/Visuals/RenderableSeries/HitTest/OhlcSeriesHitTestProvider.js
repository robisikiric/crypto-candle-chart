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
exports.OhlcSeriesHitTestProvider = void 0;
var pointUtil_1 = require("../../../../utils/pointUtil");
var BaseHitTestProvider_1 = require("./BaseHitTestProvider");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
/**
 * Hit-test provider for {@link FastOhlcRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
var OhlcSeriesHitTestProvider = /** @class */ (function (_super) {
    __extends(OhlcSeriesHitTestProvider, _super);
    function OhlcSeriesHitTestProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    OhlcSeriesHitTestProvider.prototype.hitTest = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = 0; }
        var hitTestPoint = this.getTranslatedHitTestPoint(x, y);
        if (!hitTestPoint) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var _a = this.currentRenderPassData, xCoordinateCalculator = _a.xCoordinateCalculator, yCoordinateCalculator = _a.yCoordinateCalculator, isVerticalChart = _a.isVerticalChart;
        var xHitCoord = isVerticalChart ? hitTestPoint.y : hitTestPoint.x;
        var yHitCoord = isVerticalChart ? hitTestPoint.x : hitTestPoint.y;
        var renderableSeries = this.parentSeries;
        var dataSeries = this.parentSeries.dataSeries;
        if (!dataSeries) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var nearestPointIndex = hitTestHelpers_1.hitTestHelpers.getNearestXPoint(this.webAssemblyContext, xCoordinateCalculator, dataSeries, xHitCoord, dataSeries.dataDistributionCalculator.isSortedAscending);
        var xNativeValues = dataSeries.getNativeXValues();
        var yNativeValues = dataSeries.getNativeYValues();
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearestPointIndex, hitTestRadius);
        if (nearestPointIndex >= 0) {
            var res = hitTestHelpers_1.hitTestHelpers.testIsHitForOHLC(xCoordinateCalculator, yCoordinateCalculator, renderableSeries, dataSeries, nearestPointIndex, xHitCoord, yHitCoord, hitTestRadius);
            hitTestInfo.isHit = res.isHit;
            hitTestInfo.openValue = res.openValue;
            hitTestInfo.highValue = res.highValue;
            hitTestInfo.lowValue = res.lowValue;
            hitTestInfo.closeValue = res.closeValue;
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    // Alternate method that deals slighty better with unsorted data where multiple candles share an x value, but fails for large candles.
    // See the new Editable Event Markers demo for yet another method which does better still, for a slightly special case
    // public hitTest(x: number, y: number, hitTestRadius: number = 0): HitTestInfo {
    //     const hitTestPoint = this.getTranslatedHitTestPoint(x, y);
    //     if (!hitTestPoint) {
    //         return HitTestInfo.empty();
    //     }
    //     const { xCoordinateCalculator, yCoordinateCalculator, isVerticalChart } = this.currentRenderPassData;
    //     const xHitCoord = isVerticalChart ? hitTestPoint.y : hitTestPoint.x;
    //     const yHitCoord = isVerticalChart ? hitTestPoint.x : hitTestPoint.y;
    //     const renderableSeries = this.parentSeries as BaseOhlcRenderableSeries;
    //     const dataSeries = this.parentSeries.dataSeries as OhlcDataSeries;
    //     if (!dataSeries) {
    //         return HitTestInfo.empty();
    //     }
    //     const isCategoryAxis = xCoordinateCalculator.isCategoryCoordinateCalculator;
    //     const xValues = isCategoryAxis ? dataSeries.getNativeIndexes() : dataSeries.getNativeXValues();
    //     const isSorted = dataSeries.dataDistributionCalculator.isSortedAscending;
    //     const nearestClose = hitTestHelpers.getNearestPoint(
    //         this.webAssemblyContext,
    //         xCoordinateCalculator,
    //         yCoordinateCalculator,
    //         xValues,
    //         dataSeries.getNativeCloseValues(),
    //         isSorted,
    //         xHitCoord,
    //         yHitCoord,
    //         hitTestRadius
    //     );
    //     const nearestOpen = hitTestHelpers.getNearestPoint(
    //         this.webAssemblyContext,
    //         xCoordinateCalculator,
    //         yCoordinateCalculator,
    //         xValues,
    //         dataSeries.getNativeOpenValues(),
    //         isSorted,
    //         xHitCoord,
    //         yHitCoord,
    //         hitTestRadius
    //     );
    //     const nearestPoint = nearestClose.distance < nearestOpen.distance ? nearestClose :  nearestOpen;
    //     const xNativeValues = dataSeries.getNativeXValues();
    //     const yNativeValues = dataSeries.getNativeYValues();
    //     const hitTestInfo = hitTestHelpers.createHitTestInfo(
    //         this.parentSeries,
    //         xCoordinateCalculator,
    //         yCoordinateCalculator,
    //         isVerticalChart,
    //         dataSeries,
    //         xNativeValues,
    //         yNativeValues,
    //         xHitCoord,
    //         yHitCoord,
    //         nearestPoint.nearestPointIndex,
    //         hitTestRadius,
    //         nearestPoint.distance
    //     );
    //     if (nearestPoint.nearestPointIndex >= 0) {
    //         const res = hitTestHelpers.testIsHitForOHLC(
    //             xCoordinateCalculator,
    //             yCoordinateCalculator,
    //             renderableSeries,
    //             dataSeries,
    //             nearestPoint.nearestPointIndex,
    //             xHitCoord,
    //             yHitCoord,
    //             hitTestRadius
    //         );
    //         hitTestInfo.isHit = res.isHit;
    //         hitTestInfo.openValue = res.openValue;
    //         hitTestInfo.highValue = res.highValue;
    //         hitTestInfo.lowValue = res.lowValue;
    //         hitTestInfo.closeValue = res.closeValue;
    //     } else {
    //         hitTestInfo.isHit = false;
    //     }
    //     return hitTestInfo;
    // }
    /**
     * @inheritDoc
     */
    OhlcSeriesHitTestProvider.prototype.hitTestForDataPointSelectionModifier = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = BaseHitTestProvider_1.BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS; }
        return this.hitTest(x, y, hitTestRadius);
    };
    /**
     * @inheritDoc
     */
    OhlcSeriesHitTestProvider.prototype.hitTestXSlice = function (x, y) {
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
            hitTestInfo.openValue = dataSeries.getNativeOpenValues().get(nearestPointIndex);
            hitTestInfo.highValue = dataSeries.getNativeHighValues().get(nearestPointIndex);
            hitTestInfo.lowValue = dataSeries.getNativeLowValues().get(nearestPointIndex);
            hitTestInfo.closeValue = dataSeries.getNativeCloseValues().get(nearestPointIndex);
            var isCategoryAxis = xCoordinateCalculator.isCategoryCoordinateCalculator;
            var xFirstValue = isCategoryAxis ? 0 : xNativeValues.get(0);
            var xLastValue = isCategoryAxis ? xNativeValues.size() - 1 : xNativeValues.get(xNativeValues.size() - 1);
            var dataPointWidth = this.parentSeries.dataPointWidth;
            hitTestInfo.isWithinDataBounds = (0, pointUtil_1.testIsInInterval)(hitTestInfo.hitTestPointValues.x, xFirstValue, xLastValue, dataPointWidth / 2);
            hitTestInfo.isHit = hitTestInfo.isWithinDataBounds;
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    return OhlcSeriesHitTestProvider;
}(BaseHitTestProvider_1.BaseHitTestProvider));
exports.OhlcSeriesHitTestProvider = OhlcSeriesHitTestProvider;
