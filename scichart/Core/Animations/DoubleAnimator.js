"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleAnimator = void 0;
var Animator_1 = require("./Animator");
var EasingFunctions_1 = require("./EasingFunctions");
/**
 * A class for animating a double-precision (number) value
 */
var DoubleAnimator = /** @class */ (function () {
    function DoubleAnimator() {
    }
    /**
     * @deprecated Instead create an {@link GenericAnimation} and pass it to sciChartSurface.addAnimation
     */
    DoubleAnimator.animate = function (from, to, durationMs, onAnimate, onCompleted, easingFunction) {
        if (easingFunction === void 0) { easingFunction = EasingFunctions_1.easing.outExpo; }
        return (0, Animator_1.animateAny)(durationMs, from, to, onAnimate, DoubleAnimator.interpolate, onCompleted, easingFunction);
    };
    DoubleAnimator.interpolate = function (from, to, interpolationFactor) {
        var result = (to - from) * interpolationFactor + from;
        return result;
    };
    return DoubleAnimator;
}());
exports.DoubleAnimator = DoubleAnimator;
