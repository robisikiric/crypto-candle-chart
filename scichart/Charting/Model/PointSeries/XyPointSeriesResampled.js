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
exports.XyPointSeriesResampled = void 0;
var BasePointSeriesResampled_1 = require("./BasePointSeriesResampled");
var XyPointSeriesResampled = /** @class */ (function (_super) {
    __extends(XyPointSeriesResampled, _super);
    function XyPointSeriesResampled(wasmContext, xRange) {
        return _super.call(this, wasmContext, xRange) || this;
    }
    return XyPointSeriesResampled;
}(BasePointSeriesResampled_1.BasePointSeriesResampled));
exports.XyPointSeriesResampled = XyPointSeriesResampled;
