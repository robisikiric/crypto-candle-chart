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
exports.OhlcSeriesInfo = void 0;
var SeriesInfo_1 = require("./SeriesInfo");
var OhlcSeriesInfo = /** @class */ (function (_super) {
    __extends(OhlcSeriesInfo, _super);
    function OhlcSeriesInfo(renderableSeries, hitTestInfo) {
        var _this = _super.call(this, renderableSeries, hitTestInfo) || this;
        _this.openValue = hitTestInfo.openValue;
        _this.highValue = hitTestInfo.highValue;
        _this.lowValue = hitTestInfo.lowValue;
        _this.closeValue = hitTestInfo.closeValue;
        return _this;
    }
    Object.defineProperty(OhlcSeriesInfo.prototype, "formattedOpenValue", {
        get: function () {
            return this.getYCursorFormattedValue(this.openValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OhlcSeriesInfo.prototype, "formattedHighValue", {
        get: function () {
            return this.getYCursorFormattedValue(this.highValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OhlcSeriesInfo.prototype, "formattedLowValue", {
        get: function () {
            return this.getYCursorFormattedValue(this.lowValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OhlcSeriesInfo.prototype, "formattedCloseValue", {
        get: function () {
            return this.getYCursorFormattedValue(this.closeValue);
        },
        enumerable: false,
        configurable: true
    });
    return OhlcSeriesInfo;
}(SeriesInfo_1.SeriesInfo));
exports.OhlcSeriesInfo = OhlcSeriesInfo;
