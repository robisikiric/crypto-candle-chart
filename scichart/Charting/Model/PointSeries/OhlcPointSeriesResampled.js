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
exports.OhlcPointSeriesResampled = void 0;
var BasePointSeriesResampled_1 = require("./BasePointSeriesResampled");
var OhlcPointSeriesResampled = /** @class */ (function (_super) {
    __extends(OhlcPointSeriesResampled, _super);
    function OhlcPointSeriesResampled(wasmContext, xRange) {
        var _this = _super.call(this, wasmContext, xRange) || this;
        _this.openValues = new wasmContext.SCRTDoubleVector();
        _this.highValues = new wasmContext.SCRTDoubleVector();
        _this.lowValues = new wasmContext.SCRTDoubleVector();
        _this.closeValues = _this.yValues;
        return _this;
    }
    OhlcPointSeriesResampled.prototype.delete = function () {
        this.openValues.delete();
        this.highValues.delete();
        this.lowValues.delete();
        _super.prototype.delete.call(this);
    };
    OhlcPointSeriesResampled.prototype.debugOutputForUnitTests = function () {
        console.log("points count ".concat(this.count));
        console.log("xResampled at min", this.xValues.get(0));
        console.log("openResampled at min", this.openValues.get(0));
        console.log("highResampled at min", this.highValues.get(0));
        console.log("lowResampled at min", this.lowValues.get(0));
        console.log("closeResampled at min", this.closeValues.get(0));
        var middle = Math.round(this.count / 2);
        console.log("middle", middle);
        console.log("xResampled at middle", this.xValues.get(middle));
        console.log("openResampled at middle", this.openValues.get(middle));
        console.log("highResampled at middle", this.highValues.get(middle));
        console.log("lowResampled at middle", this.lowValues.get(middle));
        console.log("closeResampled at middle", this.closeValues.get(middle));
        var end = this.count - 1;
        console.log("xResampled at end", this.xValues.get(end));
        console.log("openResampled at end", this.openValues.get(end));
        console.log("highResampled at end", this.highValues.get(end));
        console.log("lowResampled at end", this.lowValues.get(end));
        console.log("closeResampled at end", this.closeValues.get(end));
    };
    return OhlcPointSeriesResampled;
}(BasePointSeriesResampled_1.BasePointSeriesResampled));
exports.OhlcPointSeriesResampled = OhlcPointSeriesResampled;
