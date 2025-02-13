"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoReverseEasing = exports.easing = void 0;
/**
 * Easing functions used throughout SciChart when animations are used
 */
exports.easing = {
    /**
     * @inheritDoc
     */
    linear: function (t) { return t; },
    /**
     * @inheritDoc
     */
    quadratic: function (t) { return t * (-(t * t) * t + 4 * t * t - 6 * t + 4); },
    /**
     * @inheritDoc
     */
    cubic: function (t) { return t * (4 * t * t - 9 * t + 6); },
    /**
     * @inheritDoc
     */
    elastic: function (t) { return t * (33 * t * t * t * t - 106 * t * t * t + 126 * t * t - 67 * t + 15); },
    /**
     * @inheritDoc
     */
    inQuad: function (t) { return t * t; },
    /**
     * @inheritDoc
     */
    outQuad: function (t) { return t * (2 - t); },
    /**
     * @inheritDoc
     */
    inOutQuad: function (t) { return (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t); },
    /**
     * @inheritDoc
     */
    inCubic: function (t) { return t * t * t; },
    /**
     * @inheritDoc
     */
    outCubic: function (t) { return --t * t * t + 1; },
    /**
     * @inheritDoc
     */
    inOutCubic: function (t) { return (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1); },
    /**
     * @inheritDoc
     */
    inQuart: function (t) { return t * t * t * t; },
    /**
     * @inheritDoc
     */
    outQuart: function (t) { return 1 - --t * t * t * t; },
    /**
     * @inheritDoc
     */
    inOutQuart: function (t) { return (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t); },
    /**
     * @inheritDoc
     */
    inQuint: function (t) { return t * t * t * t * t; },
    /**
     * @inheritDoc
     */
    outQuint: function (t) { return 1 + --t * t * t * t * t; },
    /**
     * @inheritDoc
     */
    inOutQuint: function (t) { return (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t); },
    /**
     * @inheritDoc
     */
    inSine: function (t) { return -Math.cos(t * (Math.PI / 2)) + 1; },
    /**
     * @inheritDoc
     */
    outSine: function (t) { return Math.sin(t * (Math.PI / 2)); },
    /**
     * @inheritDoc
     */
    inOutSine: function (t) { return -(Math.cos(Math.PI * t) - 1) / 2; },
    /**
     * @inheritDoc
     */
    inExpo: function (t) { return Math.pow(2, 10 * (t - 1)); },
    /**
     * @inheritDoc
     */
    outExpo: function (t) { return (t === 1 ? 1 : -Math.pow(2, -10 * t) + 1); },
    /**
     * @inheritDoc
     */
    inOutExpo: function (t) {
        t /= 0.5;
        if (t < 1)
            return Math.pow(2, 10 * (t - 1)) / 2;
        t--;
        return (-Math.pow(2, -10 * t) + 2) / 2;
    },
    /**
     * @inheritDoc
     */
    inCirc: function (t) { return -Math.sqrt(1 - t * t) + 1; },
    /**
     * @inheritDoc
     */
    outCirc: function (t) { return Math.sqrt(1 - (t = t - 1) * t); },
    /**
     * @inheritDoc
     */
    inOutCirc: function (t) {
        t /= 0.5;
        if (t < 1)
            return -(Math.sqrt(1 - t * t) - 1) / 2;
        t -= 2;
        return (Math.sqrt(1 - t * t) + 1) / 2;
    }
};
/**
 * Reversable functions that go from 0..1..0 used throughout SciChart when animations are used
 */
exports.autoReverseEasing = {
    /**
     * No easing acceleration like linear, but it does reverse from 0..1..0
     * @param t
     */
    linear: function (t) { return (t < 0.5 ? t * 2 : 2 - t * 2); }
};
