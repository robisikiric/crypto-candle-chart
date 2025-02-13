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
exports.MountainSeriesHitTestProvider = void 0;
var BaseHitTestProvider_1 = require("./BaseHitTestProvider");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
/**
 * Hit-test provider for {@link BaseMountainRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
var MountainSeriesHitTestProvider = /** @class */ (function (_super) {
    __extends(MountainSeriesHitTestProvider, _super);
    function MountainSeriesHitTestProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    MountainSeriesHitTestProvider.prototype.hitTest = function (x, y) {
        var hitTestPoint = this.getTranslatedHitTestPoint(x, y);
        if (!hitTestPoint) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var _a = this.currentRenderPassData, xCoordinateCalculator = _a.xCoordinateCalculator, yCoordinateCalculator = _a.yCoordinateCalculator, isVerticalChart = _a.isVerticalChart;
        var xHitCoord = isVerticalChart ? hitTestPoint.y : hitTestPoint.x;
        var yHitCoord = isVerticalChart ? hitTestPoint.x : hitTestPoint.y;
        var renderableSeries = this.parentSeries;
        var dataSeries = renderableSeries.dataSeries;
        if (!dataSeries) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var nearestPointIndex = hitTestHelpers_1.hitTestHelpers.getNearestXPoint(this.webAssemblyContext, xCoordinateCalculator, dataSeries, xHitCoord, dataSeries.dataDistributionCalculator.isSortedAscending);
        var xNativeValues = dataSeries.getNativeXValues();
        var yNativeValues = dataSeries.getNativeYValues();
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(renderableSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearestPointIndex, 0);
        if (dataSeries.dataDistributionCalculator.isSortedAscending && nearestPointIndex >= 0) {
            var res = hitTestHelpers_1.hitTestHelpers.testIsHitForMountain(this.parentSeries.isDigitalLine, xCoordinateCalculator, yCoordinateCalculator, dataSeries, renderableSeries.zeroLineY, nearestPointIndex, xHitCoord, yHitCoord);
            hitTestInfo.isHit = res.isHit;
            hitTestInfo.point2dataSeriesIndex = res.secondPointIndex;
            if (res.secondPointIndex !== undefined) {
                hitTestInfo.point2xValue = xNativeValues.get(res.secondPointIndex);
                hitTestInfo.point2xCoord = xCoordinateCalculator.getCoordinate(hitTestInfo.point2xValue);
                hitTestInfo.point2yValue = yNativeValues.get(res.secondPointIndex);
                hitTestInfo.point2yCoord = yCoordinateCalculator.getCoordinate(hitTestInfo.point2yValue);
                hitTestInfo.point2metadata = dataSeries.getMetadataAt(res.secondPointIndex);
            }
        }
        else {
            hitTestInfo.isHit = false;
        }
        return hitTestInfo;
    };
    return MountainSeriesHitTestProvider;
}(BaseHitTestProvider_1.BaseHitTestProvider));
exports.MountainSeriesHitTestProvider = MountainSeriesHitTestProvider;
