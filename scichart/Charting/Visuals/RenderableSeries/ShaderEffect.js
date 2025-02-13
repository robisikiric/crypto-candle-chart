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
exports.ShaderEffect = void 0;
var app_1 = require("../../../constants/app");
var Deleter_1 = require("../../../Core/Deleter");
var EventHandler_1 = require("../../../Core/EventHandler");
var Guard_1 = require("../../../Core/Guard");
var Point_1 = require("../../../Core/Point");
var PropertyChangedEventArgs_1 = require("../../../Core/PropertyChangedEventArgs");
var parseColor_1 = require("../../../utils/parseColor");
var tsrExtensions_1 = require("../../../utils/tsrExtensions");
var constants_1 = require("./constants");
var NativeObject_1 = require("../Helpers/NativeObject");
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
/**
 * A {@link ShaderEffect} can be applied to a {@link BaseRenderableSeries | RenderableSeries} via the
 * {@link BaseRenderableSeries.effect} property. The effect modifies the render output of the chart type.
 */
var ShaderEffect = /** @class */ (function (_super) {
    __extends(ShaderEffect, _super);
    /**
     * Creates an instance of the {@link ShaderEffect}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param seriesEffect The native {@link SCRTSeriesEffect} instance that provides the shader effect
     * @param options Optional parameters of type {@link IShaderEffectOptions} to configure the effect
     */
    function ShaderEffect(webAssemblyContext, seriesEffect, options) {
        var _this = _super.call(this) || this;
        Guard_1.Guard.notNull(webAssemblyContext, "webAssemblyContext");
        if (!app_1.IS_TEST_ENV) {
            Guard_1.Guard.notNull(seriesEffect, "seriesEffect");
        }
        _this.webAssemblyContext = webAssemblyContext;
        _this.propertyChanged = new EventHandler_1.EventHandler();
        _this.nativeEffect = seriesEffect;
        _this.intensity = (options === null || options === void 0 ? void 0 : options.intensity) || 1;
        _this.range = (options === null || options === void 0 ? void 0 : options.range) || 0;
        _this.offset = (options === null || options === void 0 ? void 0 : options.offset) || new Point_1.Point(0, 0);
        _this.color = (options === null || options === void 0 ? void 0 : options.color) || "#444444";
        return _this;
    }
    ShaderEffect.prototype.delete = function () {
        this.nativeEffect = (0, Deleter_1.deleteSafe)(this.nativeEffect);
        this.webAssemblyContext = undefined;
    };
    /**
     * Gets the native {@link SCRTSeriesEffect} which contains the shader effect that will be applied in WebGL
     */
    ShaderEffect.prototype.getNativeEffect = function () {
        return this.nativeEffect;
    };
    Object.defineProperty(ShaderEffect.prototype, "intensity", {
        /**
         * Gets or sets the intensity property
         */
        get: function () {
            return this.intensityProperty;
        },
        /**
         * Gets or sets the intensity property
         */
        set: function (intensity) {
            this.intensityProperty = intensity;
            this.nativeEffect.SetIntensity(intensity);
            this.notifyPropertyChanged(constants_1.PROPERTY.INTENSITY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderEffect.prototype, "offset", {
        /**
         * Gets or sets the offset property
         */
        get: function () {
            return this.offsetProperty;
        },
        /**
         * Gets or sets the offset property
         */
        set: function (offset) {
            Guard_1.Guard.notNull(offset, "offset");
            this.offsetProperty = offset;
            var tsrOffset = new this.webAssemblyContext.TSRVector2(offset.x, offset.y);
            this.nativeEffect.SetOffset(tsrOffset);
            tsrOffset.delete();
            this.notifyPropertyChanged(constants_1.PROPERTY.OFFSET);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderEffect.prototype, "color", {
        /**
         * Gets or sets the color property as an HTML Color code
         */
        get: function () {
            return this.colorProperty;
        },
        /**
         * Gets or sets the color property as an HTML Color code
         */
        set: function (color) {
            this.colorProperty = color;
            var colorArgb = (0, parseColor_1.parseColorToTArgb)(color);
            var tsrVector4 = (0, NativeObject_1.getVector4)(this.webAssemblyContext, 0, 0, 0, 0);
            (0, tsrExtensions_1.updateTsrVector4)(colorArgb, tsrVector4);
            this.nativeEffect.SetColor(tsrVector4);
            this.notifyPropertyChanged(constants_1.PROPERTY.COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderEffect.prototype, "range", {
        /**
         * Gets or sets the range property
         */
        get: function () {
            return this.rangeProperty;
        },
        /**
         * Gets or sets the range property
         */
        set: function (range) {
            this.rangeProperty = range;
            this.nativeEffect.SetRange(range);
            this.notifyPropertyChanged(constants_1.PROPERTY.RANGE);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Notifies subscribers to {@link propertyChanged} that a property has changed and the parent {@link SciChartSurface} needs to redraw
     * @param propertyName
     */
    ShaderEffect.prototype.notifyPropertyChanged = function (propertyName) {
        var _a;
        (_a = this.propertyChanged) === null || _a === void 0 ? void 0 : _a.raiseEvent(new PropertyChangedEventArgs_1.PropertyChangedEventArgs(propertyName));
    };
    /** Convert the object to a definition that can be serialized to JSON, or used directly with the builder api */
    ShaderEffect.prototype.toJSON = function () {
        var options = {
            color: this.color,
            intensity: this.intensity,
            offset: this.offset,
            range: this.range
        };
        return { type: this.type, options: options };
    };
    return ShaderEffect;
}(DeletableEntity_1.DeletableEntity));
exports.ShaderEffect = ShaderEffect;
