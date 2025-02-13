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
exports.ImpulseSeriesHitTestProvider = void 0;
var pointUtil_1 = require("../../../../utils/pointUtil");
var DpiHelper_1 = require("../../TextureManager/DpiHelper");
var BaseHitTestProvider_1 = require("./BaseHitTestProvider");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
/**
 * Hit-test provider for {@link FastColumnRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
var ImpulseSeriesHitTestProvider = /** @class */ (function (_super) {
    __extends(ImpulseSeriesHitTestProvider, _super);
    function ImpulseSeriesHitTestProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    ImpulseSeriesHitTestProvider.prototype.hitTest = function (x, y, hitTestRadius) {
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
        var nearestXy = hitTestHelpers_1.hitTestHelpers.getNearestXyPoint(this.webAssemblyContext, xCoordinateCalculator, yCoordinateCalculator, dataSeries, xHitCoord, yHitCoord, hitTestRadius);
        var nearestPointIndex = hitTestHelpers_1.hitTestHelpers.getNearestXPoint(this.webAssemblyContext, xCoordinateCalculator, dataSeries, xHitCoord, dataSeries.dataDistributionCalculator.isSortedAscending);
        var xNativeValues = dataSeries.getNativeXValues();
        var yNativeValues = dataSeries.getNativeYValues();
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearestPointIndex, 0);
        if (nearestPointIndex >= 0 || nearestXy.nearestPointIndex >= 0) {
            hitTestInfo.isHit =
                hitTestHelpers_1.hitTestHelpers.testIsHitForImpulse(xCoordinateCalculator, yCoordinateCalculator, this.parentSeries, xNativeValues, yNativeValues, nearestPointIndex, xHitCoord, yHitCoord, hitTestRadius) ||
                    hitTestHelpers_1.hitTestHelpers.testIsHitForPoint(xCoordinateCalculator, yCoordinateCalculator, xNativeValues, yNativeValues, nearestXy.nearestPointIndex, xHitCoord, yHitCoord, this.parentSeries.size, dataSeries);
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    /**
     * @inheritDoc
     */
    ImpulseSeriesHitTestProvider.prototype.hitTestForDataPointSelectionModifier = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = BaseHitTestProvider_1.BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS; }
        return this.hitTest(x, y, hitTestRadius);
    };
    /**
     * @inheritDoc
     */
    ImpulseSeriesHitTestProvider.prototype.hitTestXSlice = function (x, y) {
        var _a;
        var hitTestPoint = this.getTranslatedHitTestPoint(x, y);
        if (!hitTestPoint) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var _b = this.currentRenderPassData, xCoordinateCalculator = _b.xCoordinateCalculator, yCoordinateCalculator = _b.yCoordinateCalculator, isVerticalChart = _b.isVerticalChart;
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
        var isCategoryAxis = xCoordinateCalculator.isCategoryCoordinateCalculator;
        var markerWidth = ((_a = this.parentSeries.size) !== null && _a !== void 0 ? _a : 0) * DpiHelper_1.DpiHelper.PIXEL_RATIO;
        var markerDataWidth = Math.abs(xCoordinateCalculator.getDataValue(markerWidth) - xCoordinateCalculator.getDataValue(0));
        if (nearestPointIndex >= 0) {
            var xFirstValue = isCategoryAxis ? 0 : xNativeValues.get(0);
            var xLastValue = isCategoryAxis ? xNativeValues.size() - 1 : xNativeValues.get(xNativeValues.size() - 1);
            hitTestInfo.isWithinDataBounds = (0, pointUtil_1.testIsInInterval)(hitTestInfo.hitTestPointValues.x, xFirstValue, xLastValue, markerDataWidth / 2);
            hitTestInfo.isHit = hitTestInfo.isWithinDataBounds;
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    return ImpulseSeriesHitTestProvider;
}(BaseHitTestProvider_1.BaseHitTestProvider));
exports.ImpulseSeriesHitTestProvider = ImpulseSeriesHitTestProvider;
