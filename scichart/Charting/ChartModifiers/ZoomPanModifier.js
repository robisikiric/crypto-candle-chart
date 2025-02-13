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
exports.ZoomPanModifier = void 0;
var ChartModifierType_1 = require("../../types/ChartModifierType");
var XyDirection_1 = require("../../types/XyDirection");
var ZoomState_1 = require("../../types/ZoomState");
var translate_1 = require("../../utils/translate");
var AxisBase2D_1 = require("../Visuals/Axis/AxisBase2D");
var PinchZoomModifier_1 = require("./PinchZoomModifier");
/**
 * The ZoomPanModifier provides drag to pan behavior on a 2D {@link SciChartSurface}
 * as well as pinch zoom behavior on touchscreen devices
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the ZoomPanModifier to a {@link SciChartSurface} and add drag to pan behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new ZoomPanModifier());
 * ```
 */
var ZoomPanModifier = /** @class */ (function (_super) {
    __extends(ZoomPanModifier, _super);
    /**
     * Creates an instance of a ZoomPanModifier
     * @param options optional parameters to pass to the ZoomPanModifier to configure it upon construction
     */
    function ZoomPanModifier(options) {
        var _this = this;
        var _a;
        _this = _super.call(this, options) || this;
        /**
         * Sets whether to enable pinch zoom behavior of {@link SciChartSurface} on touchscreen devices
         */
        _this.enableZoom = false;
        _this.type = ChartModifierType_1.EChart2DModifierType.ZoomPan;
        _this.enableZoom = (_a = options === null || options === void 0 ? void 0 : options.enableZoom) !== null && _a !== void 0 ? _a : _this.enableZoom;
        return _this;
    }
    /** @inheritDoc */
    ZoomPanModifier.prototype.modifierMouseDown = function (args) {
        // handles default browser dragging behavior when canvas was selected with Ctrl + A
        args.nativeEvent.preventDefault();
        if (this.executeOn !== args.button) {
            return;
        }
        if (!this.isAttached) {
            throw new Error("Should not call ZoomPanModifier.modifierMouseDown if not attached");
        }
        _super.prototype.modifierMouseDown.call(this, args);
        var translatedPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(args.mousePoint, this.parentSurface.seriesViewRect);
        if (!translatedPoint) {
            return;
        }
        this.activePointerEvents.set(args.pointerId, args);
        this.parentSurface.setZoomState(ZoomState_1.EZoomState.UserZooming);
    };
    /** @inheritDoc */
    ZoomPanModifier.prototype.modifierMouseMove = function (args) {
        if (this.parentSurface.isSubSurface && !args.isActiveSubChartEvent) {
            return;
        }
        this.updatePointerInfo(args);
        if (!this.previousPoint) {
            return;
        }
        // use pinch zoom if enabled and triggered
        if (this.enableZoom && _super.prototype.getIsActionAllowed.call(this, args)) {
            _super.prototype.performModifierAction.call(this, args);
        }
        // execute pan if action was triggered
        var isActionAllowed = this.getIsActionAllowed(args);
        if (isActionAllowed) {
            this.performModifierAction(args);
        }
    };
    /** @inheritDoc */
    ZoomPanModifier.prototype.modifierMouseUp = function (args) {
        _super.prototype.modifierMouseUp.call(this, args);
        // delegate drag and pan handling to the next active pointer in order of event occurrence
        if (this.activePointerEvents.size > 0) {
            var nextActivePointerEvent = this.activePointerEvents.values().next().value;
            args.target.setPointerCapture(nextActivePointerEvent.pointerId);
        }
    };
    /** @inheritDoc */
    ZoomPanModifier.prototype.modifierPointerCancel = function (args) {
        _super.prototype.modifierPointerCancel.call(this, args);
        this.activePointerEvents.clear();
    };
    ZoomPanModifier.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            enableZoom: this.enableZoom
        };
        Object.assign(json.options, options);
        return json;
    };
    ZoomPanModifier.prototype.performModifierAction = function (args) {
        var currentPoint = args.mousePoint;
        var xDelta = currentPoint.x - this.previousPoint.x;
        var yDelta = this.previousPoint.y - currentPoint.y;
        this.performPan(xDelta, yDelta);
    };
    ZoomPanModifier.prototype.getIsActionAllowed = function (args) {
        // allow drag and pan only for the first active pointer in order of event occurrence
        var capturedPointerEvent = this.activePointerEvents.values().next().value;
        if (capturedPointerEvent.pointerId !== args.pointerId) {
            return false;
        }
        return true;
    };
    ZoomPanModifier.prototype.performPan = function (xDelta, yDelta) {
        // TODO unify with other similar methods in other modifiers
        // Scroll the X,YAxis by the number of pixels since the last update
        // TODO: SciChartSurface.SuspendUpdates around this block
        if ([XyDirection_1.EXyDirection.XDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
            this.getIncludedXAxis().forEach(function (x) {
                var delta = x.isHorizontalAxis ? xDelta : -yDelta;
                x.scroll(x.flippedCoordinates ? -delta : delta, AxisBase2D_1.EClipMode.None);
            });
        }
        if ([XyDirection_1.EXyDirection.YDirection, XyDirection_1.EXyDirection.XyDirection].includes(this.xyDirection)) {
            this.getIncludedYAxis().forEach(function (y) {
                var delta = y.isHorizontalAxis ? -xDelta : yDelta;
                y.scroll(y.flippedCoordinates ? -delta : delta, AxisBase2D_1.EClipMode.None);
            });
        }
    };
    return ZoomPanModifier;
}(PinchZoomModifier_1.PinchZoomModifier));
exports.ZoomPanModifier = ZoomPanModifier;
