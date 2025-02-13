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
exports.ScaleAnimation = void 0;
var AnimationType_1 = require("../../../../types/AnimationType");
var SeriesAnimation_1 = require("./SeriesAnimation");
var ScaleAnimation = /** @class */ (function (_super) {
    __extends(ScaleAnimation, _super);
    function ScaleAnimation(options) {
        var _this = this;
        var _a;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = AnimationType_1.EAnimationType.Scale;
        /**
         * The line from which the animation evolves
         */
        _this.zeroLine = 0;
        _this.isOnStartAnimation = true;
        _this.zeroLine = (_a = options === null || options === void 0 ? void 0 : options.zeroLine) !== null && _a !== void 0 ? _a : _this.zeroLine;
        return _this;
    }
    /** @inheritDoc */
    ScaleAnimation.prototype.calculateAnimationValues = function (wasmContext, originalValues, animationValues, progress, noZeroLine) {
        if (noZeroLine === void 0) { noZeroLine = false; }
        var zeroLine = noZeroLine ? 0 : this.zeroLine;
        wasmContext.SCRTAnimationHelperScale(originalValues, zeroLine, this.reverse ? 1 - progress : progress, animationValues);
    };
    ScaleAnimation.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            zeroLine: this.zeroLine
        };
        Object.assign(json.options, options);
        return json;
    };
    return ScaleAnimation;
}(SeriesAnimation_1.SeriesAnimation));
exports.ScaleAnimation = ScaleAnimation;
