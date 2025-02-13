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
exports.ResetCamera3DModifier = void 0;
var DoubleAnimator_1 = require("../../Core/Animations/DoubleAnimator");
var EasingFunctions_1 = require("../../Core/Animations/EasingFunctions");
var GenericAnimation_1 = require("../../Core/Animations/GenericAnimation");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var CameraController_1 = require("../CameraController");
var ChartModifierBase3D_1 = require("./ChartModifierBase3D");
/**
 * @summary The {@link ResetCamera3DModifier} provides double click to zoom to extents behavior on a 3D {@link SciChart3DSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @description
 *
 * To apply the {@link ResetCamera3DModifier} to a {@link SciChart3DSurface} and add Mouse-wheel zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartS3Durface: SciChart3DSurface;
 * sciChart3DSurface.chartModifiers.add(new ResetCamera3DModifier());
 * ```
 *
 */
var ResetCamera3DModifier = /** @class */ (function (_super) {
    __extends(ResetCamera3DModifier, _super);
    /**
     * Creates an instance of the {@link ResetCamera3DModifier}
     * @param options optional parameters of type {@link IResetCamera3DOptions} used to configure the modifier
     */
    function ResetCamera3DModifier(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = ChartModifierType_1.EChart3DModifierType.ZoomExtents;
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
        _this.isAnimated = (_a = options === null || options === void 0 ? void 0 : options.isAnimated) !== null && _a !== void 0 ? _a : true;
        _this.animationDuration = (_b = options === null || options === void 0 ? void 0 : options.animationDuration) !== null && _b !== void 0 ? _b : 400;
        if ((options === null || options === void 0 ? void 0 : options.easingFunction) && typeof options.easingFunction === "string") {
            options.easingFunction = EasingFunctions_1.easing[options.easingFunction];
        }
        _this.easingFunction = (_c = options === null || options === void 0 ? void 0 : options.easingFunction) !== null && _c !== void 0 ? _c : EasingFunctions_1.easing.outExpo;
        _this.destination = options === null || options === void 0 ? void 0 : options.destination;
        return _this;
    }
    ResetCamera3DModifier.prototype.onAttach = function () {
        if (!this.destination) {
            var scs = this.parentSurface;
            if (!scs) {
                return;
            }
            var camera = scs.camera;
            if (!camera) {
                return;
            }
            this.destination = {
                radius: camera.radius,
                pitch: camera.orbitalPitch,
                yaw: camera.orbitalYaw,
                width: camera.orthoWidth,
                height: camera.orthoHeight
            };
        }
    };
    /**
     * @inheritDoc
     */
    ResetCamera3DModifier.prototype.modifierDoubleClick = function (args) {
        var _a, _b;
        var scs = this.parentSurface;
        if (!scs) {
            return;
        }
        var camera = scs.camera;
        if (!camera) {
            return;
        }
        if (camera.projectionMode === CameraController_1.ECameraProjectionMode.Perspective) {
            var animation = new GenericAnimation_1.GenericAnimation({
                from: { radius: camera.radius, pitch: camera.orbitalPitch, yaw: camera.orbitalYaw },
                to: (_a = this.destination) !== null && _a !== void 0 ? _a : { radius: 1, pitch: 0, yaw: 0 },
                onAnimate: function (from, to, progress) {
                    camera.radius = DoubleAnimator_1.DoubleAnimator.interpolate(from.radius, to.radius, progress);
                    camera.orbitalPitch = DoubleAnimator_1.DoubleAnimator.interpolate(from.pitch, to.pitch, progress);
                    camera.orbitalYaw = DoubleAnimator_1.DoubleAnimator.interpolate(from.yaw, to.yaw, progress);
                },
                duration: this.isAnimated ? this.animationDuration : 0,
                ease: this.easingFunction
            });
            scs.addAnimation(animation);
        }
        else {
            var animation = new GenericAnimation_1.GenericAnimation({
                from: { width: camera.orthoWidth, height: camera.orthoHeight },
                to: (_b = this.destination) !== null && _b !== void 0 ? _b : { width: 1, height: 1 },
                onAnimate: function (from, to, progress) {
                    camera.orthoWidth = DoubleAnimator_1.DoubleAnimator.interpolate(from.width, to.width, progress);
                    camera.orthoHeight = DoubleAnimator_1.DoubleAnimator.interpolate(from.height, to.height, progress);
                },
                duration: this.isAnimated ? this.animationDuration : 0,
                ease: this.easingFunction
            });
            scs.addAnimation(animation);
        }
        args.handled = true;
    };
    /**
     * @inheritDoc
     */
    ResetCamera3DModifier.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            animationDuration: this.animationDuration,
            easingFunction: this.easingFunction.name,
            isAnimated: this.isAnimated,
            destination: this.destination
        };
        Object.assign(json.options, options);
        return json;
    };
    return ResetCamera3DModifier;
}(ChartModifierBase3D_1.ChartModifierBase3D));
exports.ResetCamera3DModifier = ResetCamera3DModifier;
