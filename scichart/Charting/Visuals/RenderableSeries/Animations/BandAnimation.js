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
exports.BandAnimation = void 0;
var AnimationType_1 = require("../../../../types/AnimationType");
var parseColor_1 = require("../../../../utils/parseColor");
var animationHelpers_1 = require("./animationHelpers");
var BandAnimationStyle_1 = require("./BandAnimationStyle");
var SeriesAnimation_1 = require("./SeriesAnimation");
var BandAnimation = /** @class */ (function (_super) {
    __extends(BandAnimation, _super);
    function BandAnimation(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = AnimationType_1.EAnimationType.Style;
        _this.duration = (_a = options === null || options === void 0 ? void 0 : options.duration) !== null && _a !== void 0 ? _a : 1000;
        _this.styles = (options === null || options === void 0 ? void 0 : options.styles) ? new BandAnimationStyle_1.BandAnimationStyle(options.styles) : _this.styles;
        _this.dataSeries = (_b = options === null || options === void 0 ? void 0 : options.dataSeries) !== null && _b !== void 0 ? _b : _this.dataSeries;
        return _this;
    }
    /** @inheritDoc */
    BandAnimation.prototype.getSeriesStyle = function (rs) {
        var _a;
        if (rs.isStacked)
            return undefined;
        return new BandAnimationStyle_1.BandAnimationStyle({
            stroke: rs.stroke,
            strokeY1: rs.strokeY1,
            fill: rs.fill,
            fillY1: rs.fillY1,
            strokeThickness: rs.strokeThickness,
            opacity: rs.opacity,
            pointMarker: (_a = rs.pointMarker) === null || _a === void 0 ? void 0 : _a.getPointMarkerStyle()
        });
    };
    /** @inheritDoc */
    BandAnimation.prototype.updateSeriesProperties = function (renderableSeries, initialStyles, animationProgress) {
        _super.prototype.updateSeriesProperties.call(this, renderableSeries, initialStyles, animationProgress);
        if (this.isStyleAnimation) {
            var bandAnimationStyles = this.styles;
            if (bandAnimationStyles.strokeY1 !== undefined) {
                var newColor = animationHelpers_1.animationHelpers.interpolateColor(initialStyles.strokeY1ARGB, bandAnimationStyles.strokeY1ARGB, animationProgress);
                // TODO optimise to use ARGB color
                renderableSeries.strokeY1 = (0, parseColor_1.parseArgbToHtmlColor)(newColor);
            }
            if (bandAnimationStyles.fill !== undefined) {
                var newColor = animationHelpers_1.animationHelpers.interpolateColor(initialStyles.fillARGB, bandAnimationStyles.fillARGB, animationProgress);
                // TODO optimise to use ARGB color
                renderableSeries.fill = (0, parseColor_1.parseArgbToHtmlColor)(newColor);
            }
            if (bandAnimationStyles.fillY1 !== undefined) {
                var newColor = animationHelpers_1.animationHelpers.interpolateColor(initialStyles.fillY1ARGB, bandAnimationStyles.fillY1ARGB, animationProgress);
                // TODO optimise to use ARGB color
                renderableSeries.fillY1 = (0, parseColor_1.parseArgbToHtmlColor)(newColor);
            }
        }
    };
    return BandAnimation;
}(SeriesAnimation_1.SeriesAnimation));
exports.BandAnimation = BandAnimation;
