"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripAutoColor = exports.ThemeProvider = exports.AUTO_COLOR = void 0;
var parseColor_1 = require("../../utils/parseColor");
var PaletteFactory_1 = require("../Model/PaletteFactory");
exports.AUTO_COLOR = "auto";
var ThemeProvider = /** @class */ (function () {
    function ThemeProvider() {
        this.strokePalette = [];
        this.fillPalette = [];
    }
    ThemeProvider.prototype.getStrokeColor = function (index, max, wasmContext) {
        return this.getPaletteColor(index, max, wasmContext, true);
    };
    ThemeProvider.prototype.getFillColor = function (index, max, wasmContext) {
        return this.getPaletteColor(index, max, wasmContext, false);
    };
    ThemeProvider.prototype.applyOverrides = function (overrides) {
        this.overrides = overrides;
        Object.assign(this, overrides);
    };
    ThemeProvider.prototype.toJSON = function () {
        return __assign({ type: this.type }, this.overrides);
    };
    ThemeProvider.prototype.getPaletteColor = function (index, max, wasmContext, isStroke) {
        var palette = isStroke ? this.strokePalette : this.fillPalette;
        if (!palette || palette.length === 0) {
            throw new Error("".concat(isStroke ? "stroke" : "fill", "Palette must not be empty to use get").concat(isStroke ? "Stroke" : "Fill", "Color"));
        }
        if (palette.length < 2) {
            return this.toColor(palette[0]);
        }
        if (index > max) {
            throw new Error("index must be less than or equal to max");
        }
        if (max <= palette.length) {
            return this.toColor(palette[index]);
        }
        var gradient = isStroke ? this.strokeGradient : this.fillGradient;
        if (!gradient) {
            var gradientStops = typeof palette[0] === "string"
                ? palette.map(function (color, i) {
                    return ({
                        color: color,
                        offset: i / palette.length - 1
                    });
                })
                : palette;
            gradient = PaletteFactory_1.PaletteFactory.createColorMap(wasmContext, gradientStops);
            if (isStroke) {
                this.strokeGradient = gradient;
            }
            else {
                this.fillGradient = gradient;
            }
        }
        var lerpFactor = index / max;
        var mapIndex = wasmContext.NumberUtil.Constrain(Math.round(lerpFactor * (gradient.length - 1)), 0, gradient.length - 1);
        var result = gradient[mapIndex];
        return (0, parseColor_1.parseArgbToHtmlColor)(result);
    };
    ThemeProvider.prototype.toColor = function (val) {
        if (typeof val === "string") {
            return val;
        }
        else {
            return val.color;
        }
    };
    return ThemeProvider;
}());
exports.ThemeProvider = ThemeProvider;
var stripAutoColor = function (val) {
    if (val === exports.AUTO_COLOR) {
        return "#00000000";
    }
    if (val && val.startsWith(exports.AUTO_COLOR)) {
        return val.substring(exports.AUTO_COLOR.length);
    }
    return val;
};
exports.stripAutoColor = stripAutoColor;
