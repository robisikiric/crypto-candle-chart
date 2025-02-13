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
exports.BandAnimationStyle = void 0;
var parseColor_1 = require("../../../../utils/parseColor");
var BaseAnimationStyle_1 = require("./BaseAnimationStyle");
var BandAnimationStyle = /** @class */ (function (_super) {
    __extends(BandAnimationStyle, _super);
    function BandAnimationStyle(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        _this.strokeY1 = (_a = options === null || options === void 0 ? void 0 : options.strokeY1) !== null && _a !== void 0 ? _a : _this.strokeY1Property;
        _this.fill = (_b = options === null || options === void 0 ? void 0 : options.fill) !== null && _b !== void 0 ? _b : _this.fillProperty;
        _this.fillY1 = (_c = options === null || options === void 0 ? void 0 : options.fillY1) !== null && _c !== void 0 ? _c : _this.fillY1Property;
        return _this;
    }
    Object.defineProperty(BandAnimationStyle.prototype, "strokeY1", {
        get: function () {
            return this.strokeY1Property;
        },
        set: function (value) {
            this.strokeY1Property = value;
            if (value) {
                this.strokeY1ARGBProperty = (0, parseColor_1.parseColorToUIntArgb)(value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BandAnimationStyle.prototype, "strokeY1ARGB", {
        get: function () {
            return this.strokeY1ARGBProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BandAnimationStyle.prototype, "fill", {
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
    Object.defineProperty(BandAnimationStyle.prototype, "fillARGB", {
        get: function () {
            return this.fillARGBProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BandAnimationStyle.prototype, "fillY1", {
        get: function () {
            return this.fillY1Property;
        },
        set: function (value) {
            this.fillY1Property = value;
            if (value) {
                this.fillY1ARGBProperty = (0, parseColor_1.parseColorToUIntArgb)(value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BandAnimationStyle.prototype, "fillY1ARGB", {
        get: function () {
            return this.fillY1ARGBProperty;
        },
        enumerable: false,
        configurable: true
    });
    return BandAnimationStyle;
}(BaseAnimationStyle_1.BaseAnimationStyle));
exports.BandAnimationStyle = BandAnimationStyle;
