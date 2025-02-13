"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DpiHelper = void 0;
var app_1 = require("../../../constants/app");
var EventHandler_1 = require("../../../Core/EventHandler");
var Thickness_1 = require("../../../Core/Thickness");
var SciChartSurfaceBase_1 = require("../SciChartSurfaceBase");
/**
 * A helper class with methods and properties for DPI scaling of canvases
 */
var DpiHelper = /** @class */ (function () {
    function DpiHelper() {
    }
    /**
     * Static initialization function for {@link DpiHelper}. Is called once by the framework on startup
     */
    DpiHelper.initialize = function () {
        if (!DpiHelper.initialized) {
            DpiHelper.PIXEL_RATIO = 1;
            if (DpiHelper.IsDpiScaleEnabled && typeof window !== "undefined" && window.devicePixelRatio) {
                DpiHelper.PIXEL_RATIO = window.devicePixelRatio;
            }
            if (SciChartSurfaceBase_1.DebugForDpi) {
                console.log("Initializing Dpi Helper. Scaling factor = " + DpiHelper.PIXEL_RATIO);
            }
            if (DpiHelper.IsDpiScaleEnabled && !app_1.IS_TEST_ENV) {
                window.addEventListener("resize", function () {
                    var newDpiScale = window.devicePixelRatio || 1;
                    var lastDpiScaling = DpiHelper.PIXEL_RATIO;
                    if (lastDpiScaling !== newDpiScale) {
                        if (SciChartSurfaceBase_1.DebugForDpi) {
                            console.log("Dpi Changing, was ".concat(lastDpiScaling, ", now ").concat(newDpiScale));
                        }
                        DpiHelper.PIXEL_RATIO = newDpiScale;
                        DpiHelper.dpiChanged.raiseEvent({ newValue: newDpiScale, oldValue: lastDpiScaling });
                    }
                });
            }
            DpiHelper.initialized = true;
        }
    };
    /**
     * Creates a HTML Canvas element and applies the desired width, height using the {@link PIXEL_RATIO} DPI scaling factor
     * @param desiredWidth
     * @param desiredHeight
     */
    DpiHelper.createCanvas = function (desiredWidth, desiredHeight) {
        if (desiredWidth === void 0) { desiredWidth = 0; }
        if (desiredHeight === void 0) { desiredHeight = 0; }
        var canvas = document.createElement("canvas");
        if (desiredWidth && desiredHeight) {
            DpiHelper.setSize(canvas, desiredWidth, desiredHeight);
        }
        return canvas;
    };
    /**
     * Sets the desired size on an HTML Canvas element using the {@link PIXEL_RATIO} DPI scaling factor
     * @param canvas
     * @param desiredWidth
     * @param desiredHeight
     */
    DpiHelper.setSize = function (canvas, desiredWidth, desiredHeight) {
        DpiHelper.setWidth(canvas, desiredWidth);
        DpiHelper.setHeight(canvas, desiredHeight);
    };
    /**
     * Sets the desired width on an HTML Canvas element using the {@link PIXEL_RATIO} DPI scaling factor
     * @param canvas
     * @param desiredWidth
     */
    DpiHelper.setWidth = function (canvas, desiredWidth) {
        if (SciChartSurfaceBase_1.DebugForDpi) {
            console.log("setWidth ".concat(canvas.id, " backBuffer=").concat(desiredWidth * DpiHelper.PIXEL_RATIO, " display=").concat(desiredWidth));
        }
        // https://www.khronos.org/webgl/wiki/HandlingHighDPI
        // Size of drawingbuffer is set by width, height
        canvas.width = desiredWidth * DpiHelper.PIXEL_RATIO;
    };
    /**
     * Sets the desired height on an HTML Canvas element using the {@link PIXEL_RATIO} DPI scaling factor
     * @param canvas
     * @param desiredHeight
     */
    DpiHelper.setHeight = function (canvas, desiredHeight) {
        if (SciChartSurfaceBase_1.DebugForDpi) {
            console.log("setHeight ".concat(canvas.id, " backBuffer=").concat(desiredHeight * DpiHelper.PIXEL_RATIO, " display=").concat(desiredHeight));
        }
        // https://www.khronos.org/webgl/wiki/HandlingHighDPI
        // Size of drawingbuffer is set by width, height
        canvas.height = desiredHeight * DpiHelper.PIXEL_RATIO;
    };
    DpiHelper.adjustLineStyle = function (lineStyle, dpiScale) {
        if (dpiScale === void 0) { dpiScale = DpiHelper.PIXEL_RATIO; }
        var dpiAdjusted = __assign({}, lineStyle);
        dpiAdjusted.end *= dpiScale;
        dpiAdjusted.start *= dpiScale;
        dpiAdjusted.strokeThickness *= dpiScale;
        return dpiAdjusted;
    };
    DpiHelper.adjustTextStyle = function (textStyle, dpiScale) {
        if (dpiScale === void 0) { dpiScale = DpiHelper.PIXEL_RATIO; }
        var dpiAdjusted = __assign({}, textStyle);
        dpiAdjusted.fontSize = Math.round(dpiAdjusted.fontSize * dpiScale);
        if (textStyle.padding) {
            dpiAdjusted.padding = DpiHelper.adjustThickness(textStyle.padding, dpiScale);
        }
        return dpiAdjusted;
    };
    DpiHelper.adjustStrokeSize = function (gridLineStyle, dpiScale) {
        var _a;
        if (dpiScale === void 0) { dpiScale = DpiHelper.PIXEL_RATIO; }
        var dpiAdjusted = __assign({}, gridLineStyle);
        var roundedStrokeThickness = Math.round(gridLineStyle.strokeThickness * dpiScale);
        dpiAdjusted.strokeDashArray = (_a = gridLineStyle.strokeDashArray) === null || _a === void 0 ? void 0 : _a.map(function (sd) { return Math.round(sd * dpiScale); });
        dpiAdjusted.strokeThickness =
            roundedStrokeThickness > 0 || gridLineStyle.strokeThickness === 0 ? roundedStrokeThickness : 1;
        return dpiAdjusted;
    };
    DpiHelper.adjustThickness = function (thickness, dpiScale) {
        if (dpiScale === void 0) { dpiScale = DpiHelper.PIXEL_RATIO; }
        return new Thickness_1.Thickness(Math.round(thickness.top * dpiScale), Math.round(thickness.right * dpiScale), Math.round(thickness.bottom * dpiScale), Math.round(thickness.left * dpiScale));
    };
    /**
     * When true, automatically adjust chart resolution for sharper images on high DPI screens
     */
    DpiHelper.IsDpiScaleEnabled = true;
    /**
     * Event you can subscribe to for Dpi Changes. See {@link EventHandler} for subscription syntax. Remember to unsubscribe to prevent memory leaks!
     */
    DpiHelper.dpiChanged = new EventHandler_1.EventHandler();
    return DpiHelper;
}());
exports.DpiHelper = DpiHelper;
