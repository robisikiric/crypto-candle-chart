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
exports.BasePointMarker = void 0;
var app_1 = require("../../../constants/app");
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var Deleter_1 = require("../../../Core/Deleter");
var MemoryUsageHelper_1 = require("../../../utils/MemoryUsageHelper");
var WebGlRenderContext2D_1 = require("../../Drawing/WebGlRenderContext2D");
var IThemeProvider_1 = require("../../Themes/IThemeProvider");
var PointMarkerStyle_1 = require("../RenderableSeries/Animations/PointMarkerStyle");
var SciChartSurfaceBase_1 = require("../SciChartSurfaceBase");
var CanvasTexture_1 = require("../TextureManager/CanvasTexture");
var DpiHelper_1 = require("../TextureManager/DpiHelper");
var Constants_1 = require("./Constants");
/**
 * The Base class for a PointMarker in SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}.
 * @description PointMarkers may be displayed on {@link IRenderableSeries | Renderable Series} to add scatter-points to charts.
 * For example: setting the {@link XyScatterRenderableSeries.pointMarker} property or {@link FastLineRenderableSeries.pointMarker} property
 * will render a point at each xy data-value
 * @remarks
 * See derived types of {@link BasePointMarker} for specific point-marker types.
 */
var BasePointMarker = /** @class */ (function (_super) {
    __extends(BasePointMarker, _super);
    /**
     * Creates an instance of the {@link BasePointMarker}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IPointMarkerOptions} used to configure the point-marker at instantiation time
     */
    function BasePointMarker(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        _this = _super.call(this) || this;
        _this.fillProperty = "#5555FF";
        _this.heightProperty = 5;
        _this.opacityProperty = 1;
        _this.strokeProperty = "#3333FF";
        _this.strokeThicknessProperty = 1;
        _this.widthProperty = 5;
        _this.lastPointOnlyProperty = false;
        _this.isUpdateSuspended = false;
        _this.webAssemblyContext = webAssemblyContext;
        _this.widthProperty = (_a = options === null || options === void 0 ? void 0 : options.width) !== null && _a !== void 0 ? _a : _this.widthProperty;
        _this.heightProperty = (_b = options === null || options === void 0 ? void 0 : options.height) !== null && _b !== void 0 ? _b : _this.heightProperty;
        _this.fillProperty = (_c = options === null || options === void 0 ? void 0 : options.fill) !== null && _c !== void 0 ? _c : _this.fillProperty;
        _this.strokeProperty = (_d = options === null || options === void 0 ? void 0 : options.stroke) !== null && _d !== void 0 ? _d : _this.strokeProperty;
        _this.strokeThicknessProperty = (_e = options === null || options === void 0 ? void 0 : options.strokeThickness) !== null && _e !== void 0 ? _e : _this.strokeThicknessProperty;
        _this.opacityProperty = (_f = options === null || options === void 0 ? void 0 : options.opacity) !== null && _f !== void 0 ? _f : _this.opacityProperty;
        _this.lastPointOnlyProperty = (_g = options === null || options === void 0 ? void 0 : options.lastPointOnly) !== null && _g !== void 0 ? _g : _this.lastPointOnlyProperty;
        // add to the list of objects that create and store WebGL resources
        WebGlRenderContext2D_1.WebGlRenderContext2D.webGlResourcesRefs.add(_this);
        return _this;
    }
    Object.defineProperty(BasePointMarker.prototype, "fill", {
        /**
         * Gets or sets the point-marker fill as an HTML Color Code
         */
        get: function () {
            if (this.fillProperty === IThemeProvider_1.AUTO_COLOR) {
                return "#00000000";
            }
            if (this.fillProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
                return this.fillProperty.substring(IThemeProvider_1.AUTO_COLOR.length);
            }
            return this.fillProperty;
        },
        /**
         * Gets or sets the point-marker fill as an HTML Color Code
         */
        set: function (fill) {
            var oldValue = this.fillProperty;
            this.fillProperty = fill;
            this.notifyPropertyChanged(Constants_1.PROPERTY.FILL, fill, oldValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BasePointMarker.prototype, "stroke", {
        /**
         * Gets or sets the point-marker stroke as an HTML Color Code
         */
        get: function () {
            if (this.strokeProperty === IThemeProvider_1.AUTO_COLOR) {
                return "#00000000";
            }
            if (this.strokeProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
                return this.strokeProperty.substring(IThemeProvider_1.AUTO_COLOR.length);
            }
            return this.strokeProperty;
        },
        /**
         * Gets or sets the point-marker stroke as an HTML Color Code
         */
        set: function (stroke) {
            var oldValue = this.strokeProperty;
            this.strokeProperty = stroke;
            this.notifyPropertyChanged(Constants_1.PROPERTY.STROKE, stroke, oldValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BasePointMarker.prototype, "width", {
        /**
         * Gets or sets the width of the point-marker in pixels
         */
        get: function () {
            return this.widthProperty;
        },
        /**
         * Gets or sets the width of the point-marker in pixels
         */
        set: function (width) {
            var oldValue = this.widthProperty;
            this.widthProperty = width;
            this.notifyPropertyChanged(Constants_1.PROPERTY.WIDTH, width, oldValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BasePointMarker.prototype, "height", {
        /**
         * Gets or sets the height of the point-marker in pixels
         */
        get: function () {
            return this.heightProperty;
        },
        /**
         * Gets or sets the height of the point-marker in pixels
         */
        set: function (height) {
            var oldValue = this.heightProperty;
            this.heightProperty = height;
            this.notifyPropertyChanged(Constants_1.PROPERTY.HEIGHT, height, oldValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BasePointMarker.prototype, "strokeThickness", {
        /**
         * Gets or sets the stroke-thickness of the point-marker in pixels
         */
        get: function () {
            return this.strokeThicknessProperty;
        },
        /**
         * Gets or sets the stroke-thickness of the point-marker in pixels
         */
        set: function (strokeThickness) {
            var oldValue = this.strokeThicknessProperty;
            this.strokeThicknessProperty = strokeThickness;
            this.notifyPropertyChanged(Constants_1.PROPERTY.STROKE_THICKNESS, strokeThickness, oldValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BasePointMarker.prototype, "opacity", {
        /**
         * Gets or sets the opacity of the point-marker
         */
        get: function () {
            return this.opacityProperty;
        },
        /**
         * Gets or sets the opacity of the point-marker
         */
        set: function (opacity) {
            var oldValue = this.opacityProperty;
            this.opacityProperty = opacity;
            this.applyOpacity(opacity);
            this.notifyPropertyChanged(Constants_1.PROPERTY.OPACITY, opacity, oldValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BasePointMarker.prototype, "lastPointOnly", {
        /**
         * Set true to make the point marker render only for the last point on the data series
         */
        get: function () {
            return this.lastPointOnlyProperty;
        },
        /**
         * Set true to make the point marker render only for the last point on the data series
         */
        set: function (lastPointOnly) {
            var oldValue = this.lastPointOnlyProperty;
            this.lastPointOnlyProperty = lastPointOnly;
            this.notifyPropertyChanged(Constants_1.PROPERTY.LAST_POINT_ONLY, lastPointOnly, oldValue);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets a {@link CanvasTexture} object which represents the point-marker sprite instance to draw
     * @remarks note {@link CanvasTexture} implements {@link IDeletable} and must be deleted manually to free memory
     */
    BasePointMarker.prototype.getSprite = function () {
        if (this.spriteTextures === undefined) {
            this.spriteTextures = this.createCanvasTexture();
            this.applyOpacity(this.opacityProperty);
        }
        return this.spriteTextures.spriteTexture;
    };
    /**
     * Gets a {@link CanvasTexture} object which represents the stroke mask sprite instance to use for points,
     * which appearance is overridden by a Palette Provider
     * @remarks note {@link CanvasTexture} implements {@link IDeletable} and must be deleted manually to free memory
     */
    BasePointMarker.prototype.getStrokeMask = function () {
        if (this.spriteTextures === undefined) {
            this.spriteTextures = this.createCanvasTexture();
            this.applyOpacity(this.opacityProperty);
        }
        return this.spriteTextures.strokeMask;
    };
    /**
     * Gets a {@link CanvasTexture} object which represents the fill mask sprite instance to use for points,
     * which appearance is overridden by a Palette Provider
     * @remarks note {@link CanvasTexture} implements {@link IDeletable} and must be deleted manually to free memory
     */
    BasePointMarker.prototype.getFillMask = function () {
        if (this.spriteTextures === undefined) {
            this.spriteTextures = this.createCanvasTexture();
            this.applyOpacity(this.opacityProperty);
        }
        return this.spriteTextures.fillMask;
    };
    BasePointMarker.prototype.invalidateCache = function () {
        if (this.spriteTextures) {
            (0, Deleter_1.deleteSafe)(this.spriteTextures.spriteTexture);
            (0, Deleter_1.deleteSafe)(this.spriteTextures.strokeMask);
            (0, Deleter_1.deleteSafe)(this.spriteTextures.fillMask);
            this.spriteTextures = undefined;
        }
    };
    BasePointMarker.prototype.resetCache = function () {
        this.invalidateCache();
        this.widthProperty = undefined;
        this.heightProperty = undefined;
        this.fillProperty = undefined;
        this.strokeProperty = undefined;
        this.strokeThicknessProperty = undefined;
        this.opacityProperty = undefined;
    };
    /**
     * @inheritDoc
     */
    BasePointMarker.prototype.delete = function () {
        var _this = this;
        this.invalidateCache();
        WebGlRenderContext2D_1.WebGlRenderContext2D.webGlResourcesRefs.delete(this);
        try {
            if (process.env.NODE_ENV !== "production") {
                // resolve memory debug issue when comparing to proxy object
                if (MemoryUsageHelper_1.MemoryUsageHelper.isMemoryUsageDebugEnabled) {
                    WebGlRenderContext2D_1.WebGlRenderContext2D.webGlResourcesRefs.forEach(function (ref) {
                        if (ref.resetCache === _this.resetCache) {
                            WebGlRenderContext2D_1.WebGlRenderContext2D.webGlResourcesRefs.delete(ref);
                        }
                    });
                }
            }
        }
        catch (err) {
            console.warn(err);
        }
    };
    /**
     * Called internally - creates the {@link CanvasTexture} object and calls {@link drawSprite} for creating the cached texture to draw
     */
    BasePointMarker.prototype.createCanvasTexture = function () {
        if (app_1.IS_TEST_ENV) {
            return { spriteTexture: undefined, strokeMask: undefined, fillMask: undefined };
        }
        var widthPadded = DpiHelper_1.DpiHelper.PIXEL_RATIO * (this.width + this.strokeThickness) + 1;
        var heightPadded = DpiHelper_1.DpiHelper.PIXEL_RATIO * (this.height + this.strokeThickness) + 1;
        var spriteTexture = new CanvasTexture_1.CanvasTexture(this.webAssemblyContext, widthPadded, heightPadded);
        spriteTexture.clear();
        this.drawSprite(spriteTexture.getContext(), this.width * DpiHelper_1.DpiHelper.PIXEL_RATIO, this.height * DpiHelper_1.DpiHelper.PIXEL_RATIO, this.stroke, this.strokeThickness * DpiHelper_1.DpiHelper.PIXEL_RATIO, this.fill);
        spriteTexture.copyTexture();
        var strokeMask = new CanvasTexture_1.CanvasTexture(this.webAssemblyContext, widthPadded, heightPadded);
        strokeMask.clear();
        this.drawSprite(strokeMask.getContext(), this.width * DpiHelper_1.DpiHelper.PIXEL_RATIO, this.height * DpiHelper_1.DpiHelper.PIXEL_RATIO, "#ffffffff", this.strokeThickness * DpiHelper_1.DpiHelper.PIXEL_RATIO, "#00000000");
        strokeMask.copyTexture();
        var fillMask = new CanvasTexture_1.CanvasTexture(this.webAssemblyContext, widthPadded, heightPadded);
        fillMask.clear();
        this.drawSprite(fillMask.getContext(), 
        // Temporary fix for ring around pointmarkers with paletteProvider
        this.width * DpiHelper_1.DpiHelper.PIXEL_RATIO - 3, this.height * DpiHelper_1.DpiHelper.PIXEL_RATIO - 3, "#00000000", 0, "#ffffffff");
        fillMask.copyTexture();
        return { spriteTexture: spriteTexture, strokeMask: strokeMask, fillMask: fillMask };
    };
    /** @inheritDoc */
    BasePointMarker.prototype.getPointMarkerStyle = function () {
        return new PointMarkerStyle_1.PointMarkerStyle({
            type: this.type,
            width: this.width,
            height: this.height,
            fill: this.fill,
            stroke: this.stroke,
            strokeThickness: this.strokeThickness
        });
    };
    /** @inheritDoc */
    BasePointMarker.prototype.toJSON = function () {
        var options = {
            fill: this.fill,
            height: this.height,
            opacity: this.opacity,
            stroke: this.stroke,
            strokeThickness: this.strokeThickness,
            width: this.width,
            lastPointOnly: this.lastPointOnly
        };
        // @ts-ignore
        return { type: this.type, options: options };
    };
    /**
     * @inheritDoc
     */
    BasePointMarker.prototype.onDpiChanged = function (args) {
        if (SciChartSurfaceBase_1.DebugForDpi) {
            console.log("basePointMarker onDpiChanged Scaling factor = " + args.newValue);
        }
        this.invalidateCache();
    };
    /** @inheritDoc */
    BasePointMarker.prototype.resolveAutoColors = function (index, maxSeries, theme) {
        if (this.strokeProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getStrokeColor(index, maxSeries, this.webAssemblyContext);
            this.stroke = IThemeProvider_1.AUTO_COLOR + this.adjustAutoColor("stroke", color);
        }
        if (this.fillProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getFillColor(index, maxSeries, this.webAssemblyContext);
            this.fill = IThemeProvider_1.AUTO_COLOR + this.adjustAutoColor("fill", color);
        }
    };
    /** @inheritDoc */
    BasePointMarker.prototype.adjustAutoColor = function (propertyName, color) {
        return color;
    };
    /** @inheritDoc */
    BasePointMarker.prototype.resumeUpdates = function () {
        this.isUpdateSuspended = false;
        this.recreateSpriteTextures();
    };
    /** @inheritDoc */
    BasePointMarker.prototype.suspendUpdates = function () {
        this.isUpdateSuspended = true;
    };
    /**
     * Notifies listeners to {@link invalidateParentCallback} that a property has changed and redraw is required
     * @param propertyName the property name
     * @param newValue the new value
     * @param oldValue the old value
     */
    BasePointMarker.prototype.notifyPropertyChanged = function (propertyName, newValue, oldValue) {
        if (newValue === oldValue || propertyName === Constants_1.PROPERTY.OPACITY) {
            return;
        }
        if (!this.isUpdateSuspended) {
            this.recreateSpriteTextures();
        }
    };
    BasePointMarker.prototype.recreateSpriteTextures = function () {
        var _a, _b, _c;
        if (this.spriteTextures) {
            (_a = this.spriteTextures.spriteTexture) === null || _a === void 0 ? void 0 : _a.delete();
            (_b = this.spriteTextures.strokeMask) === null || _b === void 0 ? void 0 : _b.delete();
            (_c = this.spriteTextures.fillMask) === null || _c === void 0 ? void 0 : _c.delete();
            this.spriteTextures = undefined;
        }
        this.spriteTextures = this.createCanvasTexture();
        if (this.invalidateParentCallback) {
            this.invalidateParentCallback();
        }
    };
    BasePointMarker.prototype.applyOpacity = function (opacity) {
        var _a, _b, _c;
        if (this.spriteTextures) {
            (_a = this.spriteTextures.spriteTexture) === null || _a === void 0 ? void 0 : _a.applyOpacity(opacity);
            (_b = this.spriteTextures.strokeMask) === null || _b === void 0 ? void 0 : _b.applyOpacity(opacity);
            (_c = this.spriteTextures.fillMask) === null || _c === void 0 ? void 0 : _c.applyOpacity(opacity);
        }
    };
    return BasePointMarker;
}(DeletableEntity_1.DeletableEntity));
exports.BasePointMarker = BasePointMarker;
