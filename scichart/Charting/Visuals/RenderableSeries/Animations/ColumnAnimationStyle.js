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
exports.ColumnAnimationStyle = void 0;
var parseColor_1 = require("../../../../utils/parseColor");
var BaseAnimationStyle_1 = require("./BaseAnimationStyle");
var ColumnAnimationStyle = /** @class */ (function (_super) {
    __extends(ColumnAnimationStyle, _super);
    function ColumnAnimationStyle(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        _this.fill = (_a = options === null || options === void 0 ? void 0 : options.fill) !== null && _a !== void 0 ? _a : _this.fillProperty;
        _this.zeroLineY = (_b = options === null || options === void 0 ? void 0 : options.zeroLineY) !== null && _b !== void 0 ? _b : _this.zeroLineY;
        _this.dataPointWidth = (_c = options === null || options === void 0 ? void 0 : options.dataPointWidth) !== null && _c !== void 0 ? _c : _this.dataPointWidth;
        return _this;
    }
    Object.defineProperty(ColumnAnimationStyle.prototype, "fill", {
        get: function () {
            return this.fillProperty;
        },
        set: function (value) {
            this.fillProperty = value;
            if (value) {
                this.fillARGBProperty = (0, parseColor_1.parseColorToUIntArgb)(value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnAnimationStyle.prototype, "fillARGB", {
        get: function () {
            return this.fillARGBProperty;
        },
        enumerable: false,
        configurable: true
    });
    return ColumnAnimationStyle;
}(BaseAnimationStyle_1.BaseAnimationStyle));
exports.ColumnAnimationStyle = ColumnAnimationStyle;
