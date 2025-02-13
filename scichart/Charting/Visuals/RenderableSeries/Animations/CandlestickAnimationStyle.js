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
exports.CandlestickAnimationStyle = void 0;
var parseColor_1 = require("../../../../utils/parseColor");
var OhlcAnimationStyle_1 = require("./OhlcAnimationStyle");
var CandlestickAnimationStyle = /** @class */ (function (_super) {
    __extends(CandlestickAnimationStyle, _super);
    function CandlestickAnimationStyle(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, options) || this;
        _this.brushUp = (_a = options === null || options === void 0 ? void 0 : options.brushUp) !== null && _a !== void 0 ? _a : _this.brushUpProperty;
        _this.brushDown = (_b = options === null || options === void 0 ? void 0 : options.brushDown) !== null && _b !== void 0 ? _b : _this.brushDownProperty;
        return _this;
    }
    Object.defineProperty(CandlestickAnimationStyle.prototype, "brushUp", {
        get: function () {
            return this.brushUpProperty;
        },
        set: function (value) {
            this.brushUpProperty = value;
            if (value) {
                this.brushUpARGBProperty = (0, parseColor_1.parseColorToUIntArgb)(value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CandlestickAnimationStyle.prototype, "brushUpARGB", {
        get: function () {
            return this.brushUpARGBProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CandlestickAnimationStyle.prototype, "brushDown", {
        get: function () {
            return this.brushDownProperty;
        },
        set: function (value) {
            this.brushDownProperty = value;
            if (value) {
                this.brushDownARGBProperty = (0, parseColor_1.parseColorToUIntArgb)(value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CandlestickAnimationStyle.prototype, "brushDownARGB", {
        get: function () {
            return this.brushDownARGBProperty;
        },
        enumerable: false,
        configurable: true
    });
    return CandlestickAnimationStyle;
}(OhlcAnimationStyle_1.OhlcAnimationStyle));
exports.CandlestickAnimationStyle = CandlestickAnimationStyle;
