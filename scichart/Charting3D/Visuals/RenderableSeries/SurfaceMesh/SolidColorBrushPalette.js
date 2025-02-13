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
exports.SolidColorBrushPalette = void 0;
var CanvasTexture_1 = require("../../../../Charting/Visuals/TextureManager/CanvasTexture");
var app_1 = require("../../../../constants/app");
var Guard_1 = require("../../../../Core/Guard");
var parseColor_1 = require("../../../../utils/parseColor");
var Constants_1 = require("../Constants");
var MeshColorPalette_1 = require("./MeshColorPalette");
/**
 * Provides a solid color (single color) palette which may be applied to the {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
 * property
 */
var SolidColorBrushPalette = /** @class */ (function (_super) {
    __extends(SolidColorBrushPalette, _super);
    /**
     * Creates an instance of the {@link SolidColorBrushPalette}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options optional parameters of type {@link ISolidColorBrushPaletteOptions} passed to the constructor
     */
    function SolidColorBrushPalette(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext) || this;
        _this.fillProperty = (options === null || options === void 0 ? void 0 : options.fill) || "#777777";
        return _this;
    }
    Object.defineProperty(SolidColorBrushPalette.prototype, "fill", {
        /**
         * Gets or sets the solid color fill as an HTML Color code
         */
        get: function () {
            return this.fillProperty;
        },
        /**
         * Gets or sets the solid color fill as an HTML Color code
         */
        set: function (fill) {
            this.fillProperty = fill;
            this.notifyPropertyChanged(Constants_1.PROPERTY.FILL);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    SolidColorBrushPalette.prototype.getTexture = function (size) {
        Guard_1.Guard.notNull(size, "size");
        Guard_1.Guard.isTrue(size.width > 0, "size.width must be greater than 0");
        Guard_1.Guard.isTrue(size.height > 0, "size.height must be greater than 0");
        if (app_1.IS_TEST_ENV) {
            return undefined;
        }
        var color = (0, parseColor_1.parseColorToUIntArgb)(this.fill);
        if (isNaN(color)) {
            throw Error("SolidColorBrushPalette.fill ".concat(this.fill, " cannot be converted to an ABGR color"));
        }
        var canvasTexture = new CanvasTexture_1.CanvasTexture(this.webAssemblyContext, size.width, size.height);
        canvasTexture.clear();
        var ctx = canvasTexture.getContext();
        ctx.fillStyle = this.fill;
        ctx.fillRect(0, 0, size.width, size.height);
        canvasTexture.copyTexture();
        return canvasTexture;
    };
    return SolidColorBrushPalette;
}(MeshColorPalette_1.MeshColorPalette));
exports.SolidColorBrushPalette = SolidColorBrushPalette;
