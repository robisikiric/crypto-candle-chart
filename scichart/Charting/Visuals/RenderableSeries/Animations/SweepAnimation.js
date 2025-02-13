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
exports.SweepAnimation = void 0;
var AnimationType_1 = require("../../../../types/AnimationType");
var SeriesAnimation_1 = require("./SeriesAnimation");
var SweepAnimation = /** @class */ (function (_super) {
    __extends(SweepAnimation, _super);
    function SweepAnimation(options) {
        var _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = AnimationType_1.EAnimationType.Sweep;
        _this.isOnStartAnimation = true;
        return _this;
    }
    SweepAnimation.prototype.updateSeriesProperties = function (renderableSeries, initialStyles, animationProgress) {
        _super.prototype.updateSeriesProperties.call(this, renderableSeries, initialStyles, animationProgress);
        if (animationProgress === 0) {
            renderableSeries.dataSeries.containsNaN = true;
        }
        else if (animationProgress === 1) {
            renderableSeries.dataSeries.containsNaN = false;
        }
    };
    /** @inheritDoc */
    SweepAnimation.prototype.calculateAnimationValues = function (wasmContext, originalValues, animationValues, progress, noZeroLine) {
        if (noZeroLine === void 0) { noZeroLine = false; }
        wasmContext.SCRTAnimationHelperSweep(originalValues, this.reverse ? 1 - progress : progress, animationValues);
    };
    return SweepAnimation;
}(SeriesAnimation_1.SeriesAnimation));
exports.SweepAnimation = SweepAnimation;
