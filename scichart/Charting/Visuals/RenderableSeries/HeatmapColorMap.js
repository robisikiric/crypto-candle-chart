"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapColorMap = void 0;
var EventHandler_1 = require("../../../Core/EventHandler");
var PropertyChangedEventArgs_1 = require("../../../Core/PropertyChangedEventArgs");
var constants_1 = require("./constants");
var HeatmapColorMap = /** @class */ (function () {
    function HeatmapColorMap(options) {
        var _a, _b;
        this.minimumProperty = (_a = options === null || options === void 0 ? void 0 : options.minimum) !== null && _a !== void 0 ? _a : 0;
        this.maximumProperty = (_b = options === null || options === void 0 ? void 0 : options.maximum) !== null && _b !== void 0 ? _b : 100;
        this.gradientStops = (options === null || options === void 0 ? void 0 : options.gradientStops) || [
            { offset: 0, color: "Red" },
            { offset: 1, color: "Green" }
        ];
        this.propertyChanged = new EventHandler_1.EventHandler();
        this.calculateScaleFactor();
    }
    Object.defineProperty(HeatmapColorMap.prototype, "gradientStops", {
        get: function () {
            return this.gradientStopsProperty;
        },
        set: function (gradientStops) {
            this.gradientStopsProperty = gradientStops;
            this.notifyPropertyChanged(constants_1.PROPERTY.GRADIENT_STOPS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HeatmapColorMap.prototype, "minimum", {
        get: function () {
            return this.minimumProperty;
        },
        set: function (minimum) {
            this.minimumProperty = minimum;
            this.notifyPropertyChanged(constants_1.PROPERTY.MINIMUM);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HeatmapColorMap.prototype, "maximum", {
        get: function () {
            return this.maximumProperty;
        },
        set: function (maximum) {
            this.maximumProperty = maximum;
            this.notifyPropertyChanged(constants_1.PROPERTY.MAXIMUM);
        },
        enumerable: false,
        configurable: true
    });
    HeatmapColorMap.prototype.toJSON = function () {
        return {
            minimum: this.minimum,
            maximum: this.maximum,
            gradientStops: this.gradientStops
        };
    };
    HeatmapColorMap.prototype.notifyPropertyChanged = function (property) {
        var _a;
        (_a = this.propertyChanged) === null || _a === void 0 ? void 0 : _a.raiseEvent(new PropertyChangedEventArgs_1.PropertyChangedEventArgs(property));
    };
    HeatmapColorMap.prototype.calculateScaleFactor = function () {
        this.scaleFactorProperty =
            (HeatmapColorMap.DefaultPrecision - 1) / Math.abs(this.maximumProperty - this.minimumProperty);
    };
    HeatmapColorMap.DefaultPrecision = 1000;
    return HeatmapColorMap;
}());
exports.HeatmapColorMap = HeatmapColorMap;
