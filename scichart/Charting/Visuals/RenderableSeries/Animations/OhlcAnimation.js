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
exports.OhlcAnimation = void 0;
var AnimationType_1 = require("../../../../types/AnimationType");
var parseColor_1 = require("../../../../utils/parseColor");
var animationHelpers_1 = require("./animationHelpers");
var SeriesAnimation_1 = require("./SeriesAnimation");
var OhlcAnimationStyle_1 = require("./OhlcAnimationStyle");
var OhlcAnimation = /** @class */ (function (_super) {
    __extends(OhlcAnimation, _super);
    function OhlcAnimation(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = AnimationType_1.EAnimationType.Style;
        _this.duration = (_a = options === null || options === void 0 ? void 0 : options.duration) !== null && _a !== void 0 ? _a : 1000;
        _this.styles = (options === null || options === void 0 ? void 0 : options.styles) ? new OhlcAnimationStyle_1.OhlcAnimationStyle(options.styles) : _this.styles;
        _this.dataSeries = (_b = options === null || options === void 0 ? void 0 : options.dataSeries) !== null && _b !== void 0 ? _b : _this.dataSeries;
        return _this;
    }
    /** @inheritDoc */
    OhlcAnimation.prototype.getSeriesStyle = function (rs) {
        var _a;
        if (rs.isStacked)
            return undefined;
        return new OhlcAnimationStyle_1.OhlcAnimationStyle({
            stroke: rs.stroke,
            strokeThickness: rs.strokeThickness,
            opacity: rs.opacity,
            strokeUp: rs.strokeUp,
            strokeDown: rs.strokeDown,
            dataPointWidth: rs.dataPointWidth,
            pointMarker: (_a = rs.pointMarker) === null || _a === void 0 ? void 0 : _a.getPointMarkerStyle()
        });
    };
    /** @inheritDoc */
    OhlcAnimation.prototype.updateSeriesProperties = function (rs, initialStyles, animationProgress) {
        _super.prototype.updateSeriesProperties.call(this, rs, initialStyles, animationProgress);
        if (this.isStyleAnimation) {
            var ohlcAnimationStyles = this.styles;
            if (ohlcAnimationStyles.strokeUp !== undefined) {
                var newColor = animationHelpers_1.animationHelpers.interpolateColor(initialStyles.strokeUpARGB, ohlcAnimationStyles.strokeUpARGB, animationProgress);
                // TODO optimise to use ARGB color
                rs.strokeUp = (0, parseColor_1.parseArgbToHtmlColor)(newColor);
            }
            if (ohlcAnimationStyles.strokeDown !== undefined) {
                var newColor = animationHelpers_1.animationHelpers.interpolateColor(initialStyles.strokeDownARGB, ohlcAnimationStyles.strokeDownARGB, animationProgress);
                // TODO optimise to use ARGB color
                rs.strokeDown = (0, parseColor_1.parseArgbToHtmlColor)(newColor);
            }
            if (ohlcAnimationStyles.dataPointWidth !== undefined) {
                rs.dataPointWidth = animationHelpers_1.animationHelpers.interpolateNumber(initialStyles.dataPointWidth, ohlcAnimationStyles.dataPointWidth, animationProgress);
            }
        }
    };
    return OhlcAnimation;
}(SeriesAnimation_1.SeriesAnimation));
exports.OhlcAnimation = OhlcAnimation;
