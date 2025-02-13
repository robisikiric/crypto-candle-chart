"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxisBase3DLabelStyle = void 0;
var SciChartSurfaceBase_1 = require("../../../Charting/Visuals/SciChartSurfaceBase");
var constants_1 = require("./constants");
var AxisBase3DLabelStyle = /** @class */ (function () {
    function AxisBase3DLabelStyle(parentAxis) {
        this.dpiScalingProperty = 96;
        this.fontFamilyProperty = "Arial";
        this.fontSizeProperty = 14;
        this.foregroundProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.labelForegroundBrush;
        this.parentAxis = parentAxis;
    }
    Object.defineProperty(AxisBase3DLabelStyle.prototype, "alignment", {
        get: function () {
            return this.alignmentProperty;
        },
        set: function (value) {
            this.alignmentProperty = value;
            this.notifyPropertyChanged(constants_1.TEXT_STYLE_PROPERTY.ALIGNMENT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisBase3DLabelStyle.prototype, "dpiScaling", {
        get: function () {
            return this.dpiScalingProperty;
        },
        set: function (value) {
            this.dpiScalingProperty = value;
            this.notifyPropertyChanged(constants_1.TEXT_STYLE_PROPERTY.DPI_SCALING);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisBase3DLabelStyle.prototype, "fontFamily", {
        get: function () {
            return this.fontFamilyProperty;
        },
        set: function (value) {
            this.fontFamilyProperty = value;
            this.notifyPropertyChanged(constants_1.TEXT_STYLE_PROPERTY.FONT_FAMILY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisBase3DLabelStyle.prototype, "fontSize", {
        get: function () {
            return this.fontSizeProperty;
        },
        set: function (value) {
            this.fontSizeProperty = value;
            this.notifyPropertyChanged(constants_1.TEXT_STYLE_PROPERTY.FONT_SIZE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisBase3DLabelStyle.prototype, "foreground", {
        get: function () {
            return this.foregroundProperty;
        },
        set: function (value) {
            this.foregroundProperty = value;
            this.notifyPropertyChanged(constants_1.TEXT_STYLE_PROPERTY.FOREGROUND);
        },
        enumerable: false,
        configurable: true
    });
    AxisBase3DLabelStyle.prototype.notifyPropertyChanged = function (propertyName) {
        var _a;
        var invalidateParentCallback = (_a = this.parentAxis) === null || _a === void 0 ? void 0 : _a.invalidateParentCallback;
        if (invalidateParentCallback) {
            invalidateParentCallback();
        }
    };
    return AxisBase3DLabelStyle;
}());
exports.AxisBase3DLabelStyle = AxisBase3DLabelStyle;
