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
exports.WaveAnimation = void 0;
var AnimationType_1 = require("../../../../types/AnimationType");
var SeriesAnimation_1 = require("./SeriesAnimation");
var WaveAnimation = /** @class */ (function (_super) {
    __extends(WaveAnimation, _super);
    function WaveAnimation(options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = AnimationType_1.EAnimationType.Wave;
        /**
         * The value that specifies a relative duration of a point animation as a fraction of an overall animation
         */
        _this.pointDurationFraction = 0.2;
        /**
         * The line from which the animation evolves
         */
        _this.zeroLine = 0;
        _this.isOnStartAnimation = true;
        _this.pointDurationFraction = (_a = options === null || options === void 0 ? void 0 : options.pointDurationFraction) !== null && _a !== void 0 ? _a : _this.pointDurationFraction;
        _this.zeroLine = (_b = options === null || options === void 0 ? void 0 : options.zeroLine) !== null && _b !== void 0 ? _b : _this.zeroLine;
        return _this;
    }
    WaveAnimation.prototype.updateSeriesProperties = function (renderableSeries, initialStyles, animationProgress) {
        _super.prototype.updateSeriesProperties.call(this, renderableSeries, initialStyles, animationProgress);
        if (animationProgress === 0) {
            renderableSeries.dataSeries.containsNaN = true;
        }
        else if (animationProgress === 1) {
            renderableSeries.dataSeries.containsNaN = false;
        }
    };
    /** @inheritDoc */
    WaveAnimation.prototype.calculateAnimationValues = function (wasmContext, originalValues, animationValues, progress, noZeroLine) {
        if (noZeroLine === void 0) { noZeroLine = false; }
        var pointDurationFraction = this.pointDurationFraction;
        var zeroLine = noZeroLine ? 0 : this.zeroLine;
        wasmContext.SCRTAnimationHelperWave(originalValues, pointDurationFraction, zeroLine, this.reverse ? 1 - progress : progress, animationValues);
    };
    WaveAnimation.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            zeroLine: this.zeroLine,
            pointDurationFraction: this.pointDurationFraction
        };
        Object.assign(json.options, options);
        return json;
    };
    return WaveAnimation;
}(SeriesAnimation_1.SeriesAnimation));
exports.WaveAnimation = WaveAnimation;
