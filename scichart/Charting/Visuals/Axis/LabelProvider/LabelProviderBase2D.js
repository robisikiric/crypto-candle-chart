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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelProviderBase2D = exports.LabelInfo = void 0;
var app_1 = require("../../../../constants/app");
var guid_1 = require("../../../../utils/guid");
var NativeObject_1 = require("../../Helpers/NativeObject");
var SciChartDefaults_1 = require("../../SciChartDefaults");
var TextureManager_1 = require("../../TextureManager/TextureManager");
var LabelCache_1 = require("./LabelCache");
var LabelProvider_1 = require("./LabelProvider");
var LabelInfo = /** @class */ (function () {
    function LabelInfo(tick, text, bitmapTexture, textureHeight, textureWidth) {
        this.tick = tick;
        this.text = text;
        this.bitmapTexture = bitmapTexture;
        this.textureHeight = textureHeight;
        this.textureWidth = textureWidth;
        this.lastUsed = Date.now();
    }
    return LabelInfo;
}());
exports.LabelInfo = LabelInfo;
/**
 * The {@link LabelProviderBase2D} provides base functionality for 2D label providers, including caching of label textures
 */
// tslint:disable-next-line: max-classes-per-file
var LabelProviderBase2D = /** @class */ (function (_super) {
    __extends(LabelProviderBase2D, _super);
    function LabelProviderBase2D(options) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, options) || this;
        _this.useCache = !app_1.IS_TEST_ENV;
        /**
         * Experimental - set true to use native text for axes.  Not all text features currently supported
         */
        _this.useNativeText = false;
        _this.tickToText = new Map();
        /** Set this true if the format function could return different results for the same input (eg SmartDateLabelprovider) */
        _this.textVariesForSameTick = false;
        _this.rotationProperty = 0;
        _this.lineSpacingProperty = 1.1;
        _this.providerId = (0, guid_1.generateGuid)();
        _this.rotationProperty = (_a = options === null || options === void 0 ? void 0 : options.rotation) !== null && _a !== void 0 ? _a : _this.rotationProperty;
        _this.lineSpacing = (_b = options === null || options === void 0 ? void 0 : options.lineSpacing) !== null && _b !== void 0 ? _b : _this.lineSpacing;
        _this.useSharedCache = (_c = options === null || options === void 0 ? void 0 : options.useSharedCache) !== null && _c !== void 0 ? _c : SciChartDefaults_1.SciChartDefaults.useSharedCache;
        _this.useNativeText = (_d = options === null || options === void 0 ? void 0 : options.useNativeText) !== null && _d !== void 0 ? _d : SciChartDefaults_1.SciChartDefaults.useNativeText;
        return _this;
    }
    Object.defineProperty(LabelProviderBase2D.prototype, "rotation", {
        get: function () {
            return this.rotationProperty;
        },
        set: function (value) {
            if (this.rotationProperty !== value) {
                this.rotationProperty = value;
                this.invalidateParent();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LabelProviderBase2D.prototype, "lineSpacing", {
        /**
         * Line spacing to use if text is wrapped, as a multiple of the text height.  Defaults to 1.1
         */
        get: function () {
            if (this.useNativeText) {
                return this.lineSpacingProperty === 1.1 ? 2 : this.lineSpacingProperty;
            }
            else {
                return this.lineSpacingProperty;
            }
        },
        /**
         * Line spacing to use if text is wrapped, as a multiple of the text height.  Defaults to 1.1
         */
        set: function (value) {
            this.lineSpacingProperty = value;
            this.invalidateParent();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns an array of label strings for an array of major tick numeric values
     * @param majorTicks The major tick numeric values
     */
    LabelProviderBase2D.prototype.getLabels = function (majorTicks) {
        var _this = this;
        var axis = this.parentAxis;
        if (this.useCache) {
            if (!this.styleId) {
                this.styleId = LabelCache_1.labelCache.getStyleId(this.getCachedStyle());
            }
            else if (!LabelCache_1.labelCache.checkStyle(this.styleId, this.getCachedStyle())) {
                this.resetCache();
                this.styleId = LabelCache_1.labelCache.getStyleId(this.getCachedStyle());
            }
        }
        var ticks = majorTicks;
        if (this.parentAxis.isCategoryAxis) {
            var categoryCoordCalc_1 = this.parentAxis.getCurrentCoordinateCalculator();
            ticks = majorTicks.map(function (tick) { return categoryCoordCalc_1.transformIndexToData(tick); });
        }
        var labels = [];
        if (this.useCache) {
            if (!this.useNativeText) {
                for (var _i = 0, ticks_1 = ticks; _i < ticks_1.length; _i++) {
                    var tick = ticks_1[_i];
                    var cachedLabel = void 0;
                    var text = void 0;
                    var cachedLabelText = this.tickToText.get(tick);
                    if (this.textVariesForSameTick) {
                        text = this.formatLabel(tick);
                        if (cachedLabelText && cachedLabelText === text) {
                            cachedLabel = LabelCache_1.labelCache.getLabel(cachedLabelText, this.styleId);
                            if (cachedLabel) {
                                labels.push(cachedLabelText);
                            }
                        }
                        else {
                            this.tickToText.set(tick, text);
                        }
                    }
                    else {
                        if (cachedLabelText) {
                            text = cachedLabelText;
                            cachedLabel = LabelCache_1.labelCache.getLabel(cachedLabelText, this.styleId);
                            if (cachedLabel) {
                                labels.push(cachedLabelText);
                            }
                        }
                        else {
                            text = this.formatLabel(tick);
                            this.tickToText.set(tick, text);
                        }
                    }
                    if (!cachedLabel) {
                        var texture = this.getCachedLabelTexture(text, axis.axisRenderer.textureManager, axis.dpiAdjustedLabelStyle);
                        if (texture.textureWidth !== null) {
                            cachedLabel = new LabelInfo(tick, text, texture.bitmapTexture, texture.textureHeight, texture.textureWidth);
                            LabelCache_1.labelCache.setLabel(text, this.styleId, cachedLabel);
                        }
                        labels.push(text);
                    }
                }
            }
            else {
                var sizesToGet = [];
                for (var _a = 0, ticks_2 = ticks; _a < ticks_2.length; _a++) {
                    var tick = ticks_2[_a];
                    var cachedLabelText = this.tickToText.get(tick);
                    if (this.textVariesForSameTick) {
                        var text = this.formatLabel(tick);
                        if (cachedLabelText && cachedLabelText === text) {
                            labels.push(cachedLabelText);
                        }
                        else {
                            this.tickToText.set(tick, text);
                            sizesToGet.push(text);
                            labels.push(text);
                        }
                    }
                    else {
                        if (cachedLabelText) {
                            labels.push(cachedLabelText);
                            var cachedLabel = LabelCache_1.labelCache.getLabel(cachedLabelText, this.styleId);
                            if (!cachedLabel) {
                                sizesToGet.push(cachedLabelText);
                            }
                        }
                        else {
                            var text = this.formatLabel(tick);
                            this.tickToText.set(tick, text);
                            sizesToGet.push(text);
                            labels.push(text);
                        }
                    }
                }
                this.getLabelSizesNative(sizesToGet, axis.dpiAdjustedLabelStyle);
            }
            LabelCache_1.labelCache.pruneCache();
            this.pruneTickTextCache();
        }
        else {
            labels = ticks.map(function (t) { return _this.formatLabel(t); });
        }
        return labels;
    };
    /**
     * Called during axis layout to get the height of the label
     * @param ctx the CanvasRenderingContext2D which can be used to perform text measurment
     * @param labelText the text of the label
     * @param labelStyle the style of the label
     * @returns the label height in pixels
     */
    LabelProviderBase2D.prototype.getLabelHeight = function (ctx, labelText, labelStyle) {
        if (this.rotationProperty % 90 === 0 || this.parentAxis.isHorizontalAxis) {
            var cachedLabel = this.useCache ? LabelCache_1.labelCache.getLabel(labelText, this.styleId) : undefined;
            if (!cachedLabel || !cachedLabel.textureHeight) {
                // I'm pretty sure this block will never be entered now that the cache is always checked on label creation
                var fontSize = labelStyle.fontSize, padding = labelStyle.padding;
                if (!ctx) {
                    var _a = this.parentAxis.axisRenderer, viewRect = _a.viewRect, textureManager = _a.textureManager;
                    ctx = textureManager.getTextureContext(Math.floor(viewRect.width), Math.floor(viewRect.height));
                }
                return (0, TextureManager_1.measureTextHeight)(fontSize) + (padding === null || padding === void 0 ? void 0 : padding.top) + (padding === null || padding === void 0 ? void 0 : padding.bottom);
            }
            return cachedLabel.textureHeight;
        }
        else {
            return labelStyle.fontSize + labelStyle.padding.top + labelStyle.padding.bottom;
        }
    };
    /**
     * Called during axis layout to get the width of the label
     * @param ctx the CanvasRenderingContext2D which can be used to perform text measurment
     * @param labelText the text of the label
     * @param labelStyle the style of the label
     * @returns the label width in pixels
     */
    LabelProviderBase2D.prototype.getLabelWidth = function (ctx, labelText, labelStyle) {
        if (this.rotationProperty % 90 === 0 || !this.parentAxis.isHorizontalAxis) {
            var cachedlabel = this.useCache ? LabelCache_1.labelCache.getLabel(labelText, this.styleId) : undefined;
            if (!cachedlabel || !cachedlabel.textureWidth) {
                var padding = labelStyle.padding;
                return (0, TextureManager_1.measureTextWidth)(ctx, labelText) + padding.left + padding.right;
            }
            return cachedlabel.textureWidth;
        }
        else {
            return labelStyle.fontSize + labelStyle.padding.left + labelStyle.padding.right;
        }
    };
    /**
     * Called during axis layout to get the maximum height of labels on a horizontal axis.
     * Normally this calls getLabelHeight for each label and returns the largest.
     * @param majorTickLabels an array of text labels
     * @param ctx the CanvasRenderingContext2D which can be used to perform text measurment
     * @param labelStyle the style of the labels
     * @returns the maximum label height in pixels
     */
    LabelProviderBase2D.prototype.getMaxLabelHeightForHorizontalAxis = function (majorTickLabels, ctx, labelStyle) {
        var _this = this;
        var maxHeight = 0;
        majorTickLabels.forEach(function (labelText) {
            var labelHeight = _this.getLabelHeight(ctx, labelText, labelStyle);
            maxHeight = labelHeight > maxHeight ? labelHeight : maxHeight;
        });
        return maxHeight;
    };
    /**
     * Called during axis layout to get the maximum width of labels on a vertical axis.
     * Normally this calls getLabelWidth for each label and returns the largest.
     * @param majorTickLabels an array of text labels
     * @param ctx the CanvasRenderingContext2D which can be used to perform text measurment
     * @param labelStyle the style of the labels
     * @returns the maximum label width in pixels
     */
    LabelProviderBase2D.prototype.getMaxLabelWidthForVerticalAxis = function (majorTickLabels, ctx, labelStyle) {
        var _this = this;
        var maxWidth = 0;
        majorTickLabels.forEach(function (labelText) {
            var labelWidth = _this.getLabelWidth(ctx, labelText, labelStyle);
            maxWidth = labelWidth > maxWidth ? labelWidth : maxWidth;
        });
        return maxWidth;
    };
    /**
     * Get a texture for the given label text. By default the textures are created first and then the resulting sizes are used by the layout functions
     * @param labelText The required text
     * @param textureManager A textureManager instance which contains methods for creating textures
     * @param labelStyle The style for the text
     * @returns A TTextureObject containing the bitmapTexture and the size
     */
    LabelProviderBase2D.prototype.getCachedLabelTexture = function (labelText, textureManager, labelStyle) {
        var _a;
        var cachedLabel = LabelCache_1.labelCache.getLabel(labelText, this.styleId);
        if (cachedLabel) {
            return {
                textureWidth: (_a = cachedLabel.textureWidth) !== null && _a !== void 0 ? _a : null,
                textureHeight: cachedLabel.textureHeight,
                bitmapTexture: cachedLabel.bitmapTexture
            };
        }
        else {
            return this.getLabelTexture(labelText, textureManager, labelStyle);
        }
    };
    /**
     * @deprecated AsyncLabels have been removed. useNativeText: true provides much greater performance benefit.
     * If using texture labels override getLabelTexture instead
     */
    LabelProviderBase2D.prototype.getLabelTextureAsync = function (labelText, textureManager, labelStyle) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getLabelTexture(labelText, textureManager, labelStyle)];
            });
        });
    };
    /**
     * Create a texture for the given label text. This method is called if useNativeText is false.
     * If overriding this method with useSharedCache = true, consider setting it false for this LabelProvider,
     * otherwise other axes using the same style and text may see your custom texture. Alternatively you can override getCachedStyle or set styleId directly
     */
    LabelProviderBase2D.prototype.getLabelTexture = function (labelText, textureManager, labelStyle) {
        return textureManager.createTextTexture([labelText], labelStyle, this.rotationProperty);
    };
    LabelProviderBase2D.prototype.getNativeLabelInfo = function (labelText) {
        return LabelCache_1.labelCache.getLabel(labelText, this.styleId);
    };
    LabelProviderBase2D.prototype.invalidateCache = function () {
        if (this.styleId) {
            LabelCache_1.labelCache.freeStyle(this.styleId);
        }
        this.tickToText.clear();
        this.styleId = null;
    };
    LabelProviderBase2D.prototype.resetCache = function () {
        this.invalidateCache();
    };
    LabelProviderBase2D.prototype.delete = function () {
        this.resetCache();
    };
    LabelProviderBase2D.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            rotation: this.rotation,
            lineSpacing: this.lineSpacing,
            asyncLabels: false,
            useSharedCache: this.useSharedCache,
            useNativeText: this.useNativeText
        };
        Object.assign(json.options, options);
        return json;
    };
    LabelProviderBase2D.prototype.getLabelSizesNative = function (labels, textStyle) {
        var _this = this;
        if (!labels || labels.length === 0 || app_1.IS_TEST_ENV)
            return;
        var allLabels = "";
        var simpleLabels = [];
        var wasmContext = this.parentAxis.parentSurface.webAssemblyContext2D;
        var textBounds = (0, NativeObject_1.getTextBounds)(wasmContext);
        var nativeContext = wasmContext.SCRTGetMainRenderContext2D();
        var fontKey = (0, NativeObject_1.getFontKey)(wasmContext, this.getCachedStyle(), false);
        var nativeFont = nativeContext.AquireFont(fontKey);
        var rotationRad = this.rotation * (Math.PI / 180);
        var sin = Math.abs(Math.sin(rotationRad));
        var cos = Math.abs(Math.cos(rotationRad));
        var makeCacheEntry = function (width, height, label) {
            var _a, _b;
            var w = width;
            var h = height;
            if (_this.rotation !== 0) {
                h = width * sin + height * cos;
                w = width * cos + height * sin;
            }
            var cachedLabel = new LabelInfo(undefined, label, undefined, h + ((_a = textStyle.padding) === null || _a === void 0 ? void 0 : _a.top) + (textStyle === null || textStyle === void 0 ? void 0 : textStyle.padding.bottom), w + ((_b = textStyle.padding) === null || _b === void 0 ? void 0 : _b.left) + (textStyle === null || textStyle === void 0 ? void 0 : textStyle.padding.right));
            cachedLabel.textWidth = width;
            cachedLabel.textHeight = height;
            LabelCache_1.labelCache.setLabel(label, _this.styleId, cachedLabel);
        };
        labels.forEach(function (labelText) {
            if (labelText && !labelText.includes("\n")) {
                simpleLabels.push(labelText);
                allLabels += labelText + "\n";
            }
            else {
                nativeFont.CalculateStringBounds(labelText !== null && labelText !== void 0 ? labelText : "", textBounds, 0);
                makeCacheEntry(textBounds.m_fWidth, textBounds.m_fHeight, labelText);
            }
        });
        if (simpleLabels.length > 0) {
            nativeFont.CalculateStringBounds(allLabels !== null && allLabels !== void 0 ? allLabels : "", textBounds, 2);
            for (var i = 0; i < simpleLabels.length; i++) {
                var label = simpleLabels[i];
                var bounds = textBounds.GetLineBounds(i);
                makeCacheEntry(bounds.m_fWidth, bounds.m_fHeight - bounds.m_fOffsetY, label);
            }
        }
    };
    LabelProviderBase2D.prototype.pruneTickTextCache = function () {
        if (this.tickToText.size > 1000) {
            this.tickToText.clear();
        }
    };
    /**
     * This method creates the text style to be stored in the label cache.
     * When useSharedCache = true, the label cache will generate a new styleId if this style does not match any existing style.
     * Cached labels are accessed by text and styleId.
     * If you are overriding getLabelTexture or getLabelTextureAsync and do not ensure the style is unique, you might not get the labels you expect.
     * You can either set useSharedCache = false, override this and set the extras field in {@link TCachedLabelStyle}, or set styleId directly
     */
    LabelProviderBase2D.prototype.getCachedStyle = function () {
        var axis = this.parentAxis;
        return __assign(__assign({}, axis.dpiAdjustedLabelStyle), { rotation: this.rotation, providerId: this.useSharedCache ? (this.useNativeText ? "native" : undefined) : this.providerId });
    };
    LabelProviderBase2D.prototype.clearCache = function () {
        if (this.useCache) {
            // Clear cache if property changed
            if (this.styleId) {
                LabelCache_1.labelCache.freeStyle(this.styleId);
                this.styleId = undefined;
            }
        }
        this.tickToText.clear();
    };
    LabelProviderBase2D.prototype.invalidateParent = function () {
        this.clearCache();
        _super.prototype.invalidateParent.call(this);
    };
    return LabelProviderBase2D;
}(LabelProvider_1.LabelProvider));
exports.LabelProviderBase2D = LabelProviderBase2D;
