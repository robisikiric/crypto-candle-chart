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
exports.CandlestickAnimation = void 0;
var AnimationType_1 = require("../../../../types/AnimationType");
var parseColor_1 = require("../../../../utils/parseColor");
var animationHelpers_1 = require("./animationHelpers");
var CandlestickAnimationStyle_1 = require("./CandlestickAnimationStyle");
var OhlcAnimation_1 = require("./OhlcAnimation");
var CandlestickAnimation = /** @class */ (function (_super) {
    __extends(CandlestickAnimation, _super);
    function CandlestickAnimation(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = AnimationType_1.EAnimationType.Style;
        _this.duration = (_a = options === null || options === void 0 ? void 0 : options.duration) !== null && _a !== void 0 ? _a : 1000;
        _this.styles = (options === null || options === void 0 ? void 0 : options.styles) ? new CandlestickAnimationStyle_1.CandlestickAnimationStyle(options.styles) : _this.styles;
        _this.dataSeries = (_b = options === null || options === void 0 ? void 0 : options.dataSeries) !== null && _b !== void 0 ? _b : _this.dataSeries;
        return _this;
    }
    /** @inheritDoc */
    CandlestickAnimation.prototype.getSeriesStyle = function (rs) {
        var _a;
        if (rs.isStacked)
            return undefined;
        return new CandlestickAnimationStyle_1.CandlestickAnimationStyle({
            stroke: rs.stroke,
            strokeThickness: rs.strokeThickness,
            opacity: rs.opacity,
            strokeUp: rs.strokeUp,
            strokeDown: rs.strokeDown,
            brushUp: rs.brushUp,
            brushDown: rs.brushDown,
            pointMarker: (_a = rs.pointMarker) === null || _a === void 0 ? void 0 : _a.getPointMarkerStyle()
        });
    };
    /** @inheritDoc */
    CandlestickAnimation.prototype.updateSeriesProperties = function (renderableSeries, initialStyles, animationProgress) {
        _super.prototype.updateSeriesProperties.call(this, renderableSeries, initialStyles, animationProgress);
        if (this.isStyleAnimation) {
            var candlestickAnimationStyles = this.styles;
            if (candlestickAnimationStyles.brushUp !== undefined) {
                var newColor = animationHelpers_1.animationHelpers.interpolateColor(initialStyles.brushUpARGB, candlestickAnimationStyles.brushUpARGB, animationProgress);
                // TODO optimise to use ARGB color
                renderableSeries.brushUp = (0, parseColor_1.parseArgbToHtmlColor)(newColor);
            }
            if (candlestickAnimationStyles.brushDown !== undefined) {
                var newColor = animationHelpers_1.animationHelpers.interpolateColor(initialStyles.brushDownARGB, candlestickAnimationStyles.brushDownARGB, animationProgress);
                // TODO optimise to use ARGB color
                renderableSeries.brushDown = (0, parseColor_1.parseArgbToHtmlColor)(newColor);
            }
        }
    };
    return CandlestickAnimation;
}(OhlcAnimation_1.OhlcAnimation));
exports.CandlestickAnimation = CandlestickAnimation;
