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
exports.BaseCache = void 0;
var DeletableEntity_1 = require("../../Core/DeletableEntity");
var Deleter_1 = require("../../Core/Deleter");
var MemoryUsageHelper_1 = require("../../utils/MemoryUsageHelper");
var WebGlRenderContext2D_1 = require("./WebGlRenderContext2D");
/**
 * @ignore
 */
var BaseCache = /** @class */ (function (_super) {
    __extends(BaseCache, _super);
    /**
     * Creates an instance of {@link BaseCache}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     */
    function BaseCache(webAssemblyContext) {
        var _this = _super.call(this) || this;
        _this.webAssemblyContext = webAssemblyContext;
        if (webAssemblyContext) {
            // add reference of the current instance to global collection of cached resources
            WebGlRenderContext2D_1.WebGlRenderContext2D.webGlResourcesRefs.add(_this);
        }
        return _this;
    }
    Object.defineProperty(BaseCache.prototype, "value", {
        /**
         * Retrieves the cached value
         */
        get: function () {
            return this.cachedEntity;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    BaseCache.prototype.invalidateCache = function () {
        this.cachedEntity = (0, Deleter_1.deleteSafe)(this.cachedEntity);
    };
    /**
     * @inheritDoc
     */
    BaseCache.prototype.resetCache = function () {
        this.invalidateCache();
    };
    /**
     * @inheritDoc
     */
    BaseCache.prototype.delete = function () {
        var _this = this;
        this.cachedEntity = (0, Deleter_1.deleteSafe)(this.cachedEntity);
        // Is falsy if reference revoked by proxy
        // if (this.webAssemblyContext) {
        // remove reference of the current instance to global collection of cached resources
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
        // }
        this.webAssemblyContext = undefined;
    };
    return BaseCache;
}(DeletableEntity_1.DeletableEntity));
exports.BaseCache = BaseCache;
