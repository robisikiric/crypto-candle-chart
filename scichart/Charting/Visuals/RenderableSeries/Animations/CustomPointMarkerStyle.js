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
exports.CustomPointMarkerStyle = void 0;
var BasePointMarkerStyle_1 = require("./BasePointMarkerStyle");
var CustomPointMarkerStyle = /** @class */ (function (_super) {
    __extends(CustomPointMarkerStyle, _super);
    function CustomPointMarkerStyle(options) {
        var _this = this;
        var _a;
        _this = _super.call(this, options) || this;
        _this.image = (_a = options === null || options === void 0 ? void 0 : options.image) !== null && _a !== void 0 ? _a : _this.image;
        return _this;
    }
    return CustomPointMarkerStyle;
}(BasePointMarkerStyle_1.BasePointMarkerStyle));
exports.CustomPointMarkerStyle = CustomPointMarkerStyle;
