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
exports.BubbleSeriesHitTestProvider = void 0;
var pointUtil_1 = require("../../../../utils/pointUtil");
var DpiHelper_1 = require("../../TextureManager/DpiHelper");
var BaseHitTestProvider_1 = require("./BaseHitTestProvider");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
/**
 * Hit-test provider for {@link FastBubbleRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
var BubbleSeriesHitTestProvider = /** @class */ (function (_super) {
    __extends(BubbleSeriesHitTestProvider, _super);
    function BubbleSeriesHitTestProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    BubbleSeriesHitTestProvider.prototype.hitTest = function (x, y, hitTestRadius) {
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
        var zNativeValues = dataSeries.getNativeZValues();
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearest.nearestPointIndex, hitTestRadius);
        if (nearest.nearestPointIndex >= 0) {
            hitTestInfo.zValue = zNativeValues.get(nearest.nearestPointIndex);
            var distance = (0, pointUtil_1.calcDistance)(xHitCoord, yHitCoord, hitTestInfo.xCoord, hitTestInfo.yCoord);
            hitTestInfo.isHit = distance < (hitTestInfo.zValue * DpiHelper_1.DpiHelper.PIXEL_RATIO) / 2 + hitTestRadius;
            var isCategoryAxis = xCoordinateCalculator.isCategoryCoordinateCalculator;
            var xFirstValue = isCategoryAxis ? 0 : xNativeValues.get(0);
            var xFirstCoord = xCoordinateCalculator.getCoordinate(xFirstValue);
            var zFirstHalf = dataSeries.getNativeZValues().get(0) / 2;
            var xLastValue = isCategoryAxis ? xNativeValues.size() - 1 : xNativeValues.get(xNativeValues.size() - 1);
            var xLastCoord = xCoordinateCalculator.getCoordinate(xLastValue);
            var zLastHalf = dataSeries.getNativeZValues().get(xNativeValues.size() - 1) / 2;
            if (xFirstCoord < xLastCoord) {
                hitTestInfo.isWithinDataBounds =
                    xFirstCoord - zFirstHalf <= hitTestInfo.hitTestPoint.x &&
                        hitTestInfo.hitTestPoint.x <= xLastCoord + zLastHalf;
            }
            else {
                hitTestInfo.isWithinDataBounds =
                    xLastCoord - zLastHalf <= hitTestInfo.hitTestPoint.x &&
                        hitTestInfo.hitTestPoint.x <= xFirstCoord + zFirstHalf;
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
    BubbleSeriesHitTestProvider.prototype.hitTestDataPoint = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = BaseHitTestProvider_1.BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS; }
        return this.hitTest(x, y, hitTestRadius);
    };
    /**
     * @inheritDoc
     */
    BubbleSeriesHitTestProvider.prototype.hitTestXSlice = function (x, y) {
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
        var zNativeValues = dataSeries.getNativeZValues();
        var nearestPointIndex = hitTestHelpers_1.hitTestHelpers.getNearestXPoint(this.webAssemblyContext, xCoordinateCalculator, dataSeries, xHitCoord, dataSeries.dataDistributionCalculator.isSortedAscending);
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearestPointIndex, 0);
        if (nearestPointIndex >= 0) {
            hitTestInfo.zValue = zNativeValues.get(nearestPointIndex);
            var isCategoryAxis = xCoordinateCalculator.isCategoryCoordinateCalculator;
            var xFirstValue = isCategoryAxis ? 0 : xNativeValues.get(0);
            var xFirstCoord = xCoordinateCalculator.getCoordinate(xFirstValue);
            var zFirstHalf = dataSeries.getNativeZValues().get(0) / 2;
            var xLastValue = isCategoryAxis ? xNativeValues.size() - 1 : xNativeValues.get(xNativeValues.size() - 1);
            var xLastCoord = xCoordinateCalculator.getCoordinate(xLastValue);
            var zLastHalf = dataSeries.getNativeZValues().get(xNativeValues.size() - 1) / 2;
            if (xFirstCoord < xLastCoord) {
                hitTestInfo.isWithinDataBounds =
                    xFirstCoord - zFirstHalf <= hitTestInfo.hitTestPoint.x &&
                        hitTestInfo.hitTestPoint.x <= xLastCoord + zLastHalf;
            }
            else {
                hitTestInfo.isWithinDataBounds =
                    xLastCoord - zLastHalf <= hitTestInfo.hitTestPoint.x &&
                        hitTestInfo.hitTestPoint.x <= xFirstCoord + zFirstHalf;
            }
            hitTestInfo.isHit = hitTestInfo.isWithinDataBounds;
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    return BubbleSeriesHitTestProvider;
}(BaseHitTestProvider_1.BaseHitTestProvider));
exports.BubbleSeriesHitTestProvider = BubbleSeriesHitTestProvider;
