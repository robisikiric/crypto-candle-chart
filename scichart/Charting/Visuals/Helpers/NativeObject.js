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
exports.getAllFontKeys = exports.getFontKey = exports.getVector4 = exports.getNativeRect = exports.getTextBounds = exports.getVertex = exports.getVectorColorVertex = exports.getVectorRectVertex = exports.freeCache = exports.deleteCache = exports.FontKey = void 0;
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var Deleter_1 = require("../../../Core/Deleter");
var LabelCache_1 = require("../Axis/LabelProvider/LabelCache");
var SciChartDefaults_1 = require("../SciChartDefaults");
var FontKey = /** @class */ (function (_super) {
    __extends(FontKey, _super);
    function FontKey(nativeKey) {
        var _this = _super.call(this) || this;
        _this.firstLoadTime = Date.now();
        _this.nativeKey = nativeKey;
        return _this;
    }
    FontKey.prototype.delete = function () {
        (0, Deleter_1.deleteSafe)(this.nativeKey);
    };
    return FontKey;
}(DeletableEntity_1.DeletableEntity));
exports.FontKey = FontKey;
var objectCache = new Map();
var getCache = function (wasmContext) {
    var _a, _b;
    var canvasId = (_b = (_a = wasmContext === null || wasmContext === void 0 ? void 0 : wasmContext.canvas) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "TEST";
    if (!objectCache.has(canvasId)) {
        objectCache.set(canvasId, {
            vecRects: undefined,
            vecColorVertex: undefined,
            vertex: undefined,
            rect: undefined,
            vector4: undefined,
            textBounds: undefined,
            keyCache: new Map()
        });
    }
    return objectCache.get(canvasId);
};
var deleteCache = function (wasmContext) {
    if (!wasmContext.canvas)
        return;
    var canvasId = wasmContext.canvas.id;
    var cache = objectCache.get(canvasId);
    if (cache) {
        (0, Deleter_1.deleteSafe)(cache.vecRects);
        (0, Deleter_1.deleteSafe)(cache.vecColorVertex);
        (0, Deleter_1.deleteSafe)(cache.vertex);
        (0, Deleter_1.deleteSafe)(cache.rect);
        (0, Deleter_1.deleteSafe)(cache.vector4);
        (0, Deleter_1.deleteSafe)(cache.textBounds);
        cache.keyCache.forEach(function (key) { return (0, Deleter_1.deleteSafe)(key); });
    }
    objectCache.delete(canvasId);
};
exports.deleteCache = deleteCache;
var freeCache = function (wasmContext) {
    return {
        delete: function () { return (0, exports.deleteCache)(wasmContext); }
    };
};
exports.freeCache = freeCache;
/**
 * Returns an empty vector of Rectangles
 * @param wasmContext
 * @param maxSize
 * @returns
 */
var getVectorRectVertex = function (wasmContext, maxSize) {
    if (maxSize === void 0) { maxSize = 100; }
    var cache = getCache(wasmContext);
    if (!cache)
        return undefined;
    var vecRects = cache.vecRects;
    if (!vecRects) {
        vecRects = new wasmContext.VectorRectVertex();
        vecRects.reserve(maxSize);
        cache.vecRects = vecRects;
    }
    vecRects.clear();
    return vecRects;
};
exports.getVectorRectVertex = getVectorRectVertex;
var getVectorColorVertex = function (wasmContext, maxSize) {
    if (maxSize === void 0) { maxSize = 100; }
    var cache = getCache(wasmContext);
    if (!cache)
        return undefined;
    var vecColorVertex = cache.vecColorVertex;
    if (!vecColorVertex) {
        vecColorVertex = new wasmContext.VectorColorVertex();
        vecColorVertex.reserve(maxSize);
        cache.vecColorVertex = vecColorVertex;
    }
    vecColorVertex.clear();
    return vecColorVertex;
};
exports.getVectorColorVertex = getVectorColorVertex;
var getVertex = function (wasmContext, x, y, colour) {
    var cache = getCache(wasmContext);
    if (!cache)
        return undefined;
    var vertex = cache.vertex;
    if (!vertex) {
        vertex = new wasmContext.SCRTColorVertex(x, y);
        cache.vertex = vertex;
    }
    else {
        vertex.SetPosition(x, y);
        vertex.m_uiColor = colour !== null && colour !== void 0 ? colour : 4294967295; // masked color
    }
    return vertex;
};
exports.getVertex = getVertex;
var getTextBounds = function (wasmContext) {
    var cache = getCache(wasmContext);
    if (!cache)
        return undefined;
    var textBounds = cache.textBounds;
    if (!textBounds) {
        textBounds = new wasmContext.TSRTextBounds();
        cache.textBounds = textBounds;
    }
    return textBounds;
};
exports.getTextBounds = getTextBounds;
var getNativeRect = function (wasmContext, xTopLeft, yTopLeft, xBottomRight, yBottomRight) {
    var cache = getCache(wasmContext);
    var rect = cache.rect;
    if (!rect) {
        rect = new wasmContext.SCRTRectVertex(xTopLeft, yTopLeft, xBottomRight - xTopLeft, yBottomRight - yTopLeft);
        cache.rect = rect;
    }
    else {
        rect.Assign(xTopLeft, yTopLeft, xBottomRight - xTopLeft, yBottomRight - yTopLeft);
    }
    return rect;
};
exports.getNativeRect = getNativeRect;
var getVector4 = function (wasmContext, x, y, z, w) {
    var cache = getCache(wasmContext);
    var vector4 = cache.vector4;
    if (!vector4) {
        vector4 = new wasmContext.TSRVector4(x, y, z, w);
        cache.vector4 = vector4;
    }
    else {
        vector4.Assign(x, y, z, w);
    }
    return vector4;
};
exports.getVector4 = getVector4;
/**
 * get a fontKey required to aquire a native font
 * @param webAssemblyContext
 * @param labelStyle
 * @param transformed set true to get an alternative instance of the font which can be used multiple times while transformations are in effect,
 * without disrupting global font rendering
 * @returns
 */
var getFontKey = function (webAssemblyContext, labelStyle, advanced, transformed) {
    if (advanced === void 0) { advanced = false; }
    if (transformed === void 0) { transformed = false; }
    var cache = getCache(webAssemblyContext);
    if (!cache)
        return undefined;
    var keyCache = cache.keyCache;
    var newStyle = {
        fontFamily: labelStyle.fontFamily,
        fontSize: labelStyle.fontSize,
        extras: (advanced ? "advanced" : "") + (transformed ? "transformed" : ""),
        providerId: undefined
    };
    var styleId = LabelCache_1.labelCache.getStyleId(newStyle);
    if (!keyCache.has(styleId)) {
        var fontKey = new FontKey(new webAssemblyContext.SCRTFontKey(labelStyle.fontFamily, labelStyle.fontSize, transformed, advanced));
        keyCache.set(styleId, fontKey);
    }
    var key = keyCache.get(styleId);
    var timeSinceLoad = Date.now() - key.firstLoadTime;
    if (timeSinceLoad > SciChartDefaults_1.SciChartDefaults.nativeFontTimeout) {
        key.nativeKey.m_reload = false;
    }
    return key.nativeKey;
};
exports.getFontKey = getFontKey;
var getAllFontKeys = function (webAssemblyContext) {
    var cache = getCache(webAssemblyContext);
    return Array.from(cache.keyCache.values()).map(function (k) { return k.nativeKey; });
};
exports.getAllFontKeys = getAllFontKeys;
