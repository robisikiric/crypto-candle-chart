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
exports.TextSeriesHitTestProvider = void 0;
var pointUtil_1 = require("../../../../utils/pointUtil");
var BaseHitTestProvider_1 = require("./BaseHitTestProvider");
var hitTestHelpers_1 = require("./hitTestHelpers");
var HitTestInfo_1 = require("./HitTestInfo");
var TextSeriesHitTestProvider = /** @class */ (function (_super) {
    __extends(TextSeriesHitTestProvider, _super);
    function TextSeriesHitTestProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextSeriesHitTestProvider.prototype.hitTest = function (x, y, hitTestRadius) {
        var hitTestPoint = this.getTranslatedHitTestPoint(x, y);
        if (!hitTestPoint) {
            return HitTestInfo_1.HitTestInfo.empty();
        }
        var _a = this.currentRenderPassData, xCoordinateCalculator = _a.xCoordinateCalculator, yCoordinateCalculator = _a.yCoordinateCalculator, isVerticalChart = _a.isVerticalChart;
        var xHitCoord = isVerticalChart ? hitTestPoint.y : hitTestPoint.x;
        var yHitCoord = isVerticalChart ? hitTestPoint.x : hitTestPoint.y;
        var dataSeries = this.parentSeries.dataSeries;
        var nearest = hitTestHelpers_1.hitTestHelpers.getNearestXyPoint(this.webAssemblyContext, xCoordinateCalculator, yCoordinateCalculator, dataSeries, xHitCoord, yHitCoord, hitTestRadius);
        var xNativeValues = dataSeries.getNativeXValues();
        var yNativeValues = dataSeries.getNativeYValues();
        var hitTestInfo = hitTestHelpers_1.hitTestHelpers.createHitTestInfo(this.parentSeries, xCoordinateCalculator, yCoordinateCalculator, isVerticalChart, dataSeries, xNativeValues, yNativeValues, xHitCoord, yHitCoord, nearest.nearestPointIndex, hitTestRadius, nearest.distance);
        var labels = this.parentSeries.dataLabelProvider.dataLabels;
        var isHit = false;
        for (var _i = 0, labels_1 = labels; _i < labels_1.length; _i++) {
            var label = labels_1[_i];
            var _b = label.rect, left = _b.left, top_1 = _b.top, right = _b.right, bottom = _b.bottom;
            if ((0, pointUtil_1.testIsInBounds)(hitTestPoint.x, hitTestPoint.y, left, top_1, right, bottom)) {
                isHit = true;
                break;
            }
        }
        hitTestInfo.isHit = isHit;
        return hitTestInfo;
    };
    return TextSeriesHitTestProvider;
}(BaseHitTestProvider_1.BaseHitTestProvider));
exports.TextSeriesHitTestProvider = TextSeriesHitTestProvider;
