"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesAnimation = void 0;
var classFactory_1 = require("../../../../Builder/classFactory");
var EasingFunctions_1 = require("../../../../Core/Animations/EasingFunctions");
var BaseType_1 = require("../../../../types/BaseType");
var parseColor_1 = require("../../../../utils/parseColor");
var animationHelpers_1 = require("./animationHelpers");
var BaseAnimationStyle_1 = require("./BaseAnimationStyle");
var PointMarkerStyle_1 = require("./PointMarkerStyle");
/**
 * @summary Defines the base class for Renderable Series Animations in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * An Animation defines the animation that should take place on the start up e.g. as a Wave, Sweep, Fade animation etc...
 */
var SeriesAnimation = /** @class */ (function () {
    function SeriesAnimation(options) {
        var _a, _b, _c, _d, _e;
        /**
         * The animation delay in ms
         */
        this.delay = 0;
        /**
         * The animation duration in ms
         */
        this.duration = 3000;
        /**
         * Sets the animation easing function
         */
        this.ease = EasingFunctions_1.easing.linear;
        /**
         * Enables fade effect animation
         */
        this.isFadeEffectAnimation = false;
        /**
         * Enables the animation for the effects like Wave, Sweep etc.
         */
        this.isOnStartAnimation = false;
        // used to track if registered types were used for function properties, so they can be serialized
        this.typeMap = new Map();
        this.delay = (_a = options === null || options === void 0 ? void 0 : options.delay) !== null && _a !== void 0 ? _a : this.delay;
        this.duration = (_b = options === null || options === void 0 ? void 0 : options.duration) !== null && _b !== void 0 ? _b : this.duration;
        this.isFadeEffectAnimation = (_c = options === null || options === void 0 ? void 0 : options.fadeEffect) !== null && _c !== void 0 ? _c : this.isFadeEffectAnimation;
        if ((options === null || options === void 0 ? void 0 : options.ease) && typeof options.ease === "string") {
            options.ease = EasingFunctions_1.easing[options.ease];
        }
        this.ease = (_d = options === null || options === void 0 ? void 0 : options.ease) !== null && _d !== void 0 ? _d : this.ease;
        this.reverse = (_e = options === null || options === void 0 ? void 0 : options.reverse) !== null && _e !== void 0 ? _e : this.reverse;
        if (options === null || options === void 0 ? void 0 : options.onCompleted) {
            if (typeof options.onCompleted === "string") {
                this.typeMap.set("onCompleted", options.onCompleted);
                var onCompleted = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.onCompleted);
                this.onCompleted = onCompleted;
            }
            else {
                this.onCompleted = options.onCompleted;
            }
        }
    }
    /** Convert the object to a definition that can be serialized to JSON, or used directly with the builder api */
    SeriesAnimation.prototype.toJSON = function () {
        var options = {
            delay: this.delay,
            duration: this.duration,
            ease: this.ease.name,
            fadeEffect: this.isFadeEffectAnimation,
            reverse: this.reverse,
            onCompleted: this.typeMap.get("onCompleted")
        };
        return { type: this.type, options: options };
    };
    /**
     * Runs on start up animation to update animation vectors
     * @param wasmContext
     * @param originalValues - original values
     * @param animationValues - calculated values used for the animation
     * @param progress Current animation progress
     * @param noZeroLine Sets zeroLine = 0, is used for XyzDataSeries
     */
    SeriesAnimation.prototype.calculateAnimationValues = function (wasmContext, originalValues, animationValues, progress, noZeroLine) {
        if (noZeroLine === void 0) { noZeroLine = false; }
        // TODO: override in child class
    };
    /**
     * Runs for data animation to update animation vectors
     * @param wasmContext
     * @param initialValues The initial vector
     * @param finalValues The final vector
     * @param interpolatedValues The vector which will be updated with interpolated values
     * @param progress Current animation progress
     */
    SeriesAnimation.prototype.calculateDataSeriesAnimationValues = function (wasmContext, initialValues, finalValues, interpolatedValues, progress) {
        var size = initialValues.size();
        if (size !== finalValues.size()) {
            throw new Error("DoubleVectors with initialValues and finalValues must have the same length");
        }
        // @ts-ignore
        if (typeof interpolatedValues.getRaw !== "function") {
            interpolatedValues.resize(size, 0);
        }
        for (var i = 0; i < size; i++) {
            interpolatedValues.set(i, animationHelpers_1.animationHelpers.interpolateNumber(initialValues.get(i), finalValues.get(i), progress));
        }
    };
    /**
     * Returns {@link BaseAnimationStyle} object which is being used to create initial styles
     * @param renderableSeries The renderable series
     */
    SeriesAnimation.prototype.getSeriesStyle = function (renderableSeries) {
        var _a, _b;
        var rs = renderableSeries;
        if (rs.isStacked)
            return undefined;
        return new BaseAnimationStyle_1.BaseAnimationStyle({
            stroke: rs.stroke,
            strokeThickness: rs.strokeThickness,
            opacity: rs.opacity,
            pointMarker: (_b = (_a = rs.pointMarker) === null || _a === void 0 ? void 0 : _a.getPointMarkerStyle()) !== null && _b !== void 0 ? _b : new PointMarkerStyle_1.PointMarkerStyle()
        });
    };
    /**
     * Updates properties of {@link IRenderableSeries}
     * @param renderableSeries The renderable series to be animated
     * @param initialStyles The initial styles
     * @param animationProgress The animation progress, should be between 0 and 1
     */
    SeriesAnimation.prototype.updateSeriesProperties = function (renderableSeries, initialStyles, animationProgress) {
        var _a, _b, _c, _d, _e;
        if (this.reverse) {
            animationProgress = 1 - animationProgress;
        }
        var rs = renderableSeries;
        var pointMarker = rs.pointMarker;
        if (this.isStyleAnimation) {
            if (this.styles.strokeThickness !== undefined) {
                var startThickness = initialStyles === null || initialStyles === void 0 ? void 0 : initialStyles.strokeThickness;
                var endThickness = this.styles.strokeThickness;
                rs.strokeThickness = startThickness + (endThickness - startThickness) * animationProgress;
            }
            if (this.styles.stroke !== undefined) {
                var newColor = animationHelpers_1.animationHelpers.interpolateColor(initialStyles.strokeARGB, this.styles.strokeARGB, animationProgress);
                // TODO optimise to use ARGB color
                rs.stroke = (0, parseColor_1.parseArgbToHtmlColor)(newColor);
            }
            if (this.styles.opacity !== undefined) {
                rs.opacity = animationHelpers_1.animationHelpers.interpolateNumber(initialStyles.opacity, this.styles.opacity, animationProgress);
            }
            if (this.styles.pointMarker !== undefined) {
                rs.pointMarker.suspendUpdates();
                var initialWidth = (_b = (_a = initialStyles.pointMarker) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 0;
                var initialHeight = (_d = (_c = initialStyles.pointMarker) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : 0;
                rs.pointMarker.width = animationHelpers_1.animationHelpers.interpolateNumber(initialWidth, this.styles.pointMarker.width, animationProgress);
                rs.pointMarker.height = animationHelpers_1.animationHelpers.interpolateNumber(initialHeight, this.styles.pointMarker.height, animationProgress);
                if (!this.styles.pointMarker.isCustomPointMarker) {
                    var initialPointMarkerStyle = initialStyles.pointMarker;
                    var endPointMarkerStyle = this.styles.pointMarker;
                    var initialStrokeThickness = (_e = initialPointMarkerStyle === null || initialPointMarkerStyle === void 0 ? void 0 : initialPointMarkerStyle.strokeThickness) !== null && _e !== void 0 ? _e : 0;
                    rs.pointMarker.strokeThickness = animationHelpers_1.animationHelpers.interpolateNumber(initialStrokeThickness, endPointMarkerStyle.strokeThickness, animationProgress);
                    var fill = animationHelpers_1.animationHelpers.interpolateColor(initialPointMarkerStyle.fillARGB, endPointMarkerStyle.fillARGB, animationProgress);
                    // TODO optimise to use ARGB color
                    rs.pointMarker.fill = (0, parseColor_1.parseArgbToHtmlColor)(fill);
                    var stroke = animationHelpers_1.animationHelpers.interpolateColor(initialPointMarkerStyle.strokeARGB, endPointMarkerStyle.strokeARGB, animationProgress);
                    rs.pointMarker.stroke = (0, parseColor_1.parseArgbToHtmlColor)(stroke);
                }
                rs.pointMarker.resumeUpdates();
            }
        }
        if (this.isFadeEffectAnimation) {
            var currentOpacity = initialStyles.opacity * animationProgress;
            rs.opacity = currentOpacity;
            if (pointMarker) {
                pointMarker.opacity = currentOpacity;
            }
        }
    };
    Object.defineProperty(SeriesAnimation.prototype, "isStyleAnimation", {
        /**
         * Return flag if it is styles animation
         */
        get: function () {
            return !!this.styles;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SeriesAnimation.prototype, "isDataSeriesAnimation", {
        /**
         * Return flag if it is dataSeries animation
         */
        get: function () {
            return !!this.dataSeries;
        },
        enumerable: false,
        configurable: true
    });
    return SeriesAnimation;
}());
exports.SeriesAnimation = SeriesAnimation;
