"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberRangeAnimator = void 0;
var Guard_1 = require("../Guard");
var NumberRange_1 = require("../NumberRange");
var EasingFunctions_1 = require("./EasingFunctions");
var GenericAnimation_1 = require("./GenericAnimation");
/**
 * A class for animating a value of type {@link NumberRange}. Used throughout SciChart to animate
 * {@link AxisCore.visibleRange} when zooming or panning.
 */
var NumberRangeAnimator = /** @class */ (function () {
    function NumberRangeAnimator() {
    }
    /**
     * Animates a {@link NumberRange} with a start, to value over a specified duration and with an optional completed and easing function
     * @param from The start value to animate
     * @param to The end value to animate
     * @param durationMs The duration of the animation in milliseconds
     * @param onAnimate A callback function which is called with intermediate values
     * @param onCompleted A callback function which is called when the animation completes
     * @param easingFunction An optional easing function. See {@link IEasingMap} for a list of values
     */
    NumberRangeAnimator.animate = function (from, to, durationMs, onAnimate, onCompleted, easingFunction, isLog) {
        if (easingFunction === void 0) { easingFunction = EasingFunctions_1.easing.outExpo; }
        if (isLog === void 0) { isLog = false; }
        var animation = new GenericAnimation_1.GenericAnimation({
            from: from,
            to: to,
            duration: durationMs,
            onAnimate: function (start, end, progress) {
                var interpolate = isLog ? NumberRangeAnimator.interpolateLog : NumberRangeAnimator.interpolate;
                var intermediate = interpolate(start, end, progress);
                onAnimate(intermediate);
            },
            delay: 0,
            ease: easingFunction,
            onCompleted: onCompleted
        });
        return animation;
    };
    NumberRangeAnimator.interpolate = function (from, to, interpolationFactor) {
        Guard_1.Guard.notNull(from, "from");
        Guard_1.Guard.notNull(to, "to");
        var newMin = (to.min - from.min) * interpolationFactor + from.min;
        var newMax = (to.max - from.max) * interpolationFactor + from.max;
        var result = new NumberRange_1.NumberRange(newMin, newMax);
        return result;
    };
    NumberRangeAnimator.interpolateLog = function (from, to, interpolationFactor) {
        Guard_1.Guard.notNull(from, "from");
        Guard_1.Guard.notNull(to, "to");
        var newMin = Math.pow(to.min / from.min, interpolationFactor) * from.min;
        var newMax = Math.pow(to.max / from.max, interpolationFactor) * from.max;
        var result = new NumberRange_1.NumberRange(newMin, newMax);
        return result;
    };
    return NumberRangeAnimator;
}());
exports.NumberRangeAnimator = NumberRangeAnimator;
