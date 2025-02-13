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
exports.XyySeriesInfo = void 0;
var SeriesInfo_1 = require("./SeriesInfo");
var XyySeriesInfo = /** @class */ (function (_super) {
    __extends(XyySeriesInfo, _super);
    function XyySeriesInfo(renderableSeries, hitTestInfo) {
        var _this = _super.call(this, renderableSeries, hitTestInfo) || this;
        _this.isFirstSeries = true;
        _this.y1Value = hitTestInfo.y1Value;
        _this.point2y1Value = hitTestInfo.point2y1Value;
        _this.y1Coordinate = hitTestInfo.y1Coord;
        _this.point2y1Coordinate = hitTestInfo.point2y1Coord;
        return _this;
    }
    Object.defineProperty(XyySeriesInfo.prototype, "formattedY1Value", {
        get: function () {
            return this.getYCursorFormattedValue(this.y1Value);
        },
        enumerable: false,
        configurable: true
    });
    return XyySeriesInfo;
}(SeriesInfo_1.SeriesInfo));
exports.XyySeriesInfo = XyySeriesInfo;
