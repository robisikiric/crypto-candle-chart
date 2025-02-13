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
exports.UniformHeatmapHitTestProvider = void 0;
var Point_1 = require("../../../../Core/Point");
var BaseHitTestProvider_1 = require("./BaseHitTestProvider");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
/**
 * Hit-test provider for {@link UniformHeatmapRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
var UniformHeatmapHitTestProvider = /** @class */ (function (_super) {
    __extends(UniformHeatmapHitTestProvider, _super);
    function UniformHeatmapHitTestProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    UniformHeatmapHitTestProvider.prototype.hitTest = function (x, y) {
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
        var heatmapPoint = hitTestHelpers_1.hitTestHelpers.getNearestUniformHeatmapPoint(xCoordinateCalculator, yCoordinateCalculator, dataSeries, xHitCoord, yHitCoord);
        var xIndex = heatmapPoint.xIndex, yIndex = heatmapPoint.yIndex, zValue = heatmapPoint.zValue;
        var hitTestInfo = new HitTestInfo_1.HitTestInfo(this.parentSeries);
        hitTestInfo.dataSeriesName = this.parentSeries.type;
        hitTestInfo.dataSeriesType = dataSeries.type;
        hitTestInfo.hitTestPoint = new Point_1.Point(xHitCoord, yHitCoord);
        var hitTestPointXValue = xCoordinateCalculator.getDataValue(xHitCoord);
        var hitTestPointYValue = yCoordinateCalculator.getDataValue(yHitCoord);
        hitTestInfo.hitTestPointValues = new Point_1.Point(hitTestPointXValue, hitTestPointYValue);
        hitTestInfo.xValue = hitTestPointXValue;
        hitTestInfo.yValue = hitTestPointYValue;
        hitTestInfo.heatmapXIndex = xIndex;
        hitTestInfo.heatmapYIndex = yIndex;
        hitTestInfo.zValue = zValue;
        // TODO: set correct heatmapValue
        hitTestInfo.heatmapValue = zValue;
        // TODO maybe calculate coordinates of the cell center?
        hitTestInfo.xCoord = xHitCoord;
        hitTestInfo.yCoord = yHitCoord;
        hitTestInfo.isHit = xIndex !== -1 && yIndex !== -1;
        hitTestInfo.isWithinDataBounds = hitTestInfo.isHit;
        if (xIndex !== -1 && yIndex !== -1) {
            hitTestInfo.metadata = dataSeries.getMetadataAt(yIndex, xIndex);
        }
        return hitTestInfo;
    };
    /**
     * @inheritDoc
     */
    UniformHeatmapHitTestProvider.prototype.hitTestDataPoint = function (x, y) {
        return this.hitTest(x, y);
    };
    /**
     * @inheritDoc
     */
    UniformHeatmapHitTestProvider.prototype.hitTestXSlice = function (x, y) {
        return this.hitTest(x, y);
    };
    return UniformHeatmapHitTestProvider;
}(BaseHitTestProvider_1.BaseHitTestProvider));
exports.UniformHeatmapHitTestProvider = UniformHeatmapHitTestProvider;
