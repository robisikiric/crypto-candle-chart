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
exports.TextureCache = void 0;
var Deleter_1 = require("../../Core/Deleter");
var BaseCache_1 = require("./BaseCache");
/**
 * @ignore
 */
var TextureCache = /** @class */ (function (_super) {
    __extends(TextureCache, _super);
    /**
     * unlike the base class this one accepts both  context
     * @param wasmContext TSciChart or TSciChart3D
     */
    function TextureCache(wasmContext) {
        var _this = _super.call(this, wasmContext) || this;
        _this.wasmContext = wasmContext;
        return _this;
    }
    Object.defineProperty(TextureCache.prototype, "value", {
        get: function () {
            if (!this.cachedEntity && this.textureFormat) {
                this.cachedEntity = this.create(this.width, this.height, this.textureFormat);
            }
            return this.cachedEntity;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates or fetches a new texture with the specified params
     * @param width
     * @param height
     * @param textureFormat
     */
    TextureCache.prototype.create = function (width, height, textureFormat) {
        if (this.cachedEntity &&
            width === this.width &&
            height === this.height &&
            textureFormat === this.textureFormat) {
            return this.cachedEntity;
        }
        this.cachedEntity = (0, Deleter_1.deleteSafe)(this.cachedEntity);
        this.width = width;
        this.height = height;
        this.textureFormat = textureFormat;
        this.cachedEntity = this.wasmContext.SCRTCreateBitmapTexture(this.width, this.height, textureFormat);
        return this.cachedEntity;
    };
    TextureCache.prototype.resetCache = function () {
        this.invalidateCache();
        this.width = undefined;
        this.height = undefined;
        this.textureFormat = undefined;
    };
    return TextureCache;
}(BaseCache_1.BaseCache));
exports.TextureCache = TextureCache;
