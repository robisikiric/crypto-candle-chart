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
exports.BasePointSeriesResampled = void 0;
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var BasePointSeriesResampled = /** @class */ (function (_super) {
    __extends(BasePointSeriesResampled, _super);
    function BasePointSeriesResampled(wasmContext, xRange) {
        var _this = _super.call(this) || this;
        _this.resampled = true;
        _this.wasmContext = wasmContext;
        _this.intIndexes = new wasmContext.IntVector();
        _this.indexes = new wasmContext.SCRTDoubleVector();
        _this.xValues = new wasmContext.SCRTDoubleVector();
        _this.yValues = new wasmContext.SCRTDoubleVector();
        _this.xRange = xRange;
        return _this;
    }
    Object.defineProperty(BasePointSeriesResampled.prototype, "count", {
        get: function () {
            return this.xValues.size();
        },
        enumerable: false,
        configurable: true
    });
    BasePointSeriesResampled.prototype.delete = function () {
        this.intIndexes.delete();
        this.indexes.delete();
        this.xValues.delete();
        this.yValues.delete();
        this.wasmContext = undefined;
    };
    BasePointSeriesResampled.prototype.clearIntIndexes = function () {
        this.intIndexes.clear();
    };
    BasePointSeriesResampled.prototype.debugOutputForUnitTests = function () {
        console.log("points count ".concat(this.count));
        console.log("xResampled at min", this.xValues.get(0));
        console.log("openResampled at min", this.yValues.get(0));
        var middle = Math.round(this.count / 2);
        console.log("middle", middle);
        console.log("xResampled at middle", this.xValues.get(middle));
        console.log("yValues at middle", this.yValues.get(middle));
        var end = this.count - 1;
        console.log("xResampled at end", this.xValues.get(end));
        console.log("yValues at end", this.yValues.get(end));
    };
    return BasePointSeriesResampled;
}(DeletableEntity_1.DeletableEntity));
exports.BasePointSeriesResampled = BasePointSeriesResampled;
