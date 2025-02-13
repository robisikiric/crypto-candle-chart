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
exports.GradientColorPalette = void 0;
var CanvasTexture_1 = require("../../../../Charting/Visuals/TextureManager/CanvasTexture");
var app_1 = require("../../../../constants/app");
var Guard_1 = require("../../../../Core/Guard");
var Constants_1 = require("../Constants");
var MeshColorPalette_1 = require("./MeshColorPalette");
/**
 * Provides a gradient color palette which may be applied to the {@link SurfaceMeshRenderableSeries3D.meshColorPalette}
 * property
 */
var GradientColorPalette = /** @class */ (function (_super) {
    __extends(GradientColorPalette, _super);
    /**
     * Creates an instance of the {@link GradientColorPalette}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options optional parameters of type {@link IGradientColorPaletteOptions} passed to the constructor
     */
    function GradientColorPalette(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext) || this;
        _this.gradientStops = (options === null || options === void 0 ? void 0 : options.gradientStops) || [
            { offset: 0, color: "Red" },
            { offset: 1, color: "Green" }
        ];
        return _this;
    }
    Object.defineProperty(GradientColorPalette.prototype, "gradientStops", {
        /**
         * The array of {@link TGradientStop | Gradient Stops} to apply with offsets from 0.0 - 1.0
         */
        get: function () {
            return this.gradientStopsProperty;
        },
        /**
         * The array of {@link TGradientStop | Gradient Stops} to apply with offsets from 0.0 - 1.0
         */
        set: function (gradientStops) {
            this.gradientStopsProperty = gradientStops;
            this.notifyPropertyChanged(Constants_1.PROPERTY.GRADIENT_STOPS);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    GradientColorPalette.prototype.getTexture = function (size) {
        if (app_1.IS_TEST_ENV) {
            return undefined;
        }
        Guard_1.Guard.notNull(size, "size");
        Guard_1.Guard.isTrue(size.width > 0, "size.width must be greater than 0");
        Guard_1.Guard.isTrue(size.height > 0, "size.height must be greater than 0");
        Guard_1.Guard.notNull(this.gradientStopsProperty, "GradientColorPalette.gradientStops");
        var canvasTexture = new CanvasTexture_1.CanvasTexture(this.webAssemblyContext, size.width, size.height);
        canvasTexture.clear();
        var ctx = canvasTexture.getContext();
        // BEGIN: Drawing gradient rectangle on canvas2D
        var x1 = 0;
        var y1 = 0;
        var x2 = size.width;
        var y2 = 0;
        var gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        this.gradientStops.forEach(function (el) {
            gradient.addColorStop(el.offset, el.color);
        });
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size.width, size.height);
        // END: Drawing gradient rectangle on canvas2D
        canvasTexture.copyTexture();
        return canvasTexture;
    };
    return GradientColorPalette;
}(MeshColorPalette_1.MeshColorPalette));
exports.GradientColorPalette = GradientColorPalette;
