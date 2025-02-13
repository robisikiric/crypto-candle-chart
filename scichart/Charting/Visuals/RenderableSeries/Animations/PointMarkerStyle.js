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
exports.PointMarkerStyle = void 0;
var parseColor_1 = require("../../../../utils/parseColor");
var BasePointMarkerStyle_1 = require("./BasePointMarkerStyle");
var PointMarkerStyle = /** @class */ (function (_super) {
    __extends(PointMarkerStyle, _super);
    function PointMarkerStyle(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        _this.strokeThickness = 0;
        _this.strokeThickness = (_a = options === null || options === void 0 ? void 0 : options.strokeThickness) !== null && _a !== void 0 ? _a : _this.strokeThickness;
        _this.stroke = (_b = options === null || options === void 0 ? void 0 : options.stroke) !== null && _b !== void 0 ? _b : "#ffffff00";
        _this.fill = (_c = options === null || options === void 0 ? void 0 : options.fill) !== null && _c !== void 0 ? _c : "#ffffff00";
        return _this;
    }
    Object.defineProperty(PointMarkerStyle.prototype, "stroke", {
        get: function () {
            return this.strokeProperty;
        },
        set: function (value) {
            this.strokeProperty = value;
            if (value) {
                this.strokeARGBProperty = (0, parseColor_1.parseColorToUIntArgb)(value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointMarkerStyle.prototype, "strokeARGB", {
        get: function () {
            return this.strokeARGBProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointMarkerStyle.prototype, "fill", {
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
    Object.defineProperty(PointMarkerStyle.prototype, "fillARGB", {
        get: function () {
            return this.fillARGBProperty;
        },
        enumerable: false,
        configurable: true
    });
    return PointMarkerStyle;
}(BasePointMarkerStyle_1.BasePointMarkerStyle));
exports.PointMarkerStyle = PointMarkerStyle;
