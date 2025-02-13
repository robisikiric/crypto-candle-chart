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
exports.PinchZoomModifier3D = void 0;
var ChartModifierType_1 = require("../../types/ChartModifierType");
var CameraController_1 = require("../CameraController");
var ChartModifierBase3D_1 = require("./ChartModifierBase3D");
/**
 * @summary The {@link PinchZoomModifier3D} provides pinch zooming behavior on a 3D {@link SciChart3DSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @description
 *
 * To apply the {@link PinchZoomModifier3D} to a {@link SciChart3DSurface} and add pinch zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartS3Durface: SciChart3DSurface;
 * sciChart3DSurface.chartModifiers.add(new PinchZoomModifier3D());
 * ```
 *
 * @remarks The speed of zoom can be modified via the {@link PinchZoomModifier3D.mouseWheelSensitivity} property.
 */
var PinchZoomModifier3D = /** @class */ (function (_super) {
    __extends(PinchZoomModifier3D, _super);
    /**
     * Creates an instance of the {@link MouseWheelZoomModifier3D}
     * @param options optional parameters of type {@link IMouseWheelZoomModifier3DOptions} used to configure the modifier
     */
    function PinchZoomModifier3D(options) {
        var _this = this;
        var _a;
        _this = _super.call(this, options) || this;
        /**
         * Defines the sensitivity of zooming
         */
        _this.growFactor = 0.5;
        _this.type = ChartModifierType_1.EChart3DModifierType.PinchZoom;
        _this.growFactor = (_a = options === null || options === void 0 ? void 0 : options.growFactor) !== null && _a !== void 0 ? _a : _this.growFactor;
        return _this;
    }
    /**
     * @inheritDoc
     */
    PinchZoomModifier3D.prototype.modifierMouseDown = function (args) {
        _super.prototype.modifierMouseDown.call(this, args);
        if (!this.isAttached) {
            throw new Error("Should not call PinchZoomModifier3D.modifierMouseDown if not attached");
        }
        var isTouchEvent = args.pointerType === "touch" || args.pointerType === "pen";
        if (isTouchEvent) {
            this.activePointerEvents.set(args.pointerId, args);
        }
    };
    /**
     * @inheritDoc
     */
    PinchZoomModifier3D.prototype.modifierMouseMove = function (args) {
        var _a;
        _super.prototype.modifierMouseMove.call(this, args);
        var lastPoint = (_a = this.activePointerEvents.get(args.pointerId)) === null || _a === void 0 ? void 0 : _a.mousePoint;
        // update saved pointer coordinates
        if (this.activePointerEvents.has(args.pointerId)) {
            this.activePointerEvents.set(args.pointerId, args);
        }
        var isActionAllowed = this.getIsActionAllowed(args);
        if (isActionAllowed) {
            // this.parentSurface.setZoomState(EZoomState.UserZooming);
            this.performModifierAction(args);
        }
    };
    /**
     * @inheritDoc
     */
    PinchZoomModifier3D.prototype.modifierMouseUp = function (args) {
        _super.prototype.modifierMouseUp.call(this, args);
        this.removeFromActiveTouchEvents(args);
    };
    /**
     * @inheritDoc
     */
    PinchZoomModifier3D.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            growFactor: this.growFactor
        };
        Object.assign(json.options, options);
        return json;
    };
    /**
     * Performs the zoom operation around the mouse point
     * @param mousePoint The X,Y location of the mouse at the time of the zoom
     * @param horizontalDistance horizontal distance between points
     * @param verticalDistance vertical distance between points
     */
    PinchZoomModifier3D.prototype.performZoom = function (mousePoint, horizontalDistance, verticalDistance) {
        var scs = this.parentSurface;
        if (!scs) {
            return;
        }
        var camera = scs.camera;
        if (!camera) {
            return;
        }
        var currentTotalDistance = Math.sqrt(Math.pow(horizontalDistance, 2) + Math.pow(verticalDistance, 2));
        var prevTotalDistance = Math.sqrt(Math.pow(this.previousHorizontalTouchPointsDistance, 2) + Math.pow(this.previousVerticalTouchPointsDistance, 2));
        var radius = camera.radius;
        var delta = (prevTotalDistance - currentTotalDistance) * this.growFactor;
        var zoomFactor = (radius + delta) / radius;
        if (camera.projectionMode === CameraController_1.ECameraProjectionMode.Perspective) {
            camera.radius *= zoomFactor;
        }
        else {
            camera.orthoWidth *= zoomFactor;
            camera.orthoHeight *= zoomFactor;
        }
    };
    /**
     * Handles pointer event becoming inactive
     * @param args pointer event properties
     */
    PinchZoomModifier3D.prototype.removeFromActiveTouchEvents = function (args) {
        // Remove this event from the target's cache
        this.activePointerEvents.delete(args.pointerId);
        // reset distance values
        if (this.activePointerEvents.size < 2) {
            this.previousHorizontalTouchPointsDistance = undefined;
            this.previousVerticalTouchPointsDistance = undefined;
        }
    };
    PinchZoomModifier3D.prototype.performModifierAction = function (args) {
        var _a = Array.from(this.activePointerEvents.values()), firstTouchPoint = _a[0].mousePoint, secondTouchPoint = _a[1].mousePoint;
        // Calculate projections of distance between the touch points
        var currentHorizontalTouchPointsDistance = Math.abs(firstTouchPoint.x - secondTouchPoint.x);
        var currentVerticalTouchPointsDistance = Math.abs(firstTouchPoint.y - secondTouchPoint.y);
        if (this.previousHorizontalTouchPointsDistance !== undefined &&
            this.previousVerticalTouchPointsDistance !== undefined) {
            this.performZoom(args.mousePoint, currentHorizontalTouchPointsDistance, currentVerticalTouchPointsDistance);
        }
        // Cache the distance for the next move event
        this.previousHorizontalTouchPointsDistance = currentHorizontalTouchPointsDistance;
        this.previousVerticalTouchPointsDistance = currentVerticalTouchPointsDistance;
    };
    PinchZoomModifier3D.prototype.getIsActionAllowed = function (args) {
        var isTouchEvent = args.pointerType === "touch" || args.pointerType === "pen";
        // check for pinch gestures if there are multiple active touches
        return isTouchEvent && this.activePointerEvents.size >= 2;
    };
    return PinchZoomModifier3D;
}(ChartModifierBase3D_1.ChartModifierBase3D));
exports.PinchZoomModifier3D = PinchZoomModifier3D;
