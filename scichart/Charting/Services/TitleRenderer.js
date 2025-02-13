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
exports.getAdjustedRotation = exports.TitleRendererBase = void 0;
var app_1 = require("../../constants/app");
var DeletableEntity_1 = require("../../Core/DeletableEntity");
var Deleter_1 = require("../../Core/Deleter");
var Rect_1 = require("../../Core/Rect");
var TextPosition_1 = require("../../types/TextPosition");
var TextStyle_1 = require("../../types/TextStyle");
var parseColor_1 = require("../../utils/parseColor");
var text_1 = require("../../utils/text");
var createNativeRect_1 = require("../Visuals/Helpers/createNativeRect");
var NativeObject_1 = require("../Visuals/Helpers/NativeObject");
var DpiHelper_1 = require("../Visuals/TextureManager/DpiHelper");
var TextureManager_1 = require("../Visuals/TextureManager/TextureManager");
var TitleRendererBase = /** @class */ (function (_super) {
    __extends(TitleRendererBase, _super);
    function TitleRendererBase(webAssemblyContext) {
        var _this = _super.call(this) || this;
        _this.drawDebug = false;
        _this.useCache = true;
        _this.viewRectProperty = Rect_1.Rect.createZero();
        /**
         * The height taken by the text with normal(horizontal) orientation including padding
         */
        _this.textHeight = 0;
        /**
         * The width taken by the text with normal(horizontal) orientation including padding
         */
        _this.textWidth = 0;
        /**
         * The height taken by the text considering current orientation including padding
         */
        _this.desiredHeightProperty = 0;
        /**
         * The width taken by the text considering current orientation including padding
         */
        _this.desiredWidthProperty = 0;
        _this.useNativeTextProperty = false;
        _this.webAssemblyContext = webAssemblyContext;
        _this.textureManager = new TextureManager_1.TextureManager(webAssemblyContext);
        _this.onDpiChanged = _this.onDpiChanged.bind(_this);
        DpiHelper_1.DpiHelper.dpiChanged.subscribe(_this.onDpiChanged);
        return _this;
    }
    Object.defineProperty(TitleRendererBase.prototype, "viewRect", {
        /**
         * Defines a bounding {@link Rect} containing the title text
         */
        get: function () {
            return this.viewRectProperty;
        },
        enumerable: false,
        configurable: true
    });
    // TODO consider if this class should be abstract
    TitleRendererBase.prototype.measure = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    TitleRendererBase.prototype.layout = function (originRect) { };
    TitleRendererBase.prototype.draw = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    TitleRendererBase.prototype.delete = function () {
        this.resetCache();
        this.textureManager = (0, Deleter_1.deleteSafe)(this.textureManager);
        this.webAssemblyContext = undefined;
        DpiHelper_1.DpiHelper.dpiChanged.unsubscribe(this.onDpiChanged);
    };
    TitleRendererBase.prototype.resetCache = function () {
        this.invalidateCache();
        this.textStyle = undefined;
        this.originalTextStyle = undefined;
    };
    TitleRendererBase.prototype.invalidateCache = function () {
        var _a;
        (0, Deleter_1.deleteSafe)((_a = this.texture) === null || _a === void 0 ? void 0 : _a.bitmapTexture);
        this.texture = undefined;
    };
    TitleRendererBase.prototype.onDpiChanged = function (args) {
        this.resetCache();
    };
    /**
     * Performs rendering of the title
     */
    TitleRendererBase.prototype.drawInternal = function (renderContext, useNativeText, titlePosition) {
        if (!this.text || this.text.length === 0) {
            return;
        }
        if (useNativeText) {
            this.drawWithNativeText(renderContext, titlePosition);
        }
        else {
            this.drawWithTexture(renderContext, titlePosition);
        }
        // if (this.drawDebug) {
        //     this.drawTitleDebugViewRect(renderContext);
        // }
    };
    TitleRendererBase.prototype.drawWithNativeText = function (renderContext, position) {
        var titleText = Array.isArray(this.text) ? this.text.join("\n") : this.text;
        // @ts-ignore mismatch with TTextStyle
        var nativeFont = renderContext.getFont(this.textStyle, true);
        // calculate start coordinates for native text drawing;
        // the start point is the beginning of alphabetic text baseline
        var tx = this.viewRect.left + this.nativeTextShiftX;
        var ty = this.viewRect.top + this.nativeTextShiftY;
        var adjRotation = (0, exports.getAdjustedRotation)(this.textStyle.rotation, position);
        var rotationRad = -(adjRotation * Math.PI) / 180;
        var nativeMultilineAlignment = (0, TextPosition_1.convertMultiLineAlignment)(this.textStyle.multilineAlignment, this.webAssemblyContext);
        var textColor = (0, parseColor_1.parseColorToUIntArgb)(this.textStyle.color);
        nativeFont.DrawStringAdvanced(titleText, textColor, Math.round(tx), Math.round(ty), (0, NativeObject_1.getVector4)(this.webAssemblyContext, tx, ty, rotationRad, 0), nativeMultilineAlignment, this.nativeLineSpacing);
    };
    TitleRendererBase.prototype.drawWithTexture = function (renderContext, titlePosition) {
        var _a = this.texture, bitmapTexture = _a.bitmapTexture, textureHeight = _a.textureHeight, textureWidth = _a.textureWidth;
        if (bitmapTexture) {
            try {
                var nativeContext = renderContext.getNativeContext();
                nativeContext.DrawTexture(bitmapTexture, Math.round(this.viewRect.left), Math.round(this.viewRect.top), textureWidth, textureHeight);
                if (!this.useCache) {
                    bitmapTexture.delete();
                    this.texture = undefined;
                }
            }
            catch (err) {
                console.error("Error while drawing title: ", err);
                // webgl context probably lost. Clear the cache
                this.resetCache();
            }
        }
    };
    /**
     * Calculates width and hight of the title text
     */
    TitleRendererBase.prototype.getTextSize = function (title, textStyle, renderContext) {
        if (title === void 0) { title = ""; }
        if (!title || title.length === 0) {
            this.desiredHeightProperty = 0;
            this.desiredWidthProperty = 0;
            this.textHeight = 0;
            this.textWidth = 0;
            return;
        }
        var hasHorizontalPlacement = (0, TextStyle_1.getIsHorizontalPlacement)(this.titlePosition);
        if (this.useNativeTextProperty) {
            // @ts-ignore mismatch with TTextStyle
            var nativeFont = renderContext.getFont(textStyle, !hasHorizontalPlacement);
            var titleString = Array.isArray(title) ? title.join("\n") : title;
            var adjRotation = (0, exports.getAdjustedRotation)(textStyle.rotation, this.titlePosition);
            var _a = (0, text_1.getNativeTextSize)(titleString, nativeFont, textStyle, this.webAssemblyContext, adjRotation), textHeight = _a.textHeight, textWidth = _a.textWidth, nativeLineSpacing = _a.nativeLineSpacing, deltaX = _a.deltaX, deltaY = _a.deltaY;
            this.textHeight = hasHorizontalPlacement ? textHeight : textWidth;
            this.textWidth = hasHorizontalPlacement ? textWidth : textHeight;
            this.nativeLineSpacing = nativeLineSpacing;
            this.nativeTextShiftX = deltaX;
            this.nativeTextShiftY = deltaY;
            this.desiredHeightProperty = hasHorizontalPlacement ? this.textHeight : this.textWidth;
            this.desiredWidthProperty = hasHorizontalPlacement ? this.textWidth : this.textHeight;
        }
        else {
            // current title texture doesn't include paddings, so they should be added here
            var texture = this.getTitleTexture();
            this.texture = texture;
            this.desiredHeightProperty = texture.textureHeight;
            this.desiredWidthProperty = texture.textureWidth;
            this.textHeight = hasHorizontalPlacement ? this.desiredHeightProperty : this.desiredWidthProperty;
            this.textWidth = hasHorizontalPlacement ? this.desiredWidthProperty : this.desiredHeightProperty;
        }
        if (app_1.IS_TEST_ENV) {
            if (hasHorizontalPlacement) {
                this.desiredHeightProperty =
                    (0, TextureManager_1.measureTextHeight)(textStyle.fontSize) + this.textStyle.padding.top + this.textStyle.padding.bottom;
                this.desiredWidthProperty = 0;
            }
            else {
                this.desiredHeightProperty = 0;
                this.desiredWidthProperty =
                    (0, TextureManager_1.measureTextHeight)(textStyle.fontSize) + this.textStyle.padding.top + this.textStyle.padding.bottom;
            }
        }
    };
    TitleRendererBase.prototype.getTitleTexture = function () {
        // TODO this is not used at the moment; consider unifying logic for Chart Title Renderer and Axis Title Renderer
        var titleText = Array.isArray(this.text) ? this.text : this.text.split("\n");
        var texture = this.textureManager.createTextTexture(titleText, 
        // @ts-ignore mismatch with TTextStyle
        this.textStyle
        // { ...this.textStyle, padding: new Thickness(0, 0, 0, 0) },
        );
        return texture;
    };
    /**
     * Calculates the {@link TitleRenderer.viewRect}
     */
    TitleRendererBase.prototype.getViewRect = function (title, originRect, titlePosition, alignment) {
        if (title === void 0) { title = ""; }
        if (!title || title.length === 0) {
            return Rect_1.Rect.createZero();
        }
        var hasHorizontalPlacement = (0, TextStyle_1.getIsHorizontalPlacement)(titlePosition);
        var alignmentDelta = this.getAlignmentAdjustmentDelta(hasHorizontalPlacement ? originRect.width : originRect.height, titlePosition, alignment);
        switch (titlePosition) {
            case TextStyle_1.ETitlePosition.Top:
                return new Rect_1.Rect(originRect.x + alignmentDelta, originRect.y, this.textWidth, this.textHeight);
            case TextStyle_1.ETitlePosition.Bottom:
                return new Rect_1.Rect(originRect.x + alignmentDelta, originRect.bottom - this.textHeight, this.textWidth, this.textHeight);
            case TextStyle_1.ETitlePosition.Left:
                return new Rect_1.Rect(originRect.x, originRect.y + alignmentDelta, this.textHeight, this.textWidth);
            case TextStyle_1.ETitlePosition.Right:
                return new Rect_1.Rect(originRect.right - this.textHeight, originRect.y + alignmentDelta, this.textHeight, this.textWidth);
            default:
                return (0, TextStyle_1.handleInvalidChartTitlePosition)(titlePosition);
        }
    };
    TitleRendererBase.prototype.drawTitleDebugViewRect = function (renderContext) {
        var viewRect = this.viewRect;
        var vecRects = (0, NativeObject_1.getVectorRectVertex)(this.webAssemblyContext);
        var brush = new this.webAssemblyContext.SCRTSolidBrush((0, parseColor_1.parseColorToUIntArgb)("rgba(0,255,0,0.7)"), false);
        var nativeRect = (0, createNativeRect_1.createNativeRect)(this.webAssemblyContext, 0, 0, viewRect.width, viewRect.height);
        vecRects.push_back(nativeRect);
        renderContext.drawRects(vecRects, brush, viewRect.left, viewRect.top);
        brush.delete();
    };
    /**
     * Calculates the offset of title text alignment defined by {@link TChartTitleStyle.alignment} or {@link TTextStyle.alignment}
     */
    TitleRendererBase.prototype.getAlignmentAdjustmentDelta = function (availableSpace, position, alignment) {
        switch (alignment) {
            case TextStyle_1.ETextAlignment.Center:
                return availableSpace / 2 - this.textWidth / 2;
            case TextStyle_1.ETextAlignment.Left:
                return position === TextStyle_1.ETitlePosition.Left ? availableSpace - this.textWidth : 0;
            case TextStyle_1.ETextAlignment.Right:
                return position === TextStyle_1.ETitlePosition.Left ? 0 : availableSpace - this.textWidth;
            default:
                return (0, TextStyle_1.handleInvalidTextAlignment)(alignment);
        }
    };
    return TitleRendererBase;
}(DeletableEntity_1.DeletableEntity));
exports.TitleRendererBase = TitleRendererBase;
var getAdjustedRotation = function (rotation, position) {
    if (rotation !== undefined) {
        return (rotation + 360) % 360;
    }
    var adjustedRotation = 0;
    if (position === TextStyle_1.ETitlePosition.Left) {
        adjustedRotation += -90;
    }
    else if (position === TextStyle_1.ETitlePosition.Right) {
        adjustedRotation += 90;
    }
    return (adjustedRotation + 360) % 360;
};
exports.getAdjustedRotation = getAdjustedRotation;
