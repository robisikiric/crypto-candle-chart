"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHitTestProvider = void 0;
var Guard_1 = require("../../../../Core/Guard");
var Point_1 = require("../../../../Core/Point");
var translate_1 = require("../../../../utils/translate");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
/**
 * Defines the base class to Hit-Test Providers: classes which performs hit-tests on series, returning data-values at X-Y mouse locations
 */
var BaseHitTestProvider = /** @class */ (function () {
    /**
     * Creates an instance of the {@link BaseHitTestProvider}
     * @param parentSeries the parent {@link IRenderableSeries | RenderableSeries} that this Hit-Test provider is attached to
     * @param wasmContext the {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     */
    function BaseHitTestProvider(parentSeries, wasmContext) {
        Guard_1.Guard.notNull(parentSeries, "parentSeries");
        this.parentSeries = parentSeries;
        this.webAssemblyContext = wasmContext;
    }
    /**
     * @inheritDoc
     */
    BaseHitTestProvider.prototype.update = function (renderPassData) {
        this.currentRenderPassData = renderPassData;
    };
    /**
     * @inheritDoc
     */
    BaseHitTestProvider.prototype.hitTestDataPoint = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS; }
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
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearest.nearestPointIndex, hitTestRadius, nearest.distance);
        if (nearest.nearestPointIndex >= 0) {
            hitTestInfo.isHit = hitTestHelpers_1.hitTestHelpers.testIsHitForPoint(xCoordinateCalculator, yCoordinateCalculator, xNativeValues, yNativeValues, nearest.nearestPointIndex, xHitCoord, yHitCoord, hitTestRadius, dataSeries);
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    /**
     * @inheritDoc
     */
    BaseHitTestProvider.prototype.hitTestForDataPointSelectionModifier = function (x, y, hitTestRadius) {
        if (hitTestRadius === void 0) { hitTestRadius = BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS; }
        return this.hitTestDataPoint(x, y, hitTestRadius);
    };
    /**
     * @inheritDoc
     */
    BaseHitTestProvider.prototype.hitTestXSlice = function (x, y) {
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
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearestPointIndex, 0, undefined);
        hitTestInfo.isHit = hitTestInfo.isWithinDataBounds;
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
                hitTestInfo.point2xValue = xNativeValues.get(hitRes.secondPointIndex);
                hitTestInfo.point2xCoord = xCoordinateCalculator.getCoordinate(hitTestInfo.point2xValue);
                hitTestInfo.point2yValue = yNativeValues.get(hitRes.secondPointIndex);
                hitTestInfo.point2yCoord = yCoordinateCalculator.getCoordinate(hitTestInfo.point2yValue);
                hitTestInfo.point2metadata = dataSeries.getMetadataAt(hitRes.secondPointIndex);
            }
        }
        return hitTestInfo;
    };
    BaseHitTestProvider.prototype.getTranslatedHitTestPoint = function (x, y) {
        if (!this.currentRenderPassData || x === undefined || y === undefined) {
            return undefined;
        }
        return (0, translate_1.translateFromCanvasToSeriesViewRect)(new Point_1.Point(x, y), this.parentSeries.parentSurface.seriesViewRect);
    };
    BaseHitTestProvider.DEFAULT_HIT_TEST_RADIUS = 7.07;
    return BaseHitTestProvider;
}());
exports.BaseHitTestProvider = BaseHitTestProvider;
