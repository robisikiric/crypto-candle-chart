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
exports.XyzSeriesInfo = void 0;
var SeriesInfo_1 = require("./SeriesInfo");
var XyzSeriesInfo = /** @class */ (function (_super) {
    __extends(XyzSeriesInfo, _super);
    function XyzSeriesInfo(renderableSeries, hitTestInfo) {
        var _this = _super.call(this, renderableSeries, hitTestInfo) || this;
        _this.zValue = hitTestInfo.zValue;
        return _this;
    }
    Object.defineProperty(XyzSeriesInfo.prototype, "formattedZValue", {
        get: function () {
            return this.getYCursorFormattedValue(this.zValue);
        },
        enumerable: false,
        configurable: true
    });
    return XyzSeriesInfo;
}(SeriesInfo_1.SeriesInfo));
exports.XyzSeriesInfo = XyzSeriesInfo;
