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
exports.SolidBrushCache = void 0;
var DeletableEntity_1 = require("../../Core/DeletableEntity");
var Deleter_1 = require("../../Core/Deleter");
var parseColor_1 = require("../../utils/parseColor");
// TODO: this class can be removed and its usage replaced by BrushCache class
/**
 * @ignore
 */
var SolidBrushCache = /** @class */ (function (_super) {
    __extends(SolidBrushCache, _super);
    function SolidBrushCache(webAssemblyContext) {
        var _this = _super.call(this) || this;
        _this.webAssemblyContext = webAssemblyContext;
        return _this;
    }
    /**
     * Creates or fetches a new Brush with the specified color string and properties
     * @param color
     * @param transparent
     */
    SolidBrushCache.prototype.newBrush = function (color, transparent) {
        if (transparent === void 0) { transparent = false; }
        // Return brush from cache
        if (this.brush && color === this.color && transparent === this.transparent) {
            return this.brush;
        }
        // Create new brush
        if (this.brush) {
            this.brush.delete();
        }
        this.color = color;
        this.transparent = transparent;
        this.brush = new this.webAssemblyContext.SCRTSolidBrush((0, parseColor_1.parseColorToUIntArgb)(color), transparent);
        return this.brush;
    };
    /**
     * @inheritDoc
     */
    SolidBrushCache.prototype.delete = function () {
        this.brush = (0, Deleter_1.deleteSafe)(this.brush);
        this.webAssemblyContext = undefined;
    };
    return SolidBrushCache;
}(DeletableEntity_1.DeletableEntity));
exports.SolidBrushCache = SolidBrushCache;
