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
exports.MountainAnimation = void 0;
var AnimationType_1 = require("../../../../types/AnimationType");
var parseColor_1 = require("../../../../utils/parseColor");
var animationHelpers_1 = require("./animationHelpers");
var SeriesAnimation_1 = require("./SeriesAnimation");
var MountainAnimationStyle_1 = require("./MountainAnimationStyle");
var PointMarkerStyle_1 = require("./PointMarkerStyle");
var MountainAnimation = /** @class */ (function (_super) {
    __extends(MountainAnimation, _super);
    function MountainAnimation(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = AnimationType_1.EAnimationType.Style;
        _this.duration = (_a = options === null || options === void 0 ? void 0 : options.duration) !== null && _a !== void 0 ? _a : 1000;
        _this.styles = (options === null || options === void 0 ? void 0 : options.styles) ? new MountainAnimationStyle_1.MountainAnimationStyle(options.styles) : _this.styles;
        _this.dataSeries = (_b = options === null || options === void 0 ? void 0 : options.dataSeries) !== null && _b !== void 0 ? _b : _this.dataSeries;
        return _this;
    }
    /** @inheritDoc */
    MountainAnimation.prototype.getSeriesStyle = function (rs) {
        var _a, _b;
        if (rs.isStacked)
            return undefined;
        return new MountainAnimationStyle_1.MountainAnimationStyle({
            stroke: rs.stroke,
            strokeThickness: rs.strokeThickness,
            opacity: rs.opacity,
            pointMarker: (_b = (_a = rs.pointMarker) === null || _a === void 0 ? void 0 : _a.getPointMarkerStyle()) !== null && _b !== void 0 ? _b : new PointMarkerStyle_1.PointMarkerStyle(),
            fill: rs.fill,
            zeroLineY: rs.zeroLineY
        });
    };
    /** @inheritDoc */
    MountainAnimation.prototype.updateSeriesProperties = function (rs, initialStyles, animationProgress) {
        _super.prototype.updateSeriesProperties.call(this, rs, initialStyles, animationProgress);
        if (this.isStyleAnimation) {
            var animationStyles = this.styles;
            if (animationStyles.fill !== undefined) {
                var newColor = animationHelpers_1.animationHelpers.interpolateColor(initialStyles.fillARGB, animationStyles.fillARGB, animationProgress);
                // TODO optimise to use ARGB color
                rs.fill = (0, parseColor_1.parseArgbToHtmlColor)(newColor);
            }
            if (animationStyles.zeroLineY !== undefined) {
                rs.zeroLineY = animationHelpers_1.animationHelpers.interpolateNumber(initialStyles.zeroLineY, animationStyles.zeroLineY, animationProgress);
            }
        }
    };
    return MountainAnimation;
}(SeriesAnimation_1.SeriesAnimation));
exports.MountainAnimation = MountainAnimation;
