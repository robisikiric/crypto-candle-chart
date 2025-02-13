"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAnimationStyle = void 0;
var PointMarkerType_1 = require("../../../../types/PointMarkerType");
var parseColor_1 = require("../../../../utils/parseColor");
var CustomPointMarkerStyle_1 = require("./CustomPointMarkerStyle");
var PointMarkerStyle_1 = require("./PointMarkerStyle");
var BaseAnimationStyle = /** @class */ (function () {
    function BaseAnimationStyle(options) {
        var _a, _b, _c;
        this.opacity = undefined;
        this.strokeProperty = undefined;
        this.strokeThickness = (_a = options === null || options === void 0 ? void 0 : options.strokeThickness) !== null && _a !== void 0 ? _a : this.strokeThickness;
        this.stroke = (_b = options === null || options === void 0 ? void 0 : options.stroke) !== null && _b !== void 0 ? _b : this.strokeProperty;
        if (options === null || options === void 0 ? void 0 : options.pointMarker) {
            this.pointMarker =
                options.pointMarker.type === PointMarkerType_1.EPointMarkerType.Sprite
                    ? new CustomPointMarkerStyle_1.CustomPointMarkerStyle(options.pointMarker)
                    : new PointMarkerStyle_1.PointMarkerStyle(options.pointMarker);
        }
        this.opacity = (_c = options === null || options === void 0 ? void 0 : options.opacity) !== null && _c !== void 0 ? _c : this.opacity;
    }
    Object.defineProperty(BaseAnimationStyle.prototype, "stroke", {
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
    Object.defineProperty(BaseAnimationStyle.prototype, "strokeARGB", {
        get: function () {
            return this.strokeARGBProperty;
        },
        enumerable: false,
        configurable: true
    });
    return BaseAnimationStyle;
}());
exports.BaseAnimationStyle = BaseAnimationStyle;
