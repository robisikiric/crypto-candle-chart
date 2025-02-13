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
exports.MouseWheelZoomModifier3D = void 0;
var ChartModifierType_1 = require("../../types/ChartModifierType");
var CameraController_1 = require("../CameraController");
var ChartModifierBase3D_1 = require("./ChartModifierBase3D");
/**
 * @summary The {@link MouseWheelZoomModifier3D} provides Mouse wheel zooming behavior on a 3D {@link SciChart3DSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @description
 *
 * To apply the {@link MouseWheelZoomModifier3D} to a {@link SciChart3DSurface} and add Mouse-wheel zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartS3Durface: SciChart3DSurface;
 * sciChart3DSurface.chartModifiers.add(new MouseWheelZoomModifier3D());
 * ```
 *
 * @remarks The speed of mouse-wheel zoom can be modified via the {@link MouseWheelZoomModifier3D.mouseWheelSensitivity} property.
 */
var MouseWheelZoomModifier3D = /** @class */ (function (_super) {
    __extends(MouseWheelZoomModifier3D, _super);
    /**
     * Creates an instance of the {@link MouseWheelZoomModifier3D}
     * @param options optional parameters of type {@link IMouseWheelZoomModifier3DOptions} used to configure the modifier
     */
    function MouseWheelZoomModifier3D(options) {
        var _this = _super.call(this, options) || this;
        _this.type = ChartModifierType_1.EChart3DModifierType.MouseWheelZoom;
        _this.mouseWheelSensitivity = (options === null || options === void 0 ? void 0 : options.mouseWheelSensitivity) || 0.1;
        return _this;
    }
    /**
     * @inheritDoc
     */
    MouseWheelZoomModifier3D.prototype.modifierMouseWheel = function (args) {
        _super.prototype.modifierMouseWheel.call(this, args);
        var scs = this.parentSurface;
        if (!scs) {
            return;
        }
        var camera = scs.camera;
        if (!camera) {
            return;
        }
        var delta = args.mouseWheelDelta;
        var radius = camera.radius;
        var zoomFactor = (radius + delta * this.mouseWheelSensitivity) / radius;
        if (camera.projectionMode === CameraController_1.ECameraProjectionMode.Perspective) {
            camera.radius *= zoomFactor;
        }
        else {
            camera.orthoWidth *= zoomFactor;
            camera.orthoHeight *= zoomFactor;
        }
        args.handled = true;
    };
    /**
     * @inheritDoc
     */
    MouseWheelZoomModifier3D.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            mouseWheelSensitivity: this.mouseWheelSensitivity
        };
        Object.assign(json.options, options);
        return json;
    };
    return MouseWheelZoomModifier3D;
}(ChartModifierBase3D_1.ChartModifierBase3D));
exports.MouseWheelZoomModifier3D = MouseWheelZoomModifier3D;
