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
exports.OrbitModifier3D = void 0;
var ChartModifierType_1 = require("../../types/ChartModifierType");
var PinchZoomModifier3D_1 = require("./PinchZoomModifier3D");
/**
 * @summary The {@link OrbitModifier3D} provides behavior to orbit around a target point on a 3D {@link SciChart3DSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @description
 *
 * To apply the {@link OrbitModifier3D} to a {@link SciChart3DSurface} and add orbit on mouse-drag behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartS3Durface: SciChart3DSurface;
 * sciChart3DSurface.chartModifiers.add(new OrbitModifier3D());
 * ```
 */
var OrbitModifier3D = /** @class */ (function (_super) {
    __extends(OrbitModifier3D, _super);
    function OrbitModifier3D(options) {
        var _this = this;
        var _a;
        _this = _super.call(this, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = ChartModifierType_1.EChart3DModifierType.Orbit;
        /**
         * Sets whether to enable pinch zoom behavior of {@link SciChartSurface} on touchscreen devices
         */
        _this.enableZoom = false;
        _this.enableZoom = (_a = options === null || options === void 0 ? void 0 : options.enableZoom) !== null && _a !== void 0 ? _a : _this.enableZoom;
        return _this;
    }
    /**
     * @inheritDoc
     */
    OrbitModifier3D.prototype.modifierMouseDown = function (args) {
        if (!this.isAttached) {
            throw new Error("Should not call OrbitModifier3D.modifierMouseDown if not attached");
        }
        if (this.executeOn !== args.button) {
            return;
        }
        _super.prototype.modifierMouseDown.call(this, args);
        this.activePointerEvents.set(args.pointerId, args);
        // this.parentSurface.setZoomState(EZoomState.UserZooming);
    };
    /**
     * @inheritDoc
     */
    OrbitModifier3D.prototype.modifierMouseMove = function (args) {
        this.updatePointerInfo(args);
        if (!this.previousPoint) {
            return;
        }
        // use pinch zoom if enabled and triggered
        if (this.enableZoom && _super.prototype.getIsActionAllowed.call(this, args)) {
            _super.prototype.performModifierAction.call(this, args);
        }
        // execute rotation if action was triggered
        var isActionAllowed = this.getIsActionAllowed(args);
        if (isActionAllowed) {
            this.performModifierAction(args);
        }
    };
    /**
     * @inheritDoc
     */
    OrbitModifier3D.prototype.modifierMouseUp = function (args) {
        _super.prototype.modifierMouseUp.call(this, args);
        // delegate drag and pan handling to the next active pointer in order of event occurrence
        if (this.activePointerEvents.size > 0) {
            var nextActivePointerEvent = this.activePointerEvents.values().next().value;
            args.target.setPointerCapture(nextActivePointerEvent.pointerId);
        }
    };
    OrbitModifier3D.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            enableZoom: this.enableZoom
        };
        Object.assign(json.options, options);
        return json;
    };
    OrbitModifier3D.prototype.performModifierAction = function (args) {
        var camera = this.parentSurface.camera;
        if (!camera) {
            return;
        }
        var degreesPerPixel = 0.2;
        var currentPoint = args.mousePoint;
        var xDelta = this.previousPoint.x - currentPoint.x;
        var yDelta = this.previousPoint.y - currentPoint.y;
        var deltaYaw = xDelta * degreesPerPixel;
        var deltaPitch = yDelta * degreesPerPixel;
        camera.orbitalYaw += deltaYaw;
        camera.orbitalPitch -= deltaPitch;
    };
    OrbitModifier3D.prototype.getIsActionAllowed = function (args) {
        // allow drag and pan only for the first active pointer in order of event occurrence
        var capturedPointerEvent = this.activePointerEvents.values().next().value;
        if (capturedPointerEvent.pointerId !== args.pointerId || this.activePointerEvents.size > 1) {
            return false;
        }
        return true;
    };
    return OrbitModifier3D;
}(PinchZoomModifier3D_1.PinchZoomModifier3D));
exports.OrbitModifier3D = OrbitModifier3D;
