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
exports.OhlcAnimationStyle = void 0;
var parseColor_1 = require("../../../../utils/parseColor");
var BaseAnimationStyle_1 = require("./BaseAnimationStyle");
var OhlcAnimationStyle = /** @class */ (function (_super) {
    __extends(OhlcAnimationStyle, _super);
    function OhlcAnimationStyle(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        _this.strokeUp = (_a = options === null || options === void 0 ? void 0 : options.strokeUp) !== null && _a !== void 0 ? _a : _this.strokeUpProperty;
        _this.strokeDown = (_b = options === null || options === void 0 ? void 0 : options.strokeDown) !== null && _b !== void 0 ? _b : _this.strokeDownProperty;
        _this.dataPointWidth = (_c = options === null || options === void 0 ? void 0 : options.dataPointWidth) !== null && _c !== void 0 ? _c : _this.dataPointWidth;
        return _this;
    }
    Object.defineProperty(OhlcAnimationStyle.prototype, "strokeUp", {
        get: function () {
            return this.strokeUpProperty;
        },
        set: function (value) {
            this.strokeUpProperty = value;
            if (value) {
                this.strokeUpARGBProperty = (0, parseColor_1.parseColorToUIntArgb)(value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OhlcAnimationStyle.prototype, "strokeUpARGB", {
        get: function () {
            return this.strokeUpARGBProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OhlcAnimationStyle.prototype, "strokeDown", {
        get: function () {
            return this.strokeDownProperty;
        },
        set: function (value) {
            this.strokeDownProperty = value;
            if (value) {
                this.strokeDownARGBProperty = (0, parseColor_1.parseColorToUIntArgb)(value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OhlcAnimationStyle.prototype, "strokeDownARGB", {
        get: function () {
            return this.strokeDownARGBProperty;
        },
        enumerable: false,
        configurable: true
    });
    return OhlcAnimationStyle;
}(BaseAnimationStyle_1.BaseAnimationStyle));
exports.OhlcAnimationStyle = OhlcAnimationStyle;
