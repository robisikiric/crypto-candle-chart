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
exports.OhlcPointSeriesWrapped = void 0;
var BasePointSeriesWrapped_1 = require("./BasePointSeriesWrapped");
var OhlcPointSeriesWrapped = /** @class */ (function (_super) {
    __extends(OhlcPointSeriesWrapped, _super);
    function OhlcPointSeriesWrapped(dataSeries) {
        var _this = _super.call(this, dataSeries) || this;
        _this.openValues = dataSeries.getNativeOpenValues();
        _this.highValues = dataSeries.getNativeHighValues();
        _this.lowValues = dataSeries.getNativeLowValues();
        _this.closeValues = _this.yValues;
        return _this;
    }
    return OhlcPointSeriesWrapped;
}(BasePointSeriesWrapped_1.BasePointSeriesWrapped));
exports.OhlcPointSeriesWrapped = OhlcPointSeriesWrapped;
