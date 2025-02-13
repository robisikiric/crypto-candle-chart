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
exports.FadeAnimation = void 0;
var AnimationType_1 = require("../../../../types/AnimationType");
var SeriesAnimation_1 = require("./SeriesAnimation");
var FadeAnimation = /** @class */ (function (_super) {
    __extends(FadeAnimation, _super);
    function FadeAnimation(options) {
        var _this = this;
        var _a;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = AnimationType_1.EAnimationType.Fade;
        _this.isFadeEffectAnimation = (_a = options === null || options === void 0 ? void 0 : options.fadeEffect) !== null && _a !== void 0 ? _a : true;
        return _this;
    }
    /** @inheritDoc */
    FadeAnimation.prototype.calculateAnimationValues = function (wasmContext, originalValues, animationValues, progress, noZeroLine) {
        if (noZeroLine === void 0) { noZeroLine = false; }
        wasmContext.SCRTAnimationHelperFade(originalValues, progress, animationValues);
    };
    return FadeAnimation;
}(SeriesAnimation_1.SeriesAnimation));
exports.FadeAnimation = FadeAnimation;
