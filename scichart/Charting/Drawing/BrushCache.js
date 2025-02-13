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
exports.createBrushInCache = exports.getScrtBrushFromCache = exports.getWebGlBrushFromCache = exports.BrushCache = void 0;
var Deleter_1 = require("../../Core/Deleter");
var Guard_1 = require("../../Core/Guard");
var createSolidBrush_1 = require("../Visuals/Helpers/createSolidBrush");
var CanvasTexture_1 = require("../Visuals/TextureManager/CanvasTexture");
var BaseCache_1 = require("./BaseCache");
var WebGlBrush_1 = require("./WebGlBrush");
/** @ignore */
var TEXTURE_SIZE = 256;
/**
 * @ignore
 */
var BrushCache = /** @class */ (function (_super) {
    __extends(BrushCache, _super);
    function BrushCache() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BrushCache.prototype, "value", {
        get: function () {
            if (!this.cachedEntity && (this.fill || this.fillLinearGradient)) {
                this.cachedEntity = this.create(this.fill, this.opacity, this.textureHeightRatio, this.textureWidthRatio, this.fillLinearGradient);
            }
            return this.cachedEntity;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates or fetches a new brush with the specified params
     * @param fill
     * @param opacity
     * @param textureHeightRatio
     * @param textureWidthRatio
     * @param fillLinearGradient
     */
    BrushCache.prototype.create = function (fill, opacity, textureHeightRatio, textureWidthRatio, fillLinearGradient) {
        if (this.cachedEntity &&
            fill === this.fill &&
            opacity === this.opacity &&
            textureHeightRatio === this.textureHeightRatio &&
            textureWidthRatio === this.textureWidthRatio &&
            fillLinearGradient === this.fillLinearGradient) {
            return this.cachedEntity;
        }
        this.invalidateCache();
        this.fill = fill;
        this.opacity = opacity;
        this.textureHeightRatio = textureHeightRatio;
        this.textureWidthRatio = textureWidthRatio;
        this.fillLinearGradient = fillLinearGradient;
        var brush = fillLinearGradient ? this.createGradientBrush() : this.createSolidBrush(fill, opacity);
        return (this.cachedEntity = new WebGlBrush_1.WebGlBrush(brush));
    };
    BrushCache.prototype.invalidateCache = function () {
        _super.prototype.invalidateCache.call(this);
        this.canvasTexture = (0, Deleter_1.deleteSafe)(this.canvasTexture);
    };
    BrushCache.prototype.reset = function () {
        this.invalidateCache();
        this.fill = undefined;
        this.opacity = undefined;
        this.fillLinearGradient = undefined;
    };
    BrushCache.prototype.delete = function () {
        this.invalidateCache();
    };
    BrushCache.prototype.createSolidBrush = function (htmlColorCode, opacity) {
        return (0, createSolidBrush_1.createSolidBrush)(this.webAssemblyContext, htmlColorCode, opacity);
    };
    BrushCache.prototype.createGradientBrush = function () {
        var gradientTexture = this.createGradientTexture().getTexture();
        return new this.webAssemblyContext.SCRTTextureBrush(gradientTexture, this.webAssemblyContext.eSCRTBrushMappingMode.PerPrimitive, 1);
    };
    BrushCache.prototype.createGradientTexture = function () {
        Guard_1.Guard.notNull(this.fillLinearGradient, "fillLinearGradient");
        var _a = this.fillLinearGradient, startPoint = _a.startPoint, endPoint = _a.endPoint, gradientStops = _a.gradientStops;
        this.canvasTexture = new CanvasTexture_1.CanvasTexture(this.webAssemblyContext, TEXTURE_SIZE, TEXTURE_SIZE);
        this.canvasTexture.clear();
        var ctx = this.canvasTexture.getContext();
        // BEGIN: Drawing gradient rectangle on canvas2D
        var x1 = convertRelativeToAbsolute(startPoint.x, TEXTURE_SIZE * this.textureWidthRatio);
        var y1 = convertRelativeToAbsolute(startPoint.y, TEXTURE_SIZE * this.textureHeightRatio);
        var x2 = convertRelativeToAbsolute(endPoint.x, TEXTURE_SIZE * this.textureWidthRatio);
        var y2 = convertRelativeToAbsolute(endPoint.y, TEXTURE_SIZE * this.textureHeightRatio);
        var gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradientStops.forEach(function (el) {
            gradient.addColorStop(el.offset, el.color);
        });
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
        // END: Drawing gradient rectangle on canvas2D
        this.canvasTexture.copyTexture();
        return this.canvasTexture;
    };
    return BrushCache;
}(BaseCache_1.BaseCache));
exports.BrushCache = BrushCache;
/**
 * Retrieves a native {@link WebGlBrush} Brush from the provided {@link BrushCache} cache object
 * @param BrushCache The object that stores a brush
 * @returns new or existing instance of {@link WebGlPen}}
 */
var getWebGlBrushFromCache = function (cache) {
    Guard_1.Guard.notNull(cache, "cache");
    return cache.value;
};
exports.getWebGlBrushFromCache = getWebGlBrushFromCache;
// TODO: probably we should consider some approach to be consistent in using one of SCRTBrush or WebGlBrush
/**
 * Retrieves a native {@link SCRTBrush} Brush from the provided {@link BrushCache} cache object.
 * The retrieved entity is a wrapper around {@link SCRTPen}
 * @param cache The object that stores a brush
 * @returns new or existing instance of {@link SCRTBrush}}
 */
var getScrtBrushFromCache = function (cache) {
    var webGlBrush = (0, exports.getWebGlBrushFromCache)(cache);
    return webGlBrush === null || webGlBrush === void 0 ? void 0 : webGlBrush.scrtBrush;
};
exports.getScrtBrushFromCache = getScrtBrushFromCache;
/**
 * Creates a native {@link SCRTBrush} brush from html color code string passed in and caches it
 * @param cache The object that will store a brush
 * @param fill The HTML Color code
 * @param opacity The opacity factor.
 * @param textureHeightRatio The height ratio of the main canvas to the WebGl canvas.
 * @param textureWidthRatio The width ratio of the main canvas to the WebGl canvas.
 * @param fillGradientLinear The gradient params.
 * @returns new or existing instance of {@link SCRTBrush}}
 */
var createBrushInCache = function (cache, fill, opacity, textureHeightRatio, textureWidthRatio, fillGradientLinear) {
    Guard_1.Guard.notNull(cache, "brushCache");
    var brush = cache.create(fill, opacity, textureHeightRatio, textureWidthRatio, fillGradientLinear);
    return brush.scrtBrush;
};
exports.createBrushInCache = createBrushInCache;
/** @ignore */
var convertRelativeToAbsolute = function (relativeValue, size) {
    return relativeValue * size;
};
