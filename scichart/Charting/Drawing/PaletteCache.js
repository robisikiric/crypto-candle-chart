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
exports.PaletteCache = void 0;
var Deleter_1 = require("../../Core/Deleter");
var BaseCache_1 = require("./BaseCache");
/**
 * @ignore
 */
var PaletteCache = /** @class */ (function (_super) {
    __extends(PaletteCache, _super);
    function PaletteCache() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PaletteCache.prototype, "value", {
        get: function () {
            if (!this.cachedEntity && this.fillColors) {
                this.cachedEntity = this.create(this.fillColors);
            }
            return this.cachedEntity;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates or fetches a new palette with the specified colors
     * @param fillColors
     */
    PaletteCache.prototype.create = function (fillColors) {
        if (this.cachedEntity && fillColors === this.fillColors) {
            return this.cachedEntity;
        }
        (0, Deleter_1.deleteSafe)(this.cachedEntity);
        this.fillColors = fillColors;
        // @ts-ignore
        return this.cachedEntity = new this.webAssemblyContext.SCRTCreatePalette(fillColors);
    };
    PaletteCache.prototype.reset = function () {
        this.invalidateCache();
        this.fillColors = undefined;
    };
    return PaletteCache;
}(BaseCache_1.BaseCache));
exports.PaletteCache = PaletteCache;
