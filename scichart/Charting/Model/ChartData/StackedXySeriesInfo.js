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
exports.StackedXySeriesInfo = void 0;
var SeriesInfo_1 = require("./SeriesInfo");
var StackedXySeriesInfo = /** @class */ (function (_super) {
    __extends(StackedXySeriesInfo, _super);
    function StackedXySeriesInfo(renderableSeries, hitTestInfo) {
        var _this = _super.call(this, renderableSeries, hitTestInfo) || this;
        // Hit-test on StackedMountainSeries and StackedColumnSeries returns Y accumulated, Y1 original
        _this.yValue = hitTestInfo.y1Value;
        _this.accumulatedValue = hitTestInfo.yValue;
        return _this;
    }
    return StackedXySeriesInfo;
}(SeriesInfo_1.SeriesInfo));
exports.StackedXySeriesInfo = StackedXySeriesInfo;
