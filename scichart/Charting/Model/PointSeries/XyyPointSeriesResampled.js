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
exports.XyyPointSeriesResampled = void 0;
var BasePointSeriesResampled_1 = require("./BasePointSeriesResampled");
var XyyPointSeriesResampled = /** @class */ (function (_super) {
    __extends(XyyPointSeriesResampled, _super);
    function XyyPointSeriesResampled(wasmContext, xRange) {
        var _this = _super.call(this, wasmContext, xRange) || this;
        _this.y1Values = new wasmContext.SCRTDoubleVector();
        return _this;
    }
    XyyPointSeriesResampled.prototype.delete = function () {
        this.y1Values.delete();
        _super.prototype.delete.call(this);
    };
    XyyPointSeriesResampled.prototype.debugOutputForUnitTests = function () {
        console.log("points count ".concat(this.count));
        console.log("xResampled at min", this.xValues.get(0));
        console.log("yValues at min", this.yValues.get(0));
        console.log("y1Values at min", this.y1Values.get(0));
        var middle = Math.round(this.count / 2);
        console.log("middle", middle);
        console.log("xResampled at middle", this.xValues.get(middle));
        console.log("yValues at middle", this.yValues.get(middle));
        console.log("y1Values at middle", this.y1Values.get(middle));
        var end = this.count - 1;
        console.log("xResampled at end", this.xValues.get(end));
        console.log("yValues at end", this.yValues.get(end));
        console.log("y1Values at end", this.y1Values.get(end));
    };
    return XyyPointSeriesResampled;
}(BasePointSeriesResampled_1.BasePointSeriesResampled));
exports.XyyPointSeriesResampled = XyyPointSeriesResampled;
