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
exports.CanvasTexture = void 0;
var app_1 = require("../../../constants/app");
var Deleter_1 = require("../../../Core/Deleter");
var TextureCache_1 = require("../../Drawing/TextureCache");
var Guard_1 = require("../../../Core/Guard");
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
/**
 * @summary The {@link CanvasTexture} is used internally to map an {@link HTMLCanvasElement} to a WebGL Texture.
 * Use this when you want to create a WebGL texture and draw on it.
 * @remarks
 * To use a canvas texture, declare one, draw on the HTML canvas, then call {@link CanvasTexture.copyTexture}.
 * Code example below
 * ```ts
 * // Create a canvasTexture
 * const canvasTexture = new CanvasTexture(wasmContext, width, height);
 * canvasTexture.clear();
 *
 * // do some drawing with html5Context
 * const html5Context = canvasTexture.getContext();
 * // todo - your drawing here
 *
 * // Copy and get the texture
 * canvasTexture.copyTexture();
 * const webAssemblyTexture: TSRTexture = canvasTexture.getTexture();
 *
 * // After use, delete the CanvasTexture
 * canvasTexture.delete();
 * ```
 */
var CanvasTexture = /** @class */ (function (_super) {
    __extends(CanvasTexture, _super);
    /**
     * Creates an instance of a {@link CanvasTexture}
     * @remarks
     * The {@link CanvasTexture} implements {@link IDeletable}, and must be manually deleted to free WebAssembly / native memory
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param textureWidth The width of the texture
     * @param textureHeight The height of the texture
     * @param useInterpolation The flat determines whether to useInterpolation when creating texture
     */
    function CanvasTexture(webAssemblyContext, textureWidth, textureHeight) {
        var _this = _super.call(this) || this;
        _this.width = Math.floor(textureWidth);
        _this.height = Math.floor(textureHeight);
        Guard_1.Guard.isTrue(_this.width > 0, "CanvasTexture.width must be greater than zero");
        Guard_1.Guard.isTrue(_this.height > 0, "CanvasTexture.height must be greater than zero");
        if (!app_1.IS_TEST_ENV) {
            _this.canvas = document.createElement("canvas");
            _this.canvas.width = _this.width;
            _this.canvas.height = _this.height;
            // Uncomment to see the texture on the screen
            // document.body.appendChild(this.canvas);
        }
        _this.wasmContext = webAssemblyContext;
        // Create UIntVector with size once
        _this.intermediateVector = new _this.wasmContext.UIntVector();
        _this.intermediateVector.resize(_this.height * _this.width, 0);
        // Create UIntVector that will store initial color values
        _this.originalIntermediateVector = new _this.wasmContext.UIntVector();
        _this.originalIntermediateVector.resize(_this.height * _this.width, 0);
        var textureFormat = _this.wasmContext.eTSRTextureFormat.TSR_TEXTUREFORMAT_A8B8G8R8;
        // Create TSRTexture with size once
        _this.tsrTextureCache = new TextureCache_1.TextureCache(webAssemblyContext);
        _this.tsrTextureCache.create(_this.width, _this.height, textureFormat);
        return _this;
    }
    /**
     * Get an HTML5 {@link CanvasRenderingContext2D} to draw on.
     */
    CanvasTexture.prototype.getContext = function () {
        return this.canvas.getContext("2d", { willReadFrequently: true });
    };
    /**
     * Get the SciChart WebAssembly / WebGL {@link TSRTexture | Texture}
     */
    CanvasTexture.prototype.getTexture = function () {
        return this.tsrTextureCache.value;
    };
    /**
     * Clears the texture and the canvas
     */
    CanvasTexture.prototype.clear = function () {
        // Set canvas to clear
        this.getContext().clearRect(0, 0, this.width, this.height);
        // Set UIntVector to zeros
        this.intermediateVector.fill(0);
        this.originalIntermediateVector.fill(0);
    };
    /**
     * @inheritDoc
     */
    CanvasTexture.prototype.delete = function () {
        this.intermediateVector = (0, Deleter_1.deleteSafe)(this.intermediateVector);
        this.originalIntermediateVector = (0, Deleter_1.deleteSafe)(this.originalIntermediateVector);
        this.tsrTextureCache = (0, Deleter_1.deleteSafe)(this.tsrTextureCache);
        this.wasmContext = undefined;
    };
    /**
     * After you have finished drawing, copy the canvas to the destination {@link TSRTexture}
     */
    CanvasTexture.prototype.copyTexture = function () {
        var _a;
        var expectedSize = this.width * this.height;
        if (!this.intermediateVector || this.intermediateVector.size() !== expectedSize) {
            throw new Error("CanvasTexture.ts: IntermediateVector size is ".concat((_a = this.intermediateVector) === null || _a === void 0 ? void 0 : _a.size(), " and expected ").concat(expectedSize));
        }
        // Get image data from the HTML5 canvas
        var imageData = this.getContext().getImageData(0, 0, this.width, this.height);
        // Array of Uint8
        var imageArr = imageData.data;
        // Copy to intermediate vector and pixel swizzle RGBA to ABGR
        var size = this.width * this.height;
        for (var i = 0; i < size; i++) {
            var el = i * 4;
            var a = imageArr[el + 3];
            // Only set pixels that are not alpha=0
            if (a !== 0) {
                var r = imageArr[el];
                var g = imageArr[el + 1];
                var b = imageArr[el + 2];
                // tslint:disable-next-line:no-bitwise
                var pixel = (a << 24) | (r << 16) | (g << 8) | b;
                // tslint:disable-next-line:no-bitwise
                this.intermediateVector.set(i, pixel >>> 0);
                this.originalIntermediateVector.set(i, pixel >>> 0);
            }
        }
        // Copy to TSRTexture ready for drawing
        var tsrTexture = this.tsrTextureCache.value;
        this.wasmContext.SCRTFillTextureAbgr(tsrTexture, this.width, this.height, this.intermediateVector);
    };
    CanvasTexture.prototype.applyOpacity = function (opacity) {
        this.wasmContext.SCRTMultiplyColorVectorOpacity(this.originalIntermediateVector, this.intermediateVector, opacity);
        var tsrTexture = this.tsrTextureCache.value;
        this.wasmContext.SCRTFillTextureAbgr(tsrTexture, this.width, this.height, this.intermediateVector);
    };
    return CanvasTexture;
}(DeletableEntity_1.DeletableEntity));
exports.CanvasTexture = CanvasTexture;
