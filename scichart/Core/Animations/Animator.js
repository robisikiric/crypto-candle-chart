"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animateAny = void 0;
var AnimationToken_1 = require("../AnimationToken");
var Guard_1 = require("../Guard");
var NumberUtil_1 = require("../NumberUtil");
/**
 * @deprecated Instead create an {@link GenericAnimation} and pass it to sciChartSurface.addAnimation
 */
function animateAny(durationMs, from, to, onAnimate, interpolate, onCompleted, easingFn) {
    Guard_1.Guard.notNull(onAnimate, "onAnimate");
    Guard_1.Guard.notNull(from, "from");
    Guard_1.Guard.notNull(to, "to");
    Guard_1.Guard.notNull(interpolate, "interpolate");
    var startTime = new Date().getTime();
    var endTime = startTime + durationMs;
    // start the animation
    onAnimate(from);
    var token = new AnimationToken_1.AnimationToken(setInterval(function () {
        var timeNow = new Date().getTime();
        var progressionFactor = NumberUtil_1.NumberUtil.constrain(1 - (endTime - timeNow) / durationMs, 0, 1);
        var easedValue = easingFn(progressionFactor);
        // Interpolate and notify
        var interpolated = interpolate(from, to, easedValue);
        onAnimate(interpolated);
        if (timeNow > endTime) {
            // Call the final onAnimate if not called
            if (easedValue !== 1) {
                onAnimate(interpolate(from, to, easingFn(1.0)));
            }
            // end the animation
            token.completeAnimation();
        }
    }, 16.67), onCompleted);
    return token;
}
exports.animateAny = animateAny;
