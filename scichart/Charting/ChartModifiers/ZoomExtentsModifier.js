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
exports.ZoomExtentsModifier = void 0;
var classFactory_1 = require("../../Builder/classFactory");
var EasingFunctions_1 = require("../../Core/Animations/EasingFunctions");
var BaseType_1 = require("../../types/BaseType");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var XyDirection_1 = require("../../types/XyDirection");
var ZoomState_1 = require("../../types/ZoomState");
var translate_1 = require("../../utils/translate");
var ChartModifierBase2D_1 = require("./ChartModifierBase2D");
/**
 * The ZoomExtentsModifier provides double-tap or double-click to zoom-to-fit (Zoom Extents) behavior
 * on a 2D {@link SciChartSurface} within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the ZoomExtentsModifier to a {@link SciChartSurface} and add drag to zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new ZoomExtentsModifier());
 * ```
 *
 * Animation of the zoom extents be controlled via the {@link ZoomExtentsModifier.isAnimated},
 * {@link ZoomExtentsModifier.animationDuration} and {@link ZoomExtentsModifier.easingFunction} properties.
 */
var ZoomExtentsModifier = /** @class */ (function (_super) {
    __extends(ZoomExtentsModifier, _super);
    function ZoomExtentsModifier(options) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        _this = _super.call(this, options) || this;
        _this.type = ChartModifierType_1.EChart2DModifierType.ZoomExtents;
        /**
         * When true, the Zoom operations are animated. See also {@link animationDuration} and {@link easingFunction}
         */
        _this.isAnimated = true;
        /**
         * Defines the duration of animations when zooming in milliseconds
         */
        _this.animationDuration = 400;
        /**
         * Defines the easing function for animation. See {@link TEasingFn} for a range of functions
         */
        _this.easingFunction = EasingFunctions_1.easing.outExpo;
        /**
         * Whether the modifier applies when the mouse is over the area where series are drawn (ie not over the axes).  Default true.
         */
        _this.applyToSeriesViewRect = true;
        /**
         * Whether the modifier applies when the mouse is over the axes. Default true.
         */
        _this.applyToAxes = true;
        _this.isAnimated = (_a = options === null || options === void 0 ? void 0 : options.isAnimated) !== null && _a !== void 0 ? _a : _this.isAnimated;
        _this.animationDuration = (_b = options === null || options === void 0 ? void 0 : options.animationDuration) !== null && _b !== void 0 ? _b : _this.animationDuration;
        _this.applyToSeriesViewRect = (_c = options === null || options === void 0 ? void 0 : options.applyToSeriesViewRect) !== null && _c !== void 0 ? _c : _this.applyToSeriesViewRect;
        _this.applyToAxes = (_d = options === null || options === void 0 ? void 0 : options.applyToAxes) !== null && _d !== void 0 ? _d : _this.applyToAxes;
        if ((options === null || options === void 0 ? void 0 : options.easingFunction) && typeof options.easingFunction === "string") {
            options.easingFunction = EasingFunctions_1.easing[options.easingFunction];
        }
        _this.easingFunction = (_e = options === null || options === void 0 ? void 0 : options.easingFunction) !== null && _e !== void 0 ? _e : EasingFunctions_1.easing.outExpo;
        if (options === null || options === void 0 ? void 0 : options.onZoomExtents) {
            if (typeof options.onZoomExtents === "string") {
                _this.typeMap.set("onZoomExtents", options.onZoomExtents);
                options.onZoomExtents = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.onZoomExtents);
            }
        }
        _this.onZoomExtents = options === null || options === void 0 ? void 0 : options.onZoomExtents;
        return _this;
    }
    /**
     * @inheritDoc
     */
    ZoomExtentsModifier.prototype.modifierDoubleClick = function (args) {
        var _this = this;
        var scs = this.parentSurface;
        var animationDuration = this.isAnimated ? this.animationDuration : 0;
        if (scs !== undefined) {
            var zoomPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(args.mousePoint, this.parentSurface.seriesViewRect);
            if (zoomPoint && this.applyToSeriesViewRect) {
                if (!this.onZoomExtents || this.onZoomExtents(scs)) {
                    switch (this.xyDirection) {
                        case XyDirection_1.EXyDirection.XyDirection:
                            scs.zoomExtents(animationDuration, this.easingFunction, function () {
                                return scs.setZoomState(ZoomState_1.EZoomState.AtExtents);
                            });
                            break;
                        case XyDirection_1.EXyDirection.XDirection:
                            scs.zoomExtentsX(animationDuration, this.easingFunction);
                            break;
                        case XyDirection_1.EXyDirection.YDirection:
                            scs.zoomExtentsY(animationDuration, this.easingFunction);
                            break;
                    }
                    args.handled = true;
                }
            }
            else if (this.applyToAxes) {
                var targetAxes = [];
                if ([XyDirection_1.EXyDirection.XDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
                    targetAxes.push.apply(targetAxes, this.parentSurface.xAxes.asArray());
                }
                if ([XyDirection_1.EXyDirection.YDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
                    targetAxes.push.apply(targetAxes, this.parentSurface.yAxes.asArray());
                }
                var activeAxes = (0, ChartModifierBase2D_1.getActiveAxes)(targetAxes, args.mousePoint);
                if (activeAxes.length > 0) {
                    args.handled = true;
                    activeAxes.forEach(function (axis) {
                        if (axis.isXAxis) {
                            var maxXRange = axis.getMaximumRange();
                            axis.animateVisibleRange(maxXRange, animationDuration, _this.easingFunction);
                        }
                        else {
                            var yRange = axis.getWindowedYRange(undefined);
                            axis.animateVisibleRange(yRange, animationDuration, _this.easingFunction);
                        }
                    });
                }
            }
        }
    };
    ZoomExtentsModifier.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            animationDuration: this.animationDuration,
            easingFunction: this.easingFunction.name,
            isAnimated: this.isAnimated,
            applyToSeriesViewRect: this.applyToSeriesViewRect,
            applyToAxes: this.applyToAxes,
            onZoomExtents: this.typeMap.get("onZoomExtents")
        };
        Object.assign(json.options, options);
        return json;
    };
    return ZoomExtentsModifier;
}(ChartModifierBase2D_1.ChartModifierBase2D));
exports.ZoomExtentsModifier = ZoomExtentsModifier;
