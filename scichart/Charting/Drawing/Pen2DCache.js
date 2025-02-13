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
exports.createPenInCache = exports.getScrtPenFromCache = exports.getWebGlPenFromCache = exports.Pen2DCache = void 0;
var Deleter_1 = require("../../Core/Deleter");
var Guard_1 = require("../../Core/Guard");
var array_1 = require("../../utils/array");
var parseColor_1 = require("../../utils/parseColor");
var createPen_1 = require("../Visuals/Helpers/createPen");
var DpiHelper_1 = require("../Visuals/TextureManager/DpiHelper");
var BaseCache_1 = require("./BaseCache");
var WebGlPen_1 = require("./WebGlPen");
/**
 * @ignore
 */
var Pen2DCache = /** @class */ (function (_super) {
    __extends(Pen2DCache, _super);
    function Pen2DCache() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Pen2DCache.prototype, "value", {
        get: function () {
            var shouldRecreatePen = !this.cachedEntity && this.stroke;
            if (shouldRecreatePen) {
                var _a = this, stroke = _a.stroke, strokeThickness = _a.strokeThickness, strokeDashArray = _a.strokeDashArray, antiAliased = _a.antiAliased, opacity = _a.opacity;
                this.cachedEntity = this.create({
                    stroke: stroke,
                    strokeThickness: strokeThickness,
                    strokeDashArray: strokeDashArray,
                    antiAliased: antiAliased,
                    opacity: opacity
                });
            }
            return this.cachedEntity;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates or fetches a new pen with the specified color string, stroke thickness and antialiased property
     * @param options
     */
    Pen2DCache.prototype.create = function (options) {
        var stroke = options.stroke, _a = options.strokeThickness, strokeThickness = _a === void 0 ? 1 : _a, strokeDashArray = options.strokeDashArray, _b = options.antiAliased, antiAliased = _b === void 0 ? true : _b, _c = options.opacity, opacity = _c === void 0 ? 1 : _c;
        var _d = DpiHelper_1.DpiHelper.adjustStrokeSize({ strokeThickness: strokeThickness, strokeDashArray: strokeDashArray }), adjustedStrokeThickness = _d.strokeThickness, adjustedStrokeDashArray = _d.strokeDashArray;
        // Return pen from cache
        if (this.cachedEntity &&
            stroke === this.stroke &&
            adjustedStrokeThickness === this.adjustedStrokeThickness &&
            antiAliased === this.antiAliased &&
            (0, array_1.areArraysEqual)(adjustedStrokeDashArray, this.adjustedStrokeDashArray)) {
            // optimization for opacity updates
            if (opacity !== this.opacity) {
                this.opacity = opacity;
                this.cachedEntity.setOpacity(opacity);
            }
            // ensure that original stroke size is cached
            this.strokeThickness = strokeThickness;
            this.strokeDashArray = strokeDashArray;
            return this.cachedEntity;
        }
        // Create new pen
        (0, Deleter_1.deleteSafe)(this.cachedEntity);
        this.stroke = stroke;
        this.opacity = opacity;
        this.antiAliased = antiAliased;
        this.strokeThickness = strokeThickness;
        this.adjustedStrokeThickness = adjustedStrokeThickness;
        this.strokeDashArray = strokeDashArray;
        this.adjustedStrokeDashArray = adjustedStrokeDashArray;
        var scrtPen = (0, createPen_1.createSCRTPen)(this.webAssemblyContext, stroke, adjustedStrokeThickness, opacity, adjustedStrokeDashArray, antiAliased);
        return (this.cachedEntity = new WebGlPen_1.WebGlPen(scrtPen, (0, parseColor_1.parseColorToUIntArgb)(stroke)));
    };
    return Pen2DCache;
}(BaseCache_1.BaseCache));
exports.Pen2DCache = Pen2DCache;
// TODO: probably we should consider some approach to be consistent in using one of SCRTPen or WebGLPen
/**
 * Retrieves a native {@link WebGlPen} Pen from the provided {@link Pen2DCache} cache object.
 * The retrieved entity is a wrapper around {@link SCRTPen}
 * @param penCache The object that stores a pen
 * @returns the new or existing instance of {@link WebGlPen}}
 */
var getWebGlPenFromCache = function (penCache) {
    Guard_1.Guard.notNull(penCache, "penCache");
    return penCache.value;
};
exports.getWebGlPenFromCache = getWebGlPenFromCache;
/**
 * Retrieves a native {@link SCRTPen} Pen from the provided {@link Pen2DCache} cache object
 * @param penCache The object that stores a pen
 * @returns the new or existing instance of {@link SCRTPen}}
 */
var getScrtPenFromCache = function (penCache) {
    var webGlPen = (0, exports.getWebGlPenFromCache)(penCache);
    return webGlPen === null || webGlPen === void 0 ? void 0 : webGlPen.scrtPen;
};
exports.getScrtPenFromCache = getScrtPenFromCache;
/**
 * Creates a native {@link SCRTPen} Pen from html color code string passed in and caches it
 * @param penCache The object that will store a pen
 * @param stroke The HTML Color code
 * @param strokeThickness The strokethickness in pixels
 * @param opacity The opacity factor
 * @param strokeDashArray the StrokeDashArray which defines any dash e.g. [2,2] means dash for 2pts, gap for 2pts (or undefined = solid line).
 * @returns the new or existing instance of {@link SCRTPen}}
 */
var createPenInCache = function (penCache, stroke, strokeThickness, opacity, strokeDashArray, antiAliased) {
    Guard_1.Guard.notNull(penCache, "penCache");
    var cachedPen = penCache.create({
        stroke: stroke,
        strokeThickness: strokeThickness,
        opacity: opacity,
        strokeDashArray: strokeDashArray,
        antiAliased: antiAliased
    });
    return cachedPen.scrtPen;
};
exports.createPenInCache = createPenInCache;
