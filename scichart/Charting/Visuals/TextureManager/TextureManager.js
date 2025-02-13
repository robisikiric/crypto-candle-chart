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
exports.measureTextWidth = exports.measureTextHeight = exports.TextureManager = void 0;
var app_1 = require("../../../constants/app");
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var AxisAlignment_1 = require("../../../types/AxisAlignment");
var LabelAlignment_1 = require("../../../types/LabelAlignment");
var font_1 = require("../../../utils/font");
var parseColor_1 = require("../../../utils/parseColor");
var NativeObject_1 = require("../Helpers/NativeObject");
var DpiHelper_1 = require("./DpiHelper");
/** @ignore */
var DEFAULT_HEIGHT = 1080;
/** @ignore */
var DEFAULT_WIDTH = 1920;
/** @ignore */
var PT_TO_PX = 96 / 72;
/** @ignore */
var PX_TO_PT = 72 / 96;
var TextureManager = /** @class */ (function (_super) {
    __extends(TextureManager, _super);
    function TextureManager(webAssemblyContext) {
        var _this = _super.call(this) || this;
        _this.webAssemblyContext = webAssemblyContext;
        if (!app_1.IS_TEST_ENV) {
            _this.canvas = document.createElement("canvas");
            _this.canvas.width = DEFAULT_WIDTH;
            _this.canvas.height = DEFAULT_HEIGHT;
            _this.ctx = _this.canvas.getContext("2d", { willReadFrequently: true });
        }
        return _this;
    }
    TextureManager.prototype.createSimpleTextTexture = function (text, textStyle, backgroundColor, displayVertically, displayMirrored, opacity) {
        var rotation = 0;
        if (displayVertically) {
            if (displayMirrored) {
                rotation = 90;
            }
            else {
                rotation = -90;
            }
        }
        return this.createTextTexture([text], textStyle, rotation, undefined, backgroundColor, opacity);
    };
    /**
     * Create a text texture supporting multiline and arbitrary rotation
     * @param text
     * @param textStyle
     * @param rotation
     * @param lineSpacing Expressed as a fraction of the font size. Default 1.1
     * @param backgroundColor
     * @param opacity
     * @returns
     */
    TextureManager.prototype.createTextTextureNative = function (text, textStyle, rotation, lineSpacing, backgroundColor, opacity) {
        var fontStyle = textStyle.fontStyle, fontWeight = textStyle.fontWeight, fontFamily = textStyle.fontFamily, fontSizePx = textStyle.fontSize, padding = textStyle.padding, alignment = textStyle.alignment, color = textStyle.color;
        var nativeContext = this.webAssemblyContext.SCRTGetMainRenderContext2D();
        // TODO support rotation, spacing and alignment
        var fontKey = (0, NativeObject_1.getFontKey)(this.webAssemblyContext, { fontFamily: fontFamily, fontSize: fontSizePx !== null && fontSizePx !== void 0 ? fontSizePx : 12 });
        var bgColor = backgroundColor ? (0, parseColor_1.parseColorToUIntArgb)(backgroundColor) : 0;
        var bitmapTexture = nativeContext.CreateTextTextureColored(fontKey, text.join("\n"), (0, parseColor_1.parseColorToUIntArgb)(color), bgColor);
        this.webAssemblyContext.SCRTSetTextureLinearSamplerEnabled(bitmapTexture, false);
        var textureWidth = bitmapTexture.GetWidth();
        var textureHeight = bitmapTexture.GetHeight();
        return {
            bitmapTexture: bitmapTexture,
            textureWidth: textureWidth,
            textureHeight: textureHeight
        };
    };
    /**
     * Create a text texture supporting multiline and arbitrary rotation
     * @param text
     * @param textStyle
     * @param rotation
     * @param lineSpacing Expressed as a fraction of the font size. Default 1.1
     * @param backgroundColor
     * @param opacity
     * @returns
     */
    TextureManager.prototype.createTextTexture = function (text, textStyle, rotation, lineSpacing, backgroundColor, opacity) {
        var _a;
        if (app_1.IS_TEST_ENV) {
            return { bitmapTexture: undefined, textureWidth: 1, textureHeight: 1 };
        }
        var fontStyle = textStyle.fontStyle, fontWeight = textStyle.fontWeight, fontFamily = textStyle.fontFamily, fontSizePx = textStyle.fontSize, padding = textStyle.padding, alignment = textStyle.alignment, color = textStyle.color;
        // Save state
        this.ctx.save();
        this.ctx.globalAlpha = opacity !== null && opacity !== void 0 ? opacity : 1;
        this.ctx.textBaseline = "alphabetic";
        // Switched this back to alphabetic because...reasons
        // https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-textbaseline-alphabetic
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (backgroundColor) {
            this.ctx.fillStyle = backgroundColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.ctx.fillStyle = color;
        this.ctx.font = (0, font_1.getFontString)(fontStyle, fontWeight, fontSizePx, fontFamily);
        var textureWidth = 0;
        // const fontSizePt = Math.ceil(fontSizePx * PX_TO_PT);
        var textureHeight = padding.top + padding.bottom;
        var maxLineHeight = 0;
        var firstLineOffset = 0;
        var lineHeights = [];
        for (var index = 0; index < text.length; index++) {
            var line = text[index];
            var textMeasure = this.ctx.measureText(line);
            var lineHeight = Math.round(textMeasure.actualBoundingBoxAscent + textMeasure.actualBoundingBoxDescent);
            lineHeights.push(lineHeight);
            if (lineHeight > maxLineHeight) {
                maxLineHeight = lineHeight;
            }
            if (index === 0) {
                firstLineOffset = textMeasure.actualBoundingBoxAscent;
            }
            var lineWidth = Math.round(textMeasure.width + padding.left + padding.right);
            if (lineWidth > textureWidth) {
                textureWidth = lineWidth;
            }
            textureHeight += lineHeight;
        }
        var lineSpacingPixels = Math.round(maxLineHeight * ((lineSpacing !== null && lineSpacing !== void 0 ? lineSpacing : 1.1) - 1));
        textureHeight += (text.length - 1) * lineSpacingPixels;
        var y = padding.top + firstLineOffset;
        var x = padding.left;
        if (!textureWidth || !textureHeight) {
            return { bitmapTexture: undefined, textureWidth: textureWidth, textureHeight: textureHeight };
        }
        var newTextureWidth = textureWidth;
        var newTextureHeight = textureHeight;
        if (rotation) {
            // convert to radians
            var rotationRad = (rotation * Math.PI) / 180;
            // We need to Math.ceil to fix rotation for WebGL1
            newTextureWidth = Math.round(textureWidth * Math.abs(Math.cos(rotationRad)) + textureHeight * Math.abs(Math.sin(rotationRad)));
            newTextureHeight = Math.round(textureWidth * Math.abs(Math.sin(rotationRad)) + textureHeight * Math.abs(Math.cos(rotationRad)));
            // translate to the center of rectangle
            this.ctx.translate(newTextureWidth / 2, newTextureHeight / 2);
            this.ctx.rotate(rotationRad);
            // translate to the new origin that is located in the left top center of the texture
            this.ctx.translate(-textureWidth / 2, -textureHeight / 2);
        }
        var multilineAlignment = (_a = textStyle.multilineAlignment) !== null && _a !== void 0 ? _a : alignment;
        var maxLineTextWidth = textureWidth - padding.right - padding.left;
        for (var index = 0; index < text.length; index++) {
            var line = text[index];
            if (multilineAlignment === LabelAlignment_1.ELabelAlignment.Center || multilineAlignment === LabelAlignment_1.ELabelAlignment.Right) {
                var lineWidth = (0, exports.measureTextWidth)(this.ctx, line);
                x =
                    multilineAlignment === LabelAlignment_1.ELabelAlignment.Right
                        ? textureWidth - lineWidth - padding.right
                        : (maxLineTextWidth - lineWidth) / 2 + padding.left;
            }
            this.ctx.fillText(line, Math.round(x), Math.round(y));
            y += lineHeights[index] + lineSpacingPixels;
        }
        this.ctx.strokeStyle = color;
        this.ctx.restore();
        // Useful for debugging rotated textures
        // this.ctx.beginPath();
        // this.ctx.rect(0, 0, newTextureWidth, newTextureHeight);
        // this.ctx.stroke();
        return this.createTextureFromCtxBuffer(newTextureWidth, newTextureHeight);
    };
    TextureManager.prototype.createAxisMarkerTexture = function (axisAlignment, text, fontStyle, fontWeight, fontSizePx, fontFamily, color, padding, backgroundColor, opacity) {
        if (padding === void 0) { padding = 0; }
        this.ctx.globalAlpha = opacity !== null && opacity !== void 0 ? opacity : 1;
        this.ctx.textBaseline = "top";
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = (0, font_1.getFontString)(fontStyle, fontWeight, fontSizePx, fontFamily);
        var textureWidth = (0, exports.measureTextWidth)(this.ctx, text) + 4 * padding;
        var textureHeight = (0, exports.measureTextHeight)(fontSizePx) + 2 * padding;
        var _a = calcAxisMarkerTextureParams(textureHeight, textureWidth, text, axisAlignment), angle = _a.angle, alignmentLeft = _a.alignmentLeft, alignmentTop = _a.alignmentTop, finalTextureWidth = _a.finalTextureWidth, finalTextureHeight = _a.finalTextureHeight, halfHeight = _a.halfHeight;
        this.ctx.save();
        this.ctx.translate((textureWidth + halfHeight) / 2, textureHeight / 2);
        this.ctx.rotate(angle);
        this.ctx.translate(alignmentLeft, alignmentTop);
        if (backgroundColor) {
            var region = new Path2D();
            var height = textureHeight;
            var width = textureWidth;
            region.moveTo(0, 0);
            region.lineTo(width, 0);
            region.lineTo(halfHeight + width, halfHeight);
            region.lineTo(width, height);
            region.lineTo(0, height);
            region.closePath();
            this.ctx.fillStyle = backgroundColor;
            this.ctx.fill(region);
        }
        // const fontSizePt = Math.ceil(fontSizePx * PX_TO_PT);
        if (axisAlignment !== AxisAlignment_1.EAxisAlignment.Right) {
            this.ctx.fillStyle = color;
            this.ctx.fillText(text, 2 * padding, padding);
        }
        this.ctx.restore();
        // display label in default orientation if marker is placed on the right side
        if (axisAlignment === AxisAlignment_1.EAxisAlignment.Right) {
            this.ctx.fillStyle = color;
            this.ctx.fillText(text, 2 * padding + halfHeight, padding);
        }
        // uncomment this line to get texture width and height to use in unit tests
        // console.log("createAxisMarkerTexture width, height", finalTextureWidth, finalTextureHeight);
        return this.createTextureFromCtxBuffer(finalTextureWidth, finalTextureHeight);
    };
    /**
     * Creates {@link TSRTexture} from image
     * @param image The image
     * @param imageWidth The image width, not premultiplied value
     * @param imageHeight The image height, not premultiplied value
     */
    TextureManager.prototype.createTextureFromImage = function (image, imageWidth, imageHeight) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var width = (imageWidth !== null && imageWidth !== void 0 ? imageWidth : image.width) * DpiHelper_1.DpiHelper.PIXEL_RATIO;
        var height = (imageHeight !== null && imageHeight !== void 0 ? imageHeight : image.height) * DpiHelper_1.DpiHelper.PIXEL_RATIO;
        this.ctx.drawImage(image, 0, 0, width, height);
        return this.createTextureFromCtxBuffer(width, height);
    };
    TextureManager.prototype.getTextureContext = function (width, height) {
        if (app_1.IS_TEST_ENV)
            return undefined;
        if (width > this.canvas.width) {
            this.canvas.width = width;
        }
        if (height > this.canvas.height) {
            this.canvas.height = height;
        }
        // TODO it's not clear if this is actually required, and it's slow.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this.ctx;
    };
    TextureManager.prototype.createTextureFromCtxBuffer = function (textureWidth, textureHeight) {
        var imageData = this.ctx.getImageData(0, 0, textureWidth, textureHeight);
        return this.createTextureFromImageData(imageData, textureWidth, textureHeight);
    };
    TextureManager.prototype.createTextureFromImageData = function (imageData, textureWidth, textureHeight) {
        var textureFormat = this.webAssemblyContext.eTSRTextureFormat.TSR_TEXTUREFORMAT_A8B8G8R8;
        var bitmapTexture = this.webAssemblyContext.SCRTCreateBitmapTexture(textureWidth, textureHeight, textureFormat);
        var buffer;
        try {
            // const imageData = this.ctx.getImageData(0, 0, textureWidth, textureHeight);
            var clampedCharArray = imageData.data;
            /// because plain c functions were receiving the object pointer as null, this is the way around that...
            this.webAssemblyContext.SCRTSetActiveTexture(bitmapTexture);
            // Allocate some space in the heap for the data (making sure to use the appropriate memory size)
            // @ts-ignore
            buffer = this.webAssemblyContext._malloc(clampedCharArray.length);
            // Assign the data to the heap - Keep in mind bytes per element
            // @ts-ignore
            this.webAssemblyContext.HEAP8.set(clampedCharArray, buffer);
            // Call the function with "number" parameter type for the array (the pointer), and an extra length parameter
            // @ts-ignore
            var result = this.webAssemblyContext.ccall("SCRTFillActiveTextureCharArray", null, ["number", "number", "number"], [textureWidth, textureHeight, buffer]);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            // This needs to happen in finally block, otherwise thrown errors will stop code execution before
            // @ts-ignore
            this.webAssemblyContext._free(buffer);
            // @shady : Textures with text should use point sampling, not linear, to prevent black edges issue
            this.webAssemblyContext.SCRTSetTextureLinearSamplerEnabled(bitmapTexture, false);
        }
        return {
            bitmapTexture: bitmapTexture,
            textureWidth: textureWidth,
            textureHeight: textureHeight
        };
    };
    TextureManager.prototype.delete = function () {
        this.canvas = undefined;
        this.ctx = undefined;
        this.webAssemblyContext = undefined;
    };
    TextureManager.prototype.createTextureFromCtx = function (textureWidth, textureHeight) {
        // TODO: Michael cache the canvas, UIntVector, bitmapTexture unless size changed
        // Logger.log(`New Texture: Size is ${textureWidth}, ${textureHeight}`);
        var imageData = this.ctx.getImageData(0, 0, textureWidth, textureHeight);
        // Array of Uint8
        var imageArr = imageData.data;
        // Array of Uint32
        var size = textureWidth * textureHeight;
        var aPixels = new this.webAssemblyContext.UIntVector();
        // Set initial capacity and fill with zeros
        aPixels.resize(size, 0);
        for (var i = 0; i < size; i++) {
            var el = i * 4;
            var a = imageArr[el + 3];
            // Only set pixels that are not alpha=0
            if (a !== 0) {
                var r = imageArr[el];
                var g = imageArr[el + 1];
                var b = imageArr[el + 2];
                // tslint:disable-next-line:no-bitwise
                var pixel = (a << 24) | (b << 16) | (g << 8) | r;
                // tslint:disable-next-line:no-bitwise
                aPixels.set(i, pixel >>> 0);
            }
        }
        // TODO: Consider faster ways of transferring memory to WebAssembly
        // e.g. can we do this? https://github.com/WebAssembly/design/issues/1231
        var textureFormat = this.webAssemblyContext.eTSRTextureFormat.TSR_TEXTUREFORMAT_A8B8G8R8;
        var bitmapTexture = this.webAssemblyContext.SCRTCreateBitmapTexture(textureWidth, textureHeight, textureFormat);
        this.webAssemblyContext.SCRTFillTextureAbgr(bitmapTexture, textureWidth, textureHeight, aPixels);
        aPixels.delete();
        return {
            bitmapTexture: bitmapTexture,
            textureWidth: textureWidth,
            textureHeight: textureHeight
        };
    };
    return TextureManager;
}(DeletableEntity_1.DeletableEntity));
exports.TextureManager = TextureManager;
var measureTextHeight = function (fontSizePx) { return fontSizePx; };
exports.measureTextHeight = measureTextHeight;
var measureTextWidth = function (ctx, text) {
    if (app_1.IS_TEST_ENV)
        return 1;
    var textMeasure = ctx.measureText(text);
    return Math.ceil(textMeasure.width);
};
exports.measureTextWidth = measureTextWidth;
/** @ignore */
var calcAxisMarkerTextureParams = function (textureHeight, textureWidth, text, axisAlignment) {
    var halfHeight = Math.ceil(textureHeight / 2);
    var angle = 0;
    var alignmentLeft = 0;
    var alignmentTop = 0;
    var finalTextureWidth = textureWidth + halfHeight;
    var finalTextureHeight = textureHeight;
    switch (axisAlignment) {
        case AxisAlignment_1.EAxisAlignment.Left:
            angle = 0;
            alignmentLeft = -(textureWidth + halfHeight) / 2;
            alignmentTop = -textureHeight / 2;
            break;
        case AxisAlignment_1.EAxisAlignment.Top:
            angle = Math.PI * 0.5;
            alignmentLeft = -textureHeight / 2;
            alignmentTop = (textureWidth + halfHeight) / 2 - textureHeight;
            finalTextureWidth = textureHeight;
            finalTextureHeight = textureWidth + halfHeight;
            break;
        case AxisAlignment_1.EAxisAlignment.Right:
            angle = Math.PI;
            alignmentLeft = -(textureWidth + halfHeight) / 2;
            alignmentTop = -textureHeight / 2;
            break;
        case AxisAlignment_1.EAxisAlignment.Bottom:
            angle = Math.PI * 1.5;
            alignmentLeft = -textureWidth;
            alignmentTop = -(textureWidth + halfHeight) / 2;
            finalTextureWidth = textureHeight;
            finalTextureHeight = textureWidth + halfHeight;
            break;
    }
    return { angle: angle, alignmentLeft: alignmentLeft, alignmentTop: alignmentTop, finalTextureWidth: finalTextureWidth, finalTextureHeight: finalTextureHeight, halfHeight: halfHeight };
};
